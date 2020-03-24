const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tweet = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tweet: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    noOfLikes: {
            type: Number,
            default: 0
    },
    likes: {
            type: [String]
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'tweets'
})

module.exports = mongoose.model('Tweet', tweet)