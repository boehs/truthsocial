(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{831:function(t,e,s){"use strict";s.r(e),s.d(e,"default",(function(){return g}));var a,o,r,n=s(0),c=s(5),i=(s(1),s(9)),u=s(17),p=s(2),d=s.n(p),l=s(16),h=s.n(l),f=s(80),b=s(22),m=s(3),j=s(176),O=s(201),v=s(203),I=s(13),w=s(202),y=Object(m.f)({refresh:{id:"refresh",defaultMessage:"Refresh"}}),g=Object(i.connect)((function(t,e){return{accountIds:t.getIn(["user_lists","favourited_by",e.params.statusId])}}))(a=Object(m.g)((r=o=function(t){function e(){for(var e,s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))||this).handleRefresh=function(){e.props.dispatch(Object(b.s)(e.props.params.statusId))},e}Object(c.a)(e,t);var s=e.prototype;return s.componentWillMount=function(){this.props.accountIds||this.props.dispatch(Object(b.s)(this.props.params.statusId))},s.componentWillReceiveProps=function(t){t.params.statusId!==this.props.params.statusId&&t.params.statusId&&this.props.dispatch(Object(b.s)(t.params.statusId))},s.render=function(){var t=this.props,e=t.intl,s=t.shouldUpdateScroll,a=t.accountIds,o=t.multiColumn;if(!a)return Object(n.a)(O.a,{},void 0,Object(n.a)(f.a,{}));var r=Object(n.a)(m.b,{id:"empty_column.favourites",defaultMessage:"No one has favourited this toot yet. When someone does, they will show up here."});return Object(n.a)(O.a,{bindToDocument:!o},void 0,Object(n.a)(w.a,{showBackButton:!0,multiColumn:o,extraButton:Object(n.a)("button",{className:"column-header__button",title:e.formatMessage(y.refresh),"aria-label":e.formatMessage(y.refresh),onClick:this.handleRefresh},void 0,Object(n.a)(I.a,{id:"refresh"}))}),Object(n.a)(v.a,{scrollKey:"favourites",shouldUpdateScroll:s,emptyMessage:r,bindToDocument:!o},void 0,a.map((function(t){return Object(n.a)(j.a,{id:t,withNote:!1},t)}))))},e}(u.a),o.propTypes={params:d.a.object.isRequired,dispatch:d.a.func.isRequired,shouldUpdateScroll:d.a.func,accountIds:h.a.list,multiColumn:d.a.bool,intl:d.a.object.isRequired},a=r))||a)||a}}]);
//# sourceMappingURL=favourites-f5c60da97486c819e1a2.chunk.js.map