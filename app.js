const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const home = require('./router/index')
const video = require('./router/video')
const config = require('./config')

let app = new Koa()
let router = new Router()

app.use(serve(__dirname + "/static"))
app.use(async (ctx, next) => {
  if (!ctx.model) {
    ctx.model = require('./models')
    await next()
  }
})

router.use('/', home.routes(), home.allowedMethods())
router.use('/video', video.routes(), home.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error(err)
})

app.listen(config.port, config.host, () => {
  console.log("server is starting at " + config.host + ' ' + config.port+ ' 端口') ;
})
