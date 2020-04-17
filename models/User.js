const mongoose = require('mongoose')
const Schema = mongoose.Schema

let user = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    creationtime: {
        type: Date,
        default: Date.now
    },
    tweets: [{type: mongoose.Types.ObjectId, ref: 'Tweet', autopopulate: true}],
    followers: [{type: mongoose.Types.ObjectId, ref: 'Followers', autopopulate: true}]
}, {
    collection: 'users'
})

user.plugin(require('mongoose-autopopulate'))

var User = module.exports = mongoose.model('User', user)