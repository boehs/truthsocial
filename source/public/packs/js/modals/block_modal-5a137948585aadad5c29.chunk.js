(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{838:function(o,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return m}));var t,c=e(0),a=e(5),i=e(1),r=e.n(i),l=e(9),s=e(3),d=e(35),u=e(49),b=e(21),p=e(11),f=e(53),m=Object(l.connect)((function(){var o=Object(d.d)();return function(n){return{account:o(n,n.getIn(["blocks","new","account_id"]))}}}),(function(o){return{onConfirm(n){o(Object(p.I)(n.get("id")))},onBlockAndReport(n){o(Object(p.I)(n.get("id"))),o(Object(f.k)(n))},onClose(){o(Object(b.c)())}}}))(t=Object(s.g)(t=function(o){function n(){for(var n,e=arguments.length,t=new Array(e),c=0;c<e;c++)t[c]=arguments[c];return(n=o.call.apply(o,[this].concat(t))||this).handleClick=function(){n.props.onClose(),n.props.onConfirm(n.props.account)},n.handleSecondary=function(){n.props.onClose(),n.props.onBlockAndReport(n.props.account)},n.handleCancel=function(){n.props.onClose()},n.setRef=function(o){n.button=o},n}Object(a.a)(n,o);var e=n.prototype;return e.componentDidMount=function(){this.button.focus()},e.render=function(){var o=this.props.account;return Object(c.a)("div",{className:"modal-root__modal block-modal"},void 0,Object(c.a)("div",{className:"block-modal__container"},void 0,Object(c.a)("p",{},void 0,Object(c.a)(s.b,{id:"confirmations.block.message",defaultMessage:"Are you sure you want to block {name}?",values:{name:Object(c.a)("strong",{},void 0,"@",o.get("acct"))}}))),Object(c.a)("div",{className:"block-modal__action-bar"},void 0,Object(c.a)(u.a,{onClick:this.handleCancel,className:"block-modal__cancel-button"},void 0,Object(c.a)(s.b,{id:"confirmation_modal.cancel",defaultMessage:"Cancel"})),Object(c.a)(u.a,{onClick:this.handleSecondary,className:"confirmation-modal__secondary-button"},void 0,Object(c.a)(s.b,{id:"confirmations.block.block_and_report",defaultMessage:"Block & Report"})),r.a.createElement(u.a,{onClick:this.handleClick,ref:this.setRef},Object(c.a)(s.b,{id:"confirmations.block.confirm",defaultMessage:"Block"}))))},n}(r.a.PureComponent))||t)||t}}]);
//# sourceMappingURL=block_modal-5a137948585aadad5c29.chunk.js.map