(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{69:function(t,e,n){},70:function(t,e,n){},71:function(t,e,n){"use strict";n.r(e);var o=n(1),i=n(0),c=n(21),r=n.n(c),s=n(11),a=n(5),l=n(12),d=n.n(l),b=n(17),u=n(15),h=n(6),j=n(77),g="#4C9AFF",m="#f2f2f2",p=n(38),f=n.n(p).a.create({baseURL:"https://".concat("f8582b411a53.ngrok.io","/"),headers:{"Content-Type":"application/json"}}),x="GET_MENU",O="SET_ACTIVE_SECTION",y="https://octible.s3.us-east-2.amazonaws.com/",A=function(){var t=Object(b.a)(d.a.mark((function t(e){var n,o;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=[],console.log("--MNUE"),console.log(e),e.logo_photo&&n.push("".concat(y).concat(e.logo_photo)),e.background_photo&&n.push("".concat(y).concat(e.background_photo)),e.items.map((function(t){t.item_photos&&t.item_photos.map((function(t){n.push(t.url)}))})),t.next=9,n.map((function(t){return new Promise((function(e,n){var o=new Image;o.src=t,o.onLoad=e(),o.oneerror=n()}))}));case 9:return o=t.sent,t.next=12,Promise.all(o);case 12:console.log("----DONE---"),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(0),console.log(t.t0);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})));return function(e){return t.apply(this,arguments)}}(),w=Object(h.b)((function(t){return{dba:t.menus.dba}}),{setActiveSection:function(t){return function(){var e=Object(b.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,n({type:O,payload:t}),e.next=7;break;case 4:throw e.prev=4,e.t0=e.catch(0),new Error(e.t0);case 7:case"end":return e.stop()}}),e,null,[[0,4]])})));return function(t){return e.apply(this,arguments)}}()}})((function(t){var e=t.text,n=t.section_id,c=t.setActiveSection,r=t.dba;return Object(o.jsx)(i.Fragment,{children:Object(o.jsx)(j.a,{style:{borderRadius:"30px",width:300,height:"43px",alignSelf:"center",textAlign:"center",marginBottom:10,backgroundColor:r.section_button_color,borderColor:r.section_button_color,left:4},onClick:function(){return c(n)},placeholder:"(Appetisers, entree, drinks, etc)",type:"button",children:Object(o.jsx)("p",{style:{fontFamily:"Helvetica",color:r.section_button_text_color,fontSize:"100%",fontWeight:"bold",alignSelf:"center"},children:e})})})})),v=n(73),k=n(74),C=n(78),S=function(t){return new Promise((function(e){return setTimeout(e,t)}))},T="https://octible.s3.us-east-2.amazonaws.com/",F=Object(h.b)((function(t){return{restaurant:t.menus.menu,sections:t.menus.menu.sections,dba:t.menus.dba,loaded:t.menus.loaded}}),{getMenu:function(t){return function(){var e=Object(b.a)(d.a.mark((function e(n){var o,i,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o=t.split(":").pop(),i={dba_id:o},console.log("---API CALL URL"),console.log(o),e.next=7,f.post("/menus/get_menu",i);case 7:if(c=e.sent,console.log("---RES---"),console.log(c),c.data){e.next=12;break}return e.abrupt("return");case 12:A(c.data),n({type:x,payload:c.data}),e.next=21;break;case 16:throw e.prev=16,e.t0=e.catch(0),console.log("--GET MENU ERROR---"),console.log(e.t0),new Error(e.t0);case 21:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t){return e.apply(this,arguments)}}()}})((function(t){var e=t.restaurant,n=t.sections,c=t.getMenu,r=t.loaded,a=t.dba,l=Object(i.useState)(!0),h=Object(u.a)(l,2),g=h[0],m=h[1],p=Object(i.useState)(!0),f=Object(u.a)(p,2),x=f[0],O=f[1],y=Date.now();return Object(i.useEffect)((function(){var t=window.location.href;Object(b.a)(d.a.mark((function n(){var o;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r&&e.hasOwnProperty("user_id")){n.next=9;break}return n.next=3,c(t);case 3:if(o=Date.now(),!(o-y<1e3)){n.next=8;break}return n.next=8,S(700);case 8:m(!1);case 9:case"end":return n.stop()}}),n)})))()}),[]),Object(i.useEffect)((function(){e.hasOwnProperty("menu_id")&&Object(b.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A(e);case 2:O(!1);case 3:case"end":return t.stop()}}),t)})))()}),[e]),Object(o.jsx)(i.Fragment,{children:g||!e.hasOwnProperty("user_id")?Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("div",{id:"Octible-app",style:{display:"flex",flexDirection:"column",alignItems:"center",marginRight:0,marginBottom:0},children:Object(o.jsx)("div",{style:{width:100,height:100,marginTop:300},className:"spinner-border text-primary",role:"status"})})}):Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{id:"Octible-app",style:{display:"flex",flexDirection:"column",zIndex:1,flexGrow:1,position:"relative",alignItems:"center",overflow:"auto",marginRight:0,marginBottom:0},children:[x?Object(o.jsx)("div",{style:{height:100,width:"100%"}}):Object(o.jsxs)(o.Fragment,{children:[e.background_photo?Object(o.jsx)(C.a,{style:{maxWidth:"100%",zIndex:0,boxShadow:"1px 1px 1px #9E9E9E"},src:"".concat(T).concat(e.background_photo)}):Object(o.jsx)("div",{style:{height:100,width:"100%"}}),Object(o.jsx)(C.a,{style:{height:100,width:100,zindex:10,borderRadius:50,position:"relative",bottom:40,justifyContent:"center",alignItems:"center",border:"2.5px solid ".concat(a.primary_color),borderWidth:3,boxShadow:"2px 2px 2px #9E9E9E"},src:"".concat(T).concat(e.logo_photo)})]}),Object(o.jsx)("p",{style:{position:"relative",bottom:30,fontFamily:"helvetica",fontWeight:"bold",color:a.title_color,fontSize:55},children:e.name}),Object(o.jsxs)(v.a,{style:{position:"relative",bottom:20,marginBottom:-10},children:[Object(o.jsx)(k.a,{children:Object(o.jsx)(j.a,{type:"button",style:{borderRadius:"30px",width:120,backgroundColor:a.section_button_color,borderColor:a.section_button_color},children:Object(o.jsx)("a",{style:{textDecoration:"none",color:a.section_button_text_color,fontFamily:"helvetica"},href:"https://www.google.com",children:"Website"})})}),Object(o.jsx)(k.a,{children:Object(o.jsx)(s.b,{to:"/pdf/photos",children:Object(o.jsx)(j.a,{type:"button",style:{borderRadius:"30px",width:120,fontFamily:"helvetica",backgroundColor:a.section_button_color,borderColor:a.section_button_color},children:Object(o.jsx)("a",{style:{color:a.section_button_text_color,fontFamily:"helvetica"},children:"Pdf"})})})})]}),Object(o.jsx)("p",{style:{marginBottom:10,marginTop:30,fontFamily:"helvetica",fontSize:20,color:a.subtitle_color},children:"Digital Menu"}),n.map((function(t){return Object(o.jsx)(s.b,{to:"/items/:".concat(t.section_id),id:t.section_id,children:Object(o.jsx)(w,{section_id:t.section_id,text:"".concat(t.section)})},t.section_id)})),Object(o.jsx)("div",{style:{height:200}})]}),Object(o.jsx)("div",{style:{bottom:0,left:0,right:0,marginBottom:0,position:"fixed",backgroundColor:"#F8F8F8",borderTopRightRadius:40,borderTopLeftRadius:40,height:60,display:"flex",flexDirection:"column",zIndex:5},children:Object(o.jsx)(j.a,{style:{backgroundColor:"transparent",borderColor:"transparent",WebkitBoxShadow:"none"},onClick:function(){},children:Object(o.jsx)("i",{style:{color:a.primary_color,alignSelf:"center",opacity:.7},className:"fa fa-home fa-3x","aria-hidden":"true"})})})]})})})),R=n(75),E=n(76),G=Object(h.b)((function(t){return{}}),null)((function(t){var e=t.item;return Object(o.jsx)("div",{style:{marginBottom:20},children:Object(o.jsx)(s.b,{to:"/item/:".concat(e.item_id),children:Object(o.jsxs)(j.a,{type:"button",style:{borderRadius:23,width:"90%",minHeight:80,backgroundColor:m,borderColor:m},children:[Object(o.jsxs)(v.a,{children:[Object(o.jsx)(k.a,{xs:"8",children:Object(o.jsx)(R.a,{style:{width:"100%",textAlign:"left",fontFamily:"Helvetica",fontSize:"100%",fontWeight:"bold",color:"black"},children:e.title})}),Object(o.jsx)(k.a,{xs:"4",children:Object(o.jsx)(R.a,{style:{textAlign:"right",fontFamily:"Helvetica",fontSize:"100%",fontWeight:"bold",color:"black"},children:e.price})})]}),Object(o.jsx)(v.a,{children:Object(o.jsx)(E.a,{style:{marginTop:-15,marginLeft:15,marginRight:10,textAlign:"left",fontFamily:"Helvetica",fontSize:"90%",textTransform:"capitalize",lineHeight:1.3,color:"grey"},children:e.description})})]})})})})),z=Object(h.b)((function(t,e){return{restaurant:t.menus.menu,sections:t.menus.menu.sections}}),null)((function(t){var e=t.restaurant,n=t.sections,c=Object(a.f)(),r=Object(i.useState)([]),s=Object(u.a)(r,2),l=s[0],d=s[1],b=Object(i.useState)(""),h=Object(u.a)(b,2),m=h[0],p=h[1],f=Object(a.g)().section_id;return Object(i.useEffect)((function(){var t=f.substring(1),o=e.items.filter((function(e){return e.section_id===t})),i=n.find((function(e){return e.section_id===t}));p(i.section),d(o)}),[]),Object(o.jsxs)(i.Fragment,{children:[Object(o.jsx)("div",{style:{display:"flex",marginTop:20,flexDirection:"column",width:"inherit"},children:Object(o.jsx)("h1",{style:{marginTop:10,textTransform:"capitalize",fontFamily:"helvetica",fontWeight:"bold",color:g,marginLeft:35,fontSize:40},children:m})}),Object(o.jsxs)("div",{style:{marginTop:5,background:"white",textAlign:"center",overflow:"hidden"},children:[l.map((function(t,e){return Object(o.jsx)(G,{item:t},e)})),Object(o.jsx)("div",{style:{height:150}})]}),Object(o.jsx)("div",{style:{bottom:0,left:0,right:0,marginBottom:0,position:"fixed",backgroundColor:"#F8F8F8",borderTopRightRadius:40,borderTopLeftRadius:40,height:60,display:"flex",flexDirection:"column"},children:Object(o.jsx)(j.a,{style:{backgroundColor:"transparent",borderColor:"transparent",WebkitBoxShadow:"none"},onClick:function(){return c.goBack()},children:Object(o.jsx)("i",{style:{color:g,alignSelf:"center"},class:"fa fa-home fa-3x","aria-hidden":"true"})})})]})})),D=Object(h.b)((function(t){return{items:t.menus.menu.items,sections:t.menus.menu.sections}}),null)((function(t){var e,n=t.items,c=t.sections,r=Object(a.f)(),s=Object(a.g)().item_id,l=Object(i.useState)({}),d=Object(u.a)(l,2),b=d[0],h=d[1],m=Object(i.useState)(""),p=Object(u.a)(m,2),f=p[0],x=p[1];return Object(i.useEffect)((function(){var t=n.find((function(t){return t.item_id===s.substring(1)})),e=c.find((function(e){return e.section_id===t.section_id}));x(e.section),h(t)}),[]),Object(o.jsxs)(i.Fragment,{children:[Object(o.jsxs)("div",{style:{},children:[Object(o.jsx)("div",{style:{display:"flex",marginTop:20,flexDirection:"column",width:"inherit"},children:Object(o.jsx)("h1",{style:{marginTop:10,textTransform:"capitalize",fontFamily:"helvetica",fontWeight:"bold",color:g,marginLeft:35,fontSize:40},children:f})}),Object(o.jsxs)(k.a,{children:[Object(o.jsxs)(v.a,{style:{marginTop:15},children:[Object(o.jsx)(k.a,{xs:"8",children:Object(o.jsx)("p",{style:{textAlign:"left",fontFamily:"Helvetica",fontWeight:"bold",textTransform:"capitalize",marginLeft:21,color:"black",fontSize:14},children:b.title})}),Object(o.jsx)(k.a,{xs:"4",children:Object(o.jsx)("p",{style:{textAlign:"right",fontFamily:"Helvetica",fontWeight:"bold",textTransform:"capitalize",marginRight:15,color:"black",fontSize:14},children:b.price})})]}),Object(o.jsx)(v.a,{children:Object(o.jsx)("p",{style:{alignText:"right",marginLeft:35,marginTop:3,marginRight:25},children:b.description})}),Object(o.jsx)(v.a,{style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:-20},children:null===(e=b.item_photos)||void 0===e?void 0:e.map((function(t){return Object(o.jsx)("img",{style:{borderRadius:30,marginTop:30,width:"85%",height:"auto",alignSelf:"center"},src:t.url,class:"img-fluid",alt:"Responsive image"})}))}),Object(o.jsx)("div",{style:{height:100}})]})]}),Object(o.jsx)("div",{children:Object(o.jsx)("div",{style:{bottom:0,left:0,right:0,marginBottom:0,position:"fixed",backgroundColor:"#F8F8F8",borderTopRightRadius:40,borderTopLeftRadius:40,height:60,display:"flex",flexDirection:"column"},children:Object(o.jsx)(j.a,{style:{backgroundColor:"transparent",borderColor:"transparent",WebkitBoxShadow:"none"},onClick:function(){return r.goBack()},children:Object(o.jsx)("i",{style:{color:g,alignSelf:"center"},class:"fa fa-home fa-3x","aria-hidden":"true"})})})})]})})),_=Object(h.b)((function(t,e){return{restaurant:t.menus.menu2,sections:t.menus.menu.sections}}),null)((function(t){var e=t.restaurant,n=Object(i.useState)({description:"",title:"",photos:[]}),c=Object(u.a)(n,2),r=c[0],l=c[1],d=Object(a.g)(),b=d.food_id,h=d.section_id;return Object(i.useEffect)((function(){var t=b.substring(1),n=h.substring(1),o=e.items.find((function(e){return e.section_id===n&&e.item_id===t}));l(o)}),[]),Object(o.jsxs)("body",{children:[Object(o.jsx)("div",{style:{position:"fixed",top:0,width:"100%",height:100,background:"white",textAlign:"left",marginLeft:20,zIndex:5},children:Object(o.jsx)(s.b,{to:"/items/".concat(h,"/"),children:Object(o.jsx)(j.a,{onClick:function(){},style:{backgroundColor:"transparent",borderColor:"transparent",shadowColor:"#636c73",shadowRadius:0,shadowOpacity:0,boxShadow:"0px 0px 0px #DCDCDC",marginBottom:10,marginTop:0,width:300},children:Object(o.jsx)(v.a,{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABECAYAAADzyHdMAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAARAAAAAAF7N7aAAAJPElEQVRoBcWae3BU1R3Hzzl3d/PkuZG85SEtxZSpNECySQAjqVotFezoH3amKrbyGiriA6EdJtqp4oxQSyUowdoO006JM+10xmaqg26GwCYhMKgdOi0UgiRZ8mgYDHns3t17f/2eDRu3Ibt7bpINdwj3dR6f8/39zu887nJ2Cw+XpzVXmI51jNGjnLPZnHi/ycyPDM2+u7HVeY49yg1+S/gqK4Xr3g0FgsTPOKPvAyIlzEGgxfU5wzS26v/0fjz5gDWkLcvu+qZNsO2CsTWRcGFIeTYJkEQ/0iIfJvp6fu35pIUZgUIb49uh3EOc82Hlbqqbs5mC8/RJA5xfS0m3pevFXIhnoNpqwCXfBBXxAGk4bJ0yKYBSOQknNPEsJ3ogHtxXnLzf9tVNYq5CcNOnFwsyt0GVe9XhICGjtoQCFr5zyu5ITy/WiF6AchWM8yRVGYhYH0z854QBzt9Xm+RYmFemCfFzRI4SwDmU4RjrhQe+x0j/Y2IAK922zG9/YxVnfAcqKoJp7VbgiHgV+f2HPPfkX0EomvijbNWCCs7FL6DaWOD260agylOf34L8hMZN7FFa1/4dZrPtRcsXwsuVowR8rpc4vaUHjbebV+S0SThJNqGALo/3Po2038C08+B36nDwOYwa+02bvaqpaGZ7GE4CTpgPuuq99wvAofB5jEjZdYjxa1DvbSa0/U3FTi+YQspJOHmMG7Dw1Cm7vT93rSb4ayhvLsKJklVAIUG68f+vgj56r6kio1MCjTzGBZjnaU1xDNrXCBt7Fd5yO8hU4Uwk7cB/VYNmyrtnKqZ0jwQL348ZsMDdlT6NaI2msV0wkYRTMitkk3DtRFRt2NihM6XR4STkmACLGnum2s3gGpjzJUZ8nioczGlA4zbAvasHBqqby+aOatawevKsZJLIDC7PlzO5MfAQRohnUeGdKEGttw7BtWCed1gP8IPN5bM6IsuNdm1JwUK3N8NGvkeI8w1W4Ujwi2RSte7gh5vL1OAktDJgUWNnpt1gP4S/rUecu8OKcmjQedT1VsAX+FNzWV5PNLVGe64EuNTdkiXh4BE/QYC/AwWpmZUxA0HngsloHzH9yMmK/KujQcR6Fhew6OjFTM2RCjipHGGEsABH9AUTfM+A31HzaXnmtVgg0d7FBCw8dilb40mPQa4NKGCuKtxQKGEXcX49KGzvf1o+ozcaQLznUQGXuruy7Jq5ThB7ChXNVg4lskYoZ3K2yzFDfHCiwNkXDyLW+1EBi452ZtrstBGdYSPCrxPzCqUgPMRGrUFGm6+3X/34bGmBHqtylXc3xcFQnCPfFhBtRQHTkOCmNNEKhtKXDYPWNXRk1sldgWjprDz/PwXn1/ZM5QbgBHsRVKlWCsLocDnA6ImmFdluK/nipR0GXFx75ba0KcFNMKYlOKiGwYHOIdY909R+7Fi8Cq2+D5lvCI5vQ0j4qUXlglDurGmwbf60zPrTS3jAKkC89GLR59dmpE4FHBSwBscNTEv+YXL+oj+tLSFwEt427bq+Geet2P6KuRUxsqUYHTowHu8hoQNuyYQrF67Phpj1pJXVvswIv8MIxs/oxJtPluQPhgtLxBnRhHLHVLBJlw1i18eU10ImG9SzkDwiqaAUmyZUJw0RGa1dipAvWcsjI7dsVQEPBHKtrOAsVhNKLjC/+wOufNYz84XYiHx4aV33LOt51XMIw8b3YaZ7EL5oFTIdQf0Jh93csqyp16lepbWUIQd0ef6bK5j5PDdpPVwy+rbsiLJDvZlYDwJ8tUHmm57SrK4RScZ9G5qlNJQ4veageAP+9GuYXDlsSF9EvHEi3yYUtPMud8v0cRONKCAEKOtpWOX09l+nvTC1dUjGpqKMp9Mcaa/keUjZAiNYRr0NmTjyjVy5JTm05wUjjMsxduEjM4WvsbQ0Batu6TGe867OGQg/Hs/5JkBZWGjCmsw2YQ2C2Y2YiQX6DaUVqpKQ2B31Gdqu0ysysPYd2kZTyDlqklEBZcrFH3XnpKQZGwXxdYh6WUioDIkZjg+Tj8N+k+3GGji0ETlq7QoPowLKvEXunjzN4X8cn6yeRoV5qpCydyN7P/7+4qPgL08dzTnPKjkmP9aPmKo0lTvb/Ib+W5PMg5iUXkatSpWgIbLhaQhZDycJ+44lKzvvHOuIExNQtvf0ijlXSDd+B7hDuL2EupXWGhISISsVHrg2yc5fWHa8axGrqbE8dsuWKh1Dn07tjyPDU5hgzEYmpcrQMPzjXwL2r4YZ3NfYkf2ZlQWVMqBshdyfsQXpMWT6MULQAhhSGRLpe+Eqf9dNOtBs/OsEKy8PqihjCVAWWHKiY5bG+A+gyhaI83U8sgCJnXzG3IZhvtlgZAGSx4WM64MjWynH2yDXj5hDw+IFSz4ZGnHYKvlR0aV1lDK3e3hVObKe8L1lQJmxoST/an9g4AgC8hvEzC+gipXenY45XoUQ/Lkye0ExendMC1g2cbhl8rzgePeUDGbg9wZ8F26txklMSvgnBqfXGvyzTkYz97gAJaRLTg6MrkeEoJfREeQmk1KZod5NzI8i3IYwX2/wj95xlAqTIPGO4rqO1ZqdH4DPWFqESffAXxOG8Jc8+r89I3v3hAHKBrjqO76HzfUD0DDHygQDc0r0OdZkGuYOPTXLE7lDMaZOEk3NhuVZH1DQWI/qWlQ7jixLbu9hWCzSNPFqkr/bVVBzdvjb8oQqGAYvq+9YzTS+G9NtxEmKG0rC+cJKGrq5M5n5GuvK5/oSAsjcZHNpXTA3w9d29i2oYwESKyOikyxgvtI50PdJzBgUbpnl8+9fNpMX39OSkpl9TnAxJ+STiiMOFEMw4DkIXYtSHMkXEqPgjRZJX5qek7ESny7wQx5ehsfqP6qQkwxiHyZGwRuA3e9XGdryB73pTmcbZyIbauTjlZK5Q0oylpFQBW9wsjnuluRce+py3G+DP96NSpW2+hAJAkqtCVc01vMl9MZsT+txThrYNDl63KcEiZFmQuNgrAZggjFI3KjHTwD2opd+CHVibrXgPZKyzyfFxJHg8icEjoHcxUIIuVn/IEwexdx0CfFm86QDhmAxD1xmX3CXnYmdGEK+i2fDkFI5/MnPaNu9+sDfbg2gpKwk4VrZPY87zCfhZ2th0NsRAgcQW9ymSXu6+/o++88DX/P/D+IAfKjG80VyAAAAAElFTkSuQmCC",style:{marginRight:20,alignText:"left",alignSelf:"left"}})})})})}),Object(o.jsxs)("div",{color:"info",style:{padding:20,top:0,width:"100%",height:80},children:[Object(o.jsx)("h2",{style:{height:100}}),Object(o.jsx)("h1",{children:r.title}),Object(o.jsx)("p2",{children:r.description}),Object(o.jsx)("div",{style:{textAlign:"center"},children:r.item_photos.length>0?r.item_photos.map((function(t){return Object(o.jsx)("img",{src:"".concat(t.url),style:{width:330,height:240,borderRadius:4}})})):null}),Object(o.jsx)("img",{src:"https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.48+PM.png",style:{width:330,height:240,borderRadius:4}}),Object(o.jsx)("img",{src:"https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.48+PM.png",style:{width:330,height:240,borderRadius:4}}),Object(o.jsx)("h2",{style:{height:150}})]}),Object(o.jsx)("div",{color:"info",style:{position:"fixed",padding:20,bottom:-75,width:"100%",borderRadius:25,height:150,background:"#4C9AFF",textAlign:"center",zIndex:5},children:Object(o.jsx)("p1",{style:{color:"white"},children:"Powered by Octible"})})]})})),P=Object(h.b)((function(t){return{photos:t.menus.menu.pdf}}),null)((function(t){var e=t.photos,n=Object(a.f)();return Object(o.jsxs)(i.Fragment,{children:[Object(o.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(o.jsxs)(k.a,{children:[e.map((function(t){return Object(o.jsx)("img",{style:{width:"100%",height:"auto",marginTop:20},src:"".concat("https://octible.s3.us-east-2.amazonaws.com/").concat(t)})})),Object(o.jsx)("div",{style:{height:100}})]})}),Object(o.jsx)("div",{style:{bottom:0,left:0,right:0,marginBottom:0,position:"fixed",backgroundColor:"#F8F8F8",borderTopRightRadius:40,borderTopLeftRadius:40,height:60,display:"flex",flexDirection:"column"},children:Object(o.jsx)(j.a,{style:{backgroundColor:"transparent",borderColor:"transparent",WebkitBoxShadow:"none"},onClick:function(){return n.goBack()},children:Object(o.jsx)("i",{style:{color:g,alignSelf:"center"},class:"fa fa-home fa-3x","aria-hidden":"true"})})})]})})),I=Object(h.b)((function(t){return{dba:t.menus.dba}}),null)((function(t){var e=t.dba;return Object(o.jsx)(i.Fragment,{children:Object(o.jsx)("div",{style:{height:"auto",width:"100%",backgroundColor:e.background_color},children:Object(o.jsxs)(a.c,{children:[Object(o.jsx)(a.a,{exact:!0,path:"/:restaurant_id",component:F}),Object(o.jsx)(a.a,{exact:!0,path:"/items/:section_id",component:z}),Object(o.jsx)(a.a,{exact:!0,path:"/item/:item_id",component:D}),Object(o.jsx)(a.a,{exact:!0,path:"/items/:section_id/food/:food_id",component:_}),Object(o.jsx)(a.a,{exact:!0,path:"/pdf/photos",component:P})]})})})})),K=n(16),N=n(39),B=n(18),X={menu:{sections:[],items:[]},dba:{background_color:""},loaded:!1,active_section_id:""},H=Object(K.combineReducers)({menus:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,e=arguments.length>1?arguments[1]:void 0,n=e.type,o=e.payload;switch(n){case x:return Object(B.a)(Object(B.a)({},t),{},{menu:Object(B.a)(Object(B.a)({},o.menu),{},{background_photo:""}),dba:o.dba,loaded:!0});case O:return Object(B.a)(Object(B.a)({},t),{},{active_section_id:o});default:return t}}}),Q=n(40),W=[N.a],Y=Object(K.createStore)(H,{},Object(Q.composeWithDevTools)(K.applyMiddleware.apply(void 0,W))),U=(n(69),n(70),function(){return Object(o.jsx)(h.a,{store:Y,children:Object(o.jsx)(s.a,{children:Object(o.jsx)(I,{})})})});r.a.render(Object(o.jsx)(U,{}),document.getElementById("root"))}},[[71,1,2]]]);
//# sourceMappingURL=main.e3dc23bc.chunk.js.map