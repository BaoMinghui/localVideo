const path = require("path");
const fs = require("fs");
const filePath = require("../config").filePath;
const video = require("../models/videoData");
const ffmpeg = require("fluent-ffmpeg");

let videoshotlist = []


/**
 * 获取文件后缀名
 * @param {stirng} url 文件路径
 */
function getdir(url) {
  let arr = url.split(".");
  let len = arr.length;
  return arr[len - 1];
}

/**
 * 将路径后两位取为文件tag
 * @param {string} url 
 */
function catchTag(url) {
  let arr = url.split('\\')
  let len = arr.length
  return [arr[0], arr[len - 2]]
}


//调用ffmpeg设置截图
function setScreenshot() {

  if (videoshotlist.length === 0) {
    console.log('视频封面设置完毕');
    return
  }

  let videoMsg = videoshotlist.pop()

  let filename = catchTag(videoMsg.url)[1] + '_' + videoMsg.name

  fs.access(`./static/img/${filename}.jpg`, async (err) => {
    if (err) {
      await new Promise((resolve, reject) => {
        ffmpeg(videoMsg.url).screenshots({
            count: 1,
            timestamps: ["10%"],
            filename: `${filename}.jpg`,
            folder: "./static/img"
          })
          .on('err', (err) => {
            reject(err)
            console.log(err);
          })
          .on('end', () => {
            console.log(filename);
            setScreenshot()
            resolve()
          });
      });
    } else {
      setScreenshot()
    }
  })

}


async function addToDB(filepath, filename) {

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
    videoshotlist.push({
      name: filename,
      url: filepath
    })
  }
}

async function catchvideos(ctx) {
  let promiselist = filePath.map(
    i => {
      console.log(i + ' 开始爬取')
      return travelPromise(i)
    }
  )

  await Promise.all(promiselist).then(
    () => {
      console.log('爬取完成，开始截图');
      if (ctx) {
        ctx.body = {
          status: 1
        }
      }
    }
  ).catch(() => {
    console.log('reject');
  })

  setScreenshot()
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

/**
 * promise 重写视频抓取
 */
function travelPromise(dir) {
  return new Promise((resolve) => {
    fs.readdir(dir, (e, files) => {
      if (e) {
        console.log(dir + ' 路径不存在');
        resolve()
      } else {
        const filesLength = files.length
        files.forEach(async (file, index) => {
          let pathname = path.join(dir, file)
          if (await checkIsDirectory(pathname)) {
            await travelPromise(pathname)
          } else {
            await addToDB(path.join(dir, file), file)
          }
          if (index === filesLength - 1) {
            if (filePath.includes(dir)) {
              console.log(dir + ' resolve')
            }
            resolve()
          }
        })
      }
    })
  }).catch(e => {
    if (e) {
      console.log(e);

    }
  })
}

/**
 * 判断路径是否为文件夹
 */
function checkIsDirectory(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (e, stats) => {
      if (e) {
        reject()
      }
      if (stats.isDirectory()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  });
}





module.exports = catchvideos