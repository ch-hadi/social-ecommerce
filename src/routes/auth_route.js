const express = require('express');
const router = express.Router();
const {sign_in,sign_up, allUser} = require("./../controllers/auth");
const {protect} = require('./../../auth/authMiddleWare')

router.post('/sign-in',sign_in);
router.post('/sign-up',sign_up);
router.get('/all-users',protect ,allUser)

module.exports = router