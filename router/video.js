const fs = require('fs')
const Router = require("koa-router")


let video = new Router()

video.get('/', async (ctx, next) => {
  let page = ctx.query.page
  let limit = Number(ctx.query.limit)
  if(!page||!limit){
    ctx.status = 500
    ctx.body = "Lack of necessary conditions"
  }else{
    let videoData = await ctx.model('video').get_data(page, limit)
    videoData.status = 1
    ctx.body = videoData
  }
  await next()
})


video.get('/:id', async (ctx, next) => {
  let id = parseInt(ctx.params.id)
  let realpath = await ctx.model('video').get_url(id)

  if (realpath) {
    await readFile(ctx,realpath)
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
