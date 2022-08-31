const express = require('express');
const router = express.Router();
// const {genrateToken} = require('./../utils/Token')
const {protect} = require('../../auth/authMiddleWare'); 
const {membership} = require('../controllers/membership');

router.post('/',membership)

module.exports = router