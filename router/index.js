const Router = require('koa-router')
const fs = require('fs')
const video = require('./video')
const picture = require('./picture')

let home = new Router()
let router = new Router()

home.get('/', async (ctx) => {
  let html = fs.readFileSync('./static/index.html','binary')
  ctx.res.writeHead(200)
  ctx.res.write(html,'binary')
  ctx.res.end()
})

router.use('/', home.routes())
router.use('/video', video.routes())
router.use('/pic',picture.routes())

module.exports = router
