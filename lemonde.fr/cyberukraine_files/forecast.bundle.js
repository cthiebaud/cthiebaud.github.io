!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=140)}({140:function(e,t,n){n(242),e.exports=n(244)},242:function(e,t,n){"use strict";function o(){return window.ATInternet&&Array.isArray(window.ATInternet.Tracker.instances)&&1===window.ATInternet.Tracker.instances.length?window.ATInternet.Tracker.instances[0]:null}function i(e={},t=!1){const n=o();n&&n.publisher&&(t||c())&&(n.publisher.set(e),n.dispatch())}function s(e={},t=!1){const n=o();n&&n.publisher&&(t||c())&&n.publisher.send(e)}function c(){const e=o();if(e&&e.privacy){const{name:t}=e.privacy.getVisitorMode()||{};if("optin"===t)return!0}return!1}function r(e){i({impression:d(e)}),l("bloc baisse de nav",{"nav: url_destination":e})}function a(e){s({click:d(e)}),l("clic: bloc baisse de nav",{"nav: url_destination":e})}function d(e){return{campaignId:"[bloc baisse de nav]",creation:"[".concat(e,"]")}}function l(e,t={}){const n=new CustomEvent("lmdDropNavigationBloc",{detail:{eventName:e,properties:t}});document.dispatchEvent(n)}function u(){i({impression:{campaignId:"[bandeau abandonniste]"}}),p("bandeau abandonniste")}function m(){s({click:{campaignId:"[bandeau abandonniste]"}}),p("clic: bandeau abandonniste")}function p(e,t={}){const n=new CustomEvent("lmdForecastRetargeting",{detail:{eventName:e,properties:t}});document.dispatchEvent(n)}n.r(t);var w=n(89);!function(e,t){const n=e.__forecast||(e.__forecast={}),o=((window.lmd||{}).hosts||{}).forecast||null;if(n.domain=o?"https://".concat(o):"https://forecast.lemonde.fr",!n.loaded){const e=t.createElement("script");e.async=!0,e.src="".concat(n.domain,"/sdk.js");const o=t.getElementsByTagName("script")[0];o.parentNode.insertBefore(e,o),n.loaded=!0}}(window,document);const f=function(){const e=new Date;if(e.getUTCMonth()>2||e.getUTCDate()>21)return!0;if(e.getUTCHours()<11)return!1;if(11===e.getUTCHours()){const t=e.getUTCMinutes()/59;return Math.random()<t}return!0}();if(window.__forecast.config={services:{readingRate:{},widget:[{targetSelector:".forecast_antichurn",name:"antichurn",type:"antichurn",versions:{type:"rotation",frequency:"15d",startDate:"2020-11-19",items:[{template:"antichurn",passLead:!0,options:{indicator:"inbox",type:"podcast"},events:{visible:()=>{r("https://www.lemonde.fr/podcasts/")},click:()=>{a("https://www.lemonde.fr/podcasts/")}}},{template:"antichurn",passLead:!0,options:{indicator:"inbox",type:"videos"},events:{visible:()=>{r("https://www.lemonde.fr/videos/")},click:()=>{a("https://www.lemonde.fr/videos/")}}},{template:"antichurn",passLead:!0,options:{indicator:"inbox",type:"newsletters"},events:{visible:()=>{r("https://www.lemonde.fr/newsletters/")},click:()=>{a("https://www.lemonde.fr/newsletters/")}}},{template:"antichurn",passLead:!0,options:{indicator:"inbox",type:"international"},events:{visible:()=>{r("https://www.lemonde.fr/international/")},click:()=>{a("https://www.lemonde.fr/international/")}}}]}},{targetSelector:".forecast-retargeting-banner",name:"retargeting_banner",type:"retargeting",expire:604800,capping:10,versions:[{rate:50,template:"retargeting",passLead:!0,options:{layout:"banner",ctaText:"Finalisez votre abonnement pour soutenir le travail de nos journalistes, partout dans le monde. -50% la première année.",ctaXtor:"AC-668-[c]"},events:{visible:()=>{u(),Object(w.a)()},click:()=>{m()}}},{rate:50,template:"retargeting",passLead:!0,options:{layout:"banner",ctaText:"Finalisez votre abonnement pour accéder à l'ensemble de nos articles. -50% la première année.",ctaXtor:"AC-668-[d]"},events:{visible:()=>{u(),Object(w.a)()},click:()=>{m()}}}]},{targetSelector:".forecast-retargeting-block",name:"retargeting_block",type:"retargeting",expire:604800,capping:10,template:"retargeting",passLead:!0,options:{layout:"bloc"},events:{visible:()=>{u()},click:()=>{m()}}},{targetSelector:"#article_recos_premium",name:"article_bottom",template:"article_bottom",passUrl:!0,options:{itemNumber:16,skin:"list",...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"}},events:{load:()=>{const e=document.getElementById("article_recos_premium");e.replaceWith(...e.childNodes)}}},{targetSelector:"#article_recos_1",name:"article_bottom",template:"article_bottom",passUrl:!0,options:{itemNumber:7,skin:"thumbnails",...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"}},events:{load:()=>{const e=document.getElementById("article_recos_1");e.replaceWith(...e.childNodes)}}},{targetSelector:"#article_recos_2",name:"article_bottom",template:"article_bottom",passUrl:!0,options:{itemNumber:6,offset:7,skin:"thumbnails",...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"}},events:{load:()=>{const e=document.getElementById("article_recos_2");e.replaceWith(...e.childNodes)}}},{targetSelector:"#article_recos_3",name:"article_bottom",template:"article_bottom",passUrl:!0,options:{itemNumber:2,offset:13,skin:"thumbnails",...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"}},events:{load:()=>{const e=document.getElementById("article_recos_3");e.replaceWith(...e.childNodes)}}},{targetSelector:"#paywall_same_section",name:"paywall_same_section",template:"tops",passUrl:!0,options:{orderBy:"pageview",skin:"paywall_section",itemNumber:3,...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"},section:void 0!==window.lmd.cat1?window.lmd.cat1:null}},{targetSelector:"#paywall_opinions",name:"paywall_opinions",template:"tops",passUrl:!0,options:{orderBy:"pageview",skin:"paywall_opinions",itemNumber:3,...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"}}}],zone:[{type:"to_read",selector:".article__content .catcher a"},{type:"most_read",selector:"#forecast_widget li a"},{type:"article_bottom",selector:"section.article__siblings-container ".concat(window.lmd.isAbo?"section":"div"," a")}]},contentSelector:".article__content",pageType:function(){if(!window.lmd.context.pageType)return"unknown";if("Rubrique_Une"===window.lmd.context.pageType)return"home";if("recherche"===window.lmd.context.pageType){const e=new URLSearchParams(window.location.search);return e&&e.has("search_keywords")?"search_results":"search"}return"Element"===window.lmd.context.pageType?"article":"unknown"}()},void 0!==window.lmd.section&&window.lmd.section.includes("podcasts")?window.__forecast.config.services.widget.push({targetSelector:"#forecast_widget",name:"most_read_podcasts",template:"recommendations",options:{type:"weighted-top-articles",...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"},section:"Podcasts",itemNumber:"3",skin:"podcasts"}}):window.__forecast.config.services.widget.push({targetSelector:"#forecast_widget",name:"most_read",template:"recommendations",options:{type:"weighted-top-articles",itemNumber:"3",...f&&{excludedSections:"Le Monde in English"},...f&&{excludedSubsections:"The French Test"}}}),window.lmd.user){const{user:e}=window.lmd;window.__forecast.user={countryCode:e.countryCode,formulaCode:e.code_selection,formulaIsForStudent:e.isStudent,formulaIsPromoOffer:e.promoOffer,id:e.id,isSubscriber:e.abo,subscriptionApp:e.subscriptionApp,subscriptionCardExpirationDate:e.expiryDate,subscriptionDevice:e.subscriptionDevice,subscriptionEndDate:e.endDate,subscriptionOrderDate:e.orderDate,subscriptionSource:e.subscriptionSource,subscriptionStartDate:e.beginDate,zipCode:e.postalCode}}},244:function(e,t,n){"use strict";function o(e){const{version:t,feedback:n}=e.detail;!1!==n||1!==t&&2!==t||window.__forecast.launchComment()}n.r(t);var i=n(8);let s=!1,c=!1;function r(){s=!0,window.__forecast.collectAdHover(),!0===c&&(window.focus(),c=!1)}function a(){s=!1}function d(){!0===s&&!1===c&&(window.__forecast.collectAdClick(),c=!0)}if(document.getElementsByClassName("meta__social").length>0&&window.addEventListener("socialShare",e=>{window.__forecast&&e.detail&&"element-live"!==e.detail.position&&function(e,t){switch(t){case"fb":e.launchShareFacebook();break;case"tw":e.launchShareTwitter();break;case"mail":e.launchShareMail();break;default:e.launchShare()}}(window.__forecast,e.detail.socialType)}),function(){if(window.__forecast&&"home"!==window.lmd.typePage&&!1===(window.lmd.user&&window.lmd.user.abo)){const e=["js-pave-haut","js-pave-milieu","js-pave-bas"];for(let t=0;t<e.length;t+=1){const n=document.getElementsByClassName(e[t])[0];n&&(n.addEventListener("mouseenter",r),n.addEventListener("mouseleave",a))}window.addEventListener("blur",d)}}(),Object(i.a)(window.lmd,"analytics","amplitude","pageType")&&"commentaires"===window.lmd.analytics.amplitude.pageType){!function(e,t){e&&e.addEventListener("commentPost",o.bind(t))}(document.getElementById("comment-form"))}},38:function(e,t,n){"use strict";function o(){const e=window,t=document,n=t.documentElement,o=t.getElementsByTagName("body")[0],i=e.innerHeight||n.clientHeight||o.clientHeight;return{width:e.innerWidth||n.clientWidth||o.clientWidth,height:i}}function i(){const e=void 0!==window.pageXOffset,t="CSS1Compat"===(document.compatMode||"");return{x:e?window.pageXOffset:t?document.documentElement.scrollLeft:document.body.scrollLeft,y:e?window.pageYOffset:t?document.documentElement.scrollTop:document.body.scrollTop}}function s(e){const t=e.getBoundingClientRect(),n=window.pageYOffset||document.documentElement.scrollTop;return t.top+n}n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return s}))},70:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return i}));const o=1024,i=576},8:function(e,t,n){"use strict";function o(e,...t){let n=!0;return t.reduce((e,t)=>e&&void 0!==e[t]?e[t]:(n=!1,null),e),n}n.d(t,"a",(function(){return o}))},89:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return r}));var o=n(38),i=n(70);function s(){const e=document.getElementById("js-relance-banner");Object(o.c)().width>=i.b&&e&&(e.classList.add("message--shown"),e.dispatchEvent(new Event("shown")))}function c(){const e=document.getElementById("js-relance-banner");Object(o.c)().width>=i.b&&e&&e.classList.contains("message--shown")&&e.classList.remove("message--shown")}function r(){const e=document.getElementById("js-relance-close"),t=document.getElementById("js-relance-banner");e&&e.addEventListener("click",e=>{e.preventDefault(),c(),t.dispatchEvent(new Event("close"))})}}});
//# sourceMappingURL=forecast.bundle.js.map