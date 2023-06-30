const express = require('express');
const router = express.Router();
const { sign_in, sign_up, allUser, sign_out } = require('../controllers/auth');
const { protect } = require('../../auth/authMiddleWare');
const { validateUserInput } = require('../utils/Validator');
router.post('/sign-in', validateUserInput, sign_in);
router.post('/sign-up', sign_up);
router.post('/sign-out', sign_out);
router.get('/all-users', protect, allUser);

module.exports = router;
