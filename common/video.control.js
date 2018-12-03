const fs = require('fs')
const path = require('path')
const videoData = require("../models/videoData")

async function playVideo(ctx) {
  let id = parseInt(ctx.params.id)

  if (!id) {
    handleError({
      ctx,
      message: '无效参数'
    })
    return false
  }

  let realpath = await videoData.get_url(id)
  if (realpath) {
    await readFile(ctx, realpath)
  }
}

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
      stream.on("open", function () {
        stream.pipe(ctx.res);
      })
      stream.on("error", function (err) {
        ctx.body = err;
        rej()
      });
      stream.on("end", function () {
        rev()
      });
    })
  } else {
    return new Promise((rev, rej) => {
      var stream = fs.createReadStream(realpath)
      ctx.status = 206
      ctx.type = 'video/mp4'
      stream.on("open", function () {
        stream.pipe(ctx.res);
      })
      stream.on("error", function (err) {
        ctx.body = err;
        rej()
      });
      stream.on("end", function () {
        rev()
      });
    })
  }
}

function catchTag(url) {
  let arr = url.split('\\')
  let len = arr.length
  return [arr[0], arr[len - 2]]
}

async function catchImg(ctx) {
  let id = parseInt(ctx.params.id)

  if (!id) {
    handleError({
      ctx,
      message: '无效参数'
    })
    return false
  }

  let {
    name,
    url
  } = await videoData.findOne({
    id
  })
  let imgName = `${catchTag(url)[1] + '_' + name + '.jpg'}`
  let imgurl = path.join(__dirname, `../static/img/${imgName}`)
  let img = fs.readFileSync(imgurl)
  if(!img){
    ctx.status = 404
    return
  }
  ctx.type = 'image/jpg'
  ctx.status = 200
  ctx.res.write(img)
  ctx.res.end()
}




exports.videoitem = {
  playVideo,
  catchImg
}