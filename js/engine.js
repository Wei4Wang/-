/* 《画外》引擎：数据驱动互动叙事（对话/旁白/黑屏字幕/选项/隐藏热点/定时沉默/收集/成就/章节结算/画廊/存档） */
(function(){
const $=id=>document.getElementById(id);
const SAVE_KEY="huawai_save_v1";
const TOTAL=46;
let S=null, scene=null, flow=[], ptr=0, pendingHots=[], pendingChoice=null, bgArg=null;
let typing=false, typeTimer=null, fullText="", pauseTimer=null, paused=false;

const ACH={zhitee:"钢铁教授",rain:"雨里没人接伞",bookmark:"书签的页码",tixian:"题献页",hardseat:"三小时硬座",tenmin:"迟到的十分钟",calendar:"日历对不上",biezou:"别走",sanback:"伞回来了",letters46:"四十六封",outsider:"局外人",ruyi:"如果"};

function defaultSave(){return {letters:0,flags:{},ach:{},done:{},letterKeys:{},goodCount:0,ruyi:false,gray:false};}
function load(){try{const r=localStorage.getItem(SAVE_KEY);return r?JSON.parse(r):null;}catch(e){return null;}}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(S));}catch(e){}}

function show(id){document.querySelectorAll(".screen").forEach(e=>e.classList.remove("active"));$(id).classList.add("active");}
function toast(t){const el=$("toast");el.textContent=t;el.classList.remove("hidden");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.add("hidden"),2600);}
function ach(k){if(!ACH[k]||S.ach[k])return;S.ach[k]=true;save();toast("成就解锁 · "+ACH[k]);}
function addLetters(n,key){if(key&&S.letterKeys[key])return;if(key)S.letterKeys[key]=true;S.letters=Math.min(TOTAL,S.letters+n);save();hudLetters();$("hub-letters").textContent="信："+S.letters+" / "+TOTAL;toast("拾取信碎片 ×"+n+"（"+S.letters+"/"+TOTAL+"）");if(S.letters>=TOTAL)ach("letters46");}
function hudLetters(){$("hud-letters").textContent="✉ "+S.letters+"/"+TOTAL;}
function evalCond(c){if(!c)return true;return c.split("&&").every(t=>{t=t.trim();if(t[0]==="!")return !S.flags[t.slice(1)];return !!S.flags[t];});}

/* ---------- 舞台 ---------- */
function applyGray(){$("stage").classList.toggle("gray",!!S.gray);$("stage").classList.remove("warmflash");}
function renderBG(name,arg){$("bg").innerHTML=ART.svg[name](arg);applyGray();}

function startScene(sid){
  if(sid==="c1s1"||sid==="c2s1"){S.gray=false;save();}
  scene=STORY.scenes[sid]; scene.id=sid;
  flow=JSON.parse(JSON.stringify(scene.beats)); ptr=0;
  pendingHots=[]; pendingChoice=null; bgArg=null;
  $("hud-chapter").textContent=scene.chapterTitle||"";
  hudLetters(); show("scr-stage");
  renderBG(scene.bg);
  $("dlg").classList.add("hidden");
  step();
}

function findLabel(name){for(let i=0;i<flow.length;i++){if(flow[i][0]==="label"&&flow[i][1]===name)return i+1;}return ptr;}

function step(){
  while(ptr<flow.length){
    const b=flow[ptr]; ptr++;
    switch(b[0]){
      case "n": return dlg("",b[1]);
      case "d": return dlg(b[1],b[2]);
      case "note": return noteShow(b[1]);
      case "wait": return void(setTimeout(step,b[1]));
      case "set": S.flags[b[1]]=true; save(); continue;
      case "unset": S.flags[b[1]]=false; save(); continue;
      case "letters": addLetters(b[1],b[2]); continue;
      case "good": S.goodCount++; save(); continue;
      case "ach": ach(b[1]); continue;
      case "achcond": if(evalCond(b[2]))ach(b[1]); continue;
      case "gray": S.gray=b[1]; save(); applyGray(); continue;
      case "grayview": $("stage").classList.toggle("gray",!!b[1]); continue;
      case "warmflash": $("stage").classList.remove("gray");$("stage").classList.add("warmflash"); continue;
      case "bgset": bgArg=b[1]; renderBG(scene.bg,bgArg); continue;
      case "chstart": S._chStart=S.letters; save(); continue;
      case "hot": pendingHots.push({id:b[1].id,x:b[1].x,y:b[1].y,w:b[1].w,h:b[1].h,label:b[1].label,mode:b[1].mode||"decide",cond:b[1].cond,beats:b[2],used:false}); continue;
      case "clearhots": pendingHots=[]; $("hots").innerHTML=""; continue;
      case "choice": pendingChoice=b[1]; continue;
      case "pause": return doPause(b[1]);
      case "repause": return doPause();
      case "label": continue;
      case "jump": ptr=findLabel(b[1]); continue;
      case "if": flow.splice(ptr,0,...(S.flags[b[1]]?b[2]:b[3]||[])); continue;
      case "compute_ruyi": S.flags._ruyi_ready=(S.letters>=TOTAL&&!!S.flags.biezou); S.flags._outsider=(S.goodCount===0); save(); continue;
      case "scene": return startScene(b[1]);
      case "settle": return settle(b[1],b[2],b[3],b[4]);
      case "hub": return toHub();
      case "endtitle": return endTitle();
    }
  }
  toHub();
}

/* ---------- 对话 ---------- */
function dlg(who,text){
  $("dlg").classList.remove("hidden");
  $("dlg-who").textContent=who||"";
  const el=$("dlg-text"); el.textContent=""; fullText=text; typing=true;
  let i=0; clearInterval(typeTimer);
  typeTimer=setInterval(()=>{ i++; el.textContent=text.slice(0,i); if(i>=text.length){typing=false;clearInterval(typeTimer);} },26);
}
$("dlg").addEventListener("click",()=>{ if(paused)return; if(!$("choices").classList.contains("hidden"))return;
  if(typing){clearInterval(typeTimer);$("dlg-text").textContent=fullText;typing=false;return;}
  $("dlg").classList.add("hidden"); step();
});

function noteShow(t){$("note-text").textContent=t;$("note-overlay").classList.remove("hidden");}
$("note-overlay").addEventListener("click",()=>{$("note-overlay").classList.add("hidden");step();});

/* ---------- 暂停：选项 + 热点 ---------- */
function clearInteractive(){paused=false;pendingHots=[];pendingChoice=null;$("hots").innerHTML="";$("choices").innerHTML="";$("choices").classList.add("hidden");if(pauseTimer){clearTimeout(pauseTimer);pauseTimer=null;}}

function doPause(opts){
  renderHots(); renderChoices();
  const hasHot=$("hots").children.length>0, hasChoice=!!pendingChoice;
  if(opts&&opts.timeout){
    paused=true;
    pauseTimer=setTimeout(()=>{ const beats=opts.beats||[]; clearInteractive(); flow.splice(ptr,0,...beats); step(); },opts.timeout);
    return;
  }
  if(!hasHot&&!hasChoice){ paused=false; step(); return; }
  paused=true;
}
function renderHots(){
  const box=$("hots"); box.innerHTML="";
  pendingHots.forEach(h=>{
    if(h.used)return; if(h.cond&&!evalCond(h.cond))return;
    const d=document.createElement("div"); d.className="hot";
    d.style.left=(h.x/800*100)+"%"; d.style.top=(h.y/450*100)+"%";
    d.style.width=Math.max(h.w/800*100,4)+"%"; d.style.height=Math.max(h.h/450*100,8)+"%";
    if(h.label)d.title=h.label;
    d.addEventListener("click",ev=>{ev.stopPropagation();hotAct(h);});
    box.appendChild(d);
  });
}
function renderChoices(){
  const box=$("choices"); box.innerHTML="";
  if(!pendingChoice){box.classList.add("hidden");return;}
  pendingChoice.forEach(op=>{
    const b=document.createElement("button"); b.textContent=op[0];
    b.addEventListener("click",ev=>{ev.stopPropagation();const beats=op[1];clearInteractive();flow.splice(ptr,0,...beats);step();});
    box.appendChild(b);
  });
  box.classList.remove("hidden");
}
function hotAct(h){
  h.used=true;
  if(h.mode==="aux"){ paused=false; renderHots(); flow.splice(ptr,0,...h.beats,["repause"]); step(); return; }
  clearInteractive(); flow.splice(ptr,0,...h.beats); step();
}

/* ---------- 结算 ---------- */
let settleNext=null;
function settle(chId,title,desc,warmFlag){
  S.done[chId]=true; save();
  const warm=warmFlag?!!S.flags[warmFlag]:false;
  const gained=S.letters-(S._chStart||0);
  $("settle-art").innerHTML=ART.svg.settle(title,warm);
  $("settle-title").textContent="《"+title+"》";
  $("settle-desc").textContent=desc||"";
  $("settle-letters").textContent="本章拾取信碎片 ×"+gained+"（总计 "+S.letters+"/"+TOTAL+"）";
  settleNext=null; show("scr-settle");
}
$("btn-settle-ok").addEventListener("click",()=>{ if(ptr<flow.length){ show("scr-stage"); renderBG(scene.bg,bgArg); step(); } else toHub(); });

/* ---------- 画室枢纽 ---------- */
function paintFrames(){
  $("fa-1").innerHTML=ART.svg.booth();
  $("fa-2").innerHTML=ART.svg.desk();
  $("fa-3").innerHTML=ART.svg.anniv();
  $("fa-4").innerHTML=ART.svg.gallery(false);
  $("hub-letters").textContent="信："+S.letters+" / "+TOTAL;
  const f4=$("fr-4");
  if(S.done.c4){ f4.classList.remove("locked"); f4.querySelector("span").innerHTML="尾声<br>画外"; }
  else{ f4.classList.add("locked"); f4.querySelector("span").innerHTML="？？？<br>（还没画完）"; }
}
function toHub(){ paintFrames(); show("scr-hub"); if(!S.flags._hubSeen){ S.flags._hubSeen=true; save(); noteShow("还没画完。\n\n——我画了半辈子别人。最熟的这四个人，我一张都画不像。"); } }
$("fr-1").addEventListener("click",()=>{S._chStart=S.letters;startScene("c1s1");});
$("fr-2").addEventListener("click",()=>{S._chStart=S.letters;startScene("c2s1");});
$("fr-3").addEventListener("click",()=>{S._chStart=S.letters;startScene("c3s1");});
$("fr-4").addEventListener("click",()=>{ if(!S.done.c4){toast("还没画完。");return;} S._chStart=S.letters; startScene("e1"); });

/* 序章速写本（信碎片 +2） */
(function(){ const hub=$("scr-hub"); const d=document.createElement("div"); d.className="hot"; d.style.cssText="right:6%;bottom:12%;width:60px;height:60px;position:absolute"; d.title="速写本"; hub.appendChild(d);
 d.addEventListener("click",()=>{ if(S.letterKeys.prologue){toast("（速写本上全是那四个人的草稿。）");return;} addLetters(2,"prologue"); toast("（速写本的夹层里，有一页写满了同一个名字。）"); }); })();

/* ---------- 画廊 ---------- */
function renderGallery(){
  const g=$("gallery-grid"); g.innerHTML="";
  const keys=Object.keys(S.letterKeys);
  for(let i=0;i<TOTAL;i++){ const c=document.createElement("div"); c.className="gcell"+(i<S.letters?" got":""); c.textContent=i<S.letters?"✉":(i+1); g.appendChild(c); }
  const sp=$("gallery-ruyi");
  if(S.flags.ruyi){ sp.classList.add("unlocked"); sp.textContent="《如果》——雨停之后。他替他们，把这辈子过完了。"; }
  else{ sp.classList.remove("unlocked"); sp.textContent="《如果》——一方空画布（集齐 46 封信，并喊出那句「别走」）"; }
}
$("btn-hub-gallery").addEventListener("click",()=>{renderGallery();show("scr-gallery");});
$("btn-gallery").addEventListener("click",()=>{renderGallery();show("scr-gallery");});
$("btn-gallery-back").addEventListener("click",()=>toHub());
$("btn-hub-title").addEventListener("click",()=>show("scr-title"));

/* ---------- 标题 / 结局 ---------- */
function refreshTitle(){ $("btn-continue").style.display=(load()?"":"none"); const ta=$("title-art"); ta.innerHTML=""; const img=new Image(); img.src="assets/cover.png"; img.onerror=()=>{ta.innerHTML=ART.svg.cover();}; img.onload=()=>{ta.innerHTML="";ta.appendChild(img);}; }
$("btn-start").addEventListener("click",()=>{ S=defaultSave(); save(); show("scr-note"); });
$("btn-note-ok").addEventListener("click",()=>toHub());
$("btn-continue").addEventListener("click",()=>{ S=load()||defaultSave(); toHub(); });
function endTitle(){ show("scr-title"); refreshTitle(); }

S=load()||defaultSave();
refreshTitle();
})();









