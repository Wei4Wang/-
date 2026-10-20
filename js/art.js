/* 《画外》美术库：程序化 SVG 简笔画场景（拣爱式蓝灰基调 + 角色代表色） */
(function(){
const W=800,H=450;
function person(x,y,c,o){o=o||{};const s=o.s||1,flip=o.flip?-1:1,hh=34*s;
 let e='<g transform="translate('+x+','+y+') scale('+(flip*s)+','+s+')">';
 e+='<ellipse cx="0" cy="2" rx="26" ry="6" fill="rgba(0,0,0,.12)"/>';
 e+='<path d="M-16 0 Q-20 -34 -12 -52 L12 -52 Q20 -34 16 0 Z" fill="'+c+'" stroke="#2b3242" stroke-width="2.5"/>';
 e+='<circle cx="0" cy="-66" r="15" fill="#f6e3cd" stroke="#2b3242" stroke-width="2.5"/>';
 if(o.hair==="long"){e+='<path d="M-14 -72 Q0 -88 14 -72 L14 -56 Q8 -66 0 -66 Q-8 -66 -14 -56 Z" fill="#3a3348" stroke="#2b3242" stroke-width="2"/>';}
 else{e+='<path d="M-14 -70 Q0 -86 14 -70 Q8 -74 0 -74 Q-8 -74 -14 -70 Z" fill="#3a3348" stroke="#2b3242" stroke-width="2"/>';}
 e+='<circle cx="-5" cy="-66" r="1.6" fill="#2b3242"/><circle cx="5" cy="-66" r="1.6" fill="#2b3242"/>';
 if(o.smile){e+='<path d="M-4 -60 Q0 -56 4 -60" fill="none" stroke="#2b3242" stroke-width="1.8" stroke-linecap="round"/>';}
 else if(o.sad){e+='<path d="M-4 -57 Q0 -61 4 -57" fill="none" stroke="#2b3242" stroke-width="1.8" stroke-linecap="round"/>';}
 e+='</g>';return e;}
function rain(n,col){let e='';for(let i=0;i<n;i++){const x=(i*53)%W,y=(i*97)%H;e+='<line x1="'+x+'" y1="'+y+'" x2="'+(x-9)+'" y2="'+(y+26)+'" stroke="'+(col||'#9fb4d8')+'" stroke-width="1.6" opacity=".55"/>';}return e;}
function stars(n){let e='';for(let i=0;i<n;i++){const x=(i*137)%W,y=(i*61)%180;e+='<circle cx="'+x+'" cy="'+y+'" r="1.4" fill="#fff" opacity=".8"/>';}return e;}
function frame(x,y,w,h,inner){return '<g><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="#6b5636" stroke="#2b3242" stroke-width="2"/><rect x="'+(x+8)+'" y="'+(y+8)+'" width="'+(w-16)+'" height="'+(h-16)+'" fill="#fdfbf5" stroke="#2b3242" stroke-width="1.5"/>'+inner+'</g>';}
function svg(inner,bg){return '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="'+W+'" height="'+H+'" fill="'+bg+'"/>'+inner+'</svg>';}

const BLUE="#5b8dd9",PINK="#f2a0b5",ORANGE="#f2b25c",PURPLE="#9a8fc9";
const LIB={};

/* 序章画室 / 标题画 */
LIB.cover=function(){let i='<rect y="330" width="800" height="120" fill="#d8d2c2"/>';
 i+=frame(80,70,150,190,'<path d="M120 200 q30 -60 55 -20" stroke="#5b8dd9" fill="none" stroke-width="6"/><rect x="95" y="190" width="70" height="40" fill="#5b8dd9" opacity=".5"/>');
 i+=frame(280,70,150,190,'<rect x="320" y="120" width="70" height="90" fill="#f2b25c" opacity=".6"/><text x="355" y="170" font-size="16" text-anchor="middle" fill="#2b3242">L</text>');
 i+=frame(480,70,150,190,'');
 i+=frame(660,60,110,200,'<rect x="668" y="68" width="94" height="184" fill="#efe9db"/><path d="M668 68 l94 184 M762 68 l-94 184" stroke="#d8d2c2" stroke-width="3"/>');
 i+=person(560,420,PURPLE,{hair:"long"});
 i+='<rect x="610" y="230" width="16" height="190" fill="#6b5636"/><rect x="585" y="215" width="66" height="20" fill="#6b5636"/>';
 return svg(i,"#2a2430");};

/* 招新·百团大战 */
LIB.booth=function(){let i='<rect y="300" width="800" height="150" fill="#b8c4b0"/><rect y="0" width="800" height="300" fill="#cfe0ee"/>';
 i+='<circle cx="700" cy="60" r="34" fill="#f6e3a0" stroke="#2b3242" stroke-width="2"/>';
 i+='<rect x="60" y="180" width="220" height="14" fill="#6b5636" stroke="#2b3242"/><rect x="70" y="194" width="10" height="90" fill="#6b5636"/><rect x="260" y="194" width="10" height="90" fill="#6b5636"/>';
 i+='<rect x="80" y="130" width="180" height="50" fill="#fdfbf5" stroke="#2b3242" stroke-width="2.5"/><text x="170" y="162" font-size="26" text-anchor="middle" fill="#2b3242" font-weight="bold">记者团 · 招新</text>';
 i+='<rect x="420" y="180" width="180" height="14" fill="#8a6f45" stroke="#2b3242"/><rect x="430" y="194" width="10" height="90" fill="#8a6f45"/><rect x="580" y="194" width="10" height="90" fill="#8a6f45"/>';
 i+='<rect x="440" y="140" width="140" height="40" fill="#f2a0b5" opacity=".35" stroke="#2b3242" stroke-width="2"/><text x="510" y="166" font-size="18" text-anchor="middle" fill="#2b3242">吉他社</text>';
 for(let k=0;k<5;k++){i+='<rect x="'+(95+k*32)+'" y="'+(168+(k%2)*4)+'" width="26" height="10" fill="'+(k%2?"#5b8dd9":"#f2a0b5")+'" stroke="#2b3242" stroke-width="1.5" transform="rotate('+(k*7-14)+' '+(108+k*32)+' 173)"/>';}
 i+=person(330,360,PINK,{hair:"long",smile:true});
 i+=person(400,392,BLUE,{});
 return svg(i,"#cfe0ee");};

/* 阶梯教室 */
LIB.classroom=function(){let i='<rect y="0" width="800" height="450" fill="#e6dfd0"/><rect y="340" width="800" height="110" fill="#c9bfa8"/>';
 i+='<rect x="560" y="40" width="190" height="160" fill="#bcd6ea" stroke="#2b3242" stroke-width="3"/><line x1="655" y1="40" x2="655" y2="200" stroke="#2b3242" stroke-width="3"/>';
 i+='<rect x="560" y="40" width="60" height="160" fill="#f2a0b5" opacity=".45" stroke="#2b3242" stroke-width="2"/>';
 i+='<polygon points="560,200 750,200 620,340 430,340" fill="#f6e3a0" opacity=".35"/>';
 i+='<rect x="40" y="60" width="360" height="140" rx="6" fill="#3f5a44" stroke="#2b3242" stroke-width="3"/><rect x="40" y="200" width="360" height="12" fill="#6b5636"/>';
 for(let r=0;r<3;r++){for(let c=0;c<5;c++){const x=90+c*130,y=260+r*56;i+='<rect x="'+x+'" y="'+y+'" width="90" height="10" fill="#8a6f45" stroke="#2b3242" stroke-width="1.5"/><rect x="'+(x+8)+'" y="'+(y+10)+'" width="8" height="30" fill="#8a6f45"/><rect x="'+(x+74)+'" y="'+(y+10)+'" width="8" height="30" fill="#8a6f45"/>';}}
 i+=person(300,300,PINK,{hair:"long",s:.9});
 i+=person(420,356,BLUE,{});
 return svg(i,"#e6dfd0");};

/* 雨夜楼门 */
LIB.rainnight=function(){let i='<rect width="800" height="450" fill="#26324a"/><rect y="380" width="800" height="70" fill="#1a2234"/>';
 i+=stars(20);i+='<circle cx="120" cy="70" r="30" fill="#f6e9c0" stroke="#2b3242" stroke-width="2" opacity=".95"/>';
 i+='<rect x="240" y="90" width="330" height="290" fill="#3d4b66" stroke="#2b3242" stroke-width="3"/><rect x="300" y="160" width="210" height="220" fill="#f6e3a0" opacity=".28" stroke="#2b3242" stroke-width="2.5"/>';
 i+='<rect x="300" y="160" width="210" height="220" fill="none" stroke="#2b3242" stroke-width="2.5"/><line x1="405" y1="160" x2="405" y2="380" stroke="#2b3242" stroke-width="2.5"/>';
 i+=rain(60);
 i+=person(360,372,PINK,{hair:"long"});
 i+=person(600,398,BLUE,{});
 i+='<path d="M600 348 q0 -26 26 -26 q26 0 26 26 z" fill="#5b8dd9" stroke="#2b3242" stroke-width="2.5"/><line x1="626" y1="348" x2="626" y2="376" stroke="#2b3242" stroke-width="2.5"/>';
 return svg(i,"#26324a");};

/* 操场夜·告白 */
LIB.playground=function(){let i='<rect width="800" height="450" fill="#232c44"/><rect y="330" width="800" height="120" fill="#8c4f4f"/><ellipse cx="400" cy="390" rx="330" ry="60" fill="none" stroke="#e8ddc8" stroke-width="3" opacity=".6"/>';
 i+=stars(34);i+='<circle cx="660" cy="70" r="26" fill="#f6e9c0" opacity=".9"/>';
 i+='<rect x="90" y="150" width="14" height="180" fill="#3a4560"/><circle cx="97" cy="140" r="20" fill="#f6e3a0" opacity=".9"/><circle cx="97" cy="140" r="44" fill="#f6e3a0" opacity=".14"/>';
 i+=person(360,368,BLUE,{});i+=person(430,362,PINK,{hair:"long",smile:true});
 i+='<circle cx="397" cy="322" r="7" fill="#f2b25c" stroke="#2b3242" stroke-width="2"/>';
 return svg(i,"#232c44");};

/* 高中教室 */
LIB.hsroom=function(){let i='<rect width="800" height="450" fill="#efe6d4"/><rect y="350" width="800" height="100" fill="#cbbfa4"/>';
 i+='<rect x="70" y="50" width="400" height="150" rx="6" fill="#3f5a44" stroke="#2b3242" stroke-width="3"/><text x="270" y="130" font-size="26" text-anchor="middle" fill="#e8ddc8">地理竞赛 · 保送</text>';
 i+='<rect x="580" y="40" width="170" height="140" fill="#bcd6ea" stroke="#2b3242" stroke-width="3"/>';
 i+='<rect x="230" y="250" width="240" height="14" fill="#8a6f45" stroke="#2b3242" stroke-width="2"/><rect x="246" y="264" width="10" height="70" fill="#8a6f45"/><rect x="444" y="264" width="10" height="70" fill="#8a6f45"/>';
 i+=person(290,330,ORANGE,{hair:"long"});i+=person(400,330,BLUE,{});
 i+='<rect x="316" y="222" width="12" height="56" fill="#f2a0b5" stroke="#2b3242" stroke-width="2" transform="rotate(6 322 250)"/>';
 i+='<rect x="150" y="230" width="26" height="8" rx="4" fill="#fdfbf5" stroke="#2b3242" stroke-width="2" transform="rotate(-24 163 234)"/>';
 i+=person(660,340,PURPLE,{});
 return svg(i,"#efe6d4");};

/* 深夜书桌（改信） */
LIB.desk=function(){let i='<rect width="800" height="450" fill="#2c3148"/><rect y="330" width="800" height="120" fill="#222739"/>';
 i+='<rect x="560" y="60" width="180" height="150" fill="#1a2033" stroke="#2b3242" stroke-width="3"/><circle cx="680" cy="110" r="18" fill="#f6e9c0"/>'+stars(14);
 i+='<rect x="120" y="250" width="400" height="16" fill="#8a6f45" stroke="#2b3242" stroke-width="2"/><rect x="140" y="266" width="12" height="80" fill="#8a6f45"/><rect x="490" y="266" width="12" height="80" fill="#8a6f45"/>';
 i+='<path d="M210 250 l30 -70 l8 4 l-24 66 z" fill="#3a4560"/><circle cx="244" cy="182" r="16" fill="#f6e3a0"/><circle cx="244" cy="182" r="40" fill="#f6e3a0" opacity=".15"/>';
 for(let k=0;k<4;k++){i+='<rect x="'+(290+k*8)+'" y="'+(238-k*6)+'" width="120" height="10" fill="#fdfbf5" stroke="#2b3242" stroke-width="1.2" transform="rotate('+(k*3-4)+' 350 243)"/>';}
 i+=person(430,300,ORANGE,{hair:"long",s:.95});
 return svg(i,"#2c3148");};

/* 咖啡馆 */
LIB.cafe=function(){let i='<rect width="800" height="450" fill="#e8ddcc"/><rect y="330" width="800" height="120" fill="#b8a88c"/>';
 i+='<rect x="60" y="60" width="200" height="160" fill="#bcd6ea" stroke="#2b3242" stroke-width="3"/><line x1="160" y1="60" x2="160" y2="220" stroke="#2b3242" stroke-width="3"/>';
 i+='<text x="620" y="120" font-size="30" fill="#8a6f45" font-style="italic">café</text>';
 i+='<ellipse cx="400" cy="300" rx="170" ry="26" fill="#8a6f45" stroke="#2b3242" stroke-width="2.5"/><rect x="390" y="306" width="20" height="60" fill="#8a6f45"/>';
 i+='<rect x="330" y="262" width="34" height="30" rx="4" fill="#fdfbf5" stroke="#2b3242" stroke-width="2"/><rect x="446" y="262" width="34" height="30" rx="4" fill="#7a4a3a" stroke="#2b3242" stroke-width="2"/>';
 i+='<rect x="478" y="238" width="60" height="46" rx="8" fill="#5b8dd9" opacity=".8" stroke="#2b3242" stroke-width="2"/>';
 i+=person(250,340,ORANGE,{hair:"long",sad:true});i+=person(560,340,BLUE,{});
 return svg(i,"#e8ddcc");};

/* 新书发布会 */
LIB.press=function(){let i='<rect width="800" height="450" fill="#4a4258"/><rect y="360" width="800" height="90" fill="#37314a"/>';
 i+='<rect x="180" y="60" width="440" height="150" fill="#fdfbf5" stroke="#2b3242" stroke-width="3"/><text x="400" y="120" font-size="30" text-anchor="middle" fill="#2b3242">新书发布会</text><text x="400" y="165" font-size="20" text-anchor="middle" fill="#b06a3a">—— 献给 L ——</text>';
 i+='<rect x="330" y="230" width="140" height="18" fill="#6b5636" stroke="#2b3242"/><rect x="345" y="248" width="10" height="60" fill="#6b5636"/><rect x="445" y="248" width="10" height="60" fill="#6b5636"/>';
 i+=person(400,300,ORANGE,{hair:"long",s:.95});
 for(let k=0;k<8;k++){i+='<circle cx="'+(80+k*95)+'" cy="400" r="16" fill="#2b3242" opacity=".8"/>';}
 i+=person(690,392,BLUE,{s:.9});
 return svg(i,"#4a4258");};

/* 日历·两地 */
LIB.calendar=function(){let i='<rect width="800" height="450" fill="#e6dfd0"/>';
 i+='<rect x="60" y="50" width="400" height="340" fill="#fdfbf5" stroke="#2b3242" stroke-width="3"/>';
 i+='<text x="260" y="90" font-size="22" text-anchor="middle" fill="#2b3242">六月 · 日历</text>';
 const wd=["一","二","三","四","五","六","日"];
 for(let c=0;c<7;c++){i+='<text x="'+(100+c*48)+'" y="118" font-size="14" text-anchor="middle" fill="#8d96ad">'+wd[c]+'</text>';}
 for(let r=0;r<4;r++){for(let c=0;c<7;c++){const x=84+c*48,y=128+r*60;i+='<rect x="'+x+'" y="'+y+'" width="40" height="48" fill="none" stroke="#c9c2b0" stroke-width="1.5"/><text x="'+(x+20)+'" y="'+(y+28)+'" font-size="14" text-anchor="middle" fill="#2b3242">'+(r*7+c+1)+'</text>';}}
 i+='<rect x="276" y="128" width="40" height="48" fill="#5b8dd9" opacity=".35"/><rect x="324" y="188" width="40" height="48" fill="#f2a0b5" opacity=".4"/><rect x="132" y="248" width="40" height="48" fill="#5b8dd9" opacity=".35"/><rect x="372" y="248" width="40" height="48" fill="#f2a0b5" opacity=".4"/>';
 i+='<rect x="520" y="50" width="230" height="340" fill="#d5e3d0" stroke="#2b3242" stroke-width="3"/>';
 i+='<path d="M560 330 Q640 260 600 190 T700 100" fill="none" stroke="#b06a3a" stroke-width="3" stroke-dasharray="8 6"/>';
 i+='<circle cx="575" cy="310" r="12" fill="#5b8dd9" stroke="#2b3242" stroke-width="2"/><circle cx="695" cy="105" r="12" fill="#f2a0b5" stroke="#2b3242" stroke-width="2"/>';
 i+='<text x="635" y="370" font-size="13" text-anchor="middle" fill="#5d6a86">两座城，一张对不上的日历</text>';
 return svg(i,"#e6dfd0");};

/* 求婚·操场 */
LIB.propose=function(){let i='<rect width="800" height="450" fill="#232c44"/><rect y="330" width="800" height="120" fill="#8c4f4f"/>';
 i+=stars(30);i+='<circle cx="140" cy="70" r="24" fill="#f6e9c0" opacity=".85"/>';
 i+='<rect x="700" y="150" width="14" height="180" fill="#3a4560"/><circle cx="707" cy="140" r="20" fill="#f6e3a0"/><circle cx="707" cy="140" r="46" fill="#f6e3a0" opacity=".12"/>';
 i+='<g transform="translate(370,380)"><path d="M0 0 L-6 -30 L6 -30 Z" fill="#5b8dd9" stroke="#2b3242" stroke-width="2.5"/><circle cx="0" cy="-44" r="13" fill="#f6e3cd" stroke="#2b3242" stroke-width="2.5"/></g>';
 i+='<rect x="330" y="332" width="26" height="18" rx="3" fill="#b03a4a" stroke="#2b3242" stroke-width="2"/><circle cx="343" cy="330" r="5" fill="#fdfbf5" stroke="#2b3242" stroke-width="1.6"/>';
 i+=person(450,372,PINK,{hair:"long",sad:true});
 return svg(i,"#232c44");};

/* 深夜楼下·误会 */
LIB.street=function(){let i='<rect width="800" height="450" fill="#20263a"/><rect y="370" width="800" height="80" fill="#161b2c"/>';
 i+='<rect x="80" y="80" width="260" height="290" fill="#2e3852" stroke="#101423" stroke-width="3"/>';
 for(let r=0;r<4;r++){for(let c=0;c<3;c++){const lit=(r*3+c)%3===0;i+='<rect x="'+(105+c*78)+'" y="'+(105+r*62)+'" width="46" height="40" fill="'+(lit?"#f6e3a0":"#1c2236")+'" opacity="'+(lit?".85":".9")+'" stroke="#101423" stroke-width="2"/>';}}
 i+='<rect x="420" y="340" width="360" height="8" fill="#3a4560"/><rect x="420" y="330" width="360" height="4" fill="#56627e"/>';
 i+='<rect x="500" y="230" width="12" height="140" fill="#3a4560"/><circle cx="506" cy="222" r="16" fill="#f6e3a0"/><circle cx="506" cy="222" r="38" fill="#f6e3a0" opacity=".12"/>';
 i+=person(430,392,BLUE,{s:.9});i+=person(478,396,ORANGE,{hair:"long",sad:true,s:.9});
 i+=person(700,384,PINK,{hair:"long",s:.9,flip:true});
 return svg(i,"#20263a");};

/* 校庆雨 */
LIB.anniv=function(){let i='<rect width="800" height="450" fill="#31405c"/><rect y="360" width="800" height="90" fill="#232c40"/>';
 i+='<path d="M240 360 L240 160 Q400 60 560 160 L560 360" fill="none" stroke="#e8ddc8" stroke-width="10"/>';
 i+='<rect x="300" y="150" width="200" height="46" fill="#8c4f4f" stroke="#2b3242" stroke-width="2.5"/><text x="400" y="181" font-size="22" text-anchor="middle" fill="#f2e9d8">校 庆</text>';
 i+=rain(50,"#8fa8cc");
 i+=person(360,382,BLUE,{});i+=person(450,378,PINK,{hair:"long"});
 i+='<path d="M405 332 q0 -22 22 -22 q22 0 22 22 z" fill="#5b8dd9" stroke="#2b3242" stroke-width="2.5"/>';
 return svg(i,"#31405c");};

/* 画室夜·电话 */
LIB.studio=function(){let i='<rect width="800" height="450" fill="#221d2c"/><rect y="340" width="800" height="110" fill="#1a1622"/>';
 i+=frame(90,60,170,220,'<path d="M130 220 q30 -70 60 -20" stroke="#5b8dd9" fill="none" stroke-width="7" opacity=".7"/>');
 i+=frame(320,60,170,220,'<text x="405" y="180" font-size="34" text-anchor="middle" fill="#9a8fc9">L</text>');
 i+=frame(550,60,170,220,'');
 i+='<rect x="300" y="300" width="200" height="14" fill="#6b5636"/><rect x="310" y="314" width="10" height="60" fill="#6b5636"/><rect x="480" y="314" width="10" height="60" fill="#6b5636"/>';
 i+='<rect x="380" y="278" width="46" height="24" rx="5" fill="#111" stroke="#2b3242" stroke-width="2"/><rect x="380" y="278" width="46" height="24" rx="5" fill="none" stroke="#f6e3a0" stroke-width="2" opacity=".8"><animate attributeName="opacity" values=".9;.1;.9" dur="1s" repeatCount="indefinite"/></rect>';
 i+=person(620,392,PURPLE,{hair:"long"});
 return svg(i,"#221d2c");};

/* 遗物 */
LIB.relics=function(){let i='<rect width="800" height="450" fill="#3a3f52"/><rect y="350" width="800" height="100" fill="#2c3040"/>';
 i+='<rect x="90" y="120" width="620" height="240" fill="#8a6f45" stroke="#2b3242" stroke-width="3"/><rect x="90" y="120" width="620" height="24" fill="#6b5636"/>';
 i+='<rect x="130" y="180" width="110" height="150" fill="#5b8dd9" opacity=".55" stroke="#2b3242" stroke-width="2"/><text x="185" y="260" font-size="13" text-anchor="middle" fill="#fdfbf5">野外记录本</text>';
 i+='<rect x="270" y="200" width="140" height="100" fill="#7fae7a" opacity=".6" stroke="#2b3242" stroke-width="2"/><text x="340" y="255" font-size="13" text-anchor="middle" fill="#fdfbf5">遥感影像图</text>';
 i+='<rect x="440" y="230" width="54" height="40" rx="4" fill="#b03a4a" stroke="#2b3242" stroke-width="2"/><circle cx="467" cy="228" r="6" fill="#fdfbf5" stroke="#2b3242" stroke-width="1.6"/>';
 for(let k=0;k<3;k++){i+='<rect x="'+(530+k*6)+'" y="'+(250-k*8)+'" width="130" height="12" fill="#fdfbf5" stroke="#2b3242" stroke-width="1.2"/>';}
 i+=person(720,392,PURPLE,{hair:"long",sad:true,s:.95});
 return svg(i,"#3a3f52");};

/* 冬·咖啡馆（小陈最后的手稿） */
LIB.cafewinter=function(){let i='<rect width="800" height="450" fill="#dfe3ea"/><rect y="330" width="800" height="120" fill="#a9a89e"/>';
 i+='<rect x="60" y="60" width="200" height="160" fill="#aebfd4" stroke="#2b3242" stroke-width="3"/><line x1="160" y1="60" x2="160" y2="220" stroke="#2b3242" stroke-width="3"/>';
 for(let k=0;k<12;k++){i+='<circle cx="'+(70+(k*53)%180)+'" cy="'+(70+(k*37)%140)+'" r="2" fill="#fff"/>';}
 i+='<ellipse cx="400" cy="300" rx="170" ry="26" fill="#8a6f45" stroke="#2b3242" stroke-width="2.5"/><rect x="390" y="306" width="20" height="60" fill="#8a6f45"/>';
 i+='<rect x="330" y="240" width="130" height="50" fill="#fdfbf5" stroke="#2b3242" stroke-width="2"/><text x="395" y="270" font-size="15" text-anchor="middle" fill="#2b3242">拾光者</text>';
 i+=person(250,340,ORANGE,{hair:"long",sad:true});i+=person(560,340,PURPLE,{hair:"long"});
 return svg(i,"#dfe3ea");};

/* 墓园 */
LIB.cemetery=function(){let i='<rect width="800" height="450" fill="#8d99ad"/><rect y="330" width="800" height="120" fill="#5f6d63"/>';
 i+='<ellipse cx="150" cy="120" rx="90" ry="40" fill="#77839a" opacity=".5"/><ellipse cx="620" cy="90" rx="110" ry="46" fill="#77839a" opacity=".4"/>';
 i+='<rect x="300" y="230" width="70" height="110" rx="8" fill="#cfd2d8" stroke="#2b3242" stroke-width="3"/><rect x="420" y="230" width="70" height="110" rx="8" fill="#cfd2d8" stroke="#2b3242" stroke-width="3"/>';
 i+='<circle cx="335" cy="352" r="12" fill="#f2a0b5" stroke="#2b3242" stroke-width="2"/><circle cx="455" cy="352" r="12" fill="#f2b25c" stroke="#2b3242" stroke-width="2"/>';
 i+=person(560,382,PINK,{hair:"long",sad:true});
 i+=rain(26,"#aab6cc");
 return svg(i,"#8d99ad");};

/* 画展·尾声 */
LIB.gallery=function(old){let i='<rect width="800" height="450" fill="#e9e4da"/><rect y="360" width="800" height="90" fill="#cfc6b4"/>';
 i+=frame(60,70,150,190,'<path d="M100 210 q30 -60 55 -20" stroke="#5b8dd9" fill="none" stroke-width="6"/>');
 i+=frame(250,70,150,190,'<text x="325" y="175" font-size="26" text-anchor="middle" fill="#b06a3a">L</text>');
 i+=frame(440,70,150,190,'<path d="M480 210 q30 -60 55 -20" stroke="#5b8dd9" fill="none" stroke-width="6" opacity=".5"/>'+rain(10,"#5b8dd9"));
 i+=frame(630,70,150,190,'<rect x="646" y="86" width="118" height="158" fill="'+(old?"#fdfbf5":"#efe9db")+'"/>'+(old?'<path d="M660 200 q20 -40 40 -14 q20 -40 40 -10" stroke="#f2a0b5" fill="none" stroke-width="4"/>':'<path d="M646 86 l118 158 M764 86 l-118 158" stroke="#d8d2c2" stroke-width="3"/>'));
 i+=person(180,392,PINK,{hair:"long",s:.9});i+=person(620,392,PURPLE,{hair:"long",s:.9});
 return svg(i,"#e9e4da");};

/* 结算插画卡 */
LIB.settle=function(title,warm){
 const bg=warm?"#f6ecd8":"#3b3550";
 let i='<rect width="800" height="450" fill="'+bg+'"/>';
 if(warm){i+='<circle cx="620" cy="100" r="50" fill="#f6c66b"/><path d="M180 300 q60 -120 120 -30" stroke="#5b8dd9" fill="none" stroke-width="10"/><path d="M330 300 q60 -120 120 -30" stroke="#f2a0b5" fill="none" stroke-width="10"/>';}
 else{i+=rain(36,"#5d6a86");i+='<path d="M300 320 q0 -60 50 -60 q50 0 50 60 z" fill="#5b8dd9" opacity=".45" stroke="#2b3242" stroke-width="3"/><line x1="350" y1="320" x2="350" y2="380" stroke="#2b3242" stroke-width="3"/>';}
 i+='<text x="400" y="420" font-size="26" text-anchor="middle" fill="'+(warm?"#6b5636":"#cbbf9f")+'" letter-spacing="6">'+title+'</text>';
 return svg(i,bg);};

window.ART={svg:LIB,person:person,BLUE:BLUE,PINK:PINK,ORANGE:ORANGE,PURPLE:PURPLE};
})();
