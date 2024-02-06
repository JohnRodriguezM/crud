import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = errors.array()[0].msg;
      console.log(extractedErrors);

      res.status(400).json({
        status: 'error',
        success: false,
        message: 'Invalid input data. Please verify your data and try again.',
        detail: extractedErrors,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
