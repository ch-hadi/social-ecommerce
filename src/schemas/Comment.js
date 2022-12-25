const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment_Schema = mongoose.Schema({
    content: {
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
    postId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", 
        required: true 
    },
    //    comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    //    }]
})

const Comment = mongoose.model('Comment' , Comment_Schema)

module.exports = Comment