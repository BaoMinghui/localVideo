const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema;

var videoSchema = new Schema({
  name: String,
  url: String,
  createTime: {
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  score: Number,
  delete: Boolean,
})


videoSchema.statics = {
  get_data: async function(page, limit) {
    let data = await this.find({}, '-__v -_id -url -createTime', {
      skip: (page - 1) * limit,
      limit: limit
    })
    let total = Math.ceil(await this.count() / limit)
    return {
      total,
      data
    }
  },

  get_data_random: async function(limit) {
    let videoList = []
    for (let i = 0; i < limit; i++) {
      let id = Math.ceil(Number(await this.count()) * Math.random())
      let data = await this.findOne({
        id: id
      },'-_id name id')
      videoList.push(data)
    }
    return videoList
  },

  get_url: async function(videoId) {
    let video = await this.findOne({
      id: videoId
    })
    return video.url
  },

  set_score: async function(videoId, score) {
    let video = await this.findOneAndUpdate({
      id: videoId
    }, {
      $set: {
        score: score
      }
    }, {
      new: true
    })
    video.save()
    return video
  },

  get_score: async function(videoId) {
    let video = await this.findOne({
      id: videoId
    })
    if (video.score) {
      return video.score
    } else {
      return false
    }
  },

  set_delete: async function(videoId) {
    let video = await this.findOne({
      id: videoId
    })
    video.delete = !vidoe.delete
    video.save()
    return video.delete
  }
}

module.exports = videoSchema;