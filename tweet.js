const mongoose = require('mongoose');
var tweetSchema = mongoose.Schema({
    caption: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    retweets: {
        type: Number,
        default: 0
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('tweet', tweetSchema);