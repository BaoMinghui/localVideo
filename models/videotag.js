const mongoose = require('./index').mongoose
const autoIncrement = require('mongoose-auto-increment')

//自增id初始化
autoIncrement.initialize(mongoose.connection)

const tagSchema = new mongoose.Schema({
    tagName:String,
    click:Number,
    count:Number
})

export default tagSchema