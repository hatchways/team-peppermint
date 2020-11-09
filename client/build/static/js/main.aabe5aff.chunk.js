(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[2],{101:function(t,e,n){t.exports=n(167)},106:function(t,e,n){},125:function(t,e,n){},14:function(t,e,n){"use strict";n.d(e,"e",(function(){return f})),n.d(e,"d",(function(){return l})),n.d(e,"b",(function(){return d})),n.d(e,"g",(function(){return p})),n.d(e,"c",(function(){return v})),n.d(e,"i",(function(){return h})),n.d(e,"f",(function(){return O})),n.d(e,"a",(function(){return m})),n.d(e,"h",(function(){return b})),n.d(e,"j",(function(){return E}));var r=n(3),a=n.n(r),c=n(8),o=n(2),u=n(9),i=n.n(u),s=n(126),f=function(){var t=Object(c.a)(a.a.mark((function t(e,n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get("/user/".concat(e,"/contacts"));case 2:if((r=t.sent).data){t.next=5;break}throw Error("Oops, no contacts found");case 5:n({type:o.b,payload:{contacts:r.data.contactsList,invitations:r.data.invitationsList}});case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),l=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.delete("user/".concat(e,"/contacts"),{data:{emailToDelete:n}});case 2:if(t.sent.data){t.next=5;break}throw Error("Oops, failed to delete contact");case 5:f(e,r);case 6:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),d=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.a.post("user/".concat(e,"/approve"),{data:{contactToApprove:n}});case 3:f(e,r),t.next=9;break;case 6:throw t.prev=6,t.t0=t.catch(0),Error("Oops, something went wrong ",t.t0.message);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e,n,r){return t.apply(this,arguments)}}(),p=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){var c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.a.post("user/".concat(e,"/reject"),{data:{contactToReject:n}});case 3:return t.next=5,i.a.get("user/".concat(e,"/invitations"));case 5:c=t.sent,r({type:o.i,payload:c}),t.next=12;break;case 9:throw t.prev=9,t.t0=t.catch(0),Error("Oops, something went wrong ",t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e,n,r){return t.apply(this,arguments)}}(),v=function(){var t=Object(c.a)(a.a.mark((function t(e,n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.a.post("user/".concat(e,"/invite"),{referrer:n});case 3:return r=t.sent,t.abrupt("return",r.data);case 7:throw t.prev=7,t.t0=t.catch(0),Error("Oops, something went wrong ",t.t0.message);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,n){return t.apply(this,arguments)}}(),h=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.prev=0,n[e[0]]&&(n[e[0]].isOnline=e[1],r({type:o.h,payload:n})),t.next=8;break;case 4:throw t.prev=4,t.t0=t.catch(0),console.log(t.t0),Error("Oops, something went wrong ",t.t0.message);case 8:case"end":return t.stop()}}),t,null,[[0,4]])})));return function(e,n,r){return t.apply(this,arguments)}}(),O=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){var c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.a.post("user/".concat(e,"/search"),{query:n});case 3:if(c=t.sent,!(Object.keys(c.data.foundContactsList).length>0)){t.next=9;break}return r({type:o.h,payload:c.data.foundContactsList}),t.abrupt("return",!0);case 9:return t.abrupt("return",!1);case 10:t.next=16;break;case 12:throw t.prev=12,t.t0=t.catch(0),console.log(t.t0),Error("Oops, something went wrong ",t.t0.message);case 16:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e,n,r){return t.apply(this,arguments)}}(),m=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){var c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.a.get("/api/user/".concat(e,"/"));case 3:(c=t.sent).data&&(n[e]=c.data[e],r({type:o.a,payload:n})),t.next=11;break;case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),Error("Oops, something went wrong ",t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,n,r){return t.apply(this,arguments)}}(),b=function(t){t({type:o.f})},E=function(){var t=localStorage.getItem("auth-token"),e="Oops, no email found";return t&&(e=s(t)),e.id}},159:function(t,e){},167:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),c=n(55),o=n.n(c),u=(n(106),n(3)),i=n.n(u),s=n(8),f=n(61),l=n(5),d=n(9),p=n.n(d),v=n(93),h=Object(v.a)({typography:{fontFamily:"Open sans, sans-serif",fontSize:16,h1:{}},palette:{primary:{main:"#3A8DFF"}}}),O=n(27),m=n(176),b=n(183),E=n(178),w=n(180),g=n(181),j=(n(125),n(14)),y=n(32),x=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(4),n.e(6)]).then(n.bind(null,564))})),k=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(7)]).then(n.bind(null,562))})),T=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(8)]).then(n.bind(null,563))}));n(162).config();var S=function(){var t=Object(O.d)(),e=Object(j.j)();return Object(r.useEffect)((function(){(function(){var n=Object(s.a)(i.a.mark((function n(){var r;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return null===(r=localStorage.getItem("auth-token"))&&(localStorage.setItem("auth-token",""),r=""),n.next=4,p.a.post("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_BACKEND_URL,"/api/user/tokenIsValid"),null,{headers:{"x-auth-token":r}});case 4:n.sent.data&&(y.a.emit("login",e),Object(O.b)(t));case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}})()(),y.a.emit("login",e)}),[t,e]),Object(r.useEffect)((function(){window.addEventListener("beforeunload",(function(t){t.preventDefault(),y.a.emit("logout",e)}))}),[e]),a.a.createElement(m.a,{theme:h},a.a.createElement(r.Suspense,{fallback:a.a.createElement(b.a,{component:"div",style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",minHeight:"100vh"}},a.a.createElement(E.a,{size:50,thickness:4}))},a.a.createElement(f.a,null,a.a.createElement(w.a,null),a.a.createElement(g.a,{maxWidth:"lg",style:{margin:"auto"}},a.a.createElement(l.c,null,a.a.createElement(l.a,{exact:!0,path:"/",component:x}),a.a.createElement(l.a,{path:"/login",component:k}),a.a.createElement(l.a,{path:"/signup",component:T}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var _=n(56),C=n(59);o.a.render(a.a.createElement(O.a,null,a.a.createElement(_.a,null,a.a.createElement(C.a,null,a.a.createElement(S,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},2:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"i",(function(){return a})),n.d(e,"h",(function(){return c})),n.d(e,"d",(function(){return o})),n.d(e,"j",(function(){return u})),n.d(e,"g",(function(){return i})),n.d(e,"f",(function(){return s})),n.d(e,"c",(function(){return f})),n.d(e,"e",(function(){return l})),n.d(e,"a",(function(){return d}));var r="FETCH_CONTACTS_INVITATIONS",a="UPDATE_INVITATIONS",c="UPDATE_CONTACTS",o="FETCH_USER_DATA",u="UPDATE_USER_IMAGE",i="SET_USER_DATA",s="RESET_LISTS",f="FETCH_CONVERSATIONS",l="RESET_CONVERSATIONS",d="ADD_UKNOWN_USER"},27:function(t,e,n){"use strict";n.d(e,"a",(function(){return b})),n.d(e,"e",(function(){return E})),n.d(e,"d",(function(){return w})),n.d(e,"b",(function(){return v})),n.d(e,"c",(function(){return h}));var r=n(23),a=n(0),c=n.n(a),o=n(6),u=n(2);function i(t,e){switch(e.type){case u.g:case u.d:return Object(o.a)(Object(o.a)({},t),{},{token:e.payload.token,user:e.payload.user});case u.j:return Object(o.a)(Object(o.a)({},t),{},{user:Object(o.a)(Object(o.a)({},t.user),{},{pictureURL:e.payload.imageUrl})});default:return t}}var s=n(3),f=n.n(s),l=n(8),d=n(9),p=n.n(d),v=function(){var t=Object(l.a)(f.a.mark((function t(e){var n,r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=localStorage.getItem("auth-token"),t.next=3,p.a.get("/api/user/",{headers:{"x-auth-token":n}});case 3:r=t.sent,e({type:u.d,payload:{token:n,user:r.data}});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),h=function(t,e,n){n({type:u.g,payload:{token:t,user:e}})},O=c.a.createContext(),m=c.a.createContext();function b(t){var e=t.children,n=Object(a.useReducer)(i,{token:"",user:{id:"",name:"",email:"",language:"",pictureURL:{url:""}}}),o=Object(r.a)(n,2),u=o[0],s=o[1];return c.a.createElement(O.Provider,{value:u},c.a.createElement(m.Provider,{value:s},e)," ")}function E(){return Object(a.useContext)(O)}function w(){return Object(a.useContext)(m)}},32:function(t,e,n){"use strict";var r=n(92),a=n.n(r)()("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_BACKEND_URL));e.a=a},56:function(t,e,n){"use strict";n.d(e,"a",(function(){return d})),n.d(e,"l",(function(){return p})),n.d(e,"k",(function(){return v})),n.d(e,"f",(function(){return s.e})),n.d(e,"e",(function(){return s.d})),n.d(e,"c",(function(){return s.b})),n.d(e,"h",(function(){return s.g})),n.d(e,"m",(function(){return s.j})),n.d(e,"d",(function(){return s.c})),n.d(e,"g",(function(){return s.f})),n.d(e,"j",(function(){return s.i})),n.d(e,"i",(function(){return s.h})),n.d(e,"b",(function(){return s.a}));var r=n(23),a=n(0),c=n.n(a),o=n(6),u=n(2);function i(t,e){switch(e.type){case u.b:return Object(o.a)(Object(o.a)({},t),{},{contacts:e.payload.contacts,invitations:e.payload.invitations});case u.i:return Object(o.a)(Object(o.a)({},t),{},{invitations:e.payload});case u.h:return Object(o.a)(Object(o.a)({},t),{},{contacts:e.payload});case u.a:return Object(o.a)(Object(o.a)({},t),{},{unknownUsers:e.payload});case u.f:return{contacts:[],invitations:[],unknownUsers:[]};default:return t}}var s=n(14),f=c.a.createContext(),l=c.a.createContext();function d(t){var e=t.children,n=Object(a.useReducer)(i,{contacts:{},invitations:[],unknownUsers:[]}),o=Object(r.a)(n,2),u=o[0],s=o[1];return c.a.createElement(f.Provider,{value:u},c.a.createElement(l.Provider,{value:s},e))}function p(){return Object(a.useContext)(f)}function v(){return Object(a.useContext)(l)}},59:function(t,e,n){"use strict";n.d(e,"a",(function(){return m})),n.d(e,"e",(function(){return b})),n.d(e,"d",(function(){return E})),n.d(e,"b",(function(){return p})),n.d(e,"c",(function(){return v}));var r=n(23),a=n(0),c=n.n(a),o=n(2);function u(t,e){switch(e.type){case o.c:return{conversations:e.payload.conversations};case o.e:return{conversations:{}};default:return t}}var i=n(3),s=n.n(i),f=n(8),l=n(9),d=n.n(l),p=function(){var t=Object(f.a)(s.a.mark((function t(e,n){var r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("/user/".concat(e,"/conversations"));case 2:if((r=t.sent).data){t.next=5;break}throw Error("Oops, no contacts found");case 5:n({type:o.c,payload:{conversations:r.data}});case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),v=function(t){t({type:o.e})},h=c.a.createContext(),O=c.a.createContext();function m(t){var e=t.children,n=Object(a.useReducer)(u,{conversations:[]}),o=Object(r.a)(n,2),i=o[0],s=o[1];return c.a.createElement(h.Provider,{value:i},c.a.createElement(O.Provider,{value:s},e))}function b(){return Object(a.useContext)(h)}function E(){return Object(a.useContext)(O)}}},[[101,3,5]]]);
//# sourceMappingURL=main.aabe5aff.chunk.js.map