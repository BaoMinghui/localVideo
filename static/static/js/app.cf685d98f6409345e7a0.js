webpackJsonp([1],{"8LDW":function(t,e){},HB6Z:function(t,e){},"MAT+":function(t,e,a){t.exports=a.p+"static/img/video.3f9fc4e.jpg"},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("MVMM"),i=(a("hRMT"),{render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-header",{staticClass:"centent"},[a("el-row",{staticClass:"tag"},[a("el-col",{attrs:{xl:5}},[a("el-input",{staticClass:"input_box",attrs:{placeholder:"tag搜索","prefix-icon":"el-icon-search"},model:{value:t.tag,callback:function(e){t.tag=e},expression:"tag"}})],1),t._v(" "),a("el-col",{staticClass:"hidden-md-and-down",attrs:{span:2}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-delete"}},[t._v("回收站")])],1),t._v(" "),a("el-col",{staticClass:"hidden-md-and-down",attrs:{span:2}},[a("el-button",{attrs:{type:"primary"},on:{click:t.goto_home}},[t._v("首页")])],1)],1)],1)},staticRenderFns:[]});var s={name:"App",components:{topTool:a("Z0/y")({data:function(){return{tag:""}},methods:{goto_home:function(){this.$router.push("/")}}},i,!1,function(t){a("h/6l")},"data-v-61ad3a81",null).exports}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-container",{attrs:{id:"app"}},[e("top-tool",{ref:"topTool"}),this._v(" "),e("router-view",{staticClass:"router-view"})],1)},staticRenderFns:[]};var r=a("Z0/y")(s,o,!1,function(t){a("HB6Z")},null,null).exports,c=a("zO6J"),d={name:"video_tag",props:{item:{type:Object}},data:function(){return{}},methods:{turn_to:function(){this.$router.push({name:"video",params:{id:this.item.id}})}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"video",on:{click:function(e){t.turn_to(t.item.id)}}},[n("el-card",{attrs:{shadow:"hover"}},[n("div",{staticClass:"img"},[n("img",{attrs:{src:a("MAT+"),alt:t.item.name}})]),t._v(" "),n("p",{staticClass:"video_name"},[t._v("\n        "+t._s(t.item.name)+"\n    ")])])],1)},staticRenderFns:[]};var l=a("Z0/y")(d,u,!1,function(t){a("wn5i")},"data-v-1d327b03",null).exports,p={data:function(){return{video:[],total:0,limit:10,tag:[]}},methods:{getStatus:function(t){var e=t.split("/");return Number(e[e.length-1])},openVideo:function(t){this.$router.push({name:"video",params:{videoid:t}})},getData:function(){var t=this;this.$http.get("/video",{params:{page:this.page,limit:this.limit}}).then(function(e){e.data.status&&(t.video=e.data.data,t.total=e.data.total,window.scrollTo(0,0),t.$router.push("/page/"+t.page))})},page_size_change:function(t){this.$store.commit("page_size_change",t),this.limit=t,this.getData()},set_key:function(t){return t.name},page_change_add:function(){this.$store.commit("page_change_add"),this.getData()},page_change_sub:function(){this.$store.commit("page_change_sub"),this.getData()},page_change:function(t){this.$store.commit("page_change",t),this.getData()}},mounted:function(){this.getData()},components:{videotag:l},watch:{$route:function(t,e){this.page_change(this.getStatus(this.$route.path))}},computed:{page:function(){return this.$store.state.page},page_size:function(){return this.$store.state.page_size}},created:function(){this.getData()}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{staticClass:"video_area",attrs:{xl:16}},t._l(t.video,function(e){return a("videotag",{key:t.set_key(e),attrs:{item:e}})}))],1),t._v(" "),a("el-pagination",{staticClass:"pagetag",attrs:{background:"",small:"",layout:"prev, pager, next,sizes,jumper","page-size":t.page_size,"page-sizes":[6,10,20,30],"pager-count":5,"page-count":t.total,"current-page":t.page},on:{"current-change":t.page_change,"prev-click":t.page_change_sub,"next-click":t.page_change_add,"size-change":t.page_size_change}})],1)},staticRenderFns:[]};var g=a("Z0/y")(p,h,!1,function(t){a("sGax")},null,null).exports,v={props:["id"],data:function(){return{tags:[],score:0,newTag:"",inputVisible:!1,videoData:{}}},computed:{deleted:function(){return!!this.videoData.deleted},disabled:function(){this.videoData.score}},methods:{showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick(function(e){t.$refs.saveTagInput.$refs.input.focus()})},get_video_data:function(){var t=this;this.$http.get("/video/videoData",{params:{id:this.id}}).then(function(e){t.videoData=e.data})},setScore:function(){var t=this,e=new URLSearchParams;e.append("score",""+this.score),e.append("id",""+this.videoData.id),this.disabled=!0,this.$http.post("/video/setScore",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.disabled=!0})},set_encode_wrong:function(){var t=this,e=new URLSearchParams;e.append("id",""+this.id),this.$http.post("/video/encodeWrong",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.$message("移出播放列表"),t.$router.push("/")})},delete_video:function(){var t=this,e=new URLSearchParams;e.append("id",""+this.id),this.$http.post("/video/setDelete",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){1===e.data.status&&(t.$message("删除成功"),t.$router.push("/"))})},set_tag:function(){var t=this;if(!this.newTag||this.videoData.tag.indexOf(this.newTag)>=0)return this.inputVisible=!1,void(this.newTag="");var e=new URLSearchParams;e.append("id",""+this.id),e.append("tag",""+this.newTag),this.$http.post("/video/addTag",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.videoData.tag=e.data,t.inputVisible=!1})}},mounted:function(){this.get_video_data(),this.videoData.score&&(this.score=this.videoData.score)}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"video_tool"},[a("el-col",{staticClass:"tag",attrs:{span:6}},[t._l(t.videoData.tag,function(e){return a("el-tag",{key:e,attrs:{type:"success",hit:""}},[t._v("\n        "+t._s(e)+"\n      ")])}),t._v(" "),t.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{"hidden-md-only":"",size:"small"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.set_tag(e):null}},model:{value:t.newTag,callback:function(e){t.newTag="string"==typeof e?e.trim():e},expression:"newTag"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:t.showInput}},[t._v("+ New Tag")])],2),t._v(" "),a("el-col",{staticClass:"rate-box",attrs:{span:6}},[a("span",[t._v("评分")]),t._v(" "),a("el-rate",{staticClass:"rate",attrs:{"allow-half":"","void-color":"#aaa",disabled:t.disabled},on:{change:function(e){t.setScore()}},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}})],1),t._v(" "),a("el-col",{staticClass:"delete_btn",attrs:{span:2}},[a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",disabled:t.deleted},on:{click:t.delete_video}})],1),t._v(" "),a("el-col",{staticClass:"fix_btn",attrs:{span:3}},[a("el-button",{attrs:{type:"warning",icon:"el-icon-setting"},on:{click:t.set_encode_wrong}})],1)],1)},staticRenderFns:[]};var _={data:function(){return{videos:[]}},methods:{set_key:function(t){return t.name},get_video:function(){var t=this;this.$http.get("/video/random",{params:{limit:6}}).then(function(e){t.videos=e.data})}},mounted:function(){this.get_video()},components:{videotag:l}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"random-page"},t._l(t.videos,function(e){return a("videotag",{key:t.set_key(e),attrs:{item:e}})}))},staticRenderFns:[]};var w={props:["id"],data:function(){return{videoData:{}}},methods:{video_url:function(){return"/video/play/"+this.id},get_name:function(){var t=this;this.$http.get("/video/name",{params:{id:this.id}}).then(function(e){t.name=e.data})},getStatus:function(t){var e=t.split("/");return Number(e[e.length-1])}},mounted:function(){this.get_name()},watch:{$route:function(t,e){this.get_name()}},components:{videoTool:a("Z0/y")(v,f,!1,function(t){a("klDY")},null,null).exports,randomVideo:a("Z0/y")(_,m,!1,function(t){a("psjE")},null,null).exports}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"centent",attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{xl:14}},[a("h2",{key:t.id},[t._v(t._s(t.videoData.name))]),t._v(" "),a("video",{staticClass:"video_box",attrs:{src:t.video_url(),controls:""}}),t._v(" "),a("video-tool",{ref:"videoTool",attrs:{id:t.id}}),t._v(" "),a("random-video",{ref:"randomVideo"})],1)],1)},staticRenderFns:[]};var b=a("Z0/y")(w,y,!1,function(t){a("8LDW")},null,null).exports;n.default.use(c.a);var $=new c.a({routes:[{path:"/",name:"index",redirect:{path:"/page/1"}},{path:"/video/:id",name:"video",component:b,props:!0},{path:"/page/:page",name:"page",component:g}]}),x=a("aozt"),C=a.n(x),k=a("b13w"),T=a.n(k),D=(a("rZ9o"),a("9rMa"));n.default.use(D.a);var z=new D.a.Store({state:{page:1,page_size:10},mutations:{page_change_add:function(t){t.page++},page_change_sub:function(t){t.page--},page_change:function(t,e){t.page=e},page_size_change:function(t,e){t.page_size=e}}});n.default.use(T.a),n.default.prototype.$http=C.a,n.default.prototype.$store=z,n.default.config.productionTip=!1,new n.default({el:"#app",router:$,components:{App:r},template:"<App/>"})},"h/6l":function(t,e){},hRMT:function(t,e){},klDY:function(t,e){},psjE:function(t,e){},rZ9o:function(t,e){},sGax:function(t,e){},wn5i:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.cf685d98f6409345e7a0.js.map