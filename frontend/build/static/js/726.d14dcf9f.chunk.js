"use strict";(self.webpackChunkpodasq=self.webpackChunkpodasq||[]).push([[726],{79423:function(e,n,t){t.d(n,{O:function(){return a},_:function(){return s}});var r=t(74165),o=t(15861),i=t(21841),a=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n){var t,o,a,s,l,c=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=c.length>1&&void 0!==c[1]?c[1]:null,e.prev=1,!t){e.next=8;break}return e.next=5,i.Z.put("guests/".concat(t),n);case 5:return o=e.sent,a=o.data,e.abrupt("return",a);case 8:return e.next=10,i.Z.post("guests",n);case 10:return s=e.sent,l=s.data,e.abrupt("return",l);case 15:return e.prev=15,e.t0=e.catch(1),e.abrupt("return",e.t0);case 18:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n){var t,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.get("guests/list/".concat(n));case 3:return t=e.sent,o=t.data,e.abrupt("return",o);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(n){return e.apply(this,arguments)}}()},58772:function(e,n,t){t.d(n,{Z:function(){return h}});var r=t(1413),o=t(45987),i=t(94469),a=t(33604),s=t(96467),l=t(4117),c=t(69099),d=t(46417),u=["title","content","action","open","onClose"];function h(e){var n=e.title,t=e.content,h=e.action,x=e.open,Z=e.onClose,f=(0,o.Z)(e,u);return(0,d.jsxs)(i.Z,(0,r.Z)((0,r.Z)({fullWidth:!0,maxWidth:"xs",open:x,onClose:Z},f),{},{children:[(0,d.jsx)(a.Z,{sx:{pb:2},children:n}),t&&(0,d.jsxs)(s.Z,{sx:{typography:"body2"},children:[" ",t," "]}),(0,d.jsxs)(l.Z,{children:[h,(0,d.jsx)(c.Z,{variant:"outlined",color:"inherit",onClick:Z,children:"Cancel"})]})]}))}},59627:function(e,n,t){t.d(n,{Z:function(){return x}});var r=t(1413),o=t(45987),i=t(47313),a=t(19860),s=t(57829),l=t(17592),c=t(17551),d=(0,l.ZP)(s.Z)((function(e){var n=e.theme,t=e.ownerState,o="light"===n.palette.mode,i="filled"===t.variant,a="outlined"===t.variant,s="soft"===t.variant,l=(0,r.Z)({},"default"===t.color&&(0,r.Z)((0,r.Z)({},a&&{backgroundColor:"transparent",color:n.palette.text.primary,border:"1px solid ".concat((0,c.Fq)(n.palette.grey[500],.32))}),s&&{color:o?n.palette.text.primary:n.palette.common.white,backgroundColor:(0,c.Fq)(n.palette.grey[500],.16)})),d=(0,r.Z)({},"default"!==t.color&&(0,r.Z)((0,r.Z)((0,r.Z)({},i&&{color:n.palette[t.color].contrastText,backgroundColor:n.palette[t.color].main}),a&&{backgroundColor:"transparent",color:n.palette[t.color].main,border:"1px solid ".concat(n.palette[t.color].main)}),s&&{color:n.palette[t.color][o?"dark":"light"],backgroundColor:(0,c.Fq)(n.palette[t.color].main,.16)}));return(0,r.Z)((0,r.Z)({height:24,minWidth:22,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",textTransform:"capitalize",padding:n.spacing(0,1),color:n.palette.grey[800],fontSize:n.typography.pxToRem(12),fontFamily:n.typography.fontFamily,backgroundColor:n.palette.grey[300],fontWeight:n.typography.fontWeightBold},d),l)})),u=t(46417),h=["children","color","variant","startIcon","endIcon","sx"],x=(0,i.forwardRef)((function(e,n){var t=e.children,i=e.color,l=void 0===i?"default":i,c=e.variant,x=void 0===c?"soft":c,Z=e.startIcon,f=e.endIcon,p=e.sx,g=(0,o.Z)(e,h),v=(0,a.Z)(),m={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return(0,u.jsxs)(d,(0,r.Z)((0,r.Z)({ref:n,component:"span",ownerState:{color:l,variant:x},sx:(0,r.Z)((0,r.Z)((0,r.Z)({},Z&&{pl:.75}),f&&{pr:.75}),p),theme:v},g),{},{children:[Z&&(0,u.jsxs)(s.Z,{sx:(0,r.Z)({mr:.75},m),children:[" ",Z," "]}),t,f&&(0,u.jsxs)(s.Z,{sx:(0,r.Z)({ml:.75},m),children:[" ",f," "]})]}))}))},21570:function(e,n,t){function r(e,n,t){return e>0?Math.max(0,(1+e)*n-t):0}function o(e,n,t){return n[t]<e[t]?-1:n[t]>e[t]?1:0}function i(e,n){return"desc"===e?function(e,t){return o(e,t,n)}:function(e,t){return-o(e,t,n)}}t.d(n,{$W:function(){return j},K:function(){return k},et:function(){return m},S_:function(){return N},Z4:function(){return D},fQ:function(){return r},sQ:function(){return i},x6:function(){return l}});var a=t(29439),s=t(47313);function l(e){var n=(0,s.useState)(!(null===e||void 0===e||!e.defaultDense)),t=(0,a.Z)(n,2),r=t[0],o=t[1],i=(0,s.useState)((null===e||void 0===e?void 0:e.defaultOrderBy)||"name"),l=(0,a.Z)(i,2),c=l[0],d=l[1],u=(0,s.useState)((null===e||void 0===e?void 0:e.defaultOrder)||"asc"),h=(0,a.Z)(u,2),x=h[0],Z=h[1],f=(0,s.useState)((null===e||void 0===e?void 0:e.defaultCurrentPage)||0),p=(0,a.Z)(f,2),g=p[0],v=p[1],m=(0,s.useState)((null===e||void 0===e?void 0:e.defaultRowsPerPage)||5),j=(0,a.Z)(m,2),w=j[0],b=j[1],y=(0,s.useState)((null===e||void 0===e?void 0:e.defaultSelected)||[]),C=(0,a.Z)(y,2),S=C[0],k=C[1],P=(0,s.useCallback)((function(e){""!==e&&(Z(c===e&&"asc"===x?"desc":"asc"),d(e))}),[x,c]),D=(0,s.useCallback)((function(e){var n=S.indexOf(e),t=[];-1===n?t=t.concat(S,e):0===n?t=t.concat(S.slice(1)):n===S.length-1?t=t.concat(S.slice(0,-1)):n>0&&(t=t.concat(S.slice(0,n),S.slice(n+1))),k(t)}),[S]),R=(0,s.useCallback)((function(e,n){k(e?n:[])}),[]),A=(0,s.useCallback)((function(e,n){v(n)}),[]),I=(0,s.useCallback)((function(e){v(0),b(parseInt(e.target.value,10))}),[]),O=(0,s.useCallback)((function(e){o(e.target.checked)}),[]);return{dense:r,order:x,page:g,orderBy:c,rowsPerPage:w,rowsPerPageOptions:[5,10,15],selected:S,onSelectRow:D,onSelectAllRows:R,onSort:P,onChangePage:A,onChangeDense:O,onChangeRowsPerPage:I,setPage:v,setDense:o,setOrder:Z,setOrderBy:d,setSelected:k,setRowsPerPage:b}}var c=t(24076),d=t(67478),u=t(1413),h=t(45987),x=t(35898),Z=t(61113),f=t(59063),p=t(46417),g=["title","description","img","sx"];function v(e){var n=e.title,t=e.description,r=e.img,o=e.sx,i=(0,h.Z)(e,g);return(0,p.jsxs)(x.Z,(0,u.Z)((0,u.Z)({alignItems:"center",justifyContent:"center",sx:(0,u.Z)({height:1,textAlign:"center",p:function(e){return e.spacing(8,2)}},o)},i),{},{children:[(0,p.jsx)(f.Z,{disabledEffect:!0,alt:"empty content",src:r||"/assets/illustrations/illustration_empty_content.svg",sx:{height:240,mb:3}}),(0,p.jsx)(Z.Z,{variant:"h5",gutterBottom:!0,children:n}),t&&(0,p.jsx)(Z.Z,{variant:"body2",sx:{color:"text.secondary"},children:t})]}))}function m(e){var n=e.isNotFound;return(0,p.jsx)(c.Z,{children:n?(0,p.jsx)(d.Z,{colSpan:12,children:(0,p.jsx)(v,{title:"No Data",sx:{"& span.MuiBox-root":{height:160}}})}):(0,p.jsx)(d.Z,{colSpan:12,sx:{p:0}})})}function j(e){var n=e.emptyRows,t=e.height;return n?(0,p.jsx)(c.Z,{sx:(0,u.Z)({},t&&{height:t*n}),children:(0,p.jsx)(d.Z,{colSpan:9})}):null}var w=t(23477),b=t(44758),y=t(82558),C=t(57829),S={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function k(e){var n=e.order,t=e.orderBy,r=e.rowCount,o=void 0===r?0:r,i=e.headLabel,a=e.numSelected,s=void 0===a?0:a,l=e.onSort,h=e.onSelectAllRows,x=e.sx;return(0,p.jsx)(w.Z,{sx:x,children:(0,p.jsxs)(c.Z,{children:[h&&(0,p.jsx)(d.Z,{padding:"checkbox",children:(0,p.jsx)(b.Z,{indeterminate:s>0&&s<o,checked:o>0&&s===o,onChange:function(e){return h(e.target.checked)}})}),i.map((function(e){return(0,p.jsx)(d.Z,{align:e.align||"left",sortDirection:t===e.id&&n,sx:{width:e.width,minWidth:e.minWidth},children:l?(0,p.jsxs)(y.Z,{hideSortIcon:!0,active:t===e.id,direction:t===e.id?n:"asc",onClick:function(){return l(e.id)},sx:{textTransform:"capitalize"},children:[e.label,t===e.id?(0,p.jsx)(C.Z,{sx:(0,u.Z)({},S),children:"desc"===n?"sorted descending":"sorted ascending"}):null]}):e.label},e.id)}))]})})}var P=["dense","action","rowCount","numSelected","onSelectAllRows","sx"];function D(e){var n=e.dense,t=e.action,r=e.rowCount,o=e.numSelected,i=e.onSelectAllRows,a=e.sx,s=(0,h.Z)(e,P);return o?(0,p.jsxs)(x.Z,(0,u.Z)((0,u.Z)({direction:"row",alignItems:"center",sx:(0,u.Z)((0,u.Z)({pl:1,pr:2,top:0,left:0,width:1,zIndex:9,height:58,position:"absolute",bgcolor:"primary.lighter"},n&&{height:38}),a)},s),{},{children:[(0,p.jsx)(b.Z,{indeterminate:o>0&&o<r,checked:r>0&&o===r,onChange:function(e){return i(e.target.checked)}}),(0,p.jsxs)(Z.Z,{variant:"subtitle1",sx:(0,u.Z)({ml:2,flexGrow:1,color:"primary.main"},n&&{ml:3}),children:[o," selected"]}),t&&t]})):null}var R=t(91034),A=t(83929),I=t(70024),O=["dense","onChangeDense","rowsPerPageOptions","sx"];function N(e){var n=e.dense,t=e.onChangeDense,r=e.rowsPerPageOptions,o=void 0===r?[5,10,25]:r,i=e.sx,a=(0,h.Z)(e,O);return(0,p.jsxs)(C.Z,{sx:(0,u.Z)({position:"relative"},i),children:[(0,p.jsx)(R.Z,(0,u.Z)({rowsPerPageOptions:o,component:"div"},a)),t&&(0,p.jsx)(A.Z,{label:"Dense",control:(0,p.jsx)(I.Z,{checked:n,onChange:t}),sx:{pl:2,py:1.5,top:0,position:{sm:"absolute"}}})]})}},82599:function(e,n,t){t.r(n),t.d(n,{default:function(){return W}});var r=t(74165),o=t(15861),i=t(29439),a=t(47313),s=t(70178),l=t(61113),c=t(35898),d=t(57829),u=t(69099),h=t(79423),x=t(12865),Z=t(98611),f=t(73428),p=t(51629),g=t(61689),v=t(47131),m=t(66835),j=t(57861),w=t(91034),b=t(24076),y=t(67478),C=t(44758),S=t(63585),k=t(59627),P=t(8730),D=t(58772),R=t(46417);function A(e){var n,t=e.row,r=e.selected,o=e.onSelectRow,s=e.onDeleteRow,d=t.guest,h=t.recordingDate,x=(0,a.useState)(!1),Z=(0,i.Z)(x,2),f=Z[0],p=Z[1];return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(b.Z,{hover:!0,selected:r,children:[(0,R.jsx)(y.Z,{padding:"checkbox",children:(0,R.jsx)(C.Z,{checked:r,onClick:o})}),(0,R.jsx)(y.Z,{component:"th",scope:"row",children:(0,R.jsxs)(c.Z,{direction:"row",alignItems:"center",spacing:2,children:[(0,R.jsx)(S.Z,{alt:null===d||void 0===d?void 0:d.firstName,src:null===d||void 0===d||null===(n=d.profile)||void 0===n?void 0:n.picture}),(0,R.jsx)(l.Z,{variant:"subtitle2",noWrap:!0,children:"".concat(null===d||void 0===d?void 0:d.firstName," ").concat(null===d||void 0===d?void 0:d.lastName)})]})}),(0,R.jsx)(y.Z,{align:"left",children:new Date(h).toDateString()}),(0,R.jsx)(y.Z,{align:"center",children:(0,R.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"column",gap:1},children:[(0,R.jsx)(k.Z,{color:"success",children:"Guest Posting Info"}),(0,R.jsx)(k.Z,{color:"info",children:"Host Posting Info"})]})}),(0,R.jsx)(y.Z,{align:"center",children:(0,R.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"column",gap:1},children:[(0,R.jsx)(k.Z,{color:"success",children:"G: 1"}),(0,R.jsx)(k.Z,{color:"info",children:"H: 2"}),(0,R.jsx)(k.Z,{children:"N: 3"})]})}),(0,R.jsx)(y.Z,{align:"center",children:"TASK TO DO"}),(0,R.jsxs)(y.Z,{align:"right",children:[(0,R.jsx)(v.Z,{children:(0,R.jsx)(P.Z,{icon:"mdi:envelope"})}),(0,R.jsx)(v.Z,{children:(0,R.jsx)(P.Z,{icon:"mdi:pencil"})}),(0,R.jsx)(v.Z,{children:(0,R.jsx)(P.Z,{icon:"material-symbols:calendar-today-outline"})}),(0,R.jsx)(v.Z,{children:(0,R.jsx)(P.Z,{icon:"material-symbols:pause-circle-outline-rounded"})}),(0,R.jsx)("br",{}),(0,R.jsx)(v.Z,{children:(0,R.jsx)(P.Z,{icon:"material-symbols:cloud-download-outline"})}),(0,R.jsx)(v.Z,{children:(0,R.jsx)(P.Z,{icon:"mdi:gear"})}),(0,R.jsx)(v.Z,{children:(0,R.jsx)(P.Z,{icon:"material-symbols:description"})}),(0,R.jsx)(v.Z,{onClick:function(){return p(!0)},children:(0,R.jsx)(P.Z,{icon:"bi:trash"})})]})]}),(0,R.jsx)(D.Z,{title:"Delete",open:f,onClose:function(){return p(!1)},content:"Are you sure want to delete?",action:(0,R.jsx)(u.Z,{variant:"contained",color:"error",onClick:s,children:"Delete"})})]})}var I=t(10279),O=t(21570);function N(e){var n=e.tableData,t=void 0===n?[]:n,r=e.tableHead,o=void 0===r?[]:r,s=(e.setTableData,(0,O.x6)()),l=s.page,c=s.order,d=s.onSort,h=s.setPage,x=s.orderBy,Z=s.selected,b=s.rowsPerPage,y=s.setSelected,C=s.onSelectRow,S=s.onChangePage,k=s.onSelectAllRows,N=s.rowsPerPageOptions,T=s.onChangeRowsPerPage,W=(0,a.useState)(!1),_=(0,i.Z)(W,2),M=_[0],B=_[1],F=t.slice(l*b,l*b+b),E=function(){return B(!1)};return(0,R.jsxs)(f.Z,{children:[(0,R.jsxs)(p.Z,{sx:{position:"relative",overflow:"unset"},children:[(0,R.jsx)(O.Z4,{rowCount:t.length,numSelected:Z.length,onSelectAllRows:function(e){return k(e,t.map((function(e){return e.id})))},action:(0,R.jsx)(g.Z,{title:"Delete",children:(0,R.jsx)(v.Z,{color:"primary",onClick:function(){return B(!0)},children:(0,R.jsx)(P.Z,{icon:"eva:trash-2-outline"})})})}),(0,R.jsx)(I.Z,{children:(0,R.jsxs)(m.Z,{sx:{minWidth:800},children:[(0,R.jsx)(O.K,{order:c,onSort:d,orderBy:x,headLabel:o,rowCount:t.length,numSelected:Z.length,onSelectAllRows:function(e){return k(e,t.map((function(e){return e._id})))}}),(0,R.jsx)(j.Z,{children:t.slice(l*b,l*b+b).map((function(e){return(0,R.jsx)(A,{row:e,selected:Z.includes(e._id),onSelectRow:function(){return C(e._id)},onDeleteRow:function(){return n=e._id,t.filter((function(e){return e.id!==n})),y([]),void(l>0&&F.length<2&&h(l-1));var n}},e._id)}))})]})})]}),(0,R.jsx)(w.Z,{page:l,component:"div",count:t.length,rowsPerPage:b,onPageChange:S,rowsPerPageOptions:N,onRowsPerPageChange:T}),(0,R.jsx)(D.Z,{open:M,onClose:E,title:"Delete",content:(0,R.jsxs)(R.Fragment,{children:["Are you sure want to delete ",(0,R.jsxs)("strong",{children:[" ",Z.length," "]})," items?"]}),action:(0,R.jsx)(u.Z,{color:"error",variant:"contained",onClick:function(){!function(e){if(t.filter((function(n){return!e.includes(n.id)})),y([]),l>0)if(e.length===F.length)h(l-1);else if(e.length===t.length)h(0);else if(e.length>F.length){var n=Math.ceil((t.length-e.length)/b)-1;h(n)}}(Z),E()},children:"Delete"})})]})}var T=t(55609);function W(){var e,n=(0,x.E)().user,t=(0,Z.K$)().themeStretch,f=(0,a.useState)([]),p=(0,i.Z)(f,2),g=p[0],v=p[1];(0,a.useEffect)((function(){(0,o.Z)((0,r.Z)().mark((function e(){var t,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,h._)(null===(t=n.show)||void 0===t?void 0:t._id);case 2:o=e.sent,v(o);case 4:case"end":return e.stop()}}),e)})))()}),[null===(e=n.show)||void 0===e?void 0:e._id]),console.log(n,g);return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(T.Z,{title:"Automations"}),(0,R.jsxs)(s.Z,{maxWidth:!t&&"xl",children:[(0,R.jsx)(l.Z,{variant:"h3",component:"h1",paragraph:!0,children:"Automations"}),(0,R.jsxs)(c.Z,{sx:{flexDirection:"row",gap:3,marginBottom:3},children:[(0,R.jsx)(l.Z,{flex:1,children:"Here you can manage the automation of your guests & track the number of audience submissions connected to your Guest, Host (you), or Neither. You can also export the Submissions for each guest, featuring participants\u2019 names, emails, questions & Audio Ask files."}),(0,R.jsx)(d.Z,{flex:"inherit",children:(0,R.jsx)(u.Z,{fullWidth:!0,color:"info",size:"large",type:"button",shape:"circular",variant:"contained",children:"REMIND INVITES"})})]}),(0,R.jsx)(N,{tableHead:[{id:"name",label:"NAME",align:"left"},{id:"recordingDate",label:"RECORDING DATE",align:"left"},{id:"status",label:"STATUS",align:"center"},{id:"asqs",label:"ASQs",align:"center"},{id:"todo",label:"TASK TO DO",align:"center"},{id:"action",label:"ACTIONS",align:"right"}],tableData:g})]})]})}},73428:function(e,n,t){t.d(n,{Z:function(){return g}});var r=t(87462),o=t(63366),i=t(47313),a=t(83061),s=t(21921),l=t(17592),c=t(77342),d=t(70501),u=t(77430),h=t(32298);function x(e){return(0,h.Z)("MuiCard",e)}(0,u.Z)("MuiCard",["root"]);var Z=t(46417),f=["className","raised"],p=(0,l.ZP)(d.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,n){return n.root}})((function(){return{overflow:"hidden"}})),g=i.forwardRef((function(e,n){var t=(0,c.Z)({props:e,name:"MuiCard"}),i=t.className,l=t.raised,d=void 0!==l&&l,u=(0,o.Z)(t,f),h=(0,r.Z)({},t,{raised:d}),g=function(e){var n=e.classes;return(0,s.Z)({root:["root"]},x,n)}(h);return(0,Z.jsx)(p,(0,r.Z)({className:(0,a.Z)(g.root,i),elevation:d?8:void 0,ref:n,ownerState:h},u))}))},35328:function(e,n,t){t(47313);var r=t(54750),o=t(46417);n.Z=(0,r.Z)((0,o.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft")},88168:function(e,n,t){t(47313);var r=t(54750),o=t(46417);n.Z=(0,r.Z)((0,o.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight")}}]);