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
  },

  set_score: async function(videoId,score){
    let data = await this.findOneAndUpdate({id:videoId},{$set:{score:score}},{new:true})
    if (data.score === score) {
      return true
    }
  },

  get_score:async function(videoId){
    let data = await this.findOne({
      id:videoId
    })
    if(data.score){
      return data.score
    }else{
      return false
    }
  }
}

module.exports = videoSchema;
