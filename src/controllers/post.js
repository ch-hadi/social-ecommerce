const express_async_handler = require('express-async-handler');
const Post = require('./../schemas/Post');

const create_post = express_async_handler(async (req, res) => {
  //   console.log('res->', req.body);
  //   return;

  try {
    const { userId, content, privacy, friendList, comments } = req.body;
    const post = await Post.create({
      userId,
      content,
      privacy,
      friendList,
      comments,
    });
    res.json(post);
  } catch (error) {
    {
      userId, content, privacy, friendList, comments;
    }
  }
});

const get_all_post = express_async_handler(async (req, res) => {
  console.log('res->', req.user._id);

  let post = await Post.find({ user: req.user._id });
  console.log(post);
  if (!post) {
    res.send({ Error: 'Error in getting posts' });
    throw new Error('Getting error to get post');
  }
  res.send({ data: post });
});

// Commetn section

const reply_comment = express_async_handler(async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId, content } = req.body;
  const post = await Post.findById(postId);
  try {
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // finding comment
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const reply = {
      userId,
      content,
    };
    comment.replies.push(reply);

    // Save the post with the new reply
    await post.save();

    res.json(reply);
  } catch (error) {
    console.error('Error adding reply to comment', error);
    res.status(500).json({ error: 'Error adding reply to comment' });
  }
});

module.exports = {
  create_post,
  get_all_post,
  reply_comment,
};
