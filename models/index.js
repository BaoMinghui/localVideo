const mongoose = require('mongoose')
const videoSchema = require('./videoData')
const config = require('../config')


mongoose.Promise = global.Promise
mongoose.connect(config.db,(err)=>{
  if(err){
    console.log(err);
  }
  console.log("成功连接数据库");
})

mongoose.model('video',videoSchema)

module.exports = (name)=>{
  name = name.toLowerCase()
  return mongoose.model(name)
}
