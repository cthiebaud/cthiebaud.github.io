!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=186)}({109:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return r}));const o=(e,t,n)=>{const o={value:t,expiry:(new Date).getTime()+n};localStorage.setItem(e,JSON.stringify(o))},r=e=>{const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return(new Date).getTime()>n.expiry?(localStorage.removeItem(e),null):n.value}},186:function(e,t,n){e.exports=n(187)},187:function(e,t,n){"use strict";n.r(t);var o,r,i,a,s,u,l=n(109);o=window,r=document,i="script",o[a="batchSDK"]=o[a]||function(){(o[a].q=o[a].q||[]).push(arguments)},s=r.createElement(i),u=r.getElementsByTagName(i)[0],s.async=1,s.src="https://via.batch.com/v3/bootstrap.min.js",u.parentNode.insertBefore(s,u);let c={native:{autoShow:!1}};-1===navigator.userAgent.indexOf("Firefox")&&-1===navigator.userAgent.indexOf("Safari")||-1!==navigator.userAgent.indexOf("Chrome")||(c={alert:{icon:lmd.batch.defaultIcon,autoShow:!1,text:"Vous souhaitez être informé ponctuellement de nos publications les plus marquantes pour mieux comprendre l’actualité ? Activez dès maintenant les notifications web.",positiveSubBtnLabel:"Autoriser",negativeBtnLabel:"Non merci"}}),batchSDK("setup",{apiKey:"9C59F3D4A35E4D63835E3EBF89A6624B",subdomain:"lemonde",authKey:"2.xKRSGVoIvXr2eHBtAtdCaKmK+GbODik6XTDUUDAm2j4=",vapidPublicKey:"BIpOJvLoDQIh24glj3bzR4T25CJ5FbL5D6U8fiOEz0f7ptofRY8YHcgvFuY/vLVXs8Zc+h634jCvosvtmddffLk=",defaultIcon:lmd.batch.defaultIcon,smallIcon:lmd.batch.smallIcon,ui:c,safari:{"https://www.lemonde.fr":"web.fr.lemonde.safari-website-push-id","https://www.stg-lemonde.fr":"web.fr.stg-lemonde.safari-website-push-id","https://www.int-lemonde.fr":"web.fr.int-lemonde.safari-website-push-id","https://www.tst-lemonde.fr":"web.fr.tst-lemonde.safari-website-push-id","https://www.loc-lemonde.fr":"web.fr.loc-lemonde.safari-website-push-id"}}),batchSDK(e=>{e.on("subscriptionChanged",(e,t)=>{"1"!==localStorage.getItem("com.batch.displayed_onboard_notif")&&!0===t.subscribed&&(localStorage.setItem("com.batch.displayed_onboard_notif","1"),new Notification("Le Monde",{body:"Merci pour votre inscription. Tout savoir sur les notifications Web."}).onclick=function(e){e.preventDefault(),window.open("https://www.lemonde.fr/actualite-medias/article/2020/06/10/qu-est-ce-qu-une-notification-web-sur-le-site-du-monde_6042411_3236.html","_blank")})})}),Object(l.a)("lmd.batch.active")&&(batchSDK("ui.show","native"),batchSDK("ui.show","alert")),window.lmd.user?batchSDK(e=>{e.setCustomUserID(window.lmd.user.id)}):batchSDK(e=>{e.setCustomUserID(null)})}});
//# sourceMappingURL=batch_push.bundle.js.map