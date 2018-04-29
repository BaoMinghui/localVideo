const fs = require('fs')
const Router = require("koa-router")
const koaBody = require("koa-body")

let video = new Router()

//视频列表
video.get('/', async (ctx, next) => {
  let page = ctx.query.page
  let limit = Number(ctx.query.limit)
  if (!page || !limit) {
    ctx.status = 500
    ctx.body = "Lack of necessary conditions"
  } else {
    let videoData = await ctx.model('video').get_data(page, limit)
    videoData.status = 1
    ctx.body = videoData
  }
  await next()
})

//获取随机列表
video.get('/random',async (ctx,next)=>{
  let limit = ctx.query.limit
  let videolist = await ctx.model('video').get_data_random(limit)
  ctx.body = videolist
  await next()
})

//视频评分
video.get('/score', async (ctx, next) => {
  let id = Number(ctx.query.id)
  let score = await ctx.model('video').get_score(id)

  if (score) {
    ctx.body = {
      status: 1,
      score
    }
  } else {
    ctx.body = {
      status: 0
    }
  }

  await next()
})


//设置视频评分
video.post('/setScore', koaBody(), async (ctx, next) => {

  let data = ctx.request.body
  let id = Number(data.id)
  let score = Number(data.score)
  let scoreNew = await ctx.model('video').set_score(id, score)
  ctx.body = {
    score: scoreNew.score
  }
  await next()
})

//投入回收站
video.post('/setDelete', koaBody(), async (ctx, next) => {
  let body = ctx.request.body
  let id = Number(body.id)
  let data = await ctx.model('video').set_delete(id)
  if (data) {
    ctx.body = {
      status: 1
    }
  } else {
    ctx.body = {
      status: 0
    }
  }
  await next()
})

//恢复视频
video.get('/setDelete', async (ctx,next)=>{
  let id = ctx.query.id

})

//视频播放
video.get('/play/:id', async (ctx, next) => {
  let id = parseInt(ctx.params.id)
  let realpath = await ctx.model('video').get_url(id)

  if (realpath) {
    await readFile(ctx, realpath)
  }
  await next()
})


let readFile = async (ctx, realpath) => {
  let match = ctx.request.header['range']
  let stats = fs.statSync(realpath)
  if (stats.isFile() && match) {
    let bytes = match.split("=")[1]
    let start = Number.parseInt(bytes.split("-")[0])
    let end = Number.parseInt((bytes.split("-")[1]) || (stats.size - 1))

    return new Promise((rev, rej) => {
      var stream = fs.createReadStream(realpath, {
        start: start,
        end: end
      });
      ctx.set("Content-Range", `bytes ${start}-${end}/${stats.size}`)
      ctx.set("Accept-Ranges", `bytes`)
      ctx.status = 206
      ctx.type = 'video/mp4'
      stream.on("open", function(length) {
        stream.pipe(ctx.res);
      })
      stream.on("error", function(err) {
        ctx.body = err;
        rej()
      });
      stream.on("end", function(err) {
        rev()
      });
    })
  } else {
    return new Promise((rev, rej) => {
      var stream = fs.createReadStream(realpath);
      ctx.status = 206
      ctx.type = 'video/mp4'
      stream.on("open", function(length) {
        stream.pipe(ctx.res);
      })
      stream.on("error", function(err) {
        ctx.body = err;
        rej()
      });
      stream.on("end", function(err) {
        rev()
      });
    })
  }
}



module.exports = video