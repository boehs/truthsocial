(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{709:function(e,t,n){(function(n){var o,r,a;"undefined"!=typeof window&&window,r=[],void 0===(a="function"==typeof(o=function(){return function e(t,n){"use strict";var o=Object.create(e.prototype),r=0,a=0,i=0,c=0,s=[],l=!0,u=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},d=null,f=!1;try{var p=Object.defineProperty({},"passive",{get:function(){f=!0}});window.addEventListener("testPassive",null,p),window.removeEventListener("testPassive",null,p)}catch(e){}var m=window.cancelAnimationFrame||window.mozCancelAnimationFrame||clearTimeout,h=window.transformProp||function(){var e=document.createElement("div");if(null===e.style.transform){var t=["Webkit","Moz","ms"];for(var n in t)if(void 0!==e.style[t[n]+"Transform"])return t[n]+"Transform"}return"transform"}();function v(){if(3===o.options.breakpoints.length&&Array.isArray(o.options.breakpoints)){var e,t=!0,n=!0;if(o.options.breakpoints.forEach((function(o){"number"!=typeof o&&(n=!1),null!==e&&o<e&&(t=!1),e=o})),t&&n)return}o.options.breakpoints=[576,768,1201],console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted")}o.options={speed:-2,verticalSpeed:null,horizontalSpeed:null,breakpoints:[576,768,1201],center:!1,wrapper:null,relativeToWrapper:!1,round:!0,vertical:!0,horizontal:!1,verticalScrollAxis:"y",horizontalScrollAxis:"x",callback:function(){}},n&&Object.keys(n).forEach((function(e){o.options[e]=n[e]})),n&&n.breakpoints&&v(),t||(t=".rellax");var w="string"==typeof t?document.querySelectorAll(t):[t];if(w.length>0){if(o.elems=w,o.options.wrapper&&!o.options.wrapper.nodeType){var g=document.querySelector(o.options.wrapper);if(!g)return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");o.options.wrapper=g}var y,x=function(e){var t=o.options.breakpoints;return e<t[0]?"xs":e>=t[0]&&e<t[1]?"sm":e>=t[1]&&e<t[2]?"md":"lg"},b=function(){for(var e=0;e<o.elems.length;e++){var t=O(o.elems[e]);s.push(t)}},A=function e(){for(var t=0;t<s.length;t++)o.elems[t].style.cssText=s[t].style;s=[],a=window.innerHeight,c=window.innerWidth,y=x(c),E(),b(),_(),l&&(window.addEventListener("resize",e),l=!1,T())},O=function(e){var t,n=e.getAttribute("data-rellax-percentage"),r=e.getAttribute("data-rellax-speed"),i=e.getAttribute("data-rellax-xs-speed"),s=e.getAttribute("data-rellax-mobile-speed"),l=e.getAttribute("data-rellax-tablet-speed"),u=e.getAttribute("data-rellax-desktop-speed"),d=e.getAttribute("data-rellax-vertical-speed"),f=e.getAttribute("data-rellax-horizontal-speed"),p=e.getAttribute("data-rellax-vertical-scroll-axis"),m=e.getAttribute("data-rellax-horizontal-scroll-axis"),h=e.getAttribute("data-rellax-zindex")||0,v=e.getAttribute("data-rellax-min"),w=e.getAttribute("data-rellax-max"),g=e.getAttribute("data-rellax-min-x"),x=e.getAttribute("data-rellax-max-x"),b=e.getAttribute("data-rellax-min-y"),A=e.getAttribute("data-rellax-max-y"),O=!0;i||s||l||u?t={xs:i,sm:s,md:l,lg:u}:O=!1;var E=o.options.wrapper?o.options.wrapper.scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;o.options.relativeToWrapper&&(E=(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)-o.options.wrapper.offsetTop);var L=o.options.vertical&&(n||o.options.center)?E:0,T=o.options.horizontal&&(n||o.options.center)?o.options.wrapper?o.options.wrapper.scrollLeft:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft:0,_=L+e.getBoundingClientRect().top,S=e.clientHeight||e.offsetHeight||e.scrollHeight,P=T+e.getBoundingClientRect().left,C=e.clientWidth||e.offsetWidth||e.scrollWidth,z=n||(L-_+a)/(S+a),j=n||(T-P+c)/(C+c);o.options.center&&(j=.5,z=.5);var q=O&&null!==t[y]?Number(t[y]):r||o.options.speed,R=d||o.options.verticalSpeed,H=f||o.options.horizontalSpeed,I=p||o.options.verticalScrollAxis,M=m||o.options.horizontalScrollAxis,N=k(j,z,q,R,H),Y=e.style.cssText,B="",F=/transform\s*:/i.exec(Y);if(F){var U=F.index,X=Y.slice(U),D=X.indexOf(";");B=D?" "+X.slice(11,D).replace(/\s/g,""):" "+X.slice(11).replace(/\s/g,"")}return{baseX:N.x,baseY:N.y,top:_,left:P,height:S,width:C,speed:q,verticalSpeed:R,horizontalSpeed:H,verticalScrollAxis:I,horizontalScrollAxis:M,style:Y,transform:B,zindex:h,min:v,max:w,minX:g,maxX:x,minY:b,maxY:A}},E=function(){var e=r,t=i;if(r=o.options.wrapper?o.options.wrapper.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset,i=o.options.wrapper?o.options.wrapper.scrollLeft:(document.documentElement||document.body.parentNode||document.body).scrollLeft||window.pageXOffset,o.options.relativeToWrapper){var n=(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset;r=n-o.options.wrapper.offsetTop}return!(e==r||!o.options.vertical)||!(t==i||!o.options.horizontal)},k=function(e,t,n,r,a){var i={},c=(a||n)*(100*(1-e)),s=(r||n)*(100*(1-t));return i.x=o.options.round?Math.round(c):Math.round(100*c)/100,i.y=o.options.round?Math.round(s):Math.round(100*s)/100,i},L=function e(){window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e),(o.options.wrapper?o.options.wrapper:window).removeEventListener("scroll",e),(o.options.wrapper?o.options.wrapper:document).removeEventListener("touchmove",e),d=u(T)},T=function e(){E()&&!1===l?(_(),d=u(e)):(d=null,window.addEventListener("resize",L),window.addEventListener("orientationchange",L),(o.options.wrapper?o.options.wrapper:window).addEventListener("scroll",L,!!f&&{passive:!0}),(o.options.wrapper?o.options.wrapper:document).addEventListener("touchmove",L,!!f&&{passive:!0}))},_=function(){for(var e,t=0;t<o.elems.length;t++){var n=s[t].verticalScrollAxis.toLowerCase(),l=s[t].horizontalScrollAxis.toLowerCase(),u=-1!=n.indexOf("x")?r:0,d=-1!=n.indexOf("y")?r:0,f=-1!=l.indexOf("x")?i:0,p=(d+(-1!=l.indexOf("y")?i:0)-s[t].top+a)/(s[t].height+a),m=(u+f-s[t].left+c)/(s[t].width+c),v=(e=k(m,p,s[t].speed,s[t].verticalSpeed,s[t].horizontalSpeed)).y-s[t].baseY,w=e.x-s[t].baseX;null!==s[t].min&&(o.options.vertical&&!o.options.horizontal&&(v=v<=s[t].min?s[t].min:v),o.options.horizontal&&!o.options.vertical&&(w=w<=s[t].min?s[t].min:w)),null!=s[t].minY&&(v=v<=s[t].minY?s[t].minY:v),null!=s[t].minX&&(w=w<=s[t].minX?s[t].minX:w),null!==s[t].max&&(o.options.vertical&&!o.options.horizontal&&(v=v>=s[t].max?s[t].max:v),o.options.horizontal&&!o.options.vertical&&(w=w>=s[t].max?s[t].max:w)),null!=s[t].maxY&&(v=v>=s[t].maxY?s[t].maxY:v),null!=s[t].maxX&&(w=w>=s[t].maxX?s[t].maxX:w);var g=s[t].zindex,y="translate3d("+(o.options.horizontal?w:"0")+"px,"+(o.options.vertical?v:"0")+"px,"+g+"px) "+s[t].transform;o.elems[t].style[h]=y}o.options.callback(e)};return o.destroy=function(){for(var e=0;e<o.elems.length;e++)o.elems[e].style.cssText=s[e].style;l||(window.removeEventListener("resize",A),l=!0),m(d),d=null},A(),o.refresh=A,o}console.warn("Rellax: The elements you're trying to select don't exist.")}})?o.apply(t,r):o)||(e.exports=a)}).call(this,n(124))},800:function(e,t,n){"use strict";n.r(t),n.d(t,"createBrowserHistory",(function(){return k})),n.d(t,"createHashHistory",(function(){return C})),n.d(t,"createMemoryHistory",(function(){return j})),n.d(t,"createLocation",(function(){return w})),n.d(t,"locationsAreEqual",(function(){return g})),n.d(t,"parsePath",(function(){return h})),n.d(t,"createPath",(function(){return v}));var o=n(14);function r(e){return"/"===e.charAt(0)}function a(e,t){for(var n=t,o=n+1,r=e.length;o<r;n+=1,o+=1)e[n]=e[o];e.pop()}var i=function(e,t){void 0===t&&(t="");var n,o=e&&e.split("/")||[],i=t&&t.split("/")||[],c=e&&r(e),s=t&&r(t),l=c||s;if(e&&r(e)?i=o:o.length&&(i.pop(),i=i.concat(o)),!i.length)return"/";if(i.length){var u=i[i.length-1];n="."===u||".."===u||""===u}else n=!1;for(var d=0,f=i.length;f>=0;f--){var p=i[f];"."===p?a(i,f):".."===p?(a(i,f),d++):d&&(a(i,f),d--)}if(!l)for(;d--;d)i.unshift("..");!l||""===i[0]||i[0]&&r(i[0])||i.unshift("");var m=i.join("/");return n&&"/"!==m.substr(-1)&&(m+="/"),m};function c(e){return e.valueOf?e.valueOf():Object.prototype.valueOf.call(e)}var s=function e(t,n){if(t===n)return!0;if(null==t||null==n)return!1;if(Array.isArray(t))return Array.isArray(n)&&t.length===n.length&&t.every((function(t,o){return e(t,n[o])}));if("object"==typeof t||"object"==typeof n){var o=c(t),r=c(n);return o!==t||r!==n?e(o,r):Object.keys(Object.assign({},t,n)).every((function(o){return e(t[o],n[o])}))}return!1},l="Invariant failed";var u=function(e,t){if(!e)throw new Error(l)};function d(e){return"/"===e.charAt(0)?e:"/"+e}function f(e){return"/"===e.charAt(0)?e.substr(1):e}function p(e,t){return function(e,t){return 0===e.toLowerCase().indexOf(t.toLowerCase())&&-1!=="/?#".indexOf(e.charAt(t.length))}(e,t)?e.substr(t.length):e}function m(e){return"/"===e.charAt(e.length-1)?e.slice(0,-1):e}function h(e){var t=e||"/",n="",o="",r=t.indexOf("#");-1!==r&&(o=t.substr(r),t=t.substr(0,r));var a=t.indexOf("?");return-1!==a&&(n=t.substr(a),t=t.substr(0,a)),{pathname:t,search:"?"===n?"":n,hash:"#"===o?"":o}}function v(e){var t=e.pathname,n=e.search,o=e.hash,r=t||"/";return n&&"?"!==n&&(r+="?"===n.charAt(0)?n:"?"+n),o&&"#"!==o&&(r+="#"===o.charAt(0)?o:"#"+o),r}function w(e,t,n,r){var a;"string"==typeof e?(a=h(e)).state=t:(void 0===(a=Object(o.a)({},e)).pathname&&(a.pathname=""),a.search?"?"!==a.search.charAt(0)&&(a.search="?"+a.search):a.search="",a.hash?"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash):a.hash="",void 0!==t&&void 0===a.state&&(a.state=t));try{a.pathname=decodeURI(a.pathname)}catch(e){throw e instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):e}return n&&(a.key=n),r?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=i(a.pathname,r.pathname)):a.pathname=r.pathname:a.pathname||(a.pathname="/"),a}function g(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&s(e.state,t.state)}function y(){var e=null;var t=[];return{setPrompt:function(t){return e=t,function(){e===t&&(e=null)}},confirmTransitionTo:function(t,n,o,r){if(null!=e){var a="function"==typeof e?e(t,n):e;"string"==typeof a?"function"==typeof o?o(a,r):r(!0):r(!1!==a)}else r(!0)},appendListener:function(e){var n=!0;function o(){n&&e.apply(void 0,arguments)}return t.push(o),function(){n=!1,t=t.filter((function(e){return e!==o}))}},notifyListeners:function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];t.forEach((function(e){return e.apply(void 0,n)}))}}}var x=!("undefined"==typeof window||!window.document||!window.document.createElement);function b(e,t){t(window.confirm(e))}var A="popstate",O="hashchange";function E(){try{return window.history.state||{}}catch(e){return{}}}function k(e){void 0===e&&(e={}),x||u(!1);var t,n=window.history,r=(-1===(t=window.navigator.userAgent).indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history,a=!(-1===window.navigator.userAgent.indexOf("Trident")),i=e,c=i.forceRefresh,s=void 0!==c&&c,l=i.getUserConfirmation,f=void 0===l?b:l,h=i.keyLength,g=void 0===h?6:h,k=e.basename?m(d(e.basename)):"";function L(e){var t=e||{},n=t.key,o=t.state,r=window.location,a=r.pathname+r.search+r.hash;return k&&(a=p(a,k)),w(a,o,n)}function T(){return Math.random().toString(36).substr(2,g)}var _=y();function S(e){Object(o.a)(B,e),B.length=n.length,_.notifyListeners(B.location,B.action)}function P(e){(function(e){return void 0===e.state&&-1===navigator.userAgent.indexOf("CriOS")})(e)||j(L(e.state))}function C(){j(L(E()))}var z=!1;function j(e){if(z)z=!1,S();else{_.confirmTransitionTo(e,"POP",f,(function(t){t?S({action:"POP",location:e}):function(e){var t=B.location,n=R.indexOf(t.key);-1===n&&(n=0);var o=R.indexOf(e.key);-1===o&&(o=0);var r=n-o;r&&(z=!0,I(r))}(e)}))}}var q=L(E()),R=[q.key];function H(e){return k+v(e)}function I(e){n.go(e)}var M=0;function N(e){1===(M+=e)&&1===e?(window.addEventListener(A,P),a&&window.addEventListener(O,C)):0===M&&(window.removeEventListener(A,P),a&&window.removeEventListener(O,C))}var Y=!1;var B={length:n.length,action:"POP",location:q,createHref:H,push:function(e,t){var o="PUSH",a=w(e,t,T(),B.location);_.confirmTransitionTo(a,o,f,(function(e){if(e){var t=H(a),i=a.key,c=a.state;if(r)if(n.pushState({key:i,state:c},null,t),s)window.location.href=t;else{var l=R.indexOf(B.location.key),u=R.slice(0,l+1);u.push(a.key),R=u,S({action:o,location:a})}else window.location.href=t}}))},replace:function(e,t){var o="REPLACE",a=w(e,t,T(),B.location);_.confirmTransitionTo(a,o,f,(function(e){if(e){var t=H(a),i=a.key,c=a.state;if(r)if(n.replaceState({key:i,state:c},null,t),s)window.location.replace(t);else{var l=R.indexOf(B.location.key);-1!==l&&(R[l]=a.key),S({action:o,location:a})}else window.location.replace(t)}}))},go:I,goBack:function(){I(-1)},goForward:function(){I(1)},block:function(e){void 0===e&&(e=!1);var t=_.setPrompt(e);return Y||(N(1),Y=!0),function(){return Y&&(Y=!1,N(-1)),t()}},listen:function(e){var t=_.appendListener(e);return N(1),function(){N(-1),t()}}};return B}var L="hashchange",T={hashbang:{encodePath:function(e){return"!"===e.charAt(0)?e:"!/"+f(e)},decodePath:function(e){return"!"===e.charAt(0)?e.substr(1):e}},noslash:{encodePath:f,decodePath:d},slash:{encodePath:d,decodePath:d}};function _(e){var t=e.indexOf("#");return-1===t?e:e.slice(0,t)}function S(){var e=window.location.href,t=e.indexOf("#");return-1===t?"":e.substring(t+1)}function P(e){window.location.replace(_(window.location.href)+"#"+e)}function C(e){void 0===e&&(e={}),x||u(!1);var t=window.history,n=(window.navigator.userAgent.indexOf("Firefox"),e),r=n.getUserConfirmation,a=void 0===r?b:r,i=n.hashType,c=void 0===i?"slash":i,s=e.basename?m(d(e.basename)):"",l=T[c],f=l.encodePath,h=l.decodePath;function g(){var e=h(S());return s&&(e=p(e,s)),w(e)}var A=y();function O(e){Object(o.a)(Y,e),Y.length=t.length,A.notifyListeners(Y.location,Y.action)}var E=!1,k=null;function C(){var e,t,n=S(),o=f(n);if(n!==o)P(o);else{var r=g(),i=Y.location;if(!E&&(t=r,(e=i).pathname===t.pathname&&e.search===t.search&&e.hash===t.hash))return;if(k===v(r))return;k=null,function(e){if(E)E=!1,O();else{var t="POP";A.confirmTransitionTo(e,t,a,(function(n){n?O({action:t,location:e}):function(e){var t=Y.location,n=R.lastIndexOf(v(t));-1===n&&(n=0);var o=R.lastIndexOf(v(e));-1===o&&(o=0);var r=n-o;r&&(E=!0,H(r))}(e)}))}}(r)}}var z=S(),j=f(z);z!==j&&P(j);var q=g(),R=[v(q)];function H(e){t.go(e)}var I=0;function M(e){1===(I+=e)&&1===e?window.addEventListener(L,C):0===I&&window.removeEventListener(L,C)}var N=!1;var Y={length:t.length,action:"POP",location:q,createHref:function(e){var t=document.querySelector("base"),n="";return t&&t.getAttribute("href")&&(n=_(window.location.href)),n+"#"+f(s+v(e))},push:function(e,t){var n="PUSH",o=w(e,void 0,void 0,Y.location);A.confirmTransitionTo(o,n,a,(function(e){if(e){var t=v(o),r=f(s+t);if(S()!==r){k=t,function(e){window.location.hash=e}(r);var a=R.lastIndexOf(v(Y.location)),i=R.slice(0,a+1);i.push(t),R=i,O({action:n,location:o})}else O()}}))},replace:function(e,t){var n="REPLACE",o=w(e,void 0,void 0,Y.location);A.confirmTransitionTo(o,n,a,(function(e){if(e){var t=v(o),r=f(s+t);S()!==r&&(k=t,P(r));var a=R.indexOf(v(Y.location));-1!==a&&(R[a]=t),O({action:n,location:o})}}))},go:H,goBack:function(){H(-1)},goForward:function(){H(1)},block:function(e){void 0===e&&(e=!1);var t=A.setPrompt(e);return N||(M(1),N=!0),function(){return N&&(N=!1,M(-1)),t()}},listen:function(e){var t=A.appendListener(e);return M(1),function(){M(-1),t()}}};return Y}function z(e,t,n){return Math.min(Math.max(e,t),n)}function j(e){void 0===e&&(e={});var t=e,n=t.getUserConfirmation,r=t.initialEntries,a=void 0===r?["/"]:r,i=t.initialIndex,c=void 0===i?0:i,s=t.keyLength,l=void 0===s?6:s,u=y();function d(e){Object(o.a)(x,e),x.length=x.entries.length,u.notifyListeners(x.location,x.action)}function f(){return Math.random().toString(36).substr(2,l)}var p=z(c,0,a.length-1),m=a.map((function(e){return w(e,void 0,"string"==typeof e?f():e.key||f())})),h=v;function g(e){var t=z(x.index+e,0,x.entries.length-1),o=x.entries[t];u.confirmTransitionTo(o,"POP",n,(function(e){e?d({action:"POP",location:o,index:t}):d()}))}var x={length:m.length,action:"POP",location:m[p],index:p,entries:m,createHref:h,push:function(e,t){var o="PUSH",r=w(e,t,f(),x.location);u.confirmTransitionTo(r,o,n,(function(e){if(e){var t=x.index+1,n=x.entries.slice(0);n.length>t?n.splice(t,n.length-t,r):n.push(r),d({action:o,location:r,index:t,entries:n})}}))},replace:function(e,t){var o="REPLACE",r=w(e,t,f(),x.location);u.confirmTransitionTo(r,o,n,(function(e){e&&(x.entries[x.index]=r,d({action:o,location:r}))}))},go:g,goBack:function(){g(-1)},goForward:function(){g(1)},canGo:function(e){var t=x.index+e;return t>=0&&t<x.entries.length},block:function(e){return void 0===e&&(e=!1),u.setPrompt(e)},listen:function(e){return u.appendListener(e)}};return x}},801:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(14),a=(n(101),n(79)),i=n.n(a),c=n(82),s=n(46),l=n(83);Object(l.a)(),window.addEventListener("message",(function(e){var t=e.data||{};window.parent&&"setHeight"===t.type&&Object(s.default)((function(){window.parent.postMessage({type:"setHeight",id:t.id,height:document.getElementsByTagName("html")[0].scrollHeight},"*")}))})),Object(c.a)().then((function(){var e=n(68).default,t=n(65).timeAgoString,a=n(55).delegate,c=n(48).default,l=(0,n(6).getLocale)().messages,u=(n(1),n(28)),d=n(709),f=n(800).createBrowserHistory,p=function(){var e=f(),t=document.querySelectorAll(".public-layout .detailed-status"),n=e.location;1!==t.length||n.state&&n.state.scrolledToDetailedStatus||(t[0].scrollIntoView(),e.replace(n.pathname,Object(r.a)({},n.state,{scrolledToDetailedStatus:!0})))},m=function(e){return function(t){var n=t.target;n.src=n.getAttribute(e)}};Object(s.default)((function(){var r=document.documentElement.lang,i=new Intl.DateTimeFormat(r,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"});window.addEventListener("load",(function(){document.querySelectorAll("a[data-status-id]").forEach((function(e){e.addEventListener("click",(function(t){e.classList.contains("markTrending")?function(e){var t=e.parentElement;e.classList.remove("show"),t.getElementsByClassName("markNotTrending")[0].classList.add("show")}(e):function(e){var t=e.parentElement;e.classList.remove("show"),t.getElementsByClassName("markTrending")[0].classList.add("show")}(e)}))}))})),[].forEach.call(document.querySelectorAll(".emojify"),(function(e){e.innerHTML=c(e.innerHTML)})),[].forEach.call(document.querySelectorAll("time.formatted"),(function(e){var t=new Date(e.getAttribute("datetime")),n=i.format(t);e.title=n,e.textContent=n})),[].forEach.call(document.querySelectorAll("time.time-ago"),(function(n){var o=new Date(n.getAttribute("datetime")),a=new Date;n.title=i.format(o),n.textContent=t({formatMessage:function(t,n){var o=t.id,a=t.defaultMessage;return new e(l[o]||a,r).format(n)},formatDate:function(e,t){return new Intl.DateTimeFormat(r,t).format(e)}},o,a,a.getFullYear(),n.getAttribute("datetime").includes("T"))}));var s=document.querySelectorAll("[data-component]");s.length>0?n.e(6).then(n.bind(null,1094)).then((function(e){var t=e.default;[].forEach.call(s,(function(e){[].forEach.call(e.children,(function(t){e.removeChild(t)}))}));var n=document.createElement("div");u.render(Object(o.a)(t,{locale:r,components:s}),n),document.body.appendChild(n),p()})).catch((function(e){console.error(e),p()})):p(),document.querySelectorAll(".parallax").length>0&&new d(".parallax",{speed:-1}),a(document,"#registration_user_password_confirmation,#registration_user_password","input",(function(){var t=document.getElementById("registration_user_password"),n=document.getElementById("registration_user_password_confirmation");t.value&&t.value!==n.value?n.setCustomValidity(new e(l["password_confirmation.mismatching"]||"Password confirmation does not match",r).format()):n.setCustomValidity("")})),a(document,"#user_password,#user_password_confirmation","input",(function(){var t=document.getElementById("user_password"),n=document.getElementById("user_password_confirmation");n&&(t.value&&t.value!==n.value?n.setCustomValidity(new e(l["password_confirmation.mismatching"]||"Password confirmation does not match",r).format()):n.setCustomValidity(""))})),a(document,".custom-emoji","mouseover",m("data-original")),a(document,".custom-emoji","mouseout",m("data-static")),a(document,".status__content__spoiler-link","click",(function(){var t=this.parentNode.parentNode;return"expanded"===t.dataset.spoiler?(t.dataset.spoiler="folded",this.textContent=new e(l["status.show_more"]||"Show more",r).format()):(t.dataset.spoiler="expanded",this.textContent=new e(l["status.show_less"]||"Show less",r).format()),!1})),[].forEach.call(document.querySelectorAll(".status__content__spoiler-link"),(function(t){var n="expanded"===t.parentNode.parentNode.dataset.spoiler?l["status.show_less"]||"Show less":l["status.show_more"]||"Show more";t.textContent=new e(n,r).format()}))})),a(document,".webapp-btn","click",(function(e){var t=e.target;return 0!==e.button||(window.location.href=t.href,!1)})),a(document,".modal-button","click",(function(e){var t;e.preventDefault(),t="A"!==e.target.nodeName?e.target.parentNode.href:e.target.href,window.open(t,"mastodon-intent","width=445,height=600,resizable=no,menubar=no,status=no,scrollbars=yes")})),a(document,"#account_display_name","input",(function(e){var t=e.target,n=document.querySelector(".card .display-name strong");n&&(t.value?n.innerHTML=c(i()(t.value)):n.textContent=t.dataset.default)})),a(document,"#account_avatar","change",(function(e){var t=e.target,n=document.querySelector(".card .avatar img"),o=(t.files||[])[0],r=o?URL.createObjectURL(o):n.dataset.originalSrc;n.src=r}));var h=function(e){return function(t){var n=t.target,o=n.getAttribute(e);"true"!==n.getAttribute("data-autoplay")&&n.src!==o&&(n.src=o)}};a(document,"img#profile_page_avatar","mouseover",h("data-original")),a(document,"img#profile_page_avatar","mouseout",h("data-static")),a(document,"#account_header","change",(function(e){var t=e.target,n=document.querySelector(".card .card__img img"),o=(t.files||[])[0],r=o?URL.createObjectURL(o):n.dataset.originalSrc;n.src=r})),a(document,"#account_locked","change",(function(e){var t=e.target,n=document.querySelector(".card .display-name i");n&&(t.checked?delete n.dataset.hidden:n.dataset.hidden="true")})),a(document,".input-copy input","click",(function(e){var t=e.target;t.focus(),t.select(),t.setSelectionRange(0,t.value.length)})),a(document,".input-copy button","click",(function(e){var t=e.target,n=t.parentNode.querySelector(".input-copy__wrapper input"),o=n.readonly;n.readonly=!1,n.focus(),n.select(),n.setSelectionRange(0,n.value.length);try{document.execCommand("copy")&&(n.blur(),t.parentNode.classList.add("copied"),setTimeout((function(){t.parentNode.classList.remove("copied")}),700))}catch(e){console.error(e)}n.readonly=o})),a(document,".sidebar__toggle__icon","click",(function(){var e=document.querySelector(".sidebar ul");"block"===e.style.display?e.style.display="none":e.style.display="block"})),a(document,"#registration_new_user,#new_user","submit",(function(){["user_website","user_confirm_password","registration_user_website","registration_user_confirm_password"].forEach((function(e){var t=document.getElementById(e);t&&(t.value="")}))})),a(document,'[data-behavior="close-window"]',"click",(function(){window.open("","_parent","").close()}))})).then((function(){return/KAIOS/.test(navigator.userAgent)?n.e(4).then(n.bind(null,1095)).then((function(e){e.register()})):Promise.resolve()})).catch((function(e){console.error(e)}))}},[[801,0]]]);
//# sourceMappingURL=public-6af40068be3f366206fa.chunk.js.map