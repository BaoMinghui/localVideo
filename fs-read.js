const path = require('path')
const fs = require('fs')
const url = require("./config").db
const filePath = require('./config').filePath
const mongoose = require('mongoose')
const moment = require('moment')

let list = []
let id=1

mongoose.connect(url)

let db = mongoose.connection
db.on("error", () => {
  console.log("数据库连接失败");
})

db.once('open', () => {
  console.log("数据库连接成功");

  for (let item of filePath) {
    console.log('开始读取' + item)
    readFile(item)
  }
  // db.close()
})

let Schema = mongoose.Schema
let videoSchema = new Schema({
  name: String,
  url: String,
  id:Number,
  createTime: {
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  updateTime: {
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
})
let video = mongoose.model('video', videoSchema)


function writeData(data) {
	let videoMsg = new video(data)
	videoMsg.save()
}

function readFile(readurl) {
  fs.readdir(readurl, (err, files) => {
    if (err) {
      throw err
    }
    // console.log("开始读取目录" + readurl);
    let count = files.length
    files.forEach((filename, index) => {
      fs.stat(path.join(readurl, filename), (err, stats) => {
        if (err) {
          throw err
        }

        if (stats.isFile()) {
          if (getdir(filename) === 'mp4' || getdir(filename) === 'mkv') {
            let newUrl = readurl + '\\' + filename;
            list.push({
              name: filename,
              url: newUrl
            })
						writeData({
              name: filename,
              url: newUrl,
              id:id++
            })
          }
        } else if (stats.isDirectory()) {
          readFile(path.join(readurl, filename))
        }
      })
    })
  })
}

function getdir(url) {
  let arr = url.split('.');
  let len = arr.length;
  return arr[len - 1]
}
