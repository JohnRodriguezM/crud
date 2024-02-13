import jwt from 'jsonwebtoken';
import SignUpUserService from '../../../services/users/signup/signup.service.js';

const signUpUser = async (req, res, next) => {
  try {
    const newUser = await SignUpUserService.registerUser(req.body, next);
    console.log('User created', newUser);
    if (newUser) {
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      if (!token) {
        res.status(401).json({
          success: false,
          message: 'User could not be logged',
        });
      }
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser,
        token,
      });
    }
    // send email confirmation to user
    // aqui mismo en el signup deberia crearse un token y
    // loguear al usuario de una vez
    // (esa logueada se manejaría desde frontend)
  } catch (error) {
    next(error);
  }
};

export default signUpUser;
