const mongoose = require('./index').mongoose
const autoIncrement = require('mongoose-auto-increment')
const moment = require('moment')
const fs = require("fs")

//自增id初始化
autoIncrement.initialize(mongoose.connection)

const picSchema = new mongoose.Schema({
    name: String,
    url: String,
    createTime: {
        type: Date,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    delete: {
        type: Boolean,
        default: false
    },
    tag: {
        type: Array,
        default: []
    }
})

//自增id配置
picSchema.plugin(autoIncrement.plugin, {
    model: 'picture',
    field: 'id',
    startAt: 1,
    incrementBy: 1
})

picSchema.statics = {
    get_data: async function (ctx) {
            let {
                page = 1,
                    limit = 30,
            } = ctx.query

            let options = {
                skip: (page - 1) * limit,
                limit: Number(limit)
            }

            let data = await picture.find({}, '-__v -_id -url -createTime', options)
            ctx.body = data
        },

        tagSearch: async function (ctx) {
                let {
                    tag,
                    limit = 30,
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

                let videoData = await picture.find({
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
            },


            get_pic: async function (ctx) {
                    let id = parseInt(ctx.params.id)

                    if (!id) {
                        handleError({
                            ctx,
                            message: '无效参数'
                        })
                        return false
                    }

                    let url = await picture.findOne({
                        id: id
                    }).url
                    let imgState = true
                    await fs.access(url, (err) => {
                        if (!err) {
                            imgState = false
                        } else return
                    })

                    if (imgState) {
                        let img = fs.readFileSync(url)
                        ctx.body = img
                        ctx.type = 'image/jpg'
                    }
                },


                writeData: async function (data) {
                        if (!data) {
                            return
                        }
                        if (await picture.find({
                                name: data.name
                            }).count()) {
                            return false
                        }
                        let picMsg = new picture(data)
                        await picMsg.save(() => {
                            console.log('save success');
                        }, (err) => {
                            console.log(err);
                        })

                        return true
                    },

}


const picture = mongoose.model('picture', picSchema)

module.exports = picture;