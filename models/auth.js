const mongoose = require('./index').mongoose

const authSchema = new mongoose.Schema({
    username:string,
    password:string
})

export default authSchema