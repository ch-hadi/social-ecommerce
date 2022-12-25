const express = require('express');
const router = express.Router();
const {sign_in,sign_up, allUser} = require("../controllers/auth");
const {create_post,get_all_post} = require("../controllers/post")
const {protect} = require('../../auth/authMiddleWare')

router.post('/sign-in',sign_in);
router.post('/sign-up',sign_up);
router.get('/all-users',protect ,allUser)
router.post('/create-post',protect,create_post)
router.get('/get-all-post',protect,get_all_post)

module.exports = router