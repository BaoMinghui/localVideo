const Router = require("koa-router")
const picData = require("../models/pictureDate")
let picRouter = new Router()

picRouter.get('/', picData.get_data)
    .get('/tagsearch', picData.tagSearch)

module.exports = picRouter