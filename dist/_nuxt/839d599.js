(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{266:function(t,e,n){var content=n(268);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(37).default)("01f04db8",content,!0,{sourceMap:!1})},267:function(t,e,n){"use strict";n(266)},268:function(t,e,n){var r=n(36)(!1);r.push([t.i,".card-image[data-v-29370879]{margin-bottom:.4rem}.card-image img[data-v-29370879]{width:100%;height:auto;border-radius:12px}.card-content h2[data-v-29370879]{font-weight:700;letter-spacing:.05em;font-size:1.45rem}.card-content p[data-v-29370879]{color:#666;font-size:1.05rem;line-height:1.3;letter-spacing:.08em}",""]),t.exports=r},269:function(t,e,n){"use strict";n.r(e);var r={props:{item:{type:Object,countUp:Function}},data:function(){return{cardGet:!1}},methods:{loaded:function(){this.cardGet=!0}}},o=(n(267),n(18)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card large"},[n("nuxt-link",{attrs:{to:"works/"+t.item.id}},[n("div",{staticClass:"card-image"},[n("figure",{staticClass:"image"},[n("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],attrs:{"data-src":t.item.cover.url,alt:"item.midashi"},on:{load:t.loaded}})])]),t._v(" "),n("div",{staticClass:"card-content content"},[n("h2",[t._v(t._s(t.item.midashi))]),t._v(" "),n("p",[t._v(t._s(t.item.caption))])])])],1)}),[],!1,null,"29370879",null);e.default=component.exports}}]);