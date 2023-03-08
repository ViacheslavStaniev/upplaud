"use strict";(self.webpackChunkpodasq=self.webpackChunkpodasq||[]).push([[77],{13077:function(e,t,r){r.r(t),r.d(t,{default:function(){return N}});var n=r(74165),a=r(1413),s=r(15861),i=r(70178),o=r(61113),l=r(35898),c=r(99881),u=r(41727),d=r(19536),m=r(69099),p=r(32703),h=r(3463),x=r(75627),g=r(62563),f=r(12865),b=r(66281),Z=r(8730),j=r(89043),v=r(98611),w=r(80614),S=r(57829),y=r(21841),k=function(){var e=(0,s.Z)((0,n.Z)().mark((function e(t,r){var a,s,i,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!r){e.next=7;break}return e.next=4,y.Z.put("show/".concat(r),t);case 4:return a=e.sent,s=a.data,e.abrupt("return",s);case 7:return e.next=9,y.Z.post("show",t);case 9:return i=e.sent,o=i.data,e.abrupt("return",o);case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,r){return e.apply(this,arguments)}}(),C=r(36974),A=r(46417);function E(){var e=(0,f.E)(),t=e.user,r=e.fetchUser,i=(0,b.Z)("up","lg"),u=i?"row":"column",d=t.show,m=(0,x.cI)({defaultValues:{upload:!1,name:null===d||void 0===d?void 0:d.name,website:null===d||void 0===d?void 0:d.website,logo:d&&d.logo?C.EK+d.logo:""}}),h=m.reset,g=m.watch,Z=m.setError,v=m.setValue,y=m.handleSubmit,E=m.formState,F=E.errors,N=E.isSubmitting,I=g("logo"),R=(0,w.uI)({maxFiles:1,multiple:!1,accept:{"image/*":[".png",".gif",".jpeg",".jpg"]},onDrop:function(e){if(e.length>0){var t=e[0],r=new FileReader;r.onloadend=function(){v("logo",r.result),null!==d&&void 0!==d&&d.logo&&v("upload",!0)},r.readAsDataURL(t)}}}),B=R.getRootProps,U=R.getInputProps,q=function(){var e=(0,s.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k(t,null===d||void 0===d?void 0:d._id);case 3:r(),e.next=11;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0),h(),Z("afterSubmit",(0,a.Z)((0,a.Z)({},e.t0),{},{message:e.t0.message||e.t0}));case 11:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}();return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(o.Z,{variant:"h4",component:"h3",paragraph:!0,children:"Show Info"}),(0,A.jsxs)(j.ZP,{methods:m,onSubmit:y(q),children:[!!F.afterSubmit&&(0,A.jsx)(c.Z,{severity:"error",children:F.afterSubmit.message}),(0,A.jsxs)(l.Z,{sx:{mb:2,gap:2,flexDirection:u,alignContent:"center",justifyContent:"space-between",width:i?"65%":"100%"},children:[(0,A.jsx)(j.au,{name:"name",label:"YOUR SHOW'S NAME"}),(0,A.jsx)(j.au,{type:"url",name:"website",label:"YOUR SHOW'S WEBPAGE",placeholder:"Blog, landing pages, etc"})]}),(0,A.jsxs)(l.Z,{sx:{gap:2,mb:4,flexDirection:u},children:[(0,A.jsxs)(l.Z,{sx:{gap:2,width:i?"65%":"100%"},children:[(0,A.jsx)(j.h6,{name:"logo",label:"Upload the show's logo"}),(0,A.jsxs)(S.Z,(0,a.Z)((0,a.Z)({},B({className:"dropzone"})),{},{sx:{padding:5,background:"#FCFBFC",borderRadius:2,border:"2px dashed #B3B3B3",textAlign:"center"},children:[(0,A.jsx)("input",(0,a.Z)({},U())),(0,A.jsx)(o.Z,{children:"Click to upload photo or drag and drop"}),(0,A.jsx)("span",{children:"Any file up to 10MB"})]}))]}),I&&(0,A.jsxs)(l.Z,{flex:1,gap:2,children:[(0,A.jsx)(j.h6,{label:"Uploaded logo"}),(0,A.jsx)("img",{alt:"uploaded logo",src:I,style:{maxWidth:125,maxHeight:125,borderRadius:4,background:"#1B1E22",border:"1px solid #e0e0e0"}})]})]}),(0,A.jsx)(p.Z,{size:"large",type:"submit",shape:"circular",variant:"outlined",sx:{minWidth:120},loading:N,children:"SAVE"})]})]})}var F=r(55609);function N(){var e=(0,f.E)(),t=e.user,r=e.updateUser,w=(0,v.K$)().themeStretch,S=(0,b.Z)("up","lg"),y=S?"row":"column",k=h.Ry().shape({userName:h.Z_().required("Suffix is Required"),firstName:h.Z_().required("First name is Required"),email:h.Z_().required("Email is required").email("Email must be a valid email address")}),C={firstName:null===t||void 0===t?void 0:t.firstName,lastName:null===t||void 0===t?void 0:t.lastName,email:null===t||void 0===t?void 0:t.email,userName:null===t||void 0===t?void 0:t.userName},N=(0,x.cI)({resolver:(0,g.X)(k),defaultValues:C}),I=N.reset,R=N.setError,B=N.handleSubmit,U=N.formState,q=U.errors,D=U.isSubmitting,P=function(){var e=(0,s.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r(t);case 3:e.next=10;break;case 5:e.prev=5,e.t0=e.catch(0),console.error(e.t0),I(),R("afterSubmit",(0,a.Z)((0,a.Z)({},e.t0),{},{message:e.t0.message||e.t0}));case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}();return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(F.Z,{title:"Account Admin"}),(0,A.jsxs)(i.Z,{maxWidth:!w&&"xl",children:[(0,A.jsx)(o.Z,{variant:"h3",component:"h1",children:"Account Admin"}),(0,A.jsx)(o.Z,{children:"Here you can track the automation of your guests:"}),(0,A.jsxs)(j.ZP,{methods:N,onSubmit:B(P),children:[(0,A.jsxs)(l.Z,{spacing:2,marginTop:2,marginBottom:2,sx:{width:S?"80%":"100%"},children:[!!q.afterSubmit&&(0,A.jsx)(c.Z,{severity:"error",children:q.afterSubmit.message}),(0,A.jsxs)(l.Z,{sx:{mb:2,gap:2,flexDirection:y,alignContent:"center",justifyContent:"space-between"},children:[(0,A.jsx)(j.au,{name:"firstName",label:"FIRST NAME"}),(0,A.jsx)(j.au,{name:"lastName",label:"LAST NAME"})]}),(0,A.jsxs)(l.Z,{sx:{mb:2,gap:2,flexDirection:y,alignContent:"center",justifyContent:"space-between"},children:[(0,A.jsx)(j.au,{name:"email",label:"EMAIL"}),(0,A.jsx)(j.au,{name:"userName",label:"Guestii Prefix",placeholder:"SUFFIX",InputProps:{startAdornment:(0,A.jsxs)(u.Z,{position:"start",children:[window.location.hostname.toUpperCase(),"/"]})}})]})]}),(0,A.jsx)(p.Z,{size:"large",type:"submit",shape:"circular",variant:"outlined",sx:{minWidth:120},loading:D,children:"SAVE"})]}),(0,A.jsx)(d.Z,{sx:{my:4,mt:4}}),(0,A.jsx)(E,{}),(0,A.jsx)(d.Z,{sx:{my:4,mt:4}}),(0,A.jsx)(o.Z,{variant:"h4",component:"h3",paragraph:!0,children:"Connect with social media"}),(0,A.jsxs)(l.Z,{sx:{gap:3,mb:5,flexDirection:y},children:[(0,A.jsx)(m.Z,{size:"large",type:"button",shape:"circular",variant:"contained",startIcon:(0,A.jsx)(Z.Z,{icon:"mdi:facebook"}),style:{background:"#1877F2"},children:"Connect with Facebook"}),(0,A.jsx)(m.Z,{size:"large",type:"button",shape:"circular",variant:"contained",startIcon:(0,A.jsx)(Z.Z,{icon:"mdi:instagram"}),style:{background:"radial-gradient(128.57% 128.57% at 10.71% 105.36%, #FFCB52 0%, #E34677 56.25%, #C938AC 100%)"},children:"Connect with Instagram"}),(0,A.jsx)(m.Z,{size:"large",type:"button",shape:"circular",variant:"contained",startIcon:(0,A.jsx)(Z.Z,{icon:"mdi:linkedin"}),style:{background:"#0A66C2"},children:"Connect with LinkedIn"})]})]})]})}}}]);