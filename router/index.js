const Router = require('koa-router')
const fs = require('fs')
let home = new Router()

home.get('/', async (ctx,next) => {
  let html = fs.readFileSync('./static/index.html','binary')
  ctx.res.writeHead(200)
  ctx.res.write(html,'binary')
  ctx.res.end()
  await next()
})

module.exports = home
