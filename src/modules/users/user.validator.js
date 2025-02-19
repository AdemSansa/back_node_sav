const { body } = require('express-validator');

const userValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('company')
    .notEmpty().withMessage('Company is required')
    .isMongoId().withMessage('Invalid company ID'),

  body('type')
    .optional()
    .isIn(['user', 'super']).withMessage('Type must be either "user" or "super"'),

  body('code.value')
    .notEmpty().withMessage('Code value is required')
    .isString().withMessage('Code value must be a string'),

  body('code.expireIn')
    .optional()
    .isISO8601().withMessage('Invalid expiration date format'),

  body('code.attempts')
    .optional()
    .isInt({ min: 0 }).withMessage('Attempts must be a positive integer'),
];

module.exports = userValidator;
