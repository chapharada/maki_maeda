(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{268:function(t,e,c){var content=c(270);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,c(40).default)("237dac2d",content,!0,{sourceMap:!1})},269:function(t,e,c){"use strict";c(268)},270:function(t,e,c){var r=c(39)(!1);r.push([t.i,".card-image[data-v-0c6cbc32]{margin-bottom:.4rem}.card-image img[data-v-0c6cbc32]{width:100%;height:auto;border-radius:12px}.card-content h2[data-v-0c6cbc32]{font-weight:700;letter-spacing:.05em;font-size:1.45rem}.card-content p[data-v-0c6cbc32]{color:#666;font-size:1.05rem;line-height:1.3;letter-spacing:.08em}",""]),t.exports=r},271:function(t,e,c){"use strict";c.r(e);var r={props:{item:{type:Object},folder:{type:String,default:"",require:!1}},data:function(){return{cardGet:!1}},methods:{loaded:function(){this.cardGet=!0}}},d=(c(269),c(18)),component=Object(d.a)(r,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"card large"},[c("a",{attrs:{href:""+t.folder+t.item.id}},[c("div",{staticClass:"card-image"},[c("figure",{staticClass:"image"},[c("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],attrs:{"data-src":t.item.cover.url,alt:"item.midashi"},on:{load:t.loaded}})])]),t._v(" "),c("div",{staticClass:"card-content content"},[c("h2",[t._v(t._s(t.item.midashi))]),t._v(" "),c("p",[t._v(t._s(t.item.caption))])])])])}),[],!1,null,"0c6cbc32",null);e.default=component.exports}}]);