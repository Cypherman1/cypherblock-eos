(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{107:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=v(a(15)),n=v(a(14)),r=v(a(13)),c=v(a(12)),s=v(a(11)),d=a(0),m=v(d),o=a(18),u=v(a(158)),i=a(8),f=a(29);function v(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(){return(0,n.default)(this,t),(0,c.default)(this,(t.__proto__||(0,l.default)(t)).apply(this,arguments))}return(0,s.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this;return m.default.createElement(o.Query,{query:u.default,pollInterval:5e3},function(t){var a=t.loading,l=t.error,n=t.data;if(a)return m.default.createElement("section",{className:"section"},m.default.createElement("div",{className:"text-center"},m.default.createElement(i.FontAwesomeIcon,{icon:"spinner",spin:!0,className:"text-info"})));if(l)return m.default.createElement("section",{className:"section"},m.default.createElement("div",{className:"text-center"},m.default.createElement(i.FontAwesomeIcon,{icon:"spinner",spin:!0,className:"text-info"})));var r=n.chain,c=e.props.block_num;return r?Number(r.last_irreversible_block_num)>=Number(c)?m.default.createElement("div",{className:"d-inline bg-success text-light rounded irr-mark "},"Irreversible"):r.head_block_num&&Number(r.head_block_num)>=Number(c)?m.default.createElement("div",{className:"d-inline"},"Confirmations"," ",m.default.createElement("span",{className:"text-light bg-info rounded font-weight-bold p-1"},(0,f.renderBlockNum)(Number(r.head_block_num)-Number(c)))):m.default.createElement("section",{className:"section"},m.default.createElement("div",{className:"text-center"},m.default.createElement(i.FontAwesomeIcon,{icon:"spinner",spin:!0,className:"text-info"}))):m.default.createElement("section",{className:"section"},m.default.createElement("div",{className:"text-center"},m.default.createElement(i.FontAwesomeIcon,{icon:"spinner",spin:!0,className:"text-info"})))})}}]),t}(d.Component);t.default=p},158:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=(0,r(a(21)).default)(["\n  query get_confirmations {\n    chain {\n      head_block_num\n      last_irreversible_block_num\n    }\n  }\n"],["\n  query get_confirmations {\n    chain {\n      head_block_num\n      last_irreversible_block_num\n    }\n  }\n"]),n=r(a(20));function r(e){return e&&e.__esModule?e:{default:e}}t.default=(0,n.default)(l)},159:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=(0,r(a(21)).default)(["\n  query get_block($block_num_or_id: String!) {\n    block(block_num_or_id: $block_num_or_id) {\n      id\n      timestamp\n      producer\n      previous\n      block_num\n      transactions {\n        trx\n      }\n    }\n  }\n"],["\n  query get_block($block_num_or_id: String!) {\n    block(block_num_or_id: $block_num_or_id) {\n      id\n      timestamp\n      producer\n      previous\n      block_num\n      transactions {\n        trx\n      }\n    }\n  }\n"]),n=r(a(20));function r(e){return e&&e.__esModule?e:{default:e}}t.default=(0,n.default)(l)},160:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=N(a(15)),n=N(a(14)),r=N(a(13)),c=N(a(12)),s=N(a(11)),d=a(0),m=N(d),o=a(18),u=a(36),i=a(70),f=N(a(159)),v=a(8),p=a(24),E=N(a(107));function N(e){return e&&e.__esModule?e:{default:e}}var _=function(){return m.default.createElement("div",{className:"card-block "},m.default.createElement("div",{className:"text-center align-middle overlay pt-60"},m.default.createElement(v.FontAwesomeIcon,{icon:"spinner",spin:!0,className:"text-info fa-2x"})),m.default.createElement("div",{className:"row row-sm stats-container m-0 plheight"}))},b=function(e){function t(){var e,a,r,s;(0,n.default)(this,t);for(var d=arguments.length,m=Array(d),o=0;o<d;o++)m[o]=arguments[o];return a=r=(0,c.default)(this,(e=t.__proto__||(0,l.default)(t)).call.apply(e,[this].concat(m))),r.notify=function(){return i.toast.error("Not found!",{position:i.toast.POSITION.TOP_RIGHT})},s=a,(0,c.default)(r,s)}return(0,s.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this;return m.default.createElement(o.Query,{query:f.default,variables:{block_num_or_id:this.props.block_num_or_id}},function(t){var a=t.loading,l=t.error,n=t.data;if(a)return m.default.createElement(_,null);if(l)return m.default.createElement(_,null);var r=n.block;return r?m.default.createElement("div",null,m.default.createElement("div",{className:"card-block "},m.default.createElement("div",{className:"row row-sm stats-container m-0"},m.default.createElement("div",{className:"col-12 col-sm-12 stat-col pr-1 pl-1"},m.default.createElement("div",{className:"stat"},m.default.createElement("div",{className:"blocktxid"},r.id),m.default.createElement("div",{className:"name"},"Block ID")),m.default.createElement("div",{className:"progress stat-progress"},m.default.createElement("div",{className:"progress-bar",style:{width:"0%"}}))),m.default.createElement("div",{className:"col-12 col-sm-12 stat-col pr-1 pl-1"},m.default.createElement("div",{className:"stat"},m.default.createElement("div",{className:"value ftz-11"},(0,p.renderBlockLink)(r.previous)),m.default.createElement("div",{className:"name"},"Previous Block")),m.default.createElement("div",{className:"progress stat-progress"},m.default.createElement("div",{className:"progress-bar",style:{width:"0%"}}))),m.default.createElement("div",{className:"col-12 col-sm-4 stat-col pr-1 pl-1"},m.default.createElement("div",{className:"col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1"},m.default.createElement("div",{className:"stat"},m.default.createElement("div",{className:"value ftz-11"},(0,p.renderBlockLink)(r.block_num)),m.default.createElement("div",{className:"name"},"Block num")),m.default.createElement("div",{className:"progress stat-progress"},m.default.createElement("div",{className:"progress-bar",style:{width:"0%"}}))),m.default.createElement("div",{className:"col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1"},m.default.createElement("div",{className:"stat"},m.default.createElement("div",{className:"value ftz-11"},(0,p.convertUTCDateToLocalDate)(new Date(r.timestamp)).toLocaleString()),m.default.createElement("div",{className:"name"},"Timestamp")),m.default.createElement("div",{className:"progress stat-progress"},m.default.createElement("div",{className:"progress-bar",style:{width:"0%"}}))),m.default.createElement("div",{className:"col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1"},m.default.createElement("div",{className:"stat"},m.default.createElement("div",{className:"value ftz-11"},(0,p.renderAccountLink)(r.producer)),m.default.createElement("div",{className:"name"},"Producer")),m.default.createElement("div",{className:"progress stat-progress"},m.default.createElement("div",{className:"progress-bar",style:{width:"0%"}}))),m.default.createElement("div",{className:"col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1"},m.default.createElement("div",{className:"stat"},m.default.createElement("div",{className:"value ftz-11"},m.default.createElement(E.default,{block_num:r.block_num})),m.default.createElement("div",{className:"name"},"Status")),m.default.createElement("div",{className:"progress stat-progress"},m.default.createElement("div",{className:"progress-bar",style:{width:"0%"}})))),m.default.createElement("div",{className:"col-12 col-sm-8  pr-0 pl-1"},m.default.createElement("div",{className:"col-12 col-sm-12  pr-0 pl-1"},m.default.createElement("div",{className:"card sameheight-item mb-0","data-exclude":"xs"},m.default.createElement("div",{className:"card-header card-header-sm bg-white  row m-0"},m.default.createElement("div",{className:"header-block pl-2 col"},m.default.createElement(v.FontAwesomeIcon,{icon:"list-alt",className:"mr-2 text-info"}),m.default.createElement("h5",{className:"title text-info ftz-12"},"Transactions"))),m.default.createElement("div",{className:"card-block pt-0"},m.default.createElement("div",{className:"no-more-tables1"},m.default.createElement("table",{className:"table actions_font tablayout mb-0"},m.default.createElement("thead",null,m.default.createElement("tr",null,m.default.createElement("th",{className:"w-10"},"#"),m.default.createElement("th",{className:"w-90"},"ID"))),m.default.createElement(u.CSSTransitionGroup,{component:"tbody",transitionName:"example",transitionEnterTimeout:500,transitionLeaveTimeout:300},r.transactions.slice().reverse().map(function(e,t){return e.trx.id?m.default.createElement("tr",{key:e.trx.id},m.default.createElement("td",{"data-title":"#",className:"pt-1 pb-1 w-10"},t+1),m.default.createElement("td",{"data-title":"ID",className:"pt-1 pb-1 w-90"},(0,p.renderTransLink)(e.trx.id))):m.default.createElement("tr",{key:e.trx},m.default.createElement("td",{"data-title":"#",className:"pt-1 pb-1 w-10"},t+1),m.default.createElement("td",{"data-title":"ID",className:"pt-1 pb-1 w-90"},(0,p.renderTransLink)(e.trx)))}))))))))))):(e.notify(),m.default.createElement(i.ToastContainer,{autoClose:2e3}))})}}]),t}(d.Component);t.default=b},195:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=s(a(0)),n=s(a(160)),r=s(a(52)),c=a(8);function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.match;return l.default.createElement("article",{className:"content dashboard-page"},l.default.createElement("section",{className:"section"},l.default.createElement("div",{className:"row m-0"},l.default.createElement("div",{className:"col col-12 col-sm-12 col-md-12 col-l-12 col-xl-12 pd-col"},l.default.createElement("div",{className:"card sameheight-item stats mbc","data-exclude":"xs"},l.default.createElement("div",{className:"card-header  bg-white shadow-sm"},l.default.createElement("div",{className:"header-block pl-2"},l.default.createElement(c.FontAwesomeIcon,{icon:"cube",className:"mr-2 text-info ftz-24"}),l.default.createElement("h5",{className:"title text-info"},l.default.createElement("div",null,"Block ")))),l.default.createElement(r.default,null,l.default.createElement(n.default,{block_num_or_id:t.params.block_num_or_id})))))))}}}]);