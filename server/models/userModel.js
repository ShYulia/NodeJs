const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name: String,
    actions: Number,
    id:String
})

const User = mongoose.model('user', UserSchema)

module.exports = User