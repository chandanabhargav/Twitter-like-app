const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Followers = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    follower: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    collection: 'followers'
})

module.exports = mongoose.model('Followers', Followers)