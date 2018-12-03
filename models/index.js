const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise

exports.mongoose = mongoose

exports.connect = () => {
  mongoose.connect(config.db)

  mongoose.connection.on('err', (err) => {
    console.log('数据库连接失败！', err);
  })

  mongoose.connection.on('open', () => {
    console.log('数据库连接成功');
  })

  return mongoose
}


exports.getModel = (name) => {
  name = name.toLowerCase()
  return mongoose.model(name)
}