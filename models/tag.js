const mongoose = require('./index').mongoose

const tagSchema = new mongoose.Schema({
    tagName:String,
    click:Number,
    count:Number
})