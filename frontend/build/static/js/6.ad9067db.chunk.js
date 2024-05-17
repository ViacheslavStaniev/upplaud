"use strict";(self.webpackChunkpdsq_frontend=self.webpackChunkpdsq_frontend||[]).push([[6],{85379:(e,o,l)=>{l.d(o,{Z:()=>a});var t=l(24925),s=l(92143),n=l(79286),i=l(80184);function a(e){let{items:o=[],defaultActive:l="",marginBottom:a=!0}=e;return(0,i.jsx)(t.Z,{items:o,bordered:!1,className:"bg-F7F3F9 ".concat(a?"mb-2":""),defaultActiveKey:l?[l]:[],expandIcon:e=>{let{isActive:o}=e;return o?(0,i.jsx)(s.Z,{}):(0,i.jsx)(n.Z,{})}})}},69006:(e,o,l)=>{l.r(o),l.d(o,{default:()=>_});var t=l(94545),s=l(83769),n=l(60245),i=l(50284),a=l(46417),c=l(72791),r=l(38072),d=l(60173),u=l(57689),v=l(11087),m=l(18406),h=l(48080),p=l(78302),f=l(67049),g=l(66106),y=l(30914),x=l(88715),b=l(40959),w=l(93070),k=l(49389),j=l(2556),S=l(49189),N=l(36473),q=l(49367),Z=l(80184);const{Text:C,Title:I,Paragraph:P}=p.default;function _(){const{userName:e,pollUniqueId:o}=(0,u.UO)(),[l,n]=(0,c.useState)({poll:null,errorMsg:"",loading:!0,validatedPolls:{},passwordValidated:!1}),{poll:a,errorMsg:r,loading:v,validatedPolls:m,passwordValidated:p}=l,S=null===a||void 0===a?void 0:a._id,N=(null===a||void 0===a?void 0:a.guest)||{},q=e=>n((o=>({...o,...e})));return(0,c.useEffect)((()=>{if(o){const l=JSON.parse(window.localStorage.getItem("validatedPolls"))||{},t=l[o]||!1;q({loading:!0,passwordValidated:t,validatedPolls:l}),h.XY.getPollByUniqueId(e,o).then((e=>q({poll:e}))).catch(console.error).finally((()=>q({loading:!1})))}return()=>{q({poll:null,loading:!1})}}),[e,o]),v?(0,Z.jsx)(i.Z,{}):S?(0,Z.jsxs)(f.ZP,{theme:{token:{fontSize:d.tq?14:16}},children:[(0,Z.jsx)(s.Z,{title:"Guest Acceptance"}),(0,Z.jsxs)(g.Z,{className:"h-100vh guest-acceptance",style:{flexFlow:"row-revers"},children:[(0,Z.jsxs)(y.Z,{span:d.tq?24:5,className:"p-2 leftbg",children:[(0,Z.jsx)(t.Z,{rootClassName:d.tq?"mb-2":"sidebar-navlogo"}),(0,Z.jsxs)("div",{className:"bg-white p-2 br-8px ".concat(d.nI&&"mt-2"),children:[(0,Z.jsx)(I,{level:d.tq?4:3,className:"text-center color-36c102",children:"How does Upplaud grow our audience?"}),(0,Z.jsx)(I,{level:5,className:d.tq&&"mt-0",children:"It's proven that when we ask others for input, we get to:"}),(0,Z.jsx)(x.Z,{size:"small",className:d.tq?"mb-0":"mb-4",dataSource:["- Make them feel part of us","- Give them what they want.","- They'll share us more:","- We grow our reach & impact","- We do business better!"],renderItem:e=>(0,Z.jsx)(x.Z.Item,{className:"border-0 ".concat(d.tq&&"p-0 pb-1 fw-500"),children:e})}),(0,Z.jsx)(P,{className:d.tq&&"m-0",children:"Upplaud captures voter referrals, email addresses & offers rewards to voters; while pulling interest from multiple sources: Co-presenters' Facebook, LinkedIn, email, presentations, etc."})]})]}),(0,Z.jsx)(y.Z,{span:d.tq?24:19,className:d.tq?"p-2":"p-4",children:a&&N&&(0,Z.jsx)(T,{poll:a,guest:N})})]}),(0,Z.jsx)(b.Z,{footer:!1,closable:!1,maskClosable:!1,open:!p,styles:{mask:{backgroundColor:"#fdeffff0"}},children:(0,Z.jsxs)("div",{className:d.nI&&"p-2",children:[(0,Z.jsx)(I,{level:3,className:"mt-0",children:"Password Required!"}),r&&(0,Z.jsx)(P,{type:"danger",children:r}),(0,Z.jsxs)(w.Z,{size:"large",layout:"vertical",initialValues:{password:""},onFinish:e=>{let{password:l=""}=e;if((null===l||void 0===l?void 0:l.trim())===(null===a||void 0===a?void 0:a.password)){const e={...m,[o]:!0};window.localStorage.setItem("validatedPolls",JSON.stringify(e)),q({passwordValidated:!0,newValidatedPolls:e})}else q({errorMsg:"Invalid password!"})},children:[(0,Z.jsx)(w.Z.Item,{name:"password",label:"Enter your password",children:(0,Z.jsx)(k.Z.Password,{placeholder:"Enter your password"})}),(0,Z.jsx)(j.ZP,{block:d.tq,type:"primary",htmlType:"submit",children:"Submit"})]})]})})]}):(0,Z.jsx)(u.Fg,{to:"/404"})}function T(e){let{poll:o,guest:l}=e;const[t]=w.Z.useForm(),{modal:s,notification:i}=S.Z.useApp(),[u,p]=(0,c.useState)(!1),[f,g]=(0,c.useState)(!1),y=(0,m.K6)((null===l||void 0===l?void 0:l.socialAccounts)||[]);(0,c.useEffect)((()=>{p(!0),(0,h.nz)(null===l||void 0===l?void 0:l._id,null===o||void 0===o?void 0:o._id).then((e=>{t.setFieldsValue({socials:(null===e||void 0===e?void 0:e.length)>0?e:y})})).catch(console.error).finally((()=>p(!1)))}),[null===l||void 0===l?void 0:l._id,null===o||void 0===o?void 0:o._id]);return(0,Z.jsxs)("div",{className:"guest-acceptance-content",children:[(0,Z.jsxs)(I,{level:d.tq?3:2,className:"color-6b0d88 fw-600 m-0 mb-2",children:["Hi ",null===l||void 0===l?void 0:l.firstName,", I'm looking forward to doing ",(null===o||void 0===o?void 0:o.presentationName)||"an event"," ","with you!"]}),(0,Z.jsx)(I,{level:d.tq?4:3,className:"m-0 mb-2",children:"Let's grow the best audience for us\u2026"}),(0,Z.jsx)(I,{level:d.tq?4:3,className:"m-0 mb-2",children:"By inviting our connections to vote & share our topics:"}),(0,Z.jsxs)(N.Z,{bordered:d.nI,styles:{body:{padding:d.tq?12:24}},children:[(0,Z.jsx)(A,{index:1,className:"color-2196F3",title:"Connect your social media (as I have already)...",avatarStyles:{backgroundColor:"#2196f3",color:"#ffffff"}}),(0,Z.jsx)(n.Z,{user:l,btnSize:"default",showTitle:!1,className:"mb-4 mt-2"}),(0,Z.jsx)(A,{index:2,type:"secondary",title:"Optional: Reward for voting..."}),(0,Z.jsxs)("div",{className:"flex-item gap-1 mb-4 ".concat(d.tq&&"flex-column align-baseline"),children:[(0,Z.jsx)(C,{className:"minw-fit-content",children:"Website address of your gift offer:"}),(0,Z.jsxs)(w.Z,{layout:"inline",onFinish:e=>{let{guestOfferUrl:l}=e;g(!0),(0,h.$X)(null===o||void 0===o?void 0:o._id,{guestOfferUrl:l}).then((e=>{let{msg:o}=e;return i.success({message:"Success",description:o})})).catch((e=>i.error({message:"Error",description:null===e||void 0===e?void 0:e.message}))).finally((()=>g(!1)))},className:"flex-item gap-1 flex-nowrap ".concat(d.tq?"flex-column w-100":""),initialValues:{guestOfferUrl:null===o||void 0===o?void 0:o.guestOfferUrl},children:[(0,Z.jsx)(w.Z.Item,{noStyle:!0,name:"guestOfferUrl",rules:[{required:!0,message:"Please enter the offer url."}],children:(0,Z.jsx)(k.Z,{type:"url",placeholder:"Enter your offer url"})}),(0,Z.jsx)(w.Z.Item,{noStyle:!0,children:(0,Z.jsx)(j.ZP,{block:d.tq,type:"primary",htmlType:"submit",loading:f,children:"Save"})})]})]}),(0,Z.jsx)(A,{index:3,type:"secondary",title:"Confirm: Posting frequency...",avatarStyles:{backgroundColor:"#9e9e9e",color:"#ffffff"}}),(0,Z.jsxs)(P,{children:["To reach the most people, we'll repeat our Upplaud until"," ",(0,m.fh)(null===o||void 0===o?void 0:o.recordingDate),":"]}),(0,Z.jsxs)(w.Z,{form:t,size:"large",className:"mb-4",labelWrap:!0,labelAlign:"left",layout:"horizontal",initialValues:{socials:y},onFinish:e=>{p(!0),(0,h.CN)(null===l||void 0===l?void 0:l._id,null===o||void 0===o?void 0:o._id,e.socials).then((()=>s.success({title:"Success",content:"Socials saved successfully."}))).catch((e=>s.error({title:"Error",content:null===e||void 0===e?void 0:e.message}))).finally((()=>p(!1)))},children:[(0,Z.jsx)(a.Z,{}),(0,Z.jsx)(j.ZP,{block:d.tq,loading:u,type:"primary",htmlType:"submit",className:"mt-2",children:"SAVE"})]}),(0,Z.jsx)(A,{index:4,title:"Grow even more interest...",avatarStyles:{backgroundColor:"#000000",color:"#ffffff"}}),(0,Z.jsxs)(P,{className:"m-0",children:["We should include the following Upplaud voting page in our email blasts, slides & elsewhere:"," ",(0,Z.jsx)(v.rU,{to:"/vote/".concat(null===o||void 0===o?void 0:o.uniqueId,"/").concat(null===l||void 0===l?void 0:l.userName),target:"_blank",children:(0,r.a9)("/vote/".concat(null===o||void 0===o?void 0:o.uniqueId,"/").concat(null===l||void 0===l?void 0:l.userName))})]})]})]})}function A(e){let{title:o="",index:l=1,type:t="",className:s="",avatarStyles:n={}}=e;return(0,Z.jsxs)(I,{type:t,level:d.tq?5:4,className:"flex-item gap-1 ".concat(s),children:[(0,Z.jsx)(q.C,{size:"small",style:{...n,minWidth:27},children:l}),o]})}},60245:(e,o,l)=>{l.d(o,{Z:()=>P});var t=l(66664),s=l(76171),n=l(72791),i=l(60173),a=l(33805),c=l(908),r=l(37557),d=l(82621),u=l(87462);const v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z"}}]},name:"stop",theme:"outlined"};var m=l(8711),h=function(e,o){return n.createElement(m.Z,(0,u.Z)({},e,{ref:o,icon:v}))};const p=n.forwardRef(h);const f={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"}}]},name:"sync",theme:"outlined"};var g=function(e,o){return n.createElement(m.Z,(0,u.Z)({},e,{ref:o,icon:f}))};const y=n.forwardRef(g);var x=l(78302),b=l(64162),w=l(2556),k=l(71046),j=l(41583),S=l(51678),N=l(80184);const{Title:q,Text:Z}=x.default,{FACEBOOK:C,LINKEDIN:I}=c.SOCIAL_TYPE;function P(e){let{user:o,className:l="",showTitle:u=!0,update:v=(()=>{}),btnSize:m="large"}=e;const h=(null===o||void 0===o?void 0:o.socialAccounts)||[],f=e=>h.find((o=>o.type===e)),[g,x]=(0,n.useState)(!1),[P,_]=(0,n.useState)([]),[T,A]=(0,n.useState)(null);(0,n.useEffect)((()=>{var e,o,l;const t=f(C);var s;t&&null!==t&&void 0!==t&&t.isConnected&&(null!==t&&void 0!==t&&null!==(e=t.page)&&void 0!==e&&e.askToChoose||null!==(o=t.group)&&void 0!==o&&o.askToChoose)&&(A("facebook"),_([null!==t&&void 0!==t&&null!==(s=t.page)&&void 0!==s&&s.askToChoose?"page":"group"]));const n=f(I);n&&null!==n&&void 0!==n&&n.isConnected&&null!==n&&void 0!==n&&null!==(l=n.page)&&void 0!==l&&l.askToChoose&&(_(["page"]),A("linkedin"))}),[]);const E=new URLSearchParams(window.location.search),O=E.get("error")||"",F=E.get("isConnected")||"0";(0,n.useEffect)((()=>{"1"===F&&b.ZP.success({message:"Success",description:"You have successfully connected your social media account."}),O&&b.ZP.error({message:"Error",description:O})}),[O,F]);const U=e=>{var o;return(null===(o=f(e))||void 0===o?void 0:o.isConnected)||!1},z=function(e){let l=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"".concat(a.Af,"/auth/connect/").concat(e,"/").concat(null===o||void 0===o?void 0:o.userName,"/").concat(l?"disconnect":"","?returnUrl=").concat(window.location.href)},B=function(){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:14;return arguments.length>0&&void 0!==arguments[0]&&arguments[0]?(0,N.jsx)(r.Z,{className:"color-0AB6B6",style:{fontSize:e||14}}):(0,N.jsx)(d.Z,{className:"color-red",style:{fontSize:e||14}})},R=function(){var e,l;let s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C;const n=f(s)||{},i=c.W[s],a=s===C?"facebook":"linkedin",{isConnected:d=!1,page:u={},group:m={}}=n,h=e=>{var o;let{subTitle:l,item:t}=e;const{socialId:s="",accounts:n=[],askToChoose:a=!1}=t||{},c=!1===a&&s?"(".concat(null===(o=n.find((e=>{let{id:o}=e;return o===s})))||void 0===o?void 0:o.name,")"):"",r=0===(null===n||void 0===n?void 0:n.length)&&t;return(0,N.jsxs)(Z,{className:"capitalize",children:[i," ",l," ",c," ",r&&t&&"(No accounts found)"]})},g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const i=null===e||void 0===e?void 0:e.map((e=>{let{id:i,name:a}=e;return{key:i,label:a,icon:n===i?(0,N.jsx)(r.Z,{}):null,onClick:()=>(async(e,l,s,n)=>{x(!0);try{await t.Z.get("users/".concat(null===o||void 0===o?void 0:o._id,"/connect/").concat(e,"/").concat(l,"/").concat(s));const i={...o,socialAccounts:((null===o||void 0===o?void 0:o.socialAccounts)||[]).map((o=>o.type!==e?o:{...o,[l]:{...o[l],socialId:s,askToChoose:!1}}))};v({user:i}),b.ZP.success({message:"Success",description:"".concat(l,' "').concat(n,'" connected successfully.')})}catch(O){console.log(O),b.ZP.error({message:"Error",description:null===O||void 0===O?void 0:O.msg})}finally{x(!1)}})(s,l,i,a),className:n===i?"pointer-none color-white color-0AB6B6 bg-F4F6F8":""}}));return[{key:"header",type:"group",label:"Select ".concat(l," for automation")},...i]},{accounts:k=[],socialId:j=""}=u,{accounts:S=[],socialId:q=""}=m,I=(null===k||void 0===k?void 0:k.length)>1?g(k,"page",j):null,P=(null===S||void 0===S?void 0:S.length)>1?g(S,"group",q):null,_=[{key:"profile",className:"pointer-none",icon:B(d),label:(0,N.jsx)(h,{subTitle:"Profile"})},{key:"page",children:I,disabled:0===(null===u||void 0===u||null===(e=u.accounts)||void 0===e?void 0:e.length),className:I?"":"pointer-none",label:(0,N.jsx)(h,{subTitle:"Page",item:u}),icon:B(d&&j&&!1===(null===u||void 0===u?void 0:u.askToChoose))},{key:"group",children:P,disabled:0===(null===m||void 0===m||null===(l=m.accounts)||void 0===l?void 0:l.length),className:P?"":"pointer-none",label:(0,N.jsx)(h,{subTitle:"Group",item:m}),icon:B(d&&q&&!1===(null===m||void 0===m?void 0:m.askToChoose))}];return[{type:"group",key:"account",label:"Connected Accounts",children:s===C?_:_.filter((e=>"group"!==e.key))},{key:"divider",type:"divider"},{key:"reconect-disconnnect",label:(0,N.jsxs)("div",{className:"flex-item",children:[(0,N.jsx)(w.ZP,{block:!0,danger:!0,icon:(0,N.jsx)(p,{}),onClick:()=>(async e=>{x(!0);try{await t.Z.get("users/".concat(null===o||void 0===o?void 0:o._id,"/disconnect/").concat(e));const l={...o,socialAccounts:((null===o||void 0===o?void 0:o.socialAccounts)||[]).map((o=>o.type!==e?o:{...o,isConnected:!1}))};v({user:l}),b.ZP.success({message:"Success",description:"Account disconnected successfully."})}catch(O){console.log(O),b.ZP.error({message:"Error",description:null===O||void 0===O?void 0:O.msg})}finally{A(null),x(!1)}})(s),children:"Disconnect"}),(0,N.jsx)(w.ZP,{block:!0,type:a,icon:(0,N.jsx)(y,{}),href:z(a),children:"Reconnect"})]})}]},V=[{key:"facebook",disabled:!1,title:"Facebook",items:R(C),isConnected:U(C)},{key:"linkedin",disabled:!1,title:"LinkedIn",items:R(I),isConnected:U(I)}];return(0,N.jsxs)("div",{className:"social-media ".concat(l),children:[u&&(0,N.jsx)(q,{level:3,children:"Connect with social media"}),(0,N.jsx)(k.Z,{size:16,direction:i.tq?"vertical":"horizontal",style:{width:"calc(100% - ".concat(i.tq?"1rem":"0px",")")},children:V.map((e=>{let{key:o,title:l,items:t,disabled:n,isConnected:a}=e;return(0,N.jsx)(j.Z,{arrow:!0,placement:"top",disabled:!a,open:T===o,menu:{items:t,defaultOpenKeys:P},onOpenChange:e=>{!e&&P.length?(_([]),setTimeout((()=>A(e?o:null)),120)):A(e?o:null)},children:(0,N.jsx)(S.Z,{className:i.tq&&"w-100",count:B(a,"large"===m?32:26),children:(0,N.jsxs)(w.ZP,{type:o,shape:"round",size:m,block:i.tq,loading:g,disabled:n,href:z(o),icon:(0,N.jsx)(s.Z,{name:o}),className:a?"pointer-none":"",children:[a?"Connected":"Continue"," with ",l]})})},o)}))})]})}},46417:(e,o,l)=>{l.d(o,{Z:()=>h});var t=l(85379),s=l(60173),n=l(18406),i=l(29966),a=l(93070),c=l(89862),r=l(97412),d=l(61431),u=l(2556),v=l(71234),m=l(80184);function h(){const e=a.Z.useFormInstance(),o=a.Z.useWatch("socials",e)||[],l=[4,3,2,1].map((e=>({value:e,label:"Post [".concat(e,"x] monthly")}))),h=(l,t,s)=>{const n=o.map((e=>e._id===l?{...e,[t]:s}:e));e.setFieldValue("socials",n)},p=o.length>0,f=[{key:"social",label:"Confirm Socials & Posting Frequency",children:(0,m.jsxs)("div",{className:"flex-item gap-1 flex-column align-baseline",children:[(0,m.jsx)(a.Z.Item,{name:"socials",hidden:!0,children:(0,m.jsx)("input",{})}),p&&o.map((e=>{let{_id:o,type:t,subType:a,subTypeName:v="",isActive:p,frequency:f,isConnected:g}=e;return(0,m.jsxs)("div",{className:"flex-item gap-1 flex-auto ".concat(s.tq&&"flex-column w-100"),children:[(0,m.jsx)(c.Z,{checked:p,disabled:!g,className:"uppercase ".concat(s.tq&&"w-100"),onChange:e=>h(o,"isActive",e.target.checked),children:(0,n.dh)(t,a,v)}),(0,m.jsx)(r.default,{size:"small",defaultValue:4,value:f,placeholder:"Select",disabled:!g,options:l,style:{minWidth:200},className:s.tq&&"w-100",onChange:e=>h(o,"frequency",e)}),!g&&(0,m.jsx)(d.Z,{color:"red",arrow:!1,title:"Please connect your social account to enable this automation.",children:(0,m.jsxs)(u.ZP,{danger:!0,type:"text",size:"small",shape:"circle",block:s.tq,icon:(0,m.jsx)(i.Z,{}),children:["Account Disconnected"," "]})})]},o)})),!p&&(0,m.jsx)(v.Z,{showIcon:!0,style:{fontWeight:600},message:"No social media accounts found. Please connect your social media accounts first."})]})}];return(0,m.jsx)(t.Z,{items:f,defaultActive:"social",marginBottom:!1})}},18406:(e,o,l)=>{l.d(o,{K6:()=>g,MD:()=>y,Qg:()=>h,Ug:()=>p,dh:()=>f,fh:()=>m,mr:()=>v});var t=l(25415),s=l(908);const{FACEBOOK:n}=s.SOCIAL_TYPE,{HOST_GUEST:i,SOLO_SESSION:a}=s.GUEST_TYPE,{PROFILE:c,PAGE:r,GROUP:d}=s.SOCIAL_SUB_TYPE,u=["##E91E63","#673AB7","#2196F3","#00BCD4","#FF9800","#8BC34A","#009688","#FF5722","#607D8B","#F44336"],v=()=>u[Math.floor(Math.random()*u.length)],m=e=>new Date(e).toDateString(),h=[{key:i,value:i,label:"JOINT SESSION",text:"Their Info"},{key:a,value:a,label:"SOLO SESSION",text:"Your Info"}],p=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return h.find((o=>o.key===e))},f=function(e,o){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";const t=(e=>s.W[e])(e);return o===c?"YOUR ".concat(t," PROFILE"):o===r?"YOUR ".concat(t," PAGE: ").concat(l):o===d?"YOUR ".concat(t," GROUP: ").concat(l):""},g=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(((e,o)=>{if(null===o||void 0===o||!o.isConnected)return e;const{type:l,socialId:t,page:s,group:i}=o,a=function(e,o){return{type:l,subType:e,frequency:arguments.length>3&&void 0!==arguments[3]?arguments[3]:4,subTypeId:o,subTypeName:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",isActive:!1,_id:"".concat(l,"_").concat(e),isConnected:(o||"").toString().length>0}},u=e=>{var o;return(null===e||void 0===e||null===(o=e.accounts.find((o=>{let{id:l}=o;return l===(null===e||void 0===e?void 0:e.socialId)})))||void 0===o?void 0:o.name)||""},v=[...e,a(c,t),a(r,null===s||void 0===s?void 0:s.socialId,u(s))];return l===n?[...v,a(d,null===i||void 0===i?void 0:i.socialId,u(s))]:v}),[])},y=e=>{const o=new t.Workbook,l=o.addWorksheet("Voting Data"),{questionnaireAnswers:s=[]}=e[0]||{},[n,i,a,c]=s;l.columns=[{header:"Selected Topic",key:"topic"},{header:"Voter Name",key:"voter_name"},{header:"Voter Email",key:"voter_email"},{header:"Voter Cell Phone",key:"voter_cellphone"},{header:"User Suggested",key:"isSuggestion"},{header:"Suggested Topic",key:"suggested_topic"},{header:"Suggested Speaker",key:"suggested_speaker"},{header:"Question 1: ".concat(null===n||void 0===n?void 0:n.question),key:"quest1"},{header:"Question 2: ".concat(null===i||void 0===i?void 0:i.question),key:"quest2"},{header:"Referral 1",key:"quest2_referral1"},{header:"Referral 2",key:"quest2_referral2"},{header:"Name",key:"quest2_name"},{header:"Email",key:"quest2_email"},{header:"Question 3: ".concat(null===a||void 0===a?void 0:a.question),key:"quest3"},{header:"Question 4: ".concat(null===c||void 0===c?void 0:c.question),key:"quest4"},{header:"Timestamp",key:"timestamp"}],e.forEach((e=>{var o,t,s,n,i,a;const{selectedTopic:c,voter:r,isSuggestion:d,suggestions:u,createdAt:v,questionnaireAnswers:m}=e,[h,p,f,g]=m;l.addRow({topic:(null===c||void 0===c?void 0:c.topic)||"Other",voter_name:(null===r||void 0===r?void 0:r.name)||"--",voter_email:(null===r||void 0===r?void 0:r.email)||"--",voter_cellphone:(null===r||void 0===r?void 0:r.cell_phone)||"--",isSuggestion:d?"Yes":"No",suggested_topic:(null===u||void 0===u?void 0:u.topic)||"--",suggested_speaker:(null===u||void 0===u?void 0:u.speaker)||"--",quest1:h&&(null===h||void 0===h?void 0:h.answers)||"--",quest2:null!==p&&void 0!==p&&p.answers?"Comment: ".concat((null===p||void 0===p||null===(o=p.answers)||void 0===o?void 0:o.comment)||"--"):"--",quest2_referral1:(null===p||void 0===p||null===(t=p.answers)||void 0===t?void 0:t.referral1)||"--",quest2_referral2:(null===p||void 0===p||null===(s=p.answers)||void 0===s?void 0:s.referral2)||"--",quest2_name:(null===p||void 0===p||null===(n=p.answers)||void 0===n?void 0:n.name)||"--",quest2_email:(null===p||void 0===p||null===(i=p.answers)||void 0===i?void 0:i.email)||"--",quest3:f&&(null===f||void 0===f||null===(a=f.answers)||void 0===a?void 0:a.answer)||"--",quest4:g?null!==g&&void 0!==g&&g.doneSharing?"Yes":"No":"--",timestamp:new Date(v).toLocaleString()})})),o.xlsx.writeBuffer().then((e=>{const o=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=window.URL.createObjectURL(o),t=document.createElement("a");t.href=l,t.download="VotingData.xlsx",t.click()}))}}}]);
//# sourceMappingURL=6.ad9067db.chunk.js.map