const mongoose = require('./index').mongoose
const autoIncrement = require('mongoose-auto-increment')
const moment = require('moment')

//自增id初始化
autoIncrement.initialize(mongoose.connection)

const videoSchema = new mongoose.Schema({
  name: String,
  url: String,
  createTime: {
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  updateTime: {
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  delete: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: null
  },
  tag: {
    type: Array,
    default: []
  }
})

//自增id配置
videoSchema.plugin(autoIncrement.plugin, {
  model: 'video',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

//时间更新
videoSchema.pre('findOneAndUpdate', function (next) {
  video.findOneAndUpdate({}, {
    update_at: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  next()
})




videoSchema.statics = {
  get_data: async function (ctx) {
      let {
        page = 1,
          limit = 10,
      } = ctx.query

      let options = {
        skip: (page - 1) * limit,
        limit: Number(limit)
      }

      let list = await video.find({
        delete: false
      }, '-__v -_id -url -createTime', options)
      let total = Math.ceil(await video.count() / limit)
      ctx.body = {
        total,
        list
      }
    },

    get_data_random: async function (ctx) {
        let limit = ctx.query.limit
        let list = []
        if (limit < await video.count()) {

          for (let i = 0; i < limit; i++) {
            let id = Math.ceil(Number(await video.count()) * Math.random())
            let data = await video.findOne({
              id: id,
              delete: false
            }, '-_id name id')
            if (data) {
              list.push(data)
            } else {
              i--
            }
          }
          
        }else{
          list = await video.find({},'-_id name id')
        }
        ctx.body = {
          list
        }
      },

      get_url: async function (videoId) {
          let videoData = await video.findOne({
            id: videoId
          })
          return videoData.url
        },

        set_score: async function (ctx) {
            let id = Number(ctx.request.body.id)
            let score = Number(ctx.request.body.score)
            if (!id && !score) {
              handleError({
                ctx,
                message: '无效参数'
              })
              return false
            }
            let videoData = await video.findOneAndUpdate({
              id: id
            }, {
              $set: {
                score: score
              }
            }, {
              new: true
            })
            videoData.save()
            ctx.body = {
              score: videoData.score
            }
          },

          get_score: async function (ctx) {
              let id = Number(ctx.query.id)
              let videoData = await video.findOne({
                id: id
              })

              if (videoData.score) {
                ctx.body = {
                  status: 1,
                  score: videoData.score
                }
              } else {
                ctx.body = {
                  status: 0
                }
              }
            },


            //删除视频
            set_delete: async function (ctx) {
                let id = parseInt(ctx.params.id)
                if (!id) {
                  handleError({
                    ctx,
                    message: '无效参数'
                  })
                  return false
                }
                let videoData = await video.findOneAndUpdate({
                  id: id
                }, {
                  $set: {
                    delete: true
                  }
                }, {
                  new: true
                })
                videoData.save()
                if (videoData.delete) {
                  ctx.body = {
                    status: 1
                  }
                } else {
                  ctx.body = {
                    status: 0
                  }
                }
              },

              //撤销删除
              set_undelete: async function (ctx) {
                  let id = Number(ctx.query.id)
                  if (!id) {
                    handleError({
                      ctx,
                      message: '无效参数'
                    })
                    return false
                  }
                  let videoData = await video.findOneAndUpdate({
                    id: id
                  }, {
                    $set: {
                      delete: false
                    }
                  }, {
                    new: true
                  })
                  videoData.save()
                  if (!videoData.delete) {
                    ctx.body = {
                      status: 1
                    }
                  } else {
                    ctx.body = {
                      status: 0
                    }
                  }
                },

                //撤销删除
                backout_delete: async function (ctx) {
                    let id = Number(ctx.query.id)
                    if (!id) {
                      handleError({
                        ctx,
                        message: '无效参数'
                      })
                      return false
                    }
                    let videoData = await video.findOneAndUpdate({
                      id: id
                    }, {
                      $set: {
                        delete: false
                      }
                    }, {
                      new: true
                    })
                    data.save()
                    ctx.body = {
                      deleted: videoData.delete
                    }
                  },

                  //获取删除状态
                  get_delete: async function (ctx) {
                      let id = Number(ctx.query.id)
                      if (!id) {
                        handleError({
                          ctx,
                          message: '无效参数'
                        })
                        return false
                      }
                      let videoData = await video.findOne({
                        id: id
                      })
                      ctx.body = {
                        deleted: videoData.delete
                      }
                    },

                    //回收站数据
                    get_resycle_data: async function () {

                        let {
                          page = 1,
                            limit = 10,
                        } = ctx.query

                        let options = {
                          skip: (page - 1) * limit,
                          limit: Number(limit)
                        }

                        let list = await video.find({
                          delete: true
                        }, '-__v -_id -url -createTime', options)
                        let total = Math.ceil(await video.count() / limit)
                        ctx.body = {
                          total,
                          list
                        }
                      },

                      get_name: async function (ctx, data) {
                          let id = 1
                          if (ctx.query.id) {
                            id = Number(ctx.query.id)
                          } else {
                            id = Number(data)
                          }

                          if (!id) {
                            handleError({
                              ctx,
                              message: '无效参数'
                            })
                            return false
                          }
                          let videoData = await video.findOne({
                            id: id
                          })
                          if (data) {
                            ctx.body = videoData.name
                          }
                        },

                        writeData: async function (data) {
                            if (!data) {
                              return
                            }
                            if (await video.find({
                                name: data.name
                              }).count()) {
                              return false
                            }
                            let videoMsg = new video(data)
                            await videoMsg.save(() => {
                              console.log('save success');
                            }, (err) => {
                              console.log(err);
                            })

                            return true
                          },

                          addTag: async function (ctx) {
                              let id = parseInt(ctx.request.body.id)
                              let tag = ctx.request.body.tag
                              if (!id || !tag) {
                                handleError({
                                  ctx,
                                  message: '无效参数'
                                })
                                return false
                              }

                              let videoData = await video.findOneAndUpdate({
                                id: id
                              }, {
                                '$push': {
                                  tag: {
                                    ...tag
                                  }
                                }
                              }, {
                                new: true
                              }, (err) => {
                                if (err) {
                                  throw err
                                }
                              })
                              ctx.body = videoData.tag
                            },

                            tagSearch: async function (ctx) {
                              let {
                                tag,
                                limit = 10,
                                page = 1
                              } = ctx.query

                              let reg = new RegExp(tag, 'i')

                              if (!tag) {
                                handleError({
                                  ctx,
                                  message: '无效参数'
                                })
                                return false
                              }

                              let options = {
                                skip: (page - 1) * limit,
                                limit: Number(limit)
                              }

                              let videoData = await video.find({
                                $or: [{
                                    tag: {
                                      $regex: reg
                                    }
                                  },
                                  {
                                    name: {
                                      $regex: reg
                                    }
                                  }
                                ]
                              }, '-__v -_id -url -createTime', options)

                              ctx.body = videoData
                            }

}



const video = mongoose.model('video', videoSchema)

module.exports = video;