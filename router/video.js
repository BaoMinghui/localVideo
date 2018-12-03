const Router = require("koa-router")
const {
  playVideo,
  catchImg
} = require("../common/video.control").videoitem
const catchvideos = require("../common/renew")
const videoData = require("../models/videoData")
let videoRouter = new Router()

//视频列表
videoRouter.get('/', videoData.get_data)

  .get('/random', videoData.get_data_random) //获取随机列表

  .get('/score', videoData.get_score) //获取视频评分

  .get('/isdeleted', videoData.get_delete) //获取删除状态

  .put('/setScore', videoData.set_score) //设置视频评分

  .get('/recycleBin', videoData.get_resycle_data) //获取回收站数据

  .delete('/:id', videoData.set_delete) //投入回收站

  .put('/setDelete', videoData.set_undelete) //恢复视频

  .get('/name', videoData.get_name) //获取vidoename

  .put('/addtag', videoData.addTag) 

  .get('/tagsearch', videoData.tagSearch)

  .get('/:id', playVideo) //视频播放

  .put('/renew', catchvideos) //刷新视频库

  .get('/img/:id', catchImg) //获取封面
  
module.exports = videoRouter