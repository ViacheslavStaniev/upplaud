"use strict";(self.webpackChunkpdsq_frontend=self.webpackChunkpdsq_frontend||[]).push([[204],{90529:(e,n,l)=>{l.r(n),l.d(n,{default:()=>x});var o=l(83769),t=l(34105),c=l(60245),s=l(66862),a=l(60173),i=l(78302),r=l(93070),d=l(49389),u=l(71046),m=l(2556),p=l(77128),h=l(80184);const{Link:f,Title:v,Paragraph:g}=i.default;function x(){const[e]=r.Z.useForm(),{user:n,update:l,isLoading:i,updateUser:x}=(0,s.E)(),{firstName:Z,lastName:j,email:b,userName:y,profile:C={}}=n,N=r.Z.useWatch(["profile","picture"],e);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.Z,{title:"Account Admin"}),(0,h.jsxs)("div",{className:"account-admin",children:[(0,h.jsx)(v,{level:a.tq?3:1,className:"m-0 mb-1",children:"Account Admin"}),(0,h.jsx)(v,{level:5,className:"m-0 fw-400 color-45485C ".concat(a.tq?"mb-2":"mb-4"),children:"Here you can track the automation of your guests:"}),(0,h.jsxs)(r.Z,{form:e,size:"large",layout:"vertical",onFinish:x,className:a.nI?"w-80":"w-100",initialValues:{email:b,lastName:j,firstName:Z,profile:{...C}},children:[(0,h.jsxs)("div",{className:"flex-item gap-2 ".concat(a.tq&&"flex-column full-width-cols"),children:[(0,h.jsx)(r.Z.Item,{name:"firstName",label:"FIRST NAME",className:"flex-1",rules:[{required:!0,message:"First Name is required."}],children:(0,h.jsx)(d.Z,{placeholder:"FIRST NAME"})}),(0,h.jsx)(r.Z.Item,{name:"lastName",label:"LAST NAME",className:"flex-1",children:(0,h.jsx)(d.Z,{placeholder:"LAST NAME"})}),(0,h.jsx)(r.Z.Item,{name:"email",label:"EMAIL",className:"flex-1",rules:[{required:!0,message:"Email is required."},{type:"email",message:"Please enter a valid email."}],children:(0,h.jsx)(d.Z,{placeholder:"EMAIL"})})]}),(0,h.jsxs)("div",{className:"flex-item gap-2 align-baseline ".concat(a.tq&&"flex-column full-width-cols"),children:[(0,h.jsx)(r.Z.Item,{name:["profile","phone"],label:"CELL PHONE",className:"flex-1",children:(0,h.jsx)(d.Z,{placeholder:"CELL PHONE"})}),(0,h.jsx)(r.Z.Item,{name:["profile","about"],label:"BIO OR SOCIAL URL",className:"flex-1",children:(0,h.jsx)(d.Z,{placeholder:"BIO OR SOCIAL URL"})}),(0,h.jsx)(r.Z.Item,{name:["profile","picture"],label:"HEADSHOT IMAGE",className:"flex-1",children:(0,h.jsx)(t.Z,{picture:N,onChange:n=>e.setFieldValue("picture",n)})})]}),(0,h.jsxs)(u.Z,{size:24,direction:a.tq?"vertical":"horizontal",children:[(0,h.jsx)(m.ZP,{shape:"round",block:a.tq,htmlType:"submit",loading:i,className:"minw-110px primary-outlined",children:"SAVE"}),y&&(0,h.jsxs)(g,{className:"m-0",children:["Your Upplaud automations url is"," ",(0,h.jsx)(f,{strong:!0,copyable:!0,target:"_blank",href:"/vote/".concat(y),children:"".concat(window.location.origin,"/vote/").concat(y)})]})]})]}),(0,h.jsx)(p.Z,{}),(0,h.jsx)(c.Z,{user:n,update:l})]})]})}},60245:(e,n,l)=>{l.d(n,{Z:()=>O});var o=l(66664),t=l(76171),c=l(72791),s=l(60173),a=l(33805),i=l(908),r=l(37557),d=l(82621),u=l(87462);const m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z"}}]},name:"stop",theme:"outlined"};var p=l(8711),h=function(e,n){return c.createElement(p.Z,(0,u.Z)({},e,{ref:n,icon:m}))};const f=c.forwardRef(h);const v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"}}]},name:"sync",theme:"outlined"};var g=function(e,n){return c.createElement(p.Z,(0,u.Z)({},e,{ref:n,icon:v}))};const x=c.forwardRef(g);var Z=l(78302),j=l(64162),b=l(2556),y=l(71046),C=l(41583),N=l(51678),k=l(80184);const{Title:w,Text:P}=Z.default,{FACEBOOK:A,LINKEDIN:E}=i.SOCIAL_TYPE;function O(e){let{user:n,className:l="",showTitle:u=!0,update:m=(()=>{}),btnSize:p="large"}=e;const h=(null===n||void 0===n?void 0:n.socialAccounts)||[],v=e=>h.find((n=>n.type===e)),[g,Z]=(0,c.useState)(!1),[O,I]=(0,c.useState)([]),[S,L]=(0,c.useState)(null);(0,c.useEffect)((()=>{var e,n,l;const o=v(A);var t;o&&null!==o&&void 0!==o&&o.isConnected&&(null!==o&&void 0!==o&&null!==(e=o.page)&&void 0!==e&&e.askToChoose||null!==(n=o.group)&&void 0!==n&&n.askToChoose)&&(L("facebook"),I([null!==o&&void 0!==o&&null!==(t=o.page)&&void 0!==t&&t.askToChoose?"page":"group"]));const c=v(E);c&&null!==c&&void 0!==c&&c.isConnected&&null!==c&&void 0!==c&&null!==(l=c.page)&&void 0!==l&&l.askToChoose&&(I(["page"]),L("linkedin"))}),[]);const T=new URLSearchParams(window.location.search),z=T.get("error")||"",q=T.get("isConnected")||"0";(0,c.useEffect)((()=>{"1"===q&&j.ZP.success({message:"Success",description:"You have successfully connected your social media account."}),z&&j.ZP.error({message:"Error",description:z})}),[z,q]);const R=e=>{var n;return(null===(n=v(e))||void 0===n?void 0:n.isConnected)||!1},F=function(e){let l=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"".concat(a.Af,"/auth/connect/").concat(e,"/").concat(null===n||void 0===n?void 0:n.userName,"/").concat(l?"disconnect":"","?returnUrl=").concat(window.location.href)},M=function(){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:14;return arguments.length>0&&void 0!==arguments[0]&&arguments[0]?(0,k.jsx)(r.Z,{className:"color-0AB6B6",style:{fontSize:e||14}}):(0,k.jsx)(d.Z,{className:"color-red",style:{fontSize:e||14}})},U=function(){var e;let l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A;const t=v(l)||{},c=i.W[l],s=l===A?"facebook":"linkedin",{isConnected:a=!1,page:d={}}=t,u=e=>{var n;let{subTitle:l,item:o}=e;const{socialId:t="",accounts:s=[],askToChoose:a=!1}=o||{},i=!1===a&&t?"(".concat(null===(n=s.find((e=>{let{id:n}=e;return n===t})))||void 0===n?void 0:n.name,")"):"",r=0===(null===s||void 0===s?void 0:s.length)&&o;return(0,k.jsxs)(P,{className:"capitalize",children:[c," ",l," ",i," ",r&&o&&"(No accounts found)"]})},{accounts:p=[],socialId:h=""}=d,g=(null===p||void 0===p?void 0:p.length)>1?function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const s=null===e||void 0===e?void 0:e.map((e=>{let{id:s,name:a}=e;return{key:s,label:a,icon:c===s?(0,k.jsx)(r.Z,{}):null,onClick:()=>(async(e,l,t,c)=>{Z(!0);try{await o.Z.get("users/".concat(null===n||void 0===n?void 0:n._id,"/connect/").concat(e,"/").concat(l,"/").concat(t));const s={...n,socialAccounts:((null===n||void 0===n?void 0:n.socialAccounts)||[]).map((n=>n.type!==e?n:{...n,[l]:{...n[l],socialId:t,askToChoose:!1}}))};m({user:s}),j.ZP.success({message:"Success",description:"".concat(l,' "').concat(c,'" connected successfully.')})}catch(z){console.log(z),j.ZP.error({message:"Error",description:null===z||void 0===z?void 0:z.msg})}finally{Z(!1)}})(l,t,s,a),className:c===s?"pointer-none color-white color-0AB6B6 bg-F4F6F8":""}}));return[{key:"header",type:"group",label:"Select ".concat(t," for automation")},...s]}(p,"page",h):null,y=[{key:"profile",className:"pointer-none",icon:M(a),label:(0,k.jsx)(u,{subTitle:"Profile"})},{key:"page",children:g,disabled:0===(null===d||void 0===d||null===(e=d.accounts)||void 0===e?void 0:e.length),className:g?"":"pointer-none",label:(0,k.jsx)(u,{subTitle:"Page",item:d}),icon:M(a&&h&&!1===(null===d||void 0===d?void 0:d.askToChoose))}];return[{type:"group",key:"account",label:"Connected Accounts",children:l===A?y:y.filter((e=>"group"!==e.key))},{key:"divider",type:"divider"},{key:"reconect-disconnnect",label:(0,k.jsxs)("div",{className:"flex-item",children:[(0,k.jsx)(b.ZP,{block:!0,danger:!0,icon:(0,k.jsx)(f,{}),onClick:()=>(async e=>{Z(!0);try{await o.Z.get("users/".concat(null===n||void 0===n?void 0:n._id,"/disconnect/").concat(e));const l={...n,socialAccounts:((null===n||void 0===n?void 0:n.socialAccounts)||[]).map((n=>n.type!==e?n:{...n,isConnected:!1}))};m({user:l}),j.ZP.success({message:"Success",description:"Account disconnected successfully."})}catch(z){console.log(z),j.ZP.error({message:"Error",description:null===z||void 0===z?void 0:z.msg})}finally{L(null),Z(!1)}})(l),children:"Disconnect"}),(0,k.jsx)(b.ZP,{block:!0,type:s,icon:(0,k.jsx)(x,{}),href:F(s),children:"Reconnect"})]})}]},B=[{key:"facebook",disabled:!1,title:"Facebook",items:U(A),isConnected:R(A)},{key:"linkedin",disabled:!1,title:"LinkedIn",items:U(E),isConnected:R(E)}];return(0,k.jsxs)("div",{className:"social-media ".concat(l),children:[u&&(0,k.jsx)(w,{level:3,children:"Connect with social media"}),(0,k.jsx)(y.Z,{size:16,direction:s.tq?"vertical":"horizontal",style:{width:"calc(100% - ".concat(s.tq?"1rem":"0px",")")},children:B.map((e=>{let{key:n,title:l,items:o,disabled:c,isConnected:a}=e;return(0,k.jsx)(C.Z,{arrow:!0,placement:"top",disabled:!a,open:S===n,menu:{items:o,defaultOpenKeys:O},onOpenChange:e=>{!e&&O.length?(I([]),setTimeout((()=>L(e?n:null)),120)):L(e?n:null)},children:(0,k.jsx)(N.Z,{className:s.tq&&"w-100",count:M(a,"large"===p?32:26),children:(0,k.jsxs)(b.ZP,{type:n,shape:"round",size:p,block:s.tq,loading:g,disabled:c,href:F(n),icon:(0,k.jsx)(t.Z,{name:n}),className:a?"pointer-none":"",children:[a?"Connected":"Continue"," with ",l]})})},n)}))})]})}},34105:(e,n,l)=>{l.d(n,{Z:()=>f});var o=l(49367),t=l(2556),c=l(58533),s=l(72791),a=l(57960),i=l(76452),r=l(20043),d=l(12584),u=l(80184);function m(e){let{onComplete:n,children:l,cropShape:o="round",aspect:t=1}=e;const[m,p]=(0,s.useState)(!1),h=e=>!!["image/png","image/jpg","image/jpeg"].includes(e.type.toLowerCase())||(a.ZP.error("You can only upload JPG/PNG file!"),!1),f={name:"file",beforeUpload:h,multiple:!1,showUploadList:!1,accept:".png, .jpeg, .jpg",customRequest:e=>{let{file:l}=e;const o=new FileReader;o.onloadend=async()=>{try{p(!0);const e=await(0,d.Vg)({imageData:o.result});p(!1),n(null===e||void 0===e?void 0:e.s3Path)}catch(e){console.log(e),p(!1)}},o.readAsDataURL(l)}};return(0,u.jsx)(c.Z,{showReset:!0,rotationSlider:!0,aspect:t,modalOk:"Upload",cropShape:o,fillColor:"transparent",beforeCrop:h,children:(0,u.jsx)(i.default,{...f,children:(0,u.jsx)(r.Z,{spinning:m,children:l})})})}var p=l(72351),h=l(33805);function f(e){let{picture:n="",onChange:l}=e;const c=n?n.startsWith("http")?n:(0,h.fE)(n):null;return(0,u.jsxs)("div",{className:"flex-item",children:[c&&(0,u.jsx)(o.C,{size:"large",src:c}),(0,u.jsx)(m,{onComplete:l,children:(0,u.jsxs)(t.ZP,{icon:(0,u.jsx)(p.Z,{}),children:["Click to ",c?"Change":"Upload"]})})]})}},82622:(e,n,l)=>{l.d(n,{Z:()=>i});var o=l(87462),t=l(72791);const c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"};var s=l(8711),a=function(e,n){return t.createElement(s.Z,(0,o.Z)({},e,{ref:n,icon:c}))};const i=t.forwardRef(a)},40959:(e,n,l)=>{l.d(n,{Z:()=>b});var o=l(8887),t=l(96854),c=l(22173),s=l(72791),a=l(41418),i=l.n(a),r=l(81373),d=l(77268),u=l(71929),m=l(32456),p=l(81458),h=l(73931),f=l(67838),v=function(e,n){var l={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(l[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var t=0;for(o=Object.getOwnPropertySymbols(e);t<o.length;t++)n.indexOf(o[t])<0&&Object.prototype.propertyIsEnumerable.call(e,o[t])&&(l[o[t]]=e[o[t]])}return l};const g=(0,d.i)((e=>{const{prefixCls:n,className:l,closeIcon:o,closable:t,type:c,title:a,children:d,footer:g}=e,x=v(e,["prefixCls","className","closeIcon","closable","type","title","children","footer"]),{getPrefixCls:Z}=s.useContext(u.E_),j=Z(),b=n||Z("modal"),y=(0,f.Z)(j),[C,N,k]=(0,h.ZP)(b,y),w="".concat(b,"-confirm");let P={};return P=c?{closable:null!==t&&void 0!==t&&t,title:"",footer:"",children:s.createElement(m.O,Object.assign({},e,{prefixCls:b,confirmPrefixCls:w,rootPrefixCls:j,content:d}))}:{closable:null===t||void 0===t||t,title:a,footer:null!==g&&s.createElement(p.$,Object.assign({},e)),children:d},C(s.createElement(r.s,Object.assign({prefixCls:b,className:i()(N,"".concat(b,"-pure-panel"),c&&w,c&&"".concat(w,"-").concat(c),l,k,y)},x,{closeIcon:(0,p.b)(b,o),closable:t},P)))}));var x=l(47562);function Z(e){return(0,o.ZP)((0,o.uW)(e))}const j=c.Z;j.useModal=x.Z,j.info=function(e){return(0,o.ZP)((0,o.cw)(e))},j.success=function(e){return(0,o.ZP)((0,o.vq)(e))},j.error=function(e){return(0,o.ZP)((0,o.AQ)(e))},j.warning=Z,j.warn=Z,j.confirm=function(e){return(0,o.ZP)((0,o.Au)(e))},j.destroyAll=function(){for(;t.Z.length;){const e=t.Z.pop();e&&e()}},j.config=o.ai,j._InternalPanelDoNotUseOrYouWillBeFired=g;const b=j}}]);
//# sourceMappingURL=204.2035d6b0.chunk.js.map