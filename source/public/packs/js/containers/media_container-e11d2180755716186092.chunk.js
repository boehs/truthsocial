(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1094:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return M}));var o=a(0),n=a(14),i=a(33),l=a(5),d=a(1),s=a.n(d),c=a(28),r=a.n(c),u=a(3),m=a(4),p=a(6),h=a(334),b=a(179),g=a(324),O=a(150),f=a(368),j=a(108),v=a(37),C=a(146),y=a(72),k=["media","card","poll","hashtag"],S=Object(p.getLocale)(),w=S.localeData,x=S.messages;Object(u.e)(w);var J={MediaGallery:b.default,Video:v.default,Card:C.a,Poll:g.a,Hashtag:O.a,Audio:y.default},M=function(e){function t(){for(var t,a=arguments.length,o=new Array(a),n=0;n<a;n++)o[n]=arguments[n];return(t=e.call.apply(e,[this].concat(o))||this).state={media:null,index:null,time:null,backgroundColor:null,options:null},t.handleOpenMedia=function(e,a){document.body.classList.add("with-modals--active"),document.documentElement.style.marginRight=Object(h.a)()+"px",t.setState({media:e,index:a})},t.handleOpenVideo=function(e){var a=t.props.components,o=JSON.parse(a[e.componetIndex].getAttribute("data-props")).media,n=Object(m.fromJS)(o);document.body.classList.add("with-modals--active"),document.documentElement.style.marginRight=Object(h.a)()+"px",t.setState({media:n,options:e})},t.handleCloseMedia=function(){document.body.classList.remove("with-modals--active"),document.documentElement.style.marginRight=0,t.setState({media:null,index:null,time:null,backgroundColor:null,options:null})},t.setBackgroundColor=function(e){t.setState({backgroundColor:e})},t}return Object(l.a)(t,e),t.prototype.render=function(){var e,t,a,l=this,c=this.props,p=c.locale,h=c.components;return Object(o.a)(u.d,{locale:p,messages:x},void 0,Object(o.a)(d.Fragment,{},void 0,[].map.call(h,(function(e,t){var a=e.getAttribute("data-component"),o=J[a],d=JSON.parse(e.getAttribute("data-props")),c=d.media,u=d.card,p=d.poll,h=d.hashtag,b=Object(i.a)(d,k);return Object.assign(b,Object(n.a)({},c?{media:Object(m.fromJS)(c)}:{},u?{card:Object(m.fromJS)(u)}:{},p?{poll:Object(m.fromJS)(p)}:{},h?{hashtag:Object(m.fromJS)(h)}:{},"Video"===a?{componetIndex:t,onOpenVideo:l.handleOpenVideo}:{onOpenMedia:l.handleOpenMedia})),r.a.createPortal(s.a.createElement(o,Object(n.a)({},b,{key:"media-"+t})),e)})),Object(o.a)(f.a,{backgroundColor:this.state.backgroundColor,onClose:this.handleCloseMedia},void 0,this.state.media&&Object(o.a)(j.a,{media:this.state.media,index:this.state.index||0,currentTime:null==(e=this.state.options)?void 0:e.startTime,autoPlay:null==(t=this.state.options)?void 0:t.autoPlay,volume:null==(a=this.state.options)?void 0:a.defaultVolume,onClose:this.handleCloseMedia,onChangeBackgroundColor:this.setBackgroundColor}))))},t}(d.PureComponent)}}]);
//# sourceMappingURL=media_container-e11d2180755716186092.chunk.js.map