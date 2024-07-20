"use strict";(self.webpackChunkpdsq_frontend=self.webpackChunkpdsq_frontend||[]).push([[197],{79197:(e,t,n)=>{n.r(t),n.d(t,{default:()=>q});var o=n(57689),a=n(72791),c=n(60173),l=n(78823),r=n(33805),i=n(48080),s=n(83990),d=n(41418),m=n.n(d),p=n(70635),u=n(71929),f=n(84107),b=n(52832);const g={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1},y=a.createContext({});var v=n(85501),h=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};function x(e,t,n){const o=a.useMemo((()=>{return t||(e=n,(0,v.Z)(e).map((e=>Object.assign(Object.assign({},null===e||void 0===e?void 0:e.props),{key:e.key}))));var e}),[t,n]);return a.useMemo((()=>o.map((t=>{var{span:n}=t,o=h(t,["span"]);return Object.assign(Object.assign({},o),{span:"number"===typeof n?n:(0,p.m9)(e,n)})}))),[o,e])}function j(e,t,n){let o=e,a=!1;return(void 0===n||n>t)&&(o=Object.assign(Object.assign({},e),{span:t}),a=void 0!==n),[o,a]}const O=(e,t)=>{const[n,o]=(0,a.useMemo)((()=>function(e,t){const n=[];let o=[],a=t,c=!1;return e.filter((e=>e)).forEach(((l,r)=>{const i=null===l||void 0===l?void 0:l.span,s=i||1;if(r===e.length-1){const[e,t]=j(l,a,i);return c=c||t,o.push(e),void n.push(o)}if(s<a)a-=s,o.push(l);else{const[e,r]=j(l,a,s);c=c||r,o.push(e),n.push(o),a=t,o=[]}})),[n,c]}(t,e)),[t,e]);return n},S=e=>{let{children:t}=e;return t};function w(e){return void 0!==e&&null!==e}const C=e=>{const{itemPrefixCls:t,component:n,span:o,className:c,style:l,labelStyle:r,contentStyle:i,bordered:s,label:d,content:p,colon:u,type:f}=e,b=n;return s?a.createElement(b,{className:m()({["".concat(t,"-item-label")]:"label"===f,["".concat(t,"-item-content")]:"content"===f},c),style:l,colSpan:o},w(d)&&a.createElement("span",{style:r},d),w(p)&&a.createElement("span",{style:i},p)):a.createElement(b,{className:m()("".concat(t,"-item"),c),style:l,colSpan:o},a.createElement("div",{className:"".concat(t,"-item-container")},(d||0===d)&&a.createElement("span",{className:m()("".concat(t,"-item-label"),{["".concat(t,"-item-no-colon")]:!u}),style:r},d),(p||0===p)&&a.createElement("span",{className:m()("".concat(t,"-item-content")),style:i},p)))};function E(e,t,n){let{colon:o,prefixCls:c,bordered:l}=t,{component:r,type:i,showLabel:s,showContent:d,labelStyle:m,contentStyle:p}=n;return e.map(((e,t)=>{let{label:n,children:u,prefixCls:f=c,className:b,style:g,labelStyle:y,contentStyle:v,span:h=1,key:x}=e;return"string"===typeof r?a.createElement(C,{key:"".concat(i,"-").concat(x||t),className:b,style:g,labelStyle:Object.assign(Object.assign({},m),y),contentStyle:Object.assign(Object.assign({},p),v),span:h,colon:o,component:r,itemPrefixCls:f,bordered:l,label:s?n:null,content:d?u:null,type:i}):[a.createElement(C,{key:"label-".concat(x||t),className:b,style:Object.assign(Object.assign(Object.assign({},m),g),y),span:1,colon:o,component:r[0],itemPrefixCls:f,bordered:l,label:n,type:"label"}),a.createElement(C,{key:"content-".concat(x||t),className:b,style:Object.assign(Object.assign(Object.assign({},p),g),v),span:2*h-1,component:r[1],itemPrefixCls:f,bordered:l,content:u,type:"content"})]}))}const N=e=>{const t=a.useContext(y),{prefixCls:n,vertical:o,row:c,index:l,bordered:r}=e;return o?a.createElement(a.Fragment,null,a.createElement("tr",{key:"label-".concat(l),className:"".concat(n,"-row")},E(c,e,Object.assign({component:"th",type:"label",showLabel:!0},t))),a.createElement("tr",{key:"content-".concat(l),className:"".concat(n,"-row")},E(c,e,Object.assign({component:"td",type:"content",showContent:!0},t)))):a.createElement("tr",{key:l,className:"".concat(n,"-row")},E(c,e,Object.assign({component:r?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},t)))};var k=n(55586),P=n(67521),L=n(96562),M=n(89922);const B=e=>{const{componentCls:t,labelBg:n}=e;return{["&".concat(t,"-bordered")]:{["> ".concat(t,"-view")]:{border:"".concat((0,k.bf)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit),"> table":{tableLayout:"auto",borderCollapse:"collapse"},["".concat(t,"-row")]:{borderBottom:"".concat((0,k.bf)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderBottom:"none"},["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat((0,k.bf)(e.padding)," ").concat((0,k.bf)(e.paddingLG)),borderInlineEnd:"".concat((0,k.bf)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderInlineEnd:"none"}},["> ".concat(t,"-item-label")]:{color:e.colorTextSecondary,backgroundColor:n,"&::after":{display:"none"}}}},["&".concat(t,"-middle")]:{["".concat(t,"-row")]:{["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat((0,k.bf)(e.paddingSM)," ").concat((0,k.bf)(e.paddingLG))}}},["&".concat(t,"-small")]:{["".concat(t,"-row")]:{["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat((0,k.bf)(e.paddingXS)," ").concat((0,k.bf)(e.padding))}}}}}},I=(0,L.I$)("Descriptions",(e=>(e=>{const{componentCls:t,extraColor:n,itemPaddingBottom:o,colonMarginRight:a,colonMarginLeft:c,titleMarginBottom:l}=e;return{[t]:Object.assign(Object.assign(Object.assign({},(0,P.Wf)(e)),B(e)),{"&-rtl":{direction:"rtl"},["".concat(t,"-header")]:{display:"flex",alignItems:"center",marginBottom:l},["".concat(t,"-title")]:Object.assign(Object.assign({},P.vS),{flex:"auto",color:e.titleColor,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG}),["".concat(t,"-extra")]:{marginInlineStart:"auto",color:n,fontSize:e.fontSize},["".concat(t,"-view")]:{width:"100%",borderRadius:e.borderRadiusLG,table:{width:"100%",tableLayout:"fixed"}},["".concat(t,"-row")]:{"> th, > td":{paddingBottom:o},"&:last-child":{borderBottom:"none"}},["".concat(t,"-item-label")]:{color:e.colorTextTertiary,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"start","&::after":{content:'":"',position:"relative",top:-.5,marginInline:"".concat((0,k.bf)(c)," ").concat((0,k.bf)(a))},["&".concat(t,"-item-no-colon::after")]:{content:'""'}},["".concat(t,"-item-no-label")]:{"&::after":{margin:0,content:'""'}},["".concat(t,"-item-content")]:{display:"table-cell",flex:1,color:e.contentColor,fontSize:e.fontSize,lineHeight:e.lineHeight,wordBreak:"break-word",overflowWrap:"break-word"},["".concat(t,"-item")]:{paddingBottom:0,verticalAlign:"top","&-container":{display:"flex",["".concat(t,"-item-label")]:{display:"inline-flex",alignItems:"baseline"},["".concat(t,"-item-content")]:{display:"inline-flex",alignItems:"baseline"}}},"&-middle":{["".concat(t,"-row")]:{"> th, > td":{paddingBottom:e.paddingSM}}},"&-small":{["".concat(t,"-row")]:{"> th, > td":{paddingBottom:e.paddingXS}}}})}})((0,M.TS)(e,{}))),(e=>({labelBg:e.colorFillAlter,titleColor:e.colorText,titleMarginBottom:e.fontSizeSM*e.lineHeightSM,itemPaddingBottom:e.padding,colonMarginRight:e.marginXS,colonMarginLeft:e.marginXXS/2,contentColor:e.colorText,extraColor:e.colorText})));var Z=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};const G=e=>{const{prefixCls:t,title:n,extra:o,column:c,colon:l=!0,bordered:r,layout:i,children:s,className:d,rootClassName:v,style:h,size:j,labelStyle:S,contentStyle:w,items:C}=e,E=Z(e,["prefixCls","title","extra","column","colon","bordered","layout","children","className","rootClassName","style","size","labelStyle","contentStyle","items"]),{getPrefixCls:k,direction:P,descriptions:L}=a.useContext(u.E_),M=k("descriptions",t),B=(0,b.Z)(),G=a.useMemo((()=>{var e;return"number"===typeof c?c:null!==(e=(0,p.m9)(B,Object.assign(Object.assign({},g),c)))&&void 0!==e?e:3}),[B,c]),z=x(B,C,s),T=(0,f.Z)(j),A=O(G,z),[W,R,H]=I(M),X=a.useMemo((()=>({labelStyle:S,contentStyle:w})),[S,w]);return W(a.createElement(y.Provider,{value:X},a.createElement("div",Object.assign({className:m()(M,null===L||void 0===L?void 0:L.className,{["".concat(M,"-").concat(T)]:T&&"default"!==T,["".concat(M,"-bordered")]:!!r,["".concat(M,"-rtl")]:"rtl"===P},d,v,R,H),style:Object.assign(Object.assign({},null===L||void 0===L?void 0:L.style),h)},E),(n||o)&&a.createElement("div",{className:"".concat(M,"-header")},n&&a.createElement("div",{className:"".concat(M,"-title")},n),o&&a.createElement("div",{className:"".concat(M,"-extra")},o)),a.createElement("div",{className:"".concat(M,"-view")},a.createElement("table",null,a.createElement("tbody",null,A.map(((e,t)=>a.createElement(N,{key:t,index:t,colon:l,prefixCls:M,vertical:"vertical"===i,bordered:r,row:e})))))))))};G.Item=S;const z=G;var T=n(14520),A=n(36473),W=n(2556),R=n(83769),H=n(50284),X=n(80184);const{Content:_}=s.default;function q(){var e,t;const{userName:n}=(0,o.UO)(),[d,m]=(0,a.useReducer)(((e,t)=>({...e,...t})),{user:null,loading:!0,automations:[]}),{user:p,loading:u,automations:f}=d,b="Automations for ".concat(null===p||void 0===p?void 0:p.firstName," ").concat(null===p||void 0===p?void 0:p.lastName);if((0,a.useEffect)((()=>{i.XY.getAutomationsByUserName(n).then((e=>{let{user:t,automations:n}=e;return m({user:t,automations:n})})).catch((e=>{var t,n;return console.error((null===e||void 0===e||null===(t=e.response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.error)||"Error fetching automations")})).finally((()=>m({loading:!1})))}),[n]),u)return(0,X.jsx)(H.Z,{});const g=[{key:"email",label:"Email",children:null===p||void 0===p?void 0:p.email},{key:"phone",label:"Phone",children:(null===p||void 0===p||null===(e=p.profile)||void 0===e?void 0:e.phone)||"N/A"},{key:"bio",label:"Bio page",children:(null===p||void 0===p||null===(t=p.profile)||void 0===t?void 0:t.about)||"N/A"}];return(0,X.jsxs)(s.default,{className:"h-100",children:[(0,X.jsx)(R.Z,{title:b}),(0,X.jsxs)(_,{className:"p-4 bg-white",children:[(0,X.jsx)(z,{title:b,items:g,className:"mb-2"}),(0,X.jsx)(T.Z,{gap:28,wrap:"wrap",children:f.map(((e,t)=>{let{_id:n,uniqueId:o,pollImageSrc:a,presentationName:i}=e;return(0,X.jsx)(A.Z,{hoverable:!0,title:i||"Automation ".concat(t+1),styles:{body:{padding:0}},style:{width:c.tq?"100%":"calc(33% - 15.5px)"},cover:(0,X.jsx)("img",{style:{borderRadius:0},src:(0,r.fE)(a),alt:i||"Automation ".concat(t+1)}),actions:[(0,X.jsx)(W.ZP,{type:"link",target:"_blank",icon:(0,X.jsx)(l.Z,{}),href:"/vote/".concat(null===p||void 0===p?void 0:p.userName,"/").concat(o),children:"Voting Page"},"vote"),(0,X.jsx)(W.ZP,{type:"link",target:"_blank",icon:(0,X.jsx)(l.Z,{}),href:"/guest-acceptance/".concat(null===p||void 0===p?void 0:p.userName,"/").concat(o),children:"Guest Acceptance"},"ga")]},n)}))})]})]})}},78823:(e,t,n)=>{n.d(t,{Z:()=>i});var o=n(87462),a=n(72791);const c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"}}]},name:"link",theme:"outlined"};var l=n(8711),r=function(e,t){return a.createElement(l.Z,(0,o.Z)({},e,{ref:t,icon:c}))};const i=a.forwardRef(r)},14520:(e,t,n)=>{n.d(t,{Z:()=>S});var o=n(72791),a=n(41418),c=n.n(a),l=n(41818),r=n(16384),i=n(71929),s=n(96562),d=n(89922);const m=["wrap","nowrap","wrap-reverse"],p=["flex-start","flex-end","start","end","center","space-between","space-around","space-evenly","stretch","normal","left","right"],u=["center","start","end","flex-start","flex-end","self-start","self-end","baseline","normal","stretch"];const f=function(e,t){return c()(Object.assign(Object.assign(Object.assign({},((e,t)=>{const n={};return m.forEach((o=>{n["".concat(e,"-wrap-").concat(o)]=t.wrap===o})),n})(e,t)),((e,t)=>{const n={};return u.forEach((o=>{n["".concat(e,"-align-").concat(o)]=t.align===o})),n["".concat(e,"-align-stretch")]=!t.align&&!!t.vertical,n})(e,t)),((e,t)=>{const n={};return p.forEach((o=>{n["".concat(e,"-justify-").concat(o)]=t.justify===o})),n})(e,t)))},b=e=>{const{componentCls:t}=e;return{[t]:{display:"flex","&-vertical":{flexDirection:"column"},"&-rtl":{direction:"rtl"},"&:empty":{display:"none"}}}},g=e=>{const{componentCls:t}=e;return{[t]:{"&-gap-small":{gap:e.flexGapSM},"&-gap-middle":{gap:e.flexGap},"&-gap-large":{gap:e.flexGapLG}}}},y=e=>{const{componentCls:t}=e,n={};return m.forEach((e=>{n["".concat(t,"-wrap-").concat(e)]={flexWrap:e}})),n},v=e=>{const{componentCls:t}=e,n={};return u.forEach((e=>{n["".concat(t,"-align-").concat(e)]={alignItems:e}})),n},h=e=>{const{componentCls:t}=e,n={};return p.forEach((e=>{n["".concat(t,"-justify-").concat(e)]={justifyContent:e}})),n},x=(0,s.I$)("Flex",(e=>{const{paddingXS:t,padding:n,paddingLG:o}=e,a=(0,d.TS)(e,{flexGapSM:t,flexGap:n,flexGapLG:o});return[b(a),g(a),y(a),v(a),h(a)]}),(()=>({})),{resetStyle:!1});var j=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};const O=o.forwardRef(((e,t)=>{const{prefixCls:n,rootClassName:a,className:s,style:d,flex:m,gap:p,children:u,vertical:b=!1,component:g="div"}=e,y=j(e,["prefixCls","rootClassName","className","style","flex","gap","children","vertical","component"]),{flex:v,direction:h,getPrefixCls:O}=o.useContext(i.E_),S=O("flex",n),[w,C,E]=x(S),N=null!==b&&void 0!==b?b:null===v||void 0===v?void 0:v.vertical,k=c()(s,a,null===v||void 0===v?void 0:v.className,S,C,E,f(S,e),{["".concat(S,"-rtl")]:"rtl"===h,["".concat(S,"-gap-").concat(p)]:(0,r.n)(p),["".concat(S,"-vertical")]:N}),P=Object.assign(Object.assign({},null===v||void 0===v?void 0:v.style),d);return m&&(P.flex=m),p&&!(0,r.n)(p)&&(P.gap=p),w(o.createElement(g,Object.assign({ref:t,className:k,style:P},(0,l.Z)(y,["justify","wrap","align"])),u))}));const S=O}}]);
//# sourceMappingURL=197.d9fa36e6.chunk.js.map