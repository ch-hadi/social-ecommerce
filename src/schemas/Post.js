const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post_Schema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
      },
        text: {
        type: String,
        trim: true,
        required: true
      },
       date: {
        type: Date,
        default: Date.now
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    //    comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    //    }]
})

const Post = mongoose.model('Post' , Post_Schema)

module.exports = Post