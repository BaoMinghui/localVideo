webpackJsonp([1],{"/LaU":function(t,e){},"8O1z":function(t,e){},CCDQ:function(t,e){},Gwci:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={};n.d(r,"getList",function(){return B}),n.d(r,"getRandomList",function(){return H}),n.d(r,"getScore",function(){return q}),n.d(r,"isDelete",function(){return A}),n.d(r,"setScore",function(){return G}),n.d(r,"recycleBin",function(){return I}),n.d(r,"deleteVideo",function(){return K}),n.d(r,"reviewVideo",function(){return M}),n.d(r,"getName",function(){return W}),n.d(r,"renewVideodb",function(){return J});var a=n("7+uW"),i=(n("sfy8"),{render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-header",{staticClass:"centent"},[n("el-input",{staticClass:"input_box",attrs:{placeholder:"tag搜索","prefix-icon":"el-icon-search"},model:{value:t.tag,callback:function(e){t.tag=e},expression:"tag"}}),t._v(" "),n("el-button",{staticClass:"hidden-sm-and-down",attrs:{type:"primary",icon:"el-icon-delete"}},[t._v("回收站")]),t._v(" "),n("el-button",{staticClass:"hidden-sm-and-down",attrs:{type:"primary"},on:{click:t.goto_home}},[t._v("首页")])],1)},staticRenderFns:[]});var o={name:"App",components:{topTool:n("VU/8")({data:function(){return{tag:""}},methods:{goto_home:function(){this.$router.push("/")}}},i,!1,function(t){n("8O1z")},"data-v-af21ecc6",null).exports}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-container",{attrs:{id:"app"}},[e("top-tool",{ref:"topTool"}),this._v(" "),e("router-view",{staticClass:"router-view"})],1)},staticRenderFns:[]};var c=n("VU/8")(o,s,!1,function(t){n("hSOn")},null,null).exports,u=n("/ocq"),d={name:"video_item",props:{item:{type:Object}},data:function(){return{}},methods:{turn_to:function(){this.$router.push({name:"video",params:{id:this.item.id}})},img_url:function(){return"/video/img/"+this.item.id}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"video",on:{click:function(e){t.turn_to(t.item.id)}}},[n("el-card",{attrs:{shadow:"hover"}},[n("div",[n("img",{attrs:{alt:t.item.name,src:t.img_url()}})]),t._v(" "),n("p",{staticClass:"video_name"},[t._v("\n      "+t._s(t.item.name)+"\n    ")])])],1)},staticRenderFns:[]};var p=n("VU/8")(d,l,!1,function(t){n("Gwci")},"data-v-0b6d4054",null).exports,f={data:function(){return{tag:[]}},computed:{videoList:function(){return this.$store.state.videolist},total:function(){return this.$store.state.total},limit:function(){return this.$store.state.page_size},page:function(){return this.$store.state.page}},methods:{getStatus:function(t){var e=t.split("/");return Number(e[e.length-1])},getData:function(){this.$store.dispatch("getVideoList"),window.scrollTo(0,0),this.$router.push("/page/"+this.page)},page_size_change:function(t){this.$store.commit("page_size_change",t),this.limit=t,this.getData()},set_key:function(t){return t.name},page_change_add:function(){this.$store.commit("page_change_add"),this.getData()},page_change_sub:function(){this.$store.commit("page_change_sub"),this.getData()},page_change:function(t){this.$store.commit("page_change",t),this.getData()}},mounted:function(){this.getData()},components:{videoItem:p},watch:{$route:function(t,e){this.page_change(this.getStatus(this.$route.path))}},created:function(){this.getData()}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("el-row",{attrs:{type:"flex",justify:"left"}},[n("el-col",{staticClass:"video_area"},t._l(t.videoList,function(e){return n("videoItem",{key:t.set_key(e),attrs:{item:e}})}))],1),t._v(" "),n("el-pagination",{staticClass:"pagetag",attrs:{background:"",layout:"prev, pager, next,sizes","page-size":t.limit,"page-sizes":[10,20,30],"pager-count":5,"page-count":t.total,"current-page":t.page},on:{"current-change":t.page_change,"prev-click":t.page_change_sub,"next-click":t.page_change_add,"size-change":t.page_size_change}})],1)},staticRenderFns:[]};var g=n("VU/8")(f,h,!1,function(t){n("/LaU")},null,null).exports,m={props:["id"],data:function(){return{tags:[],score:0,disabled:!1,deleted:!1}},methods:{setScore:function(){var t=this,e=new URLSearchParams;e.append("score",""+this.score),e.append("id",""+this.id),this.disabled=!0,this.$http.post("/video/setScore",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.disabled=!0})},getScore:function(){var t=this;this.$http.get("/video/score",{params:{id:this.id}}).then(function(e){e.data.status&&(t.score=e.data.score,t.disabled=!0)})},delete_video:function(){var t=this,e=new URLSearchParams;e.append("id",""+this.id),this.$http.post("/video/setDelete",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){1===e.data.status&&(t.$message("删除成功"),t.$router.push("/"))})},isDeleted:function(){var t=this;this.$http.get("/video/isdeleted",{params:{id:this.id}}).then(function(e){e&&(t.deleted=e.data.deleted)})}},mounted:function(){this.getScore(),this.isDeleted()}},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{staticClass:"video_tool"},[n("el-col",{staticClass:"tag"},t._l(t.tags,function(e){return n("el-tag",{attrs:{type:"success",hit:""}},[t._v("\n        "+t._s(e)+"\n      ")])})),t._v(" "),n("el-col",{staticClass:"rate-box",attrs:{span:6}},[n("span",[t._v("评分")]),t._v(" "),n("el-rate",{staticClass:"rate",attrs:{"allow-half":"","void-color":"#aaa",disabled:t.disabled},on:{change:function(e){t.setScore()}},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}})],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-delete",disabled:t.deleted},on:{click:t.delete_video}})],1)],1)},staticRenderFns:[]};var _={data:function(){return{videos:[]}},computed:{randomVideos:function(){return this.$store.state.randomVideoList}},methods:{set_key:function(t){return t.name},get_random_video:function(){this.$store.dispatch("getRandomList")}},mounted:function(){this.get_random_video()},components:{videotag:p}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"random-page"},t._l(t.randomVideos,function(e){return n("videotag",{key:t.set_key(e),attrs:{item:e}})}))},staticRenderFns:[]};var x={props:["id"],data:function(){return{url:"",videoid:"",name:""}},methods:{video_url:function(){return"/video/"+this.id},get_name:function(){var t=this;this.$http.get("/video/name",{params:{id:this.id}}).then(function(e){t.name=e.data})},getStatus:function(t){var e=t.split("/");return Number(e[e.length-1])}},mounted:function(){this.get_name()},watch:{$route:function(t,e){this.get_name()}},components:{videoTool:n("VU/8")(m,v,!1,function(t){n("QHPy")},null,null).exports,randomVideo:n("VU/8")(_,w,!1,function(t){n("CCDQ")},null,null).exports}},b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{staticClass:"centent",attrs:{type:"flex",justify:"center"}},[n("el-col",{attrs:{xl:14}},[n("h2",{key:t.id},[t._v(t._s(t.name))]),t._v(" "),n("video",{staticClass:"video_box",attrs:{src:t.video_url(),controls:""}}),t._v(" "),n("video-tool",{ref:"videoTool",attrs:{id:t.id}}),t._v(" "),n("random-video",{ref:"randomVideo"})],1)],1)},staticRenderFns:[]};var y=n("VU/8")(x,b,!1,function(t){n("QDPK")},null,null).exports;a.default.use(u.a);var k=new u.a({routes:[{path:"/",name:"index",redirect:{path:"/page/1"}},{path:"/video/:id",name:"video",component:y,props:!0},{path:"/page/:page",name:"page",component:g}]}),$=n("//Fk"),V=n.n($),C=n("mtWM"),L=n.n(C),z=n("Umb+"),S=n.n(z),D=L.a.create();D.interceptors.request.use(function(t){return"post"!==t.method&&"get"!==t.method&&"delete"!==t.method&&"put"!==t.method||(t.data=S.a.stringify(t.data)),t},function(t){return V.a.reject(t)}),D.interceptors.response.use(function(t){return t},function(t){return V.a.reject(t)});var R=D,U=n("zL8q"),F=n.n(U),T=(n("tvR6"),n("Xxa5")),E=n.n(T),N=n("exGp"),O=n.n(N),P=n("NYxO"),j=n("Dd8w"),Q=n.n(j);function B(t){return R.get("/video",{params:t}).then(function(t){return t.data})}function H(t){return R.get("/video/random",{params:t}).then(function(t){return t.data})}function q(t){return R.get("/video/score",{params:t}).then(function(t){return t.data})}function A(t){return R.get("/video/isdeleted",{params:t}).then(function(t){return t.data})}function G(t){return R.put("/video/setScore",Q()({},t)).then(function(t){return t.data})}function I(t){return R.get("/video/recycleBin",{params:t}).then(function(t){return t.data})}function K(t){return R.delete("/video/"+t).then(function(t){return t.data})}function M(t){return R.put("/video/"+t).then(function(t){return t.data})}function W(t){return R.get("/video/name",{params:t}).then(function(t){return t.data})}function J(){return R.put("/video/renew").then(res.res.data)}var X=r;a.default.use(P.a);var Y=new P.a.Store({state:{page:1,total:1,page_size:10,videolist:[],randomVideoList:[],randomListLength:3,resycle_page:1,resycle_page_size:10,resycle_list:[]},mutations:{page_change_add:function(t){t.page++},page_change_sub:function(t){t.page--},page_change:function(t,e){t.page=e},page_size_change:function(t,e){t.page_size=e},change_list:function(t,e){t.videolist=e},change_random_list:function(t,e){t.randomVideoList=e},change_total:function(t,e){t.total=e},change_resycle_list:function(t,e){t.resycle_list=e},change_resycle_page_size:function(t,e){t.resycle_page_size=e}},actions:{getVideoList:function(t){var e=this,n=t.commit,r=t.state;return O()(E.a.mark(function t(){var a,i,o;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X.getList({page:r.page,limit:r.page_size}).catch(function(t){return console.log(t)});case 2:(a=t.sent)&&(i=a.list,o=a.total,n("change_list",i),n("change_total",o));case 4:case"end":return t.stop()}},t,e)}))()},getRandomList:function(t){var e=this,n=t.commit,r=t.state;return O()(E.a.mark(function t(){var a,i;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X.getRandomList({limit:r.randomListLength}).catch(function(t){return console.log(t)});case 2:(a=t.sent)&&(i=a.list,n("change_random_list",i));case 4:case"end":return t.stop()}},t,e)}))()},getScore:function(t){var e=this;return O()(E.a.mark(function n(){var r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X.getScore({id:t}).catch(function(t){return console.log(t)});case 2:if(!(r=e.sent).status){e.next=5;break}return e.abrupt("return",r.score);case 5:case"end":return e.stop()}},n,e)}))()},setScore:function(t,e){var n=this;return O()(E.a.mark(function r(){var a;return E.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,X.setScore({id:t,score:e}).catch(function(t){return console.log(t)});case 2:if(!(a=n.sent)){n.next=5;break}return n.abrupt("return",a.score);case 5:case"end":return n.stop()}},r,n)}))()},isDelete:function(t){var e=this;return O()(E.a.mark(function n(){var r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X.isDelete({id:t}).catch(function(t){return console.log(t)});case 2:if(!(r=e.sent)){e.next=5;break}return e.abrupt("return",r.deleted);case 5:case"end":return e.stop()}},n,e)}))()},recycleBin:function(t){var e=this,n=t.commit,r=t.state;return O()(E.a.mark(function t(){var a,i,o;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X.recycleBin({page:r.resycle_page,limit:r.resycle_page_size}).catch(function(t){return console.log(t)});case 2:(a=t.sent)&&(i=a.list,o=a.total,n("change_resycle_list",i),n("change_resycle_page_size",o));case 4:case"end":return t.stop()}},t,e)}))()},deleteVideo:function(t){var e=this;return O()(E.a.mark(function n(){var r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=X.deleteVideo(t).catch(function(t){return console.log(t)}))){e.next=3;break}return e.abrupt("return",r.status);case 3:case"end":return e.stop()}},n,e)}))()},backout_delete:function(t){var e=this;return O()(E.a.mark(function n(){var r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=X.reviewVideo(t).catch(function(t){return console.log(t)}))){e.next=3;break}return e.abrupt("return",r.deleted);case 3:case"end":return e.stop()}},n,e)}))()},get_name:function(t){var e=this;return O()(E.a.mark(function n(){var r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=X.getName({id:t}).catch(function(t){return console.log(t)}))){e.next=3;break}return e.abrupt("return",r.name);case 3:case"end":return e.stop()}},n,e)}))()},renewVideodb:function(){var t=this;return O()(E.a.mark(function e(){var n;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=X.renewVideodb().catch(function(t){return console.log(t)}))){t.next=3;break}return t.abrupt("return",n.status);case 3:case"end":return t.stop()}},e,t)}))()}}});a.default.use(F.a),a.default.prototype.$http=R,a.default.prototype.$store=Y,a.default.config.productionTip=!1,new a.default({el:"#app",router:k,components:{App:c},template:"<App/>"})},QDPK:function(t,e){},QHPy:function(t,e){},hSOn:function(t,e){},sfy8:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.8a5aa3c87af7b05cc825.js.map