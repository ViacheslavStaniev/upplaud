"use strict";(self.webpackChunkpodasq=self.webpackChunkpodasq||[]).push([[76],{48076:function(e,r,o){o.r(r),o.d(r,{default:function(){return k}});var s=o(2135),n=o(61113),i=o(90891),d=o(48175),a=o(8730),t=o(74165),c=o(15861),l=o(29439),u=o(47313),m=o(3463),p=o(58467),x=o(75627),f=o(62563),h=o(35898),w=o(15480),Z=o(41727),v=o(47131),j=o(32703),b=o(30799),q=o(89043),y=o(46417);function g(){var e=(0,p.s0)(),r=(0,b.Ds)().enqueueSnackbar,o=(0,u.useState)(!1),s=(0,l.Z)(o,2),n=s[0],i=s[1],g="undefined"!==typeof window?sessionStorage.getItem("email-recovery"):"",P=m.Ry().shape({code1:m.Z_().required("Code is required"),code2:m.Z_().required("Code is required"),code3:m.Z_().required("Code is required"),code4:m.Z_().required("Code is required"),code5:m.Z_().required("Code is required"),code6:m.Z_().required("Code is required"),email:m.Z_().required("Email is required").email("Email must be a valid email address"),password:m.Z_().min(6,"Password must be at least 6 characters").required("Password is required"),confirmPassword:m.Z_().required("Confirm password is required").oneOf([m.iH("password"),null],"Passwords must match")}),C={code1:"",code2:"",code3:"",code4:"",code5:"",code6:"",email:g||"",password:"",confirmPassword:""},k=(0,x.cI)({mode:"onChange",resolver:(0,f.X)(P),defaultValues:C}),_=k.handleSubmit,I=k.formState,S=I.isSubmitting,E=I.errors,A=function(){var o=(0,c.Z)((0,t.Z)().mark((function o(s){return(0,t.Z)().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,new Promise((function(e){return setTimeout(e,500)}));case 3:console.log("DATA:",{email:s.email,code:"".concat(s.code1).concat(s.code2).concat(s.code3).concat(s.code4).concat(s.code5).concat(s.code6),password:s.password}),sessionStorage.removeItem("email-recovery"),r("Change password success!"),e(d.vB.root),o.next=12;break;case 9:o.prev=9,o.t0=o.catch(0),console.error(o.t0);case 12:case"end":return o.stop()}}),o,null,[[0,9]])})));return function(e){return o.apply(this,arguments)}}();return(0,y.jsx)(q.ZP,{methods:k,onSubmit:_(A),children:(0,y.jsxs)(h.Z,{spacing:3,children:[(0,y.jsx)(q.au,{name:"email",label:"Email",disabled:!!g,InputLabelProps:{shrink:!0}}),(0,y.jsx)(q.Iy,{keyName:"code",inputs:["code1","code2","code3","code4","code5","code6"]}),(!!E.code1||!!E.code2||!!E.code3||!!E.code4||!!E.code5||!!E.code6)&&(0,y.jsx)(w.Z,{error:!0,sx:{px:2},children:"Code is required"}),(0,y.jsx)(q.au,{name:"password",label:"Password",type:n?"text":"password",InputProps:{endAdornment:(0,y.jsx)(Z.Z,{position:"end",children:(0,y.jsx)(v.Z,{onClick:function(){return i(!n)},edge:"end",children:(0,y.jsx)(a.Z,{icon:n?"eva:eye-fill":"eva:eye-off-fill"})})})}}),(0,y.jsx)(q.au,{name:"confirmPassword",label:"Confirm New Password",type:n?"text":"password",InputProps:{endAdornment:(0,y.jsx)(Z.Z,{position:"end",children:(0,y.jsx)(v.Z,{onClick:function(){return i(!n)},edge:"end",children:(0,y.jsx)(a.Z,{icon:n?"eva:eye-fill":"eva:eye-off-fill"})})})}}),(0,y.jsx)(j.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:S,sx:{mt:3},children:"Update Password"})]})})}var P=o(42123),C=o(55609);function k(){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(C.Z,{title:"New Password"}),(0,y.jsx)(P.Jg,{sx:{mb:5,height:96}}),(0,y.jsx)(n.Z,{variant:"h3",paragraph:!0,children:"Request sent successfully!"}),(0,y.jsxs)(n.Z,{sx:{color:"text.secondary",mb:5},children:["We've sent a 6-digit confirmation email to your email.",(0,y.jsx)("br",{}),"Please enter the code in below box to verify your email."]}),(0,y.jsx)(g,{}),(0,y.jsxs)(n.Z,{variant:"body2",sx:{my:3},children:["Don\u2019t have a code? \xa0",(0,y.jsx)(i.Z,{variant:"subtitle2",children:"Resend code"})]}),(0,y.jsxs)(i.Z,{component:s.rU,to:d.EE.login,color:"inherit",variant:"subtitle2",sx:{mx:"auto",alignItems:"center",display:"inline-flex"},children:[(0,y.jsx)(a.Z,{icon:"eva:chevron-left-fill",width:16}),"Return to sign in"]})]})}}}]);