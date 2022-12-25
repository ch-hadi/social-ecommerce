const express_async_handler = require("express-async-handler");
const Post = require("./../schemas/Post");

const create_post = express_async_handler(async (req, res) => {
    // console.log('res->',req.body)
    const {title , text } = req.body
    if(!title || !text){
       
        res.send({ Error: "All fields are Required.." });
        throw new Error("All fields are Required..");
    }
    const post = await Post.create({
        title:title,
        text:text,
        user:req.user._id
    })
    if(post){
        let data = {
            title : post.title,
            text : post.text
        }
        res.send({data:data})
    }
})

const get_all_post = express_async_handler(async (req, res) => {
    console.log('res->',req.user._id)
  
   let post = await Post.find({user:req.user._id})
   console.log(post)
   if(!post){
    res.send({ Error: "Error in getting posts" });
    throw new Error("Getting error to get post");
   }
   res.send({data:post})
})
module.exports={
    create_post,
    get_all_post
}