import { body } from 'express-validator';

const userValidationRules = [
  body('username')
    .notEmpty()
    .withMessage('Username is required, please provide it')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 18 character long'),

  body('password')
    .notEmpty()
    .withMessage('Password is required, please provide it'),
];

export default userValidationRules;
