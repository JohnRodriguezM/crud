import { body } from 'express-validator';

const userValidationRules = [
  body('username')
    .notEmpty()
    .withMessage('Username is required, please provide it')
    .isLength({ min: 18 })
    .withMessage('Username must be at least 18 character long'),

  body('password')
    .notEmpty()
    .withMessage('Password is required, please provide it')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      'Password must have at least 8 characters and contain at least one letter and one number',
    ),
];

export default userValidationRules;
