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
    console.log(await this.count());
    let data = await this.find({}, '-__v -_id -url -createTime', {
      skip: (page - 1) * limit,
      limit: limit
    })
    let total = Math.ceil(await this.count()/limit)
    return {total,data}
  },

  get_url: async function(videoId) {
    let video = await this.findOne({
      id:videoId
    })
    return video.url
  }
}

module.exports = videoSchema;
