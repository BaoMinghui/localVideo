const Koa = require('koa')
const serve = require('koa-static')
const koaBody = require('koa-body')
const helmet = require('koa-helmet')

const mongoose = require('./models')
const router = require('./router')
const config = require('./config')
const renewVideo = require("./common/renew")
const ipconfig = require("./common/ipconfig")

let app = new Koa()
mongoose.connect()

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(serve(__dirname + "/static"))

app.use(helmet())

app.use(koaBody({
  jsoinLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}))

app.use(router.routes())
  .use(router.allowedMethods())

app.on('error', (err) => {
  console.error(err)
})

renewVideo()

app.listen(config.port, ipconfig(), () => {
  console.log("server is starting at " + ipconfig() + ' ' + config.port + ' 端口');
})