const { body, param } = require('express-validator');

// Validation for creating a user
const createOneValidation = [
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

// Validation for reading a user
const readOneValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

// Validation for updating a user
const updateOneValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('email').optional().isEmail().withMessage('Must be a valid email address'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('company').optional().isMongoId().withMessage('Invalid company ID'),
  body('type').optional().isIn(['user', 'super']).withMessage('Type must be either "user" or "super"'),
  body('code.value').optional().isString().withMessage('Code value must be a string'),
  body('code.expireIn').optional().isISO8601().withMessage('Invalid expiration date format'),
  body('code.attempts').optional().isInt({ min: 0 }).withMessage('Attempts must be a positive integer'),
];

// Validation for deleting a user
const deleteOneValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

// Validation for updating own profile
const updateMeValidation = [
  body('firstname').optional().isString().withMessage('Firstname must be a string'),
  body('lastname').optional().isString().withMessage('Lastname must be a string'),
];

module.exports = {
  createOneValidation,
  readOneValidation,
  updateOneValidation,
  deleteOneValidation,
  updateMeValidation,
};