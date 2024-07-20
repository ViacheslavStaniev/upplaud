"use strict";(self.webpackChunkpdsq_frontend=self.webpackChunkpdsq_frontend||[]).push([[480],{85379:(e,t,l)=>{l.d(t,{Z:()=>i});var o=l(24925),a=l(92143),n=l(79286),s=l(80184);function i(e){let{items:t=[],defaultActive:l="",marginBottom:i=!0}=e;return(0,s.jsx)(o.Z,{items:t,bordered:!1,className:"bg-F7F3F9 ".concat(i?"mb-2":""),defaultActiveKey:l?[l]:[],expandIcon:e=>{let{isActive:t}=e;return t?(0,s.jsx)(a.Z,{}):(0,s.jsx)(n.Z,{})}})}},659:(e,t,l)=>{l.d(t,{Z:()=>i});var o=l(93070),a=l(66770),n=l.n(a),s=l(80184);function i(e){let{name:t,...l}=e;return(0,s.jsx)(o.Z.Item,{name:t,...null===l||void 0===l?void 0:l.formItemParams,children:(0,s.jsx)(n(),{theme:"snow",modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],["link","image"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"]]},...l})})}},50480:(e,t,l)=>{l.r(t),l.d(t,{default:()=>pe});var o=l(97892),a=l.n(o),n=l(83027),s=l.n(n),i=l(72791),r=l(60173),c=l(12584),d=l(59434),u=l(66862),m=l(57689),p=l(908),h=l(18406),g=l(48080),v=l(78302),x=l(93070),f=l(49389),b=l(66106),j=l(30914),y=l(88715),S=l(20512),k=l(21306),N=l(71046),I=l(2556),T=l(74424),w=l(19517),E=l(83769),Z=l(659),A=l(34105),q=l(33805),P=l(97412),C=l(76452),O=l(61431),F=l(54192),U=l(64162),L=l(49367),R=l(40959),_=l(20043),D=l(91082),G=l(1429),M=l(28624),H=l(79286),B=l(66776),z=l(94729),V=l(85379),W=l(80184);function Y(e){let{open:t,onCancel:l}=e;return(0,W.jsx)(R.Z,{centered:!0,open:t,footer:!1,title:"Suggestions",onCancel:l,children:(0,W.jsx)(z.Z,{style:{maxHeight:"calc(100vh - 200px)",paddingRight:10},children:(0,W.jsx)(y.Z,{size:"small",header:!1,footer:!1,bordered:!1,dataSource:["BENEFIT TO VOTER:","Learn 3 mistakes to avoid...","Hear the juicy details","Ask Anything & Hear The Answer","Make our podcast perfect for you...","Have us discuss what you want to know","Hear some step by step instructions","Get free help from our guest speaker"],renderItem:(e,t)=>(0,W.jsxs)(y.Z.Item,{className:"pl-0 pr-0",children:[t+1,". ",(0,W.jsx)(v.default.Text,{copyable:!0,children:e})]})})})})}var Q=l(85442);const{Option:K}=P.default,{Dragger:J}=C.default,{Text:X,Paragraph:$}=v.default;function ee(){const{user:e}=(0,u.E)(),t=x.Z.useFormInstance(),l=x.Z.useWatch("pollImageSrc",t),o=x.Z.useWatch("audioDuration",t),[a,n]=(0,i.useState)(0),[s,m]=(0,i.useState)(!1),[h,g]=(0,i.useState)(!1),[v,b]=(0,i.useState)(!1),j=(0,d.I0)(),{files:S,isLoading:k,isUploading:N}=(0,d.v9)((e=>e.files)),T=S.filter((e=>{let{type:t}=e;return t===p.G.IMAGE})),w=e=>["pollSharingImage",e],E=e=>{let{label:l,title:o,formType:a}=e;return(0,W.jsxs)("div",{className:"flex-item gap-2 mb-2 ".concat(r.tq&&"flex-column full-width-cols"),children:[(0,W.jsx)(x.Z.Item,{label:l,name:w("".concat(a,"Text")),className:r.tq?"w-100":"w-40 m-0",rules:[{max:45,message:"Maximum 45 character are allowed."}],children:(0,W.jsx)(f.Z,{maxLength:45,placeholder:"Enter the text here",suffix:(0,W.jsx)(O.Z,{title:"Show Suggestions",children:(0,W.jsx)(I.ZP,{type:"text",size:"small",icon:(0,W.jsx)(M.Z,{}),onClick:()=>g(!0)})})})}),(0,W.jsx)(x.Z.Item,{className:"flex-1 m-0",label:"".concat(o," BG COLOR"),name:w("".concat(a,"BgColor")),children:(0,W.jsx)(F.Z,{showText:!0,onChangeComplete:e=>t.setFieldValue(w("".concat(a,"BgColor")),e.toHexString())})}),(0,W.jsx)(x.Z.Item,{className:"flex-1 m-0",label:"".concat(o," TEXT COLOR"),name:w("".concat(a,"TextColor")),children:(0,W.jsx)(F.Z,{showText:!0,onChangeComplete:e=>t.setFieldValue(w("".concat(a,"TextColor")),e.toHexString())})})]})},Z=[{key:"pollSharingImage",label:"Customize Automation Sharing Image",children:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)("div",{className:"flex-item gap-2 mb-2 ".concat(r.tq&&"flex-column"),children:[(0,W.jsx)(x.Z.Item,{label:"LOGO IMAGE FROM",name:w("logo"),className:"m-0 ".concat(r.tq?"w-100":"w-40"),children:(0,W.jsx)(P.default,{loading:k,disabled:k,className:"minw-200px",placeholder:"Select an Image",children:T.map((e=>{let{_id:t,name:l,s3Path:o}=e;return(0,W.jsxs)(K,{value:t,children:[(0,W.jsx)(L.C,{src:(0,q.fE)(o),size:32}),(0,W.jsx)(X,{style:{marginLeft:5},children:l})]},t)}))})}),(0,W.jsx)(I.ZP,{type:"link",block:r.tq,icon:(0,W.jsx)(H.Z,{}),onClick:()=>b(!0),children:"ADD/MANAGE IMAGES"})]}),(0,W.jsx)(E,{label:"HEADLINE HOOK",title:"HEADLINE",formType:"header"}),(0,W.jsx)(E,{label:"FOOTER BENEFIT",title:"FOOTER",formType:"footer"}),(0,W.jsxs)("div",{className:"flex-item gap-2 mt-4 ".concat(r.tq&&"flex-column"),children:[(0,W.jsx)(I.ZP,{danger:!0,type:"primary",block:r.tq,loading:s,onClick:async()=>{var l,a,s;const i=t.getFieldsValue(),{audio:r,guest:d,pollSharingImage:u,hostSpeakerLabel:p,guestSpeakerLabel:h}=i,g={...u,audio:r,userLogo:(null===d||void 0===d?void 0:d.picture)||"",showLogo:null===(l=T.find((e=>{let{_id:t}=e;return t===u.logo})))||void 0===l?void 0:l.s3Path,host:{fontColor:"#000000",label:p,text:"".concat(e.firstName," ").concat(e.lastName," ").concat(null!==e&&void 0!==e&&null!==(a=e.profile)&&void 0!==a&&a.organization?"(".concat(null===e||void 0===e||null===(s=e.profile)||void 0===s?void 0:s.organization,")"):"")},guest:{fontColor:"#000000",label:h,text:"".concat(d.fullName," ").concat(d.organization?"(".concat(d.organization,")"):"")}};if(!g.userLogo)return U.ZP.error({message:"Error",description:"Please upload your headshot image first."});if(!g.showLogo)return U.ZP.error({message:"Error",description:"Please select a logo image"});m(!0),n(o||60);try{const{imageS3Path:e,videoS3Path:l}=await(0,c.TQ)(g);t.setFieldValue("pollImageSrc",e),l&&t.setFieldValue("socialShareFileSrc",l),U.ZP.success({message:"Success",description:"Automation sharing image generated successfully"})}catch(v){console.error(v),U.ZP.error({message:"Error",description:"Something went wrong"})}finally{m(!1)}},children:"Generate Invitation Post"}),(0,W.jsx)(Q.Z,{pollImageSrc:l,prevEl:(0,W.jsx)(I.ZP,{type:"default",block:r.tq,disabled:!l,children:"Preview Invitation Post"})})]})]})}],A={name:"file",multiple:!0,showUploadList:!1,accept:".png, .gif, .jpeg, .jpg",customRequest:async e=>{let{file:t}=e;const l=new FileReader;l.readAsDataURL(t),l.onload=async()=>{const e=l.result.split(",")[1],o={images:[{name:t.name,imageData:"data:".concat(t.type,";base64,").concat(e)}]};j((0,c.eg)(o))}},onDrop(e){console.log("Dropped files",e.dataTransfer.files)}};return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(V.Z,{items:Z,defaultActive:"pollSharingImage"}),(0,W.jsx)(Y,{open:h,onCancel:()=>g(!1)}),(0,W.jsxs)(R.Z,{centered:!0,footer:!1,title:"Add/Manage Images",open:v,onCancel:()=>b(!1),children:[(0,W.jsx)($,{children:"Add New Image"}),(0,W.jsx)(_.Z,{spinning:N,tip:"Uploading...",children:(0,W.jsxs)(J,{...A,children:[(0,W.jsx)("p",{className:"ant-upload-drag-icon",children:(0,W.jsx)(B.Z,{})}),(0,W.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"}),(0,W.jsx)("p",{className:"ant-upload-hint",children:"Supported file types: PNG/JPG/JPEG"})]})}),(0,W.jsx)(z.Z,{style:{maxHeight:420,paddingRight:10},children:(0,W.jsx)(y.Z,{size:"small",footer:!1,bordered:!1,loading:k,dataSource:T,header:"Available Images",renderItem:e=>{let{_id:t,name:l,s3Path:o}=e;return(0,W.jsx)(y.Z.Item,{actions:[(0,W.jsx)(D.Z,{okText:"Yes",cancelText:"No",title:"Delete Image",onConfirm:()=>j((0,c._I)(t)),description:"Are you sure to delete this image?",children:(0,W.jsx)(I.ZP,{danger:!0,size:"small",children:"Delete"})},"delete")],className:"pl-0 pr-0",children:(0,W.jsx)(y.Z.Item.Meta,{title:l,style:{alignItems:"center"},avatar:(0,W.jsx)(L.C,{src:(0,q.fE)(o)})})})}})})]}),(0,W.jsxs)(R.Z,{centered:!0,footer:!1,destroyOnClose:!0,closable:!1,keyboard:!1,open:s,maskClosable:!1,title:"Video is getting Generated...",children:[(0,W.jsx)($,{className:"mt-2",children:"Please wait while we generate your video. This may take a few minutes."}),(0,W.jsx)(G.Z.Countdown,{format:"mm:ss",title:"Estimated Time:",className:"text-center wait-countdown",value:Date.now()+3*a*1e3,onFinish:()=>n(o||60)})]})]})}var te=l(46417),le=l(64590);a().extend(s());const{Text:oe,Title:ae,Paragraph:ne}=v.default,{HOST_GUEST:se,SOLO_SESSION:ie}=p.GUEST_TYPE,re=[{label:"FULL NAME",name:["guest","fullName"],rules:[{required:!0}]},{label:"CELL PHONE",name:["guest","phone"]},{label:"EMAIL ADDRESS",name:["guest","email"],rules:[{required:!0}]},{name:["guest","about"],label:"BIO OR SOCIAL URL"},{name:["guest","jobTitle"],label:"JOB TITLE"},{name:["guest","organization"],label:"ORGANIZATION"}],ce=["TOPIC OR STORY1","TOPIC OR STORY2"],de=[{name:"hostSpeakerLabel",label:"YOUR SPEAKER LABEL"},{name:"guestSpeakerLabel",label:"THEIR SPEAKER LABEL"},{name:"hostOfferUrl",label:"YOUR REWARD URL"},{name:"guestOfferUrl",label:"THEIR REWARD URL"},{required:!0,name:"presentationName",label:"Name of presentation or podcast"}],ue=function(){var e,t,l,o,a;let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{email:null===n||void 0===n?void 0:n.email,phone:n?null===(e=n.profile)||void 0===e?void 0:e.phone:"",about:n?null===n||void 0===n||null===(t=n.profile)||void 0===t?void 0:t.about:"",picture:n?null===n||void 0===n||null===(l=n.profile)||void 0===l?void 0:l.picture:"",jobTitle:n?null===n||void 0===n||null===(o=n.profile)||void 0===o?void 0:o.jobTitle:"",organization:n?null===n||void 0===n||null===(a=n.profile)||void 0===a?void 0:a.organization:"",fullName:n?"".concat(null===n||void 0===n?void 0:n.firstName," ").concat(null===n||void 0===n?void 0:n.lastName):""}},me=e=>{const{logo:t,header:l=null,footer:o=null}=e||{};return{logo:t,headerText:l&&(null===l||void 0===l?void 0:l.text)||"",headerBgColor:l&&(null===l||void 0===l?void 0:l.bgColor)||"#1677FF",headerTextColor:l&&l.textColor||"#FFFFFF",footerText:o&&(null===o||void 0===o?void 0:o.text)||"",footerBgColor:o&&(null===o||void 0===o?void 0:o.bgColor)||"#1677FF",footerTextColor:o&&(null===o||void 0===o?void 0:o.textColor)||"#FFFFFF"}};function pe(e){var t;let{isGuestAcceptance:l=!1}=e;const{id:o}=(0,m.UO)(),[n]=x.Z.useForm(),s=(0,d.I0)(),v=(0,m.s0)(),{user:q}=(0,u.E)(),[P,C]=(0,i.useState)(1),O=void 0===o,F=x.Z.useWatch("guestType",n),U=F===ie,{guest:L,error:R,isLoading:_,isPublished:D,isPublishing:G}=(0,d.v9)((e=>e.guests)),{_id:M=null,audio:H=null,socials:B=[],guest:z,pollImageSrc:V="",pollImageInfo:Y=null,hostOfferUrl:Q=null,guestOfferUrl:K=null,recordingDate:J=null,presentationName:X="",guestType:$=se,hostSpeakerLabel:pe="",guestSpeakerLabel:he="",socialShareFileSrc:ge="",potentialTopics:ve=["",""],startHostAutomation:xe=!1,emailTemplate:fe={subject:"[PRESENTATION_NAME] NEXT STEPS",body:"<blockquote>Hi [GUEST_FIRSTNAME], it's [USER_FULLNAME]. (To reach me, please reply all.) I use Upplaud to grow my audience; you can use it at no cost to reach more people too:</blockquote><blockquote>Can we post on our LinkedIn &amp; Facebook about [PODCAST / PRESENTATION NAME] before we do it? Upplaud makes it easy &amp; engaging. (See your private link &amp; password at the end.)</blockquote><blockquote>Here's how Upplaud grows our audience:</blockquote><blockquote>Instead of guessing what others want to know from both of us... Let's ask them! I chose 2 possible topics for our connections to vote on. They can even suggest their own topics privately.</blockquote><blockquote>I've already setup everything, including voting invitation posts for our Facebook &amp; LinkedIn. (It doesn't matter how active you are: Influencers on social media love engaging like this, and will share you with more people!)</blockquote><blockquote>We can also share our Upplaud voting page through email &amp; elsewhere. All you need to do is click the Grow Audience link below. It only takes a few seconds to connect your LinkedIn and/or Facebook to Upplaud. (I've connected mine already.)</blockquote><blockquote>Thanks for doing this now (and not procrastinating!) Every day counts to grow our audience: More time for more votes, more shares &amp; more results.</blockquote><blockquote>The link to click is below my name (be sure to reference your Private Password, to securely connect your social media). I'm excited to grow together.</blockquote><blockquote><br></blockquote><blockquote>Thanks again, see you soon. - [USER_FIRSTNAME]</blockquote><p><br></p>"}}=L||{},be=(0,h.K6)((null===q||void 0===q?void 0:q.socialAccounts)||[]);(0,i.useEffect)((()=>(s((0,c.bE)()),!O&&o&&s((0,g.wY)(o)),O&&s((0,g.xq)({guest:null,isPublished:!1})),()=>s((0,g.xq)({guest:null})))),[O,o,s]),(0,i.useEffect)((()=>(L&&n.resetFields(),()=>n.resetFields())),[L,n]),(0,i.useEffect)((()=>{const{email:e,phone:t,about:l,picture:o,fullName:a}=ue(U?q:z);n.setFieldsValue({guest:{email:e,phone:t,about:l,picture:o,fullName:a}})}),[q,z,n,U]),(0,i.useEffect)((()=>(R&&403===R.status&&v("/403"),()=>s((0,g.xq)({error:null})))),[R,v,s]);const je={guestType:$,pollImageSrc:V,hostOfferUrl:Q,emailTemplate:fe,guestOfferUrl:K,potentialTopics:ve,presentationName:X,hostSpeakerLabel:pe,guestSpeakerLabel:he,socialShareFileSrc:ge,startHostAutomation:xe,audio:(null===H||void 0===H?void 0:H._id)||null,audioDuration:(null===H||void 0===H?void 0:H.duration)||0,guest:ue(z),socials:B.length>0?B:be,pollSharingImage:me(Y),recordingDate:J?a().utc(J).local():null},ye=e=>{n.validateFields().then((t=>{t.status=e,t.recordingDate=a()(null===t||void 0===t?void 0:t.recordingDate).format(),s(O&&!M?(0,g.hw)(t):(0,g.sF)(o||M,t))})).catch(console.log)},Se=[{title:"Got your info",className:"pointer-none",content:(0,W.jsx)("span",{children:"current-user-details"})},{title:"Guest info",content:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(ae,{level:5,children:null===(t=(0,h.Ug)(F))||void 0===t?void 0:t.text}),re.map((e=>{let{label:t,name:l,rules:o=null}=e;return(0,W.jsx)(x.Z.Item,{name:l,label:t,rules:U?null:o,children:(0,W.jsx)(f.Z,{placeholder:t,disabled:U})},t)})),(0,W.jsx)(x.Z.Item,{name:["guest","picture"],label:"HEADSHOT IMAGE",className:"m-0",children:(0,W.jsx)(A.Z,{picture:x.Z.useWatch(["guest","picture"],n),onChange:e=>n.setFieldValue(["guest","picture"],e)})})]})},{title:"Topics info",content:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(ae,{level:5,children:"Automation Info"}),ce.map(((e,t)=>(0,W.jsx)(x.Z.Item,{label:e,rules:[{required:!0}],name:["potentialTopics",t],children:(0,W.jsx)(f.Z,{placeholder:e})},t))),de.map(((e,t)=>{let{name:l,label:o,required:a=!1}=e;return(0,W.jsx)(x.Z.Item,{name:l,label:o,rules:[{required:a}],className:de.length-1===t?"m-0":"",children:(0,W.jsx)(f.Z,{placeholder:o})},o)}))]})},{title:"Voter invites",content:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(ee,{}),(0,W.jsx)(te.Z,{})]})},{title:"Guest invites",content:(0,W.jsxs)(b.Z,{gutter:[24],children:[(0,W.jsxs)(j.Z,{span:r.tq?24:18,children:[(0,W.jsx)(ae,{level:4,className:"mt-0",children:"Invite Email"}),(0,W.jsx)(ne,{strong:!0,className:"mb-1",children:"Subject"}),(0,W.jsx)(x.Z.Item,{name:["emailTemplate","subject"],wrapperCol:24,children:(0,W.jsx)(f.Z,{placeholder:"Subject"})}),(0,W.jsx)(ne,{strong:!0,className:"mb-1",children:"Body"}),(0,W.jsx)(Z.Z,{name:["emailTemplate","body"],placeholder:"Enter your text here...",formItemParams:{className:"m-0",wrapperCol:24}})]}),(0,W.jsxs)(j.Z,{span:r.tq?24:6,children:[(0,W.jsx)(ae,{level:5,className:r.tq?"mt-2":"mt-0",children:"Short Codes"}),(0,W.jsx)(y.Z,{bordered:!0,size:"small",itemLayout:"horizontal",renderItem:e=>(0,W.jsx)(y.Z.Item,{children:e}),dataSource:["[USER_FIRSTNAME]","[USER_LASTNAME]","[USER_FULLNAME]","[GUEST_FIRSTNAME]","[GUEST_LASTNAME]","[GUEST_FULLNAME]","[PRESENTATION_NAME]"]})]})]})},{title:"UPPLAUD LAUNCH",content:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(x.Z.Item,{name:"recordingDate",label:"Automation End Date",rules:[{required:!0}],className:r.tq?"w-100":"w-50 mt-4",children:(0,W.jsx)(S.Z,{className:r.tq?"w-100":"w-75 ml-0",disabledDate:e=>e&&(e<a()().subtract(1,"day")||e>a()().add(1,"years"))})}),(0,W.jsxs)("div",{className:"flex-item position-relative",children:[(0,W.jsx)(x.Z.Item,{className:"m-0",labelCol:{span:20},valuePropName:"checked",label:"POSTING STARTS NOW",name:"startHostAutomation",children:(0,W.jsx)(k.Z,{disabled:U})}),(0,W.jsx)(oe,{type:"secondary",className:"ml-1",style:{...r.tq&&{left:50,bottom:10,position:"absolute"}},children:"Start when they starts"})]}),(0,W.jsxs)(N.Z,{className:"mt-4 w-100",size:r.tq?12:20,direction:r.tq?"vertical":"horizontal",children:[(0,W.jsx)(I.ZP,{block:r.tq,onClick:()=>C((e=>e-1)),children:"Back"}),(0,W.jsx)(I.ZP,{block:r.tq,loading:_&&!G,onClick:()=>ye(p.POLL_STATUS.DRAFT),children:"SAVE DRAFT"}),(0,W.jsx)(I.ZP,{type:"primary",block:r.tq,loading:_&&G,onClick:()=>ye(p.POLL_STATUS.PUBLISHED),children:"LAUNCH AUTOMATION"})]})]})}];return(0,W.jsxs)("div",{className:"automation-form",children:[!l&&(0,W.jsx)(E.Z,{title:"".concat(O?"New":"Update"," Automation")}),(0,W.jsxs)("div",{className:"add-guest",children:[(0,W.jsx)(ae,{level:r.tq?3:1,className:"m-0",children:"NEW UPPLAUD AUTOMATION"}),!D&&(0,W.jsx)(ae,{level:5,className:"fw-400",type:"secondary",children:"Pull in more interest when your upplaud automation is posted automatically."})]}),!D&&(0,W.jsxs)(x.Z,{form:n,size:"large",labelWrap:!0,labelAlign:"left",layout:"horizontal",labelCol:{span:7},wrapperCol:{span:17},initialValues:je,children:[(0,W.jsx)(x.Z.Item,{hidden:!0,name:"pollImageSrc",label:"Poll Image",children:(0,W.jsx)(f.Z,{placeholder:"Poll Image"})}),(0,W.jsx)(x.Z.Item,{hidden:!0,name:"socialShareFileSrc",label:"Social Share File",children:(0,W.jsx)(f.Z,{placeholder:"Social Share File"})}),(0,W.jsx)(x.Z.Item,{name:"guestType",className:"mb-1",children:(0,W.jsx)(T.ZP.Group,{options:h.Qg})}),(0,W.jsx)(ae,{level:4,className:"mt-0",children:"Quick Steps:"}),(0,W.jsx)(w.Z,{current:P,items:Se,onChange:C}),Se.map(((e,t)=>(0,W.jsx)("div",{className:"mt-2 mb-2",style:{display:P===t?"block":"none"},children:null===e||void 0===e?void 0:e.content},t))),P!==Se.length-1&&(0,W.jsxs)("div",{className:"flex-item gap-1 flex-center",children:[P<Se.length-1&&(0,W.jsx)(I.ZP,{block:r.tq,type:"primary",onClick:()=>{C((e=>e+1))},children:"Next Step"}),P>1&&(0,W.jsx)(I.ZP,{block:r.tq,onClick:()=>C((e=>e-1)),children:"Back"})]})]}),D&&(0,W.jsx)(le.Z,{guest:L,showActionBtns:!0,onGoBack:()=>s((0,g.xq)({isPublished:!1}))})]})}},64590:(e,t,l)=>{l.d(t,{Z:()=>x});var o=l(78302),a=l(2556),n=l(60173),s=l(57689),i=l(11087),r=l(38072),c=l(908),d=l(66862),u=l(99372),m=l(67575),p=l(80184);function h(e){let{text:t="",className:l="",onCopy:a=(()=>{})}=e;return(0,p.jsx)("div",{className:"p-1 br-5px bg-sky-6 border-sky-1 ".concat(l),children:(0,p.jsx)(o.default.Paragraph,{ellipsis:!0,copyable:{onCopy:a},className:"m-0 flex-item space-between",children:t})})}var g=l(85442);const{Title:v}=o.default;function x(e){let{guest:t,showActionBtns:l=!1,onGoBack:o=(()=>{})}=e;const x=(0,s.s0)(),{user:f}=(0,d.E)(),b=(null===t||void 0===t?void 0:t.startHostAutomation)||!1,j=((null===t||void 0===t?void 0:t.socials)||[]).reduce(((e,t)=>{if(!t||!t.isConnected)return e;const{type:l,subType:o}=t;return[...e,"".concat(c.W[l]," ").concat(o)]}),[]);return(0,p.jsxs)("div",{className:"mt-2 bg-F7F3F9 br-5px ".concat(n.tq?"p-2":"p-3"),children:[(0,p.jsx)(v,{level:n.tq?4:3,children:"\ud83d\udc4f Congrats, your new Upplaud is ready to pull in new interest!"}),(0,p.jsxs)(v,{level:5,children:["Voters will be directed to:"," ",(0,p.jsx)(i.rU,{target:"_blank",to:"/vote/".concat(null===f||void 0===f?void 0:f.userName,"/").concat(null===t||void 0===t?void 0:t.uniqueId),children:"Voting Page"})]}),(0,p.jsx)(v,{level:5,children:"You've connected:"}),(0,p.jsx)("ul",{children:j.map(((e,t)=>(0,p.jsx)("li",{className:"capitalize",children:e},t)))}),(0,p.jsxs)(v,{level:5,children:["Preview your voter invitation post:"," ",(0,p.jsx)(g.Z,{className:"ml-1",pollImageSrc:null===t||void 0===t?void 0:t.pollImageSrc,prevEl:(0,p.jsx)(a.ZP,{size:"small",children:"Preview"})})]}),(0,p.jsxs)(v,{level:5,className:"mb-1",children:["Your guest will be invited to connect here:"," ",(0,p.jsx)(i.rU,{target:"_blank",to:"/guest-acceptance/".concat(null===f||void 0===f?void 0:f.userName,"/").concat(null===t||void 0===t?void 0:t.uniqueId),children:"Guest Invitation Page"})]}),(0,p.jsxs)(v,{level:5,className:"mt-0 ".concat(n.tq&&"mb-0"),children:["Their private invite password is:"," ",(0,p.jsx)(h,{text:null===t||void 0===t?void 0:t.password,className:"d-inline-block ".concat(n.tq?"w-100":"w-125px ml-1")})]}),(0,p.jsxs)(v,{level:n.tq?5:4,className:n.tq&&"mt-2",children:["We'll start posting"," ",b?"when your guest connects their social media.":"later today!"]}),l&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.ZP,{size:"large",type:"default",block:n.tq,onClick:o,icon:(0,p.jsx)(u.Z,{}),children:"Go back to make any changes."}),(0,p.jsx)(a.ZP,{size:"large",type:"primary",block:n.tq,icon:(0,p.jsx)(m.Z,{}),className:"d-block mt-2 text-wrap",onClick:()=>x(r.PATH_DASHBOARD.dashboard.automations),children:"CONFIRM YOUR NEW UPPLAUD & SEE YOUR OTHER AUTOMATIONS"})]})]})}},85442:(e,t,l)=>{l.d(t,{Z:()=>i});var o=l(48531),a=l(72791),n=l(33805),s=l(80184);function i(e){let{prevEl:t=null,className:l="",pollImageSrc:i=""}=e;const[r,c]=(0,a.useState)(!1);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:l,onClick:()=>c(!0),children:t||"Preview"}),(0,s.jsx)(o.Z,{style:{display:"none"},src:(0,n.fE)(i),preview:{visible:r,onVisibleChange:e=>c(e)}})]})}},46417:(e,t,l)=>{l.d(t,{Z:()=>h});var o=l(85379),a=l(60173),n=l(18406),s=l(29966),i=l(93070),r=l(89862),c=l(97412),d=l(61431),u=l(2556),m=l(71234),p=l(80184);function h(){const e=i.Z.useFormInstance(),t=i.Z.useWatch("socials",e)||[],l=[4,3,2,1].map((e=>({value:e,label:"Post [".concat(e,"x] monthly")}))),h=(l,o,a)=>{const n=t.map((e=>e._id===l?{...e,[o]:a}:e));e.setFieldValue("socials",n)},g=t.length>0,v=[{key:"social",label:"Confirm Socials & Posting Frequency",children:(0,p.jsxs)("div",{className:"flex-item gap-1 flex-column align-baseline",children:[(0,p.jsx)(i.Z.Item,{name:"socials",hidden:!0,children:(0,p.jsx)("input",{})}),g&&t.map((e=>{let{_id:t,type:o,subType:i,subTypeName:m="",isActive:g,frequency:v,isConnected:x}=e;return(0,p.jsxs)("div",{className:"flex-item gap-1 flex-auto ".concat(a.tq&&"flex-column w-100"),children:[(0,p.jsx)(r.Z,{checked:g,disabled:!x,className:"uppercase ".concat(a.tq&&"w-100"),onChange:e=>h(t,"isActive",e.target.checked),children:(0,n.dh)(o,i,m)}),(0,p.jsx)(c.default,{size:"small",defaultValue:4,value:v,placeholder:"Select",disabled:!x,options:l,style:{minWidth:200},className:a.tq&&"w-100",onChange:e=>h(t,"frequency",e)}),!x&&(0,p.jsx)(d.Z,{color:"red",arrow:!1,title:"Please connect your social account to enable this automation.",children:(0,p.jsxs)(u.ZP,{danger:!0,type:"text",size:"small",shape:"circle",block:a.tq,icon:(0,p.jsx)(s.Z,{}),children:["Account Disconnected"," "]})})]},t)})),!g&&(0,p.jsx)(m.Z,{showIcon:!0,style:{fontWeight:600},message:"No social media accounts found. Please connect your social media accounts first."})]})}];return(0,p.jsx)(o.Z,{items:v,defaultActive:"social",marginBottom:!1})}},34105:(e,t,l)=>{l.d(t,{Z:()=>g});var o=l(49367),a=l(2556),n=l(58533),s=l(72791),i=l(57960),r=l(76452),c=l(20043),d=l(12584),u=l(80184);function m(e){let{onComplete:t,children:l,cropShape:o="round",aspect:a=1}=e;const[m,p]=(0,s.useState)(!1),h=e=>!!["image/png","image/jpg","image/jpeg"].includes(e.type.toLowerCase())||(i.ZP.error("You can only upload JPG/PNG file!"),!1),g={name:"file",beforeUpload:h,multiple:!1,showUploadList:!1,accept:".png, .jpeg, .jpg",customRequest:e=>{let{file:l}=e;const o=new FileReader;o.onloadend=async()=>{try{p(!0);const e=await(0,d.Vg)({imageData:o.result});p(!1),t(null===e||void 0===e?void 0:e.s3Path)}catch(e){console.log(e),p(!1)}},o.readAsDataURL(l)}};return(0,u.jsx)(n.Z,{showReset:!0,rotationSlider:!0,aspect:a,modalOk:"Upload",cropShape:o,fillColor:"transparent",beforeCrop:h,children:(0,u.jsx)(r.default,{...g,children:(0,u.jsx)(c.Z,{spinning:m,children:l})})})}var p=l(72351),h=l(33805);function g(e){let{picture:t="",onChange:l}=e;const n=t?t.startsWith("http")?t:(0,h.fE)(t):null;return(0,u.jsxs)("div",{className:"flex-item",children:[n&&(0,u.jsx)(o.C,{size:"large",src:n}),(0,u.jsx)(m,{onComplete:l,children:(0,u.jsxs)(a.ZP,{icon:(0,u.jsx)(p.Z,{}),children:["Click to ",n?"Change":"Upload"]})})]})}},18406:(e,t,l)=>{l.d(t,{K6:()=>v,MD:()=>x,Qg:()=>p,Ug:()=>h,dh:()=>g,fh:()=>m,mr:()=>u});var o=l(25415),a=l(908);const{HOST_GUEST:n,SOLO_SESSION:s}=a.GUEST_TYPE,{PROFILE:i,PAGE:r,GROUP:c}=a.SOCIAL_SUB_TYPE,d=["##E91E63","#673AB7","#2196F3","#00BCD4","#FF9800","#8BC34A","#009688","#FF5722","#607D8B","#F44336"],u=()=>d[Math.floor(Math.random()*d.length)],m=e=>new Date(e).toDateString(),p=[{key:n,value:n,label:"JOINT SESSION",text:"Their Info"},{key:s,value:s,label:"SOLO SESSION",text:"Your Info"}],h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n;return p.find((t=>t.key===e))},g=function(e,t){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";const o=(e=>a.W[e])(e);return t===i?"YOUR ".concat(o," PROFILE"):t===r?"YOUR ".concat(o," PAGE: ").concat(l):t===c?"YOUR ".concat(o," GROUP: ").concat(l):""},v=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(((e,t)=>{if(null===t||void 0===t||!t.isConnected)return e;const{type:l,socialId:o,page:a}=t,n=function(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:4;const n=(t||"").toString().length>0;return{type:l,subType:e,frequency:a,subTypeId:t,subTypeName:o,isConnected:n,isActive:n,_id:"".concat(l,"_").concat(e)}};return[...e,n(i,o),n(r,null===a||void 0===a?void 0:a.socialId,(e=>{var t;return(null===e||void 0===e||null===(t=e.accounts.find((t=>{let{id:l}=t;return l===(null===e||void 0===e?void 0:e.socialId)})))||void 0===t?void 0:t.name)||""})(a))]}),[])},x=e=>{const t=new o.Workbook,l=t.addWorksheet("Voting Data"),{questionnaireAnswers:a=[]}=e[0]||{},[n,s,i,r]=a;l.columns=[{header:"Selected Topic",key:"topic"},{header:"Voter Name",key:"voter_name"},{header:"Voter Email",key:"voter_email"},{header:"Voter Cell Phone",key:"voter_cellphone"},{header:"User Suggested",key:"isSuggestion"},{header:"Suggested Topic",key:"suggested_topic"},{header:"Suggested Speaker",key:"suggested_speaker"},{header:"Question 1: ".concat(null===n||void 0===n?void 0:n.question),key:"quest1"},{header:"Question 2: ".concat(null===s||void 0===s?void 0:s.question),key:"quest2"},{header:"Referral 1",key:"quest2_referral1"},{header:"Referral 2",key:"quest2_referral2"},{header:"Name",key:"quest2_name"},{header:"Email",key:"quest2_email"},{header:"Question 3: ".concat(null===i||void 0===i?void 0:i.question),key:"quest3"},{header:"Question 4: ".concat(null===r||void 0===r?void 0:r.question),key:"quest4"},{header:"Timestamp",key:"timestamp"}],e.forEach((e=>{var t,o,a,n,s,i;const{selectedTopic:r,voter:c,isSuggestion:d,suggestions:u,createdAt:m,questionnaireAnswers:p}=e,[h,g,v,x]=p;l.addRow({topic:(null===r||void 0===r?void 0:r.topic)||"Other",voter_name:(null===c||void 0===c?void 0:c.name)||"--",voter_email:(null===c||void 0===c?void 0:c.email)||"--",voter_cellphone:(null===c||void 0===c?void 0:c.cell_phone)||"--",isSuggestion:d?"Yes":"No",suggested_topic:(null===u||void 0===u?void 0:u.topic)||"--",suggested_speaker:(null===u||void 0===u?void 0:u.speaker)||"--",quest1:h&&(null===h||void 0===h?void 0:h.answers)||"--",quest2:null!==g&&void 0!==g&&g.answers?"Comment: ".concat((null===g||void 0===g||null===(t=g.answers)||void 0===t?void 0:t.comment)||"--"):"--",quest2_referral1:(null===g||void 0===g||null===(o=g.answers)||void 0===o?void 0:o.referral1)||"--",quest2_referral2:(null===g||void 0===g||null===(a=g.answers)||void 0===a?void 0:a.referral2)||"--",quest2_name:(null===g||void 0===g||null===(n=g.answers)||void 0===n?void 0:n.name)||"--",quest2_email:(null===g||void 0===g||null===(s=g.answers)||void 0===s?void 0:s.email)||"--",quest3:v&&(null===v||void 0===v||null===(i=v.answers)||void 0===i?void 0:i.answer)||"--",quest4:x?null!==x&&void 0!==x&&x.doneSharing?"Yes":"No":"--",timestamp:new Date(m).toLocaleString()})})),t.xlsx.writeBuffer().then((e=>{const t=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=window.URL.createObjectURL(t),o=document.createElement("a");o.href=l,o.download="VotingData.xlsx",o.click()}))}}}]);
//# sourceMappingURL=480.5b8b76f7.chunk.js.map