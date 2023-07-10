const express = require('express');
const router = express.Router();
const { sign_in, sign_up, allUser, sign_out } = require('../controllers/auth');
const { protect } = require('../../auth/authMiddleWare');
const { validateUserInput } = require('../utils/Validator');
const { create_post, reply_comment } = require('../controllers/post');
router.post('/sign-in', validateUserInput, sign_in);
router.post('/sign-up', sign_up);
router.post('/sign-out', sign_out);
router.get('/all-users', protect, allUser);
// Create post
router.post('/post', protect, create_post);
// Reply to a specific comment on specific post
router.post(
  '/post/:postId/comments/:commentId/replies',
  protect,
  reply_comment
);

module.exports = router;
