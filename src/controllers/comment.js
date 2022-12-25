const express_async_handler = require("express-async-handler");
const Comment = require('../schemas/Comment')
const create_comment = express_async_handler(async (req, res) => {

    const {content} = req.body
    if(!content){
       
        res.send({ Error: "All fields are Required.." });
        throw new Error("All fields are Required..");
    }
    const comment = await Comment.create({
        content:content,
        user:req.user._id,
        postId:("63a8b946a092d2e815b4e67a")
    })
    if(comment){
        let data = {
            content : comment.content 
        }
        res.send({data:data})
    }
})

const get_comments = express_async_handler(async (req, res) => {


    const user_comments = await Comment.find({user:req.user._id})
    if(user_comments.length==0){

        res.send({ Error: "Hahaha No comment.." });
        throw new Error("Must be a user in comment ..");
    }
    const comment = await Comment.find({postId:"63a8b946a092d2e815b4e67a"})
    if(!comment){
        res.send({ Error: "All fields are Required.." });
        throw new Error("All fields are Required..");
    }
    if(comment){
        let data = {
            comments : comment 
        }
        res.send({data:data})
    }
})

module.exports = {
    create_comment,
    get_comments
}