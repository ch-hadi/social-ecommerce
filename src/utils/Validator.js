const { validationResult, check } = require('express-validator');
const { model } = require('mongoose');
// Example validation rules
const validateUserInput = [
  check('email')
    .isLength({ min: 5, max: 50 })
    .withMessage('Email should be between 5 and 50 characters.'),
  check('password')
    .isLength({ min: 4, max: 20 })
    .withMessage('Password should be between 6 and 20 characters.'),
];

module.exports = {
  validateUserInput,
};
