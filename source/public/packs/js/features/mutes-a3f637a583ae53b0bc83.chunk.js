(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{836:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return w}));var o,a,s,i=n(0),u=n(5),c=n(24),r=n.n(c),d=(n(1),n(9)),l=n(3),p=n(17),b=n(2),h=n.n(b),m=n(16),f=n.n(m),g=n(80),j=n(201),M=n(206),O=n(176),v=n(38),y=n(203),L=Object(l.f)({heading:{id:"column.mutes",defaultMessage:"Mute Users"}}),w=Object(d.connect)((function(e){return{accountIds:e.getIn(["user_lists","mutes","items"]),hasMore:!!e.getIn(["user_lists","mutes","next"]),isLoading:e.getIn(["user_lists","mutes","isLoading"],!0)}}))(o=Object(l.g)((s=a=function(e){function t(){for(var t,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(t=e.call.apply(e,[this].concat(o))||this).handleLoadMore=r()((function(){t.props.dispatch(Object(v.k)())}),300,{leading:!0}),t}Object(u.a)(t,e);var n=t.prototype;return n.componentWillMount=function(){this.props.dispatch(Object(v.l)())},n.render=function(){var e=this.props,t=e.intl,n=e.shouldUpdateScroll,o=e.hasMore,a=e.accountIds,s=e.multiColumn,u=e.isLoading;if(!a)return Object(i.a)(j.a,{},void 0,Object(i.a)(g.a,{}));var c=Object(i.a)(l.b,{id:"empty_column.mutes",defaultMessage:"You haven't muted any users yet."});return Object(i.a)(j.a,{bindToDocument:!s,icon:"volume-off",heading:t.formatMessage(L.heading)},void 0,Object(i.a)(M.a,{}),Object(i.a)(y.a,{scrollKey:"mutes",onLoadMore:this.handleLoadMore,hasMore:o,isLoading:u,shouldUpdateScroll:n,emptyMessage:c,bindToDocument:!s},void 0,a.map((function(e){return Object(i.a)(O.a,{id:e},e)}))))},t}(p.a),a.propTypes={params:h.a.object.isRequired,dispatch:h.a.func.isRequired,shouldUpdateScroll:h.a.func,hasMore:h.a.bool,isLoading:h.a.bool,accountIds:f.a.list,intl:h.a.object.isRequired,multiColumn:h.a.bool},o=s))||o)||o}}]);
//# sourceMappingURL=mutes-a3f637a583ae53b0bc83.chunk.js.map