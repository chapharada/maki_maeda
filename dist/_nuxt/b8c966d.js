(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{272:function(t,e,n){var content=n(281);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(37).default)("70087719",content,!0,{sourceMap:!1})},280:function(t,e,n){"use strict";n(272)},281:function(t,e,n){var r=n(36)(!1);r.push([t.i,"body[data-v-3559ebb1]{font-family:Noto Suns}.cv .inner[data-v-3559ebb1]{display:flex}.cv h1[data-v-3559ebb1]{font-size:1.4rem;line-height:1.5;letter-spacing:.08em}.cv .heading[data-v-3559ebb1]{width:10%;min-width:100px}.cv .conts[data-v-3559ebb1]{width:90%;font-size:1.2rem;line-height:2.5rem;margin-bottom:2.4rem}.cv .conts .block[data-v-3559ebb1]:not(:last-child){margin-bottom:3.2rem}.cv .conts .block p+p[data-v-3559ebb1]{margin-top:1.6rem}.cv .conts .title[data-v-3559ebb1]{font-weight:700;margin-bottom:.4rem}.cv .conts .list dl div[data-v-3559ebb1]{display:flex;line-height:2}.cv .conts .list dl div dt[data-v-3559ebb1]{word-wrap:nowrap;margin-right:4rem}.cv .conts .list dl div dd span[data-v-3559ebb1]{font-size:1rem;color:#565656}",""]),t.exports=r},300:function(t,e,n){"use strict";n.r(e);var r=n(8),c=(n(57),{data:function(){return{history:[]}},created:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==(n=t.$route.query).draftKey){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,axios.get("https://maedamaki.microcms.io/api/v1/pagecv?draftKey=".concat(n.draftKey),{headers:{"X-MICROCMS-API-KEY":"979601df4f7940ffa39f9c5afc3cf197dd75"}});case 5:r=e.sent,data=r.data,t.history=data;case 8:case"end":return e.stop()}}),e)})))()}}),o=(n(280),n(18)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("div",{staticClass:"cv mainconts"},[n("div",{staticClass:"inner"},[t._m(0),t._v(" "),n("div",{staticClass:"conts"},[n("div",{staticClass:"block autor"},[n("h2",{staticClass:"title"},[t._v("maeda maki | 前田 真喜")]),t._v(" "),n("p",{staticClass:"explain"},[t._v(t._s(t.history.profile))])]),t._v(" "),t._l(t.history.cv,(function(data){return n("div",{key:data.index,staticClass:"block list"},[n("h2",{staticClass:"title"},[t._v(t._s(data.title))]),t._v(" "),n("dl",t._l(data.yearlist,(function(e){return n("div",{key:e.index},[n("dt",[t._v(t._s(e.year))]),t._v(" "),n("dd",[t._v(t._s(e.detail)),e.locate?[n("span",[t._v("（"+t._s(e.locate)+"）")])]:t._e()],2)])})),0)])}))],2)])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"heading"},[n("h1",[t._v("cv ")])])}],!1,null,"3559ebb1",null);e.default=component.exports}}]);