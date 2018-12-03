const mongoose = require('./index').mongoose
const autoIncrement = require('mongoose-auto-increment')

//自增id初始化
autoIncrement.initialize(mongoose.connection)

const videoSchema = new mongoose.Schema({
    tagname:String,
    count:Number
})

export default videoSchema