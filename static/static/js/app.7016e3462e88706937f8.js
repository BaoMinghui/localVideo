webpackJsonp([1],{"MAT+":function(t,e,n){t.exports=n.p+"static/img/video.3f9fc4e.jpg"},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("MVMM"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=n("Z0/y")({name:"App"},i,!1,function(t){n("mMw2")},null,null).exports,o=n("zO6J"),r={name:"video_tag",props:{item:{type:Object}},data:function(){return{}},methods:{turn_to:function(){this.$router.push({name:"video",params:{id:this.item.id,name:this.item.name}})}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"video"},[a("el-card",{attrs:{height:"16rem",shadow:"hover"}},[a("div",{staticClass:"img",on:{click:function(e){t.turn_to(t.item.id)}}},[a("img",{attrs:{src:n("MAT+"),alt:""}})]),t._v(" "),a("p",{staticClass:"video_name"},[t._v("\n        "+t._s(t.item.name)+"\n    ")])])],1)},staticRenderFns:[]};var u={data:function(){return{video:[],total:0,page:1,limit:20,tag:[]}},methods:{openVideo:function(t){this.$router.push({name:"video",params:{videoid:t}})},getData:function(){var t=this;this.$http.get("/video",{params:{page:this.page,limit:this.limit}}).then(function(e){e.data.status&&(t.video=e.data.data,t.total=e.data.total)})},page_size_change:function(t){this.limit=t,this.getData()}},mounted:function(){this.getData()},components:{videotag:n("Z0/y")(r,c,!1,function(t){n("nZAO")},"data-v-5ba2638e",null).exports}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("el-row",{attrs:{type:"flex",justify:"center"}},[n("el-col",{staticClass:"video_area",attrs:{span:14}},t._l(t.video,function(t){return n("videotag",{attrs:{item:t}})}))],1),t._v(" "),n("el-pagination",{staticClass:"pagetag",attrs:{background:"",layout:"prev, pager, next,sizes","page-size":10,"page-sizes":[10,20,30],"page-count":t.total,"current-page":t.page},on:{"update:currentPage":function(e){t.page=e},"current-change":t.getData,"size-change":t.page_size_change}})],1)},staticRenderFns:[]};var p=n("Z0/y")(u,d,!1,function(t){n("TrzJ")},null,null).exports,l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-row",{staticClass:"centent",attrs:{type:"flex",justify:"center"}},[e("el-col",{attrs:{span:14}},[e("h2",[this._v(this._s(this.name))]),this._v(" "),e("video",{staticClass:"video_box",attrs:{src:this.video_url(),controls:"",poster:n("MAT+")}})])],1)},staticRenderFns:[]};var v=n("Z0/y")({props:["id","name"],data:function(){return{url:"",videoid:""}},methods:{video_url:function(){return"/video/"+this.id}},mounted:function(){}},l,!1,function(t){n("RXox")},null,null).exports;a.default.use(o.a);var f=new o.a({routes:[{path:"/",name:"index",component:p},{path:"/video",name:"video",component:v,props:!0}]}),m=n("aozt"),h=n.n(m),g=n("b13w"),_=n.n(g);n("rZ9o");a.default.use(_.a),a.default.prototype.$http=h.a,a.default.config.productionTip=!1,new a.default({el:"#app",router:f,components:{App:s},template:"<App/>"})},RXox:function(t,e){},TrzJ:function(t,e){},mMw2:function(t,e){},nZAO:function(t,e){},rZ9o:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7016e3462e88706937f8.js.map