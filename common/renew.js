const path = require("path");
const fs = require("fs");
const filePath = require("../config").filePath;
const video = require("../models/videoData");
const ffmpeg = require("fluent-ffmpeg");

let videoshotlist = []

function getdir(url) {
  let arr = url.split(".");
  let len = arr.length;
  return arr[len - 1];
}

function catchTag(url) {
  let arr = url.split('\\')
  let len = arr.length
  return [arr[0], arr[len - 2]]
}


let setScreenshotReady = false

//调用ffmpeg设置截图
function setScreenshot() {


  function once() {
    if (!setScreenshotReady) {
      setTimeout(() => setScreenshot, 1000)
      setScreenshotReady = true
    } else {
      exaVideo()
      return
    }
  }

  if (!videoshotlist.length) {
    once()
    if (setScreenshotReady) {
      console.log('预览图设置完毕');
      return
    }
  }
  let videoMsg = videoshotlist.pop()
  let filename = catchTag(videoMsg.url)[1] + '_' + videoMsg.name
  ffmpeg(videoMsg.url).screenshots({
      count: 1,
      timestamps: ["50%"],
      filename: `${filename}.jpg`,
      folder: "./static/img"
    })
    .on('err', (err) => {
      throw err;
    })
    .on('end', () => {
      console.log('shot');
      setScreenshot()
    });
}



function travelSync(dir, callback, finish) {
  fs.readdir(dir, function (e, files) {
    if (e === null) {
      // i 用于定位当前遍历位置
      (function next(i) {
        // 当i >= files 表示已经遍历完成，进行遍历下一个文件夹
        if (i < files.length) {
          var pathname = path.join(dir, files[i]);
          if (fs.stat(pathname, function (e, stats) {
              try {
                if (stats.isDirectory()) {
                  travelSync(pathname, callback, function () {
                    next(i + 1);
                  });
                } else {
                  callback(e, pathname, files[i], function () {
                    next(i + 1);
                  });
                }
              } catch (error) {
                console.log('path' + pathname);
                throw error
              }

            }));
        } else {
          /**
           * 当 i >= files.length 时，即表示当前目录已经遍历完了， 需遍历下一个文件夹
           * 这里执行的时递归调用 传入的 方法 ， 方法里调用了 next(i) 记录了当前遍历位置
           */
          finish && finish();
        }

      })(0);
    } else {
      callback(e);
    }
  });
}


async function addToDB(e, filepath, filename, next) {
  if (e !== null) {
    console.log(e);
  }
  if (getdir(filename) === "mp4" || getdir(filename) === "mkv") {
    let tag = catchTag(filepath)
    try {
      await video.writeData({
        name: filename,
        url: filepath,
        tag: tag
      });
    } catch (error) {
      throw ('存储：' + error);
    }
    let imgname = catchTag(filepath)[1] + '_' + filename
    fs.access(`./static/img/${imgname}.jpg`, (err) => {
      if (err) {
        videoshotlist.push({
          name: filename,
          url: filepath
        })
      } else {
        return
      }
    })

  }
  // else if (getdir(filename) === 'jpg' || getdir(filename) === 'png') {
  //   let newUrl = filepath + "\\" + filename;
  //   let tag = catchTag(newUrl)
  //   try {
  //     writeState = await picture.writeData({
  //       name: filename,
  //       url: filepath,
  //       tag: tag
  //     });
  //   } catch (error) {
  //     throw ('图片收录：' + error);
  //   }
  // }
  //获取下一个文件 next 里面调用了 next(i) 记录了当前遍历位置
  next();
}

function catchvideos(ctx) {
  filePath.forEach(async (readurl, index, arr) => {
    if (index === arr.length - 1) {
      travelSync(readurl, addToDB, setScreenshot);
    } else {
      travelSync(readurl, addToDB);
    }
  });
  if (ctx) {
    ctx.body = {
      status: 1
    }
  }
}

//检查视频是否存在
async function exaVideo() {
  let videolist = await videoData.find({})
  let length = vidoelist.length
  let removelist = []
  videolist.forEach((item, index) => {
    fs.access(item.url, err => {
      if (err) {
        removelist.push(item.id)
      }
    })
    if (index === length - 1) {
      videolist.remove({
        "id": {
          $in: removelist
        }
      })
      console.log('缺失视频清理完毕');
    }
  })
  videolist.save()
}

module.exports = catchvideos
