"use strict";(self.webpackChunkpdsq_frontend=self.webpackChunkpdsq_frontend||[]).push([[1],{29001:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var a=n(57689),c=n(72791),l=n(60173),r=n(78823),o=n(33805),s=n(48080),i=n(83990),d=n(78302),u=n(14520),p=n(36473),f=n(2556),g=n(50284),m=n(80184);const{Content:v}=i.default,{Title:h}=d.default;function x(){const{userName:e}=(0,a.UO)(),[t,n]=(0,c.useReducer)(((e,t)=>({...e,...t})),{user:null,loading:!0,automations:[]}),{user:d,loading:x,automations:y}=t;return(0,c.useEffect)((()=>{s.XY.getAutomationsByUserName(e).then((e=>{let{user:t,automations:a}=e;return n({user:t,automations:a})})).catch((e=>{var t,n;return console.error((null===e||void 0===e||null===(t=e.response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.error)||"Error fetching automations")})).finally((()=>n({loading:!1})))}),[e]),x?(0,m.jsx)(g.Z,{}):(0,m.jsx)(i.default,{className:"h-100",children:(0,m.jsxs)(v,{className:"p-4 bg-white",children:[(0,m.jsxs)(h,{level:2,className:"mt-0",children:["Automations for ",null===d||void 0===d?void 0:d.firstName," ",null===d||void 0===d?void 0:d.lastName]}),(0,m.jsx)(u.Z,{gap:28,wrap:"wrap",children:y.map(((e,t)=>{let{_id:n,uniqueId:a,socialShareFileSrc:c,presentationName:s}=e;return(0,m.jsx)(p.Z,{hoverable:!0,title:s||"Automation ".concat(t+1),styles:{body:{padding:0}},style:{width:l.tq?"100%":"calc(33% - 15.5px)"},actions:[(0,m.jsx)(f.ZP,{type:"link",target:"_blank",icon:(0,m.jsx)(r.Z,{}),href:"/vote/".concat(null===d||void 0===d?void 0:d.userName,"/").concat(a),children:"Voting Page"},"vote"),(0,m.jsx)(f.ZP,{type:"link",target:"_blank",icon:(0,m.jsx)(r.Z,{}),href:"/guest-acceptance/".concat(null===d||void 0===d?void 0:d.userName,"/").concat(a),children:"Guest Acceptance"},"ga")],children:(0,m.jsx)("div",{className:"m-5px br-4px h-180px bg-EEF2F6",children:(0,m.jsx)("video",{controls:!0,src:(0,o.fE)(c),style:{width:"100%",height:"auto"}})})},n)}))})]})})}},78823:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(87462),c=n(72791);const l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"}}]},name:"link",theme:"outlined"};var r=n(8711),o=function(e,t){return c.createElement(r.Z,(0,a.Z)({},e,{ref:t,icon:l}))};const s=c.forwardRef(o)},14520:(e,t,n)=>{n.d(t,{Z:()=>N});var a=n(72791),c=n(41418),l=n.n(c),r=n(41818),o=n(16384),s=n(71929),i=n(96562),d=n(89922);const u=["wrap","nowrap","wrap-reverse"],p=["flex-start","flex-end","start","end","center","space-between","space-around","space-evenly","stretch","normal","left","right"],f=["center","start","end","flex-start","flex-end","self-start","self-end","baseline","normal","stretch"];const g=function(e,t){return l()(Object.assign(Object.assign(Object.assign({},((e,t)=>{const n={};return u.forEach((a=>{n["".concat(e,"-wrap-").concat(a)]=t.wrap===a})),n})(e,t)),((e,t)=>{const n={};return f.forEach((a=>{n["".concat(e,"-align-").concat(a)]=t.align===a})),n["".concat(e,"-align-stretch")]=!t.align&&!!t.vertical,n})(e,t)),((e,t)=>{const n={};return p.forEach((a=>{n["".concat(e,"-justify-").concat(a)]=t.justify===a})),n})(e,t)))},m=e=>{const{componentCls:t}=e;return{[t]:{display:"flex","&-vertical":{flexDirection:"column"},"&-rtl":{direction:"rtl"},"&:empty":{display:"none"}}}},v=e=>{const{componentCls:t}=e;return{[t]:{"&-gap-small":{gap:e.flexGapSM},"&-gap-middle":{gap:e.flexGap},"&-gap-large":{gap:e.flexGapLG}}}},h=e=>{const{componentCls:t}=e,n={};return u.forEach((e=>{n["".concat(t,"-wrap-").concat(e)]={flexWrap:e}})),n},x=e=>{const{componentCls:t}=e,n={};return f.forEach((e=>{n["".concat(t,"-align-").concat(e)]={alignItems:e}})),n},y=e=>{const{componentCls:t}=e,n={};return p.forEach((e=>{n["".concat(t,"-justify-").concat(e)]={justifyContent:e}})),n},j=(0,i.I$)("Flex",(e=>{const{paddingXS:t,padding:n,paddingLG:a}=e,c=(0,d.TS)(e,{flexGapSM:t,flexGap:n,flexGapLG:a});return[m(c),v(c),h(c),x(c),y(c)]}),(()=>({})),{resetStyle:!1});var b=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n};const w=a.forwardRef(((e,t)=>{const{prefixCls:n,rootClassName:c,className:i,style:d,flex:u,gap:p,children:f,vertical:m=!1,component:v="div"}=e,h=b(e,["prefixCls","rootClassName","className","style","flex","gap","children","vertical","component"]),{flex:x,direction:y,getPrefixCls:w}=a.useContext(s.E_),N=w("flex",n),[O,C,E]=j(N),Z=null!==m&&void 0!==m?m:null===x||void 0===x?void 0:x.vertical,G=l()(i,c,null===x||void 0===x?void 0:x.className,N,C,E,g(N,e),{["".concat(N,"-rtl")]:"rtl"===y,["".concat(N,"-gap-").concat(p)]:(0,o.n)(p),["".concat(N,"-vertical")]:Z}),k=Object.assign(Object.assign({},null===x||void 0===x?void 0:x.style),d);return u&&(k.flex=u),p&&!(0,o.n)(p)&&(k.gap=p),O(a.createElement(v,Object.assign({ref:t,className:G,style:k},(0,r.Z)(h,["justify","wrap","align"])),f))}));const N=w}}]);
//# sourceMappingURL=1.11608203.chunk.js.map