const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema;

var videoSchema = new Schema({
  name: String,
  url: String,
  createTime: {
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  }
})


videoSchema.statics = {
  get_data: async function(page, limit) {
    let data = await this.find({}, '-__v -url -createTime', {
      skip: (page - 1) * 30,
      limit: 30
    })
    return data
  },

  get_url: async function(videoId) {
    let video = await this.findOne({
      id:videoId
    })
    return video.url
  }
}

module.exports = videoSchema;
