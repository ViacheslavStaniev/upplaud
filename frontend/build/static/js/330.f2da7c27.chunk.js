"use strict";(self.webpackChunkpdsq_frontend=self.webpackChunkpdsq_frontend||[]).push([[330],{85379:(e,t,l)=>{l.d(t,{Z:()=>i});var o=l(24925),a=l(92143),n=l(79286),s=l(80184);function i(e){let{items:t=[],defaultActive:l="",marginBottom:i=!0}=e;return(0,s.jsx)(o.Z,{items:t,bordered:!1,className:"bg-F7F3F9 ".concat(i?"mb-2":""),defaultActiveKey:l?[l]:[],expandIcon:e=>{let{isActive:t}=e;return t?(0,s.jsx)(a.Z,{}):(0,s.jsx)(n.Z,{})}})}},659:(e,t,l)=>{l.d(t,{Z:()=>i});var o=l(93070),a=l(66770),n=l.n(a),s=l(80184);function i(e){let{name:t,...l}=e;return(0,s.jsx)(o.Z.Item,{name:t,...null===l||void 0===l?void 0:l.formItemParams,children:(0,s.jsx)(n(),{theme:"snow",modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],["link","image"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"]]},...l})})}},88330:(e,t,l)=>{l.r(t),l.d(t,{default:()=>pe});var o=l(97892),a=l.n(o),n=l(72791),s=l(60173),i=l(12584),r=l(59434),c=l(66862),d=l(57689),u=l(908),m=l(18406),h=l(48080),p=l(78302),g=l(93070),x=l(49389),v=l(66106),f=l(30914),b=l(88715),j=l(20512),S=l(21306),y=l(71046),k=l(2556),w=l(74424),N=l(19517),I=l(83769),T=l(659),A=l(34105),Z=l(33805),E=l(97412),q=l(76452),P=l(61431),C=l(54192),F=l(64162),O=l(49367),R=l(40959),L=l(20043),U=l(91082),D=l(1429),_=l(28624),G=l(79286),M=l(66776),B=l(94729),H=l(63531),z=l.n(H),V=l(80184);const{Paragraph:Y}=p.default;function W(){const e=g.Z.useFormInstance(),[t,l]=(0,n.useState)({blob:null,open:!1,audioName:"",timeLeft:120,recorder:null,audioDuration:0,isRecording:!1,recordingStartedAt:null}),o=e=>l((t=>({...t,...e}))),{blob:a,open:c,audioName:d,timeLeft:m,audioDuration:h,recorder:p,isRecording:v,recordingStartedAt:f}=t,j=(0,r.I0)(),{files:S,isLoading:y,isUploading:w}=(0,r.v9)((e=>{let{files:t}=e;return t})),N=S.filter((e=>{let{type:t}=e;return t===u.G.AUDIO})),I=()=>{const e=(new Date).toLocaleString().replaceAll(",","").replaceAll(":","").replaceAll("/","").replaceAll(" ","_");return"Recording_".concat(e,".webm")},T=(0,n.useCallback)((()=>{window.interval&&clearInterval(window.interval),p.stopRecording((()=>{const e=new Blob([p.getBlob()],{type:"audio/webm"});p.stream.stop();const t=Math.floor((Date.now()-f)/1e3);o({audioDuration:t,recorder:null,blob:e,isRecording:!1,audioName:I()})}))}),[p,f]);(0,n.useEffect)((()=>{f&&(window.interval=setInterval((()=>{const e=120-Math.floor((Date.now()-f)/1e3);e<=0?T():o({timeLeft:e})}),1e3))}),[f,T]);return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(g.Z.Item,{name:"audioDuration",hidden:!0}),(0,V.jsxs)("div",{className:"flex-item gap-2 mb-2 ".concat(s.tq&&"flex-column"),children:[(0,V.jsx)(g.Z.Item,{name:"audio",label:"Audio",className:"m-0 ".concat(s.tq?"w-100":"w-40"),children:(0,V.jsx)(E.default,{loading:y,disabled:y,className:"minw-200px",placeholder:"Select an Audio",options:N.map((e=>{let{_id:t,name:l,duration:o=0}=e;return{label:l,value:t,duration:o}})),onChange:(t,l)=>{let{duration:o}=l;return e.setFieldValue("audioDuration",o)}})}),(0,V.jsx)(k.ZP,{type:"link",icon:(0,V.jsx)(G.Z,{}),onClick:()=>o({open:!0}),children:"ADD/MANAGE AUDIOS"})]}),(0,V.jsxs)(R.Z,{centered:!0,open:c,footer:!1,maskClosable:!1,title:"Add/Manage Audios",width:s.tq?"100%":600,onCancel:()=>o({blob:null,open:!1}),children:[(0,V.jsx)(Y,{strong:!0,className:"m-0",children:"Record New Audio"}),(0,V.jsx)(Y,{type:"secondary",children:"Max 2 minutes. The recording will auto stop after two minutes."}),(0,V.jsxs)(L.Z,{spinning:y,tip:"Uploading...",children:[(0,V.jsx)("audio",{src:a?URL.createObjectURL(a):"",controls:!0,className:"w-100 mb-1"}),a&&(0,V.jsx)(g.Z.Item,{label:"File Name (Optional)",children:(0,V.jsx)(x.Z,{value:d,disabled:v,placeholder:"Enter file name",onChange:e=>o({audioName:e.target.value})})}),(0,V.jsxs)("div",{className:"flex-item gap-1 mb-1 ".concat(s.tq&&"flex-column"),children:[(0,V.jsx)(k.ZP,{block:s.tq,htmlType:"button",onClick:()=>{navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0}}).then((e=>{const t=new(z())(e,{type:"audio",bufferSize:4096,sampleRate:44100,audioBitsPerSecond:128e3});t.stream=e,t.startRecording(),o({isRecording:!0,recorder:t,recordingStartedAt:Date.now()})}))},loading:v,children:v?(0,V.jsxs)(V.Fragment,{children:["Recording... ",(0,V.jsx)("span",{children:(e=>{const t=Math.floor(e/60),l=e%60;return"".concat(t<10?"0".concat(t):t," :").concat(l<10?"0".concat(l):l)})(m)})," "]}):"Start Recording"}),(0,V.jsx)(k.ZP,{block:s.tq,htmlType:"button",onClick:T,disabled:!v,children:"Stop Recording"}),(0,V.jsx)(k.ZP,{block:s.tq,type:"primary",htmlType:"button",loading:w,onClick:async()=>{const e=new FormData;e.append("duration",h),e.append("audio",a,d||I()),j((0,i.vw)(e)),o({blob:null,audioName:""})},disabled:!a||v,children:"Save Recording"})]})]}),(0,V.jsx)(B.Z,{style:{maxHeight:420,paddingRight:10},children:(0,V.jsx)(b.Z,{size:"small",footer:!1,bordered:!1,loading:y,dataSource:N,header:"Available Audios",renderItem:(e,t)=>{let{_id:l,name:o}=e;return(0,V.jsx)(b.Z.Item,{className:"pl-0 pr-0",actions:[(0,V.jsx)(U.Z,{okText:"Yes",cancelText:"No",title:"Delete",onConfirm:()=>j((0,i._I)(l)),description:"Are you sure to delete this Audio?",children:(0,V.jsx)(k.ZP,{danger:!0,size:"small",children:"Delete"})},"delete")],children:(0,V.jsx)(b.Z.Item.Meta,{title:"".concat(t+1,". ").concat(o),style:{alignItems:"center"}})})}})})]})]})}var Q=l(85379);function K(e){let{open:t,onCancel:l}=e;return(0,V.jsx)(R.Z,{centered:!0,open:t,footer:!1,title:"Suggestions",onCancel:l,children:(0,V.jsx)(B.Z,{style:{maxHeight:"calc(100vh - 200px)",paddingRight:10},children:(0,V.jsx)(b.Z,{size:"small",header:!1,footer:!1,bordered:!1,dataSource:["BENEFIT TO VOTER:","Learn 3 mistakes to avoid...","Hear the juicy details","Ask Anything & Hear The Answer","Make our podcast perfect for you...","Have us discuss what you want to know","Hear some step by step instructions","Get free help from our guest speaker"],renderItem:(e,t)=>(0,V.jsxs)(b.Z.Item,{className:"pl-0 pr-0",children:[t+1,". ",(0,V.jsx)(p.default.Text,{copyable:!0,children:e})]})})})})}const{Option:J}=E.default,{Dragger:X}=q.default,{Text:$,Paragraph:ee}=p.default;function te(){const{user:e}=(0,c.E)(),t=g.Z.useFormInstance(),l=g.Z.useWatch("audioDuration",t),o=g.Z.useWatch("socialShareFileSrc",t),[a,d]=(0,n.useState)(0),[m,h]=(0,n.useState)(!1),[p,v]=(0,n.useState)(!1),[f,j]=(0,n.useState)(!1),[S,y]=(0,n.useState)(!1),w=(0,r.I0)(),{files:N,isLoading:I,isUploading:T}=(0,r.v9)((e=>e.files)),A=N.filter((e=>{let{type:t}=e;return t===u.G.IMAGE})),q=e=>["pollSharingImage",e],H=e=>{let{label:l,title:o,formType:a}=e;return(0,V.jsxs)("div",{className:"flex-item gap-2 mb-2 ".concat(s.tq&&"flex-column full-width-cols"),children:[(0,V.jsx)(g.Z.Item,{label:l,name:q("".concat(a,"Text")),className:s.tq?"w-100":"w-40 m-0",rules:[{max:45,message:"Maximum 45 character are allowed."}],children:(0,V.jsx)(x.Z,{maxLength:45,placeholder:"Enter the text here",suffix:(0,V.jsx)(P.Z,{title:"Show Suggestions",children:(0,V.jsx)(k.ZP,{type:"text",size:"small",icon:(0,V.jsx)(_.Z,{}),onClick:()=>v(!0)})})})}),(0,V.jsx)(g.Z.Item,{className:"flex-1 m-0",label:"".concat(o," BG COLOR"),name:q("".concat(a,"BgColor")),children:(0,V.jsx)(C.Z,{showText:!0,onChangeComplete:e=>t.setFieldValue(q("".concat(a,"BgColor")),e.toHexString())})}),(0,V.jsx)(g.Z.Item,{className:"flex-1 m-0",label:"".concat(o," TEXT COLOR"),name:q("".concat(a,"TextColor")),children:(0,V.jsx)(C.Z,{showText:!0,onChangeComplete:e=>t.setFieldValue(q("".concat(a,"TextColor")),e.toHexString())})})]})},z=[{key:"pollSharingImage",label:"Customize Automation Sharing Image",children:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)("div",{className:"flex-item gap-2 mb-2 ".concat(s.tq&&"flex-column"),children:[(0,V.jsx)(g.Z.Item,{label:"LOGO IMAGE FROM",name:q("logo"),className:"m-0 ".concat(s.tq?"w-100":"w-40"),children:(0,V.jsx)(E.default,{loading:I,disabled:I,className:"minw-200px",placeholder:"Select an Image",children:A.map((e=>{let{_id:t,name:l,s3Path:o}=e;return(0,V.jsxs)(J,{value:t,children:[(0,V.jsx)(O.C,{src:(0,Z.fE)(o),size:32}),(0,V.jsx)($,{style:{marginLeft:5},children:l})]},t)}))})}),(0,V.jsx)(k.ZP,{type:"link",block:s.tq,icon:(0,V.jsx)(G.Z,{}),onClick:()=>j(!0),children:"ADD/MANAGE IMAGES"})]}),(0,V.jsx)(H,{label:"HEADLINE HOOK",title:"HEADLINE",formType:"header"}),(0,V.jsx)(H,{label:"FOOTER BENEFIT",title:"FOOTER",formType:"footer"}),(0,V.jsx)(W,{name:q("audio")}),(0,V.jsxs)("div",{className:"flex-item gap-2 mt-4 ".concat(s.tq&&"flex-column"),children:[(0,V.jsx)(k.ZP,{danger:!0,type:"primary",block:s.tq,loading:m,onClick:async()=>{var o,a,n;const s=t.getFieldsValue(),{audio:r,guest:c,pollSharingImage:u,hostSpeakerLabel:m,guestSpeakerLabel:p}=s,g={...u,audio:r,userLogo:(null===c||void 0===c?void 0:c.picture)||"",showLogo:null===(o=A.find((e=>{let{_id:t}=e;return t===u.logo})))||void 0===o?void 0:o.s3Path,host:{fontColor:"#000000",label:m,text:"".concat(e.firstName," ").concat(e.lastName," ").concat(null!==e&&void 0!==e&&null!==(a=e.profile)&&void 0!==a&&a.organization?"(".concat(null===e||void 0===e||null===(n=e.profile)||void 0===n?void 0:n.organization,")"):"")},guest:{fontColor:"#000000",label:p,text:"".concat(c.fullName," ").concat(c.organization?"(".concat(c.organization,")"):"")}};if(!g.userLogo)return F.ZP.error({message:"Error",description:"Please upload your headshot image first."});if(!g.showLogo)return F.ZP.error({message:"Error",description:"Please select a logo image"});h(!0),d(l||60);try{const{imageS3Path:e,videoS3Path:l}=await(0,i.TQ)(g);t.setFieldValue("pollImageSrc",e),l&&t.setFieldValue("socialShareFileSrc",l),F.ZP.success({message:"Success",description:"Automation sharing image generated successfully"})}catch(x){console.error(x),F.ZP.error({message:"Error",description:"Something went wrong"})}finally{h(!1)}},children:"Generate Video Invitation Post"}),(0,V.jsx)(k.ZP,{type:"default",block:s.tq,disabled:!o,onClick:()=>y(!0),children:"Preview Video Invitation Post"}),(0,V.jsx)(R.Z,{centered:!0,footer:!1,open:S,width:s.tq?"100%":"50%",title:"Preview Video Invitation Post",onCancel:()=>y(!1),children:(0,V.jsx)("video",{controls:!0,src:(0,Z.fE)(o),style:{width:"100%",height:"auto"}})})]})]})}],Y={name:"file",multiple:!0,showUploadList:!1,accept:".png, .gif, .jpeg, .jpg",customRequest:async e=>{let{file:t}=e;const l=new FileReader;l.readAsDataURL(t),l.onload=async()=>{const e=l.result.split(",")[1],o={images:[{name:t.name,imageData:"data:".concat(t.type,";base64,").concat(e)}]};w((0,i.eg)(o))}},onDrop(e){console.log("Dropped files",e.dataTransfer.files)}};return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Q.Z,{items:z,defaultActive:"pollSharingImage"}),(0,V.jsx)(K,{open:p,onCancel:()=>v(!1)}),(0,V.jsxs)(R.Z,{centered:!0,footer:!1,title:"Add/Manage Images",open:f,onCancel:()=>j(!1),children:[(0,V.jsx)(ee,{children:"Add New Image"}),(0,V.jsx)(L.Z,{spinning:T,tip:"Uploading...",children:(0,V.jsxs)(X,{...Y,children:[(0,V.jsx)("p",{className:"ant-upload-drag-icon",children:(0,V.jsx)(M.Z,{})}),(0,V.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"}),(0,V.jsx)("p",{className:"ant-upload-hint",children:"Supported file types: PNG/JPG/JPEG"})]})}),(0,V.jsx)(B.Z,{style:{maxHeight:420,paddingRight:10},children:(0,V.jsx)(b.Z,{size:"small",footer:!1,bordered:!1,loading:I,dataSource:A,header:"Available Images",renderItem:e=>{let{_id:t,name:l,s3Path:o}=e;return(0,V.jsx)(b.Z.Item,{actions:[(0,V.jsx)(U.Z,{okText:"Yes",cancelText:"No",title:"Delete Image",onConfirm:()=>w((0,i._I)(t)),description:"Are you sure to delete this image?",children:(0,V.jsx)(k.ZP,{danger:!0,size:"small",children:"Delete"})},"delete")],className:"pl-0 pr-0",children:(0,V.jsx)(b.Z.Item.Meta,{title:l,style:{alignItems:"center"},avatar:(0,V.jsx)(O.C,{src:(0,Z.fE)(o)})})})}})})]}),(0,V.jsxs)(R.Z,{centered:!0,footer:!1,destroyOnClose:!0,closable:!1,keyboard:!1,open:m,maskClosable:!1,title:"Video is getting Generated...",children:[(0,V.jsx)(ee,{className:"mt-2",children:"Please wait while we generate your video. This may take a few minutes."}),(0,V.jsx)(D.Z.Countdown,{format:"mm:ss",title:"Estimated Time:",className:"text-center wait-countdown",value:Date.now()+3*a*1e3,onFinish:()=>d(l||60)})]})]})}var le=l(46417),oe=l(34820);const{Text:ae,Title:ne,Paragraph:se}=p.default,{HOST_GUEST:ie,SOLO_SESSION:re}=u.GUEST_TYPE,ce=[{label:"FULL NAME",name:["guest","fullName"],rules:[{required:!0}]},{label:"CELL PHONE",name:["guest","phone"]},{label:"EMAIL ADDRESS",name:["guest","email"],rules:[{required:!0}]},{name:["guest","about"],label:"BIO OR SOCIAL URL"},{name:["guest","jobTitle"],label:"JOB TITLE"},{name:["guest","organization"],label:"ORGANIZATION"}],de=["TOPIC OR STORY1","TOPIC OR STORY2"],ue=[{name:"hostSpeakerLabel",label:"YOUR SPEAKER LABEL"},{name:"guestSpeakerLabel",label:"THEIR SPEAKER LABEL"},{name:"hostOfferUrl",label:"YOUR REWARD URL"},{name:"guestOfferUrl",label:"THEIR REWARD URL"},{required:!0,name:"presentationName",label:"Name of presentation or podcast"}],me=function(){var e,t,l,o,a;let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{email:null===n||void 0===n?void 0:n.email,phone:n?null===(e=n.profile)||void 0===e?void 0:e.phone:"",about:n?null===n||void 0===n||null===(t=n.profile)||void 0===t?void 0:t.about:"",picture:n?null===n||void 0===n||null===(l=n.profile)||void 0===l?void 0:l.picture:"",jobTitle:n?null===n||void 0===n||null===(o=n.profile)||void 0===o?void 0:o.jobTitle:"",organization:n?null===n||void 0===n||null===(a=n.profile)||void 0===a?void 0:a.organization:"",fullName:n?"".concat(null===n||void 0===n?void 0:n.firstName," ").concat(null===n||void 0===n?void 0:n.lastName):""}},he=e=>{const{logo:t,header:l=null,footer:o=null}=e||{};return{logo:t,headerText:l&&(null===l||void 0===l?void 0:l.text)||"",headerBgColor:l&&(null===l||void 0===l?void 0:l.bgColor)||"#1677FF",headerTextColor:l&&l.textColor||"#FFFFFF",footerText:o&&(null===o||void 0===o?void 0:o.text)||"",footerBgColor:o&&(null===o||void 0===o?void 0:o.bgColor)||"#1677FF",footerTextColor:o&&(null===o||void 0===o?void 0:o.textColor)||"#FFFFFF"}};function pe(e){var t;let{isGuestAcceptance:l=!1}=e;const{id:o}=(0,d.UO)(),[p]=g.Z.useForm(),Z=(0,r.I0)(),E=(0,d.s0)(),{user:q}=(0,c.E)(),[P,C]=(0,n.useState)(1),F=void 0===o,O=g.Z.useWatch("guestType",p),R=O===re,{guest:L,error:U,isLoading:D,isPublished:_,isPublishing:G}=(0,r.v9)((e=>e.guests)),{audio:M=null,socials:B=[],guest:H,pollImageSrc:z="",pollImageInfo:Y=null,hostOfferUrl:W=null,guestOfferUrl:Q=null,recordingDate:K=null,presentationName:J="",guestType:X=ie,hostSpeakerLabel:$="",guestSpeakerLabel:ee="",socialShareFileSrc:pe="",potentialTopics:ge=["",""],startHostAutomation:xe=!1,emailTemplate:ve={subject:"[PRESENTATION_NAME] NEXT STEPS",body:"<blockquote>Hi [GUEST_FIRSTNAME], it's [USER_FULLNAME]. (To reach me, please reply all.) I use Upplaud to grow my audience; you can use it at no cost to reach more people too:</blockquote><blockquote>Can we post on our LinkedIn &amp; Facebook about [PODCAST / PRESENTATION NAME] before we do it? Upplaud makes it easy &amp; engaging. (See your private link &amp; password at the end.)</blockquote><blockquote>Here's how Upplaud grows our audience:</blockquote><blockquote>Instead of guessing what others want to know from both of us... Let's ask them! I chose 2 possible topics for our connections to vote on. They can even suggest their own topics privately.</blockquote><blockquote>I've already setup everything, including voting invitation posts for our Facebook &amp; LinkedIn. (It doesn't matter how active you are: Influencers on social media love engaging like this, and will share you with more people!)</blockquote><blockquote>We can also share our Upplaud voting page through email &amp; elsewhere. All you need to do is click the Grow Audience link below. It only takes a few seconds to connect your LinkedIn and/or Facebook to Upplaud. (I've connected mine already.)</blockquote><blockquote>Thanks for doing this now (and not procrastinating!) Every day counts to grow our audience: More time for more votes, more shares &amp; more results.</blockquote><blockquote>The link to click is below my name (be sure to reference your Private Password, to securely connect your social media). I'm excited to grow together.</blockquote><blockquote><br></blockquote><blockquote>Thanks again, see you soon. - [USER_FIRSTNAME]</blockquote><p><br></p>"}}=L||{};console.log("guest",L);const fe=(0,m.K6)((null===q||void 0===q?void 0:q.socialAccounts)||[]);(0,n.useEffect)((()=>(Z((0,i.bE)()),!F&&o&&Z((0,h.wY)(o)),F&&Z((0,h.xq)({guest:null,isPublished:!1})),()=>Z((0,h.xq)({guest:null})))),[F,o,Z]),(0,n.useEffect)((()=>(L&&p.resetFields(),()=>p.resetFields())),[L,p]),(0,n.useEffect)((()=>{const{email:e,phone:t,about:l,picture:o,fullName:a}=me(R?q:H);p.setFieldsValue({guest:{email:e,phone:t,about:l,picture:o,fullName:a}})}),[q,H,p,R]),(0,n.useEffect)((()=>(U&&403===U.status&&E("/403"),()=>Z((0,h.xq)({error:null})))),[U,E,Z]);const be={guestType:X,pollImageSrc:z,hostOfferUrl:W,emailTemplate:ve,guestOfferUrl:Q,potentialTopics:ge,presentationName:J,hostSpeakerLabel:$,guestSpeakerLabel:ee,socialShareFileSrc:pe,startHostAutomation:xe,audio:(null===M||void 0===M?void 0:M._id)||null,audioDuration:(null===M||void 0===M?void 0:M.duration)||0,guest:me(H),socials:B.length>0?B:fe,pollSharingImage:he(Y),recordingDate:K?a()(K,"YYYY/MM/DD"):null},je=e=>{p.validateFields().then((t=>{t.status=e,t.recordingDate=a()(null===t||void 0===t?void 0:t.recordingDate).format(),Z(F?(0,h.hw)(t):(0,h.sF)(o,t))})).catch(console.log)},Se=[{title:"Got your info",className:"pointer-none",content:(0,V.jsx)("span",{children:"current-user-details"})},{title:"Guest info",content:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(ne,{level:5,children:null===(t=(0,m.Ug)(O))||void 0===t?void 0:t.text}),ce.map((e=>{let{label:t,name:l,rules:o=null}=e;return(0,V.jsx)(g.Z.Item,{name:l,label:t,rules:R?null:o,children:(0,V.jsx)(x.Z,{placeholder:t,disabled:R})},t)})),(0,V.jsx)(g.Z.Item,{name:["guest","picture"],label:"HEADSHOT IMAGE",className:"m-0",children:(0,V.jsx)(A.Z,{picture:g.Z.useWatch(["guest","picture"],p),onChange:e=>p.setFieldValue(["guest","picture"],e)})})]})},{title:"Topics info",content:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(ne,{level:5,children:"Automation Info"}),de.map(((e,t)=>(0,V.jsx)(g.Z.Item,{label:e,rules:[{required:!0}],name:["potentialTopics",t],children:(0,V.jsx)(x.Z,{placeholder:e})},t))),ue.map(((e,t)=>{let{name:l,label:o,required:a=!1}=e;return(0,V.jsx)(g.Z.Item,{name:l,label:o,rules:[{required:a}],className:ue.length-1===t?"m-0":"",children:(0,V.jsx)(x.Z,{placeholder:o})},o)}))]})},{title:"Voter invites",content:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(te,{}),(0,V.jsx)(le.Z,{})]})},{title:"Guest invites",content:(0,V.jsxs)(v.Z,{gutter:[24],children:[(0,V.jsxs)(f.Z,{span:s.tq?24:18,children:[(0,V.jsx)(ne,{level:4,className:"mt-0",children:"Invite Email"}),(0,V.jsx)(se,{strong:!0,className:"mb-1",children:"Subject"}),(0,V.jsx)(g.Z.Item,{name:["emailTemplate","subject"],wrapperCol:24,children:(0,V.jsx)(x.Z,{placeholder:"Subject"})}),(0,V.jsx)(se,{strong:!0,className:"mb-1",children:"Body"}),(0,V.jsx)(T.Z,{name:["emailTemplate","body"],placeholder:"Enter your text here...",formItemParams:{className:"m-0",wrapperCol:24}})]}),(0,V.jsxs)(f.Z,{span:s.tq?24:6,children:[(0,V.jsx)(ne,{level:5,className:s.tq?"mt-2":"mt-0",children:"Short Codes"}),(0,V.jsx)(b.Z,{bordered:!0,size:"small",itemLayout:"horizontal",renderItem:e=>(0,V.jsx)(b.Z.Item,{children:e}),dataSource:["[USER_FIRSTNAME]","[USER_LASTNAME]","[USER_FULLNAME]","[GUEST_FIRSTNAME]","[GUEST_LASTNAME]","[GUEST_FULLNAME]","[PRESENTATION_NAME]"]})]})]})},{title:"UPPLAUD LAUNCH",content:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(g.Z.Item,{name:"recordingDate",label:"Automation End Date",rules:[{required:!0}],className:s.tq?"w-100":"w-50 mt-4",children:(0,V.jsx)(j.Z,{className:s.tq?"w-100":"w-75 ml-0",disabledDate:e=>e&&(e<a()().subtract(1,"day")||e>a()().add(1,"years"))})}),(0,V.jsxs)("div",{className:"flex-item position-relative",children:[(0,V.jsx)(g.Z.Item,{className:"m-0",labelCol:{span:20},valuePropName:"checked",label:"POSTING STARTS NOW",name:"startHostAutomation",children:(0,V.jsx)(S.Z,{disabled:R})}),(0,V.jsx)(ae,{type:"secondary",className:"ml-1",style:{...s.tq&&{left:50,bottom:10,position:"absolute"}},children:"Start when they starts"})]}),(0,V.jsxs)(y.Z,{className:"mt-4 w-100",size:s.tq?12:20,direction:s.tq?"vertical":"horizontal",children:[(0,V.jsx)(k.ZP,{block:s.tq,onClick:()=>C((e=>e-1)),children:"Back"}),(0,V.jsx)(k.ZP,{block:s.tq,loading:D&&!G,onClick:()=>je(u.POLL_STATUS.DRAFT),children:"SAVE DRAFT"}),(0,V.jsx)(k.ZP,{type:"primary",block:s.tq,loading:D&&G,onClick:()=>je(u.POLL_STATUS.PUBLISHED),children:"LAUNCH AUTOMATION"})]})]})}];return(0,V.jsxs)("div",{className:"automation-form",children:[!l&&(0,V.jsx)(I.Z,{title:"".concat(F?"New":"Update"," Automation")}),(0,V.jsxs)("div",{className:"add-guest",children:[(0,V.jsx)(ne,{level:s.tq?3:1,className:"m-0",children:"NEW UPPLAUD AUTOMATION"}),!_&&(0,V.jsx)(ne,{level:5,className:"fw-400",type:"secondary",children:"Pull in more interest when your upplaud automation is posted automatically."})]}),!_&&(0,V.jsxs)(g.Z,{form:p,size:"large",labelWrap:!0,labelAlign:"left",layout:"horizontal",labelCol:{span:7},wrapperCol:{span:17},initialValues:be,children:[(0,V.jsx)(g.Z.Item,{hidden:!0,name:"pollImageSrc",label:"Poll Image",children:(0,V.jsx)(x.Z,{placeholder:"Poll Image"})}),(0,V.jsx)(g.Z.Item,{hidden:!0,name:"socialShareFileSrc",label:"Social Share File",children:(0,V.jsx)(x.Z,{placeholder:"Social Share File"})}),(0,V.jsx)(g.Z.Item,{name:"guestType",className:"mb-1",children:(0,V.jsx)(w.ZP.Group,{options:m.Qg})}),(0,V.jsx)(ne,{level:4,className:"mt-0",children:"Quick Steps:"}),(0,V.jsx)(N.Z,{current:P,items:Se,onChange:C}),Se.map(((e,t)=>(0,V.jsx)("div",{className:"mt-2 mb-2",style:{display:P===t?"block":"none"},children:null===e||void 0===e?void 0:e.content},t))),P!==Se.length-1&&(0,V.jsxs)("div",{className:"flex-item gap-1 flex-center",children:[P<Se.length-1&&(0,V.jsx)(k.ZP,{block:s.tq,type:"primary",onClick:()=>{C((e=>e+1))},children:"Next Step"}),P>1&&(0,V.jsx)(k.ZP,{block:s.tq,onClick:()=>C((e=>e-1)),children:"Back"})]})]}),_&&(0,V.jsx)(oe.Z,{guest:L,showActionBtns:!0,onGoBack:()=>Z((0,h.xq)({isPublished:!1}))})]})}},34820:(e,t,l)=>{l.d(t,{Z:()=>b});var o=l(78302),a=l(2556),n=l(60173),s=l(57689),i=l(11087),r=l(38072),c=l(908),d=l(99372),u=l(67575),m=l(80184);function h(e){let{text:t="",className:l="",onCopy:a=(()=>{})}=e;return(0,m.jsx)("div",{className:"p-1 br-5px bg-sky-6 border-sky-1 ".concat(l),children:(0,m.jsx)(o.default.Paragraph,{ellipsis:!0,copyable:{onCopy:a},className:"m-0 flex-item space-between",children:t})})}var p=l(72791),g=l(40959),x=l(33805);function v(e){let{text:t="",className:l="",socialShareFileSrc:a=""}=e;const[s,i]=(0,p.useState)(!1);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(o.default.Link,{className:l,onClick:()=>i(!0),children:t||"Preview Video"}),(0,m.jsx)(g.Z,{centered:!0,footer:!1,open:s,width:n.tq?"100%":"50%",title:"Preview Video Invitation Post",onCancel:()=>i(!1),children:(0,m.jsx)("video",{controls:!0,src:(0,x.fE)(a),style:{width:"100%",height:"auto"}})})]})}const{Title:f}=o.default;function b(e){let{guest:t,showActionBtns:l=!1,onGoBack:o=(()=>{})}=e;const p=(0,s.s0)(),g=(null===t||void 0===t?void 0:t.startHostAutomation)||!1,x=((null===t||void 0===t?void 0:t.socials)||[]).reduce(((e,t)=>{if(!t||!t.isConnected)return e;const{type:l,subType:o}=t;return[...e,"".concat(c.W[l]," ").concat(o)]}),[]);return(0,m.jsxs)("div",{className:"mt-2 bg-F7F3F9 br-5px ".concat(n.tq?"p-2":"p-3"),children:[(0,m.jsx)(f,{level:n.tq?4:3,children:"\ud83d\udc4f Congrats, your new Upplaud is ready to pull in new interest!"}),(0,m.jsxs)(f,{level:5,children:["Voters will be directed to:"," ",(0,m.jsx)(i.rU,{target:"_blank",to:"/vote/".concat(null===t||void 0===t?void 0:t._id),children:"Voting Page"})]}),(0,m.jsx)(f,{level:5,children:"You've connected:"}),(0,m.jsx)("ul",{children:x.map(((e,t)=>(0,m.jsx)("li",{className:"capitalize",children:e},t)))}),(0,m.jsxs)(f,{level:5,children:["Preview your voter invitation video:"," ",(0,m.jsx)(v,{className:"ml-1",socialShareFileSrc:null===t||void 0===t?void 0:t.socialShareFileSrc})," "]}),(0,m.jsxs)(f,{level:5,className:"mb-1",children:["Your guest will be invited to connect here:"," ",(0,m.jsx)(i.rU,{target:"_blank",to:"/guest-acceptance/".concat(null===t||void 0===t?void 0:t._id),children:"Guest Invitation Page"})]}),(0,m.jsxs)(f,{level:5,className:"mt-0 ".concat(n.tq&&"mb-0"),children:["Their private invite password is:"," ",(0,m.jsx)(h,{text:null===t||void 0===t?void 0:t.password,className:"d-inline-block ".concat(n.tq?"w-100":"w-125px ml-1")})]}),(0,m.jsxs)(f,{level:n.tq?5:4,className:n.tq&&"mt-2",children:["We'll start posting"," ",g?"when your guest connects their social media.":"later today!"]}),l&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a.ZP,{size:"large",type:"default",block:n.tq,onClick:o,icon:(0,m.jsx)(d.Z,{}),children:"Go back to make any changes."}),(0,m.jsx)(a.ZP,{size:"large",type:"primary",block:n.tq,icon:(0,m.jsx)(u.Z,{}),className:"d-block mt-2 text-wrap",onClick:()=>p(r.PATH_DASHBOARD.dashboard.automations),children:"CONFIRM YOUR NEW UPPLAUD & SEE YOUR OTHER AUTOMATIONS"})]})]})}},46417:(e,t,l)=>{l.d(t,{Z:()=>p});var o=l(85379),a=l(60173),n=l(18406),s=l(29966),i=l(93070),r=l(89862),c=l(97412),d=l(61431),u=l(2556),m=l(71234),h=l(80184);function p(){const e=i.Z.useFormInstance(),t=i.Z.useWatch("socials",e)||[],l=[4,3,2,1].map((e=>({value:e,label:"Post [".concat(e,"x] monthly")}))),p=(l,o,a)=>{const n=t.map((e=>e._id===l?{...e,[o]:a}:e));e.setFieldValue("socials",n)},g=t.length>0,x=[{key:"social",label:"Confirm Socials & Posting Frequency",children:(0,h.jsxs)("div",{className:"flex-item gap-1 flex-column align-baseline",children:[(0,h.jsx)(i.Z.Item,{name:"socials",hidden:!0,children:(0,h.jsx)("input",{})}),g&&t.map((e=>{let{_id:t,type:o,subType:i,subTypeName:m="",isActive:g,frequency:x,isConnected:v}=e;return(0,h.jsxs)("div",{className:"flex-item gap-1 flex-auto ".concat(a.tq&&"flex-column w-100"),children:[(0,h.jsx)(r.Z,{checked:g,disabled:!v,className:"uppercase ".concat(a.tq&&"w-100"),onChange:e=>p(t,"isActive",e.target.checked),children:(0,n.dh)(o,i,m)}),(0,h.jsx)(c.default,{size:"small",defaultValue:4,value:x,placeholder:"Select",disabled:!v,options:l,style:{minWidth:200},className:a.tq&&"w-100",onChange:e=>p(t,"frequency",e)}),!v&&(0,h.jsx)(d.Z,{color:"red",arrow:!1,title:"Please connect your social account to enable this automation.",children:(0,h.jsxs)(u.ZP,{danger:!0,type:"text",size:"small",shape:"circle",block:a.tq,icon:(0,h.jsx)(s.Z,{}),children:["Account Disconnected"," "]})})]},t)})),!g&&(0,h.jsx)(m.Z,{showIcon:!0,style:{fontWeight:600},message:"No social media accounts found. Please connect your social media accounts first."})]})}];return(0,h.jsx)(o.Z,{items:x,defaultActive:"social",marginBottom:!1})}},34105:(e,t,l)=>{l.d(t,{Z:()=>g});var o=l(49367),a=l(2556),n=l(58533),s=l(72791),i=l(57960),r=l(76452),c=l(20043),d=l(12584),u=l(80184);function m(e){let{onComplete:t,children:l,cropShape:o="round",aspect:a=1}=e;const[m,h]=(0,s.useState)(!1),p=e=>!!["image/png","image/jpg","image/jpeg"].includes(e.type.toLowerCase())||(i.ZP.error("You can only upload JPG/PNG file!"),!1),g={name:"file",beforeUpload:p,multiple:!1,showUploadList:!1,accept:".png, .jpeg, .jpg",customRequest:e=>{let{file:l}=e;const o=new FileReader;o.onloadend=async()=>{try{h(!0);const e=await(0,d.Vg)({imageData:o.result});h(!1),t(null===e||void 0===e?void 0:e.s3Path)}catch(e){console.log(e),h(!1)}},o.readAsDataURL(l)}};return(0,u.jsx)(n.Z,{showReset:!0,rotationSlider:!0,aspect:a,modalOk:"Upload",cropShape:o,fillColor:"transparent",beforeCrop:p,children:(0,u.jsx)(r.default,{...g,children:(0,u.jsx)(c.Z,{spinning:m,children:l})})})}var h=l(72351),p=l(33805);function g(e){let{picture:t="",onChange:l}=e;const n=t?t.startsWith("http")?t:(0,p.fE)(t):null;return(0,u.jsxs)("div",{className:"flex-item",children:[n&&(0,u.jsx)(o.C,{size:"large",src:n}),(0,u.jsx)(m,{onComplete:l,children:(0,u.jsxs)(a.ZP,{icon:(0,u.jsx)(h.Z,{}),children:["Click to ",n?"Change":"Upload"]})})]})}},18406:(e,t,l)=>{l.d(t,{K6:()=>v,MD:()=>f,Qg:()=>p,Ug:()=>g,dh:()=>x,fh:()=>h,mr:()=>m});var o=l(25415),a=l(908);const{FACEBOOK:n}=a.SOCIAL_TYPE,{HOST_GUEST:s,SOLO_SESSION:i}=a.GUEST_TYPE,{PROFILE:r,PAGE:c,GROUP:d}=a.SOCIAL_SUB_TYPE,u=["##E91E63","#673AB7","#2196F3","#00BCD4","#FF9800","#8BC34A","#009688","#FF5722","#607D8B","#F44336"],m=()=>u[Math.floor(Math.random()*u.length)],h=e=>new Date(e).toDateString(),p=[{key:s,value:s,label:"JOINT SESSION",text:"Their Info"},{key:i,value:i,label:"SOLO SESSION",text:"Your Info"}],g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s;return p.find((t=>t.key===e))},x=function(e,t){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";const o=(e=>a.W[e])(e);return t===r?"YOUR ".concat(o," PROFILE"):t===c?"YOUR ".concat(o," PAGE: ").concat(l):t===d?"YOUR ".concat(o," GROUP: ").concat(l):""},v=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(((e,t)=>{if(null===t||void 0===t||!t.isConnected)return e;const{type:l,socialId:o,page:a,group:s}=t,i=function(e,t){return{type:l,subType:e,frequency:arguments.length>3&&void 0!==arguments[3]?arguments[3]:4,subTypeId:t,subTypeName:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",isActive:!1,_id:"".concat(l,"_").concat(e),isConnected:(t||"").toString().length>0}},u=e=>{var t;return(null===e||void 0===e||null===(t=e.accounts.find((t=>{let{id:l}=t;return l===(null===e||void 0===e?void 0:e.socialId)})))||void 0===t?void 0:t.name)||""},m=[...e,i(r,o),i(c,null===a||void 0===a?void 0:a.socialId,u(a))];return l===n?[...m,i(d,null===s||void 0===s?void 0:s.socialId,u(a))]:m}),[])},f=e=>{const t=new o.Workbook,l=t.addWorksheet("Voting Data"),{questionnaireAnswers:a=[]}=e[0]||{},[n,s,i,r]=a;l.columns=[{header:"Selected Topic",key:"topic"},{header:"Voter Name",key:"voter_name"},{header:"Voter Email",key:"voter_email"},{header:"Voter Cell Phone",key:"voter_cellphone"},{header:"User Suggested",key:"isSuggestion"},{header:"Suggested Topic",key:"suggested_topic"},{header:"Suggested Speaker",key:"suggested_speaker"},{header:"Question 1: ".concat(null===n||void 0===n?void 0:n.question),key:"quest1"},{header:"Question 2: ".concat(null===s||void 0===s?void 0:s.question),key:"quest2"},{header:"Referral 1",key:"quest2_referral1"},{header:"Referral 2",key:"quest2_referral2"},{header:"Name",key:"quest2_name"},{header:"Email",key:"quest2_email"},{header:"Question 3: ".concat(null===i||void 0===i?void 0:i.question),key:"quest3"},{header:"Question 4: ".concat(null===r||void 0===r?void 0:r.question),key:"quest4"},{header:"Timestamp",key:"timestamp"}],e.forEach((e=>{var t,o,a,n,s,i;const{selectedTopic:r,voter:c,isSuggestion:d,suggestions:u,createdAt:m,questionnaireAnswers:h}=e,[p,g,x,v]=h;l.addRow({topic:(null===r||void 0===r?void 0:r.topic)||"Other",voter_name:(null===c||void 0===c?void 0:c.name)||"--",voter_email:(null===c||void 0===c?void 0:c.email)||"--",voter_cellphone:(null===c||void 0===c?void 0:c.cell_phone)||"--",isSuggestion:d?"Yes":"No",suggested_topic:(null===u||void 0===u?void 0:u.topic)||"--",suggested_speaker:(null===u||void 0===u?void 0:u.speaker)||"--",quest1:p&&(null===p||void 0===p?void 0:p.answers)||"--",quest2:null!==g&&void 0!==g&&g.answers?"Comment: ".concat((null===g||void 0===g||null===(t=g.answers)||void 0===t?void 0:t.comment)||"--"):"--",quest2_referral1:(null===g||void 0===g||null===(o=g.answers)||void 0===o?void 0:o.referral1)||"--",quest2_referral2:(null===g||void 0===g||null===(a=g.answers)||void 0===a?void 0:a.referral2)||"--",quest2_name:(null===g||void 0===g||null===(n=g.answers)||void 0===n?void 0:n.name)||"--",quest2_email:(null===g||void 0===g||null===(s=g.answers)||void 0===s?void 0:s.email)||"--",quest3:x&&(null===x||void 0===x||null===(i=x.answers)||void 0===i?void 0:i.answer)||"--",quest4:v?null!==v&&void 0!==v&&v.doneSharing?"Yes":"No":"--",timestamp:new Date(m).toLocaleString()})})),t.xlsx.writeBuffer().then((e=>{const t=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=window.URL.createObjectURL(t),o=document.createElement("a");o.href=l,o.download="VotingData.xlsx",o.click()}))}}}]);
//# sourceMappingURL=330.f2da7c27.chunk.js.map