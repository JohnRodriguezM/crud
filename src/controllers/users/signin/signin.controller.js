import jwt from 'jsonwebtoken';
import SignInUser from '../../../services/users/signin/signin.service.js';
// ? jsonwebtoken does not support es6 modules yet!
// const { jwt } = pkg;
const signInUser = async (req, res, next) => {
  try {
    const user = await SignInUser.loginUser(req.body, next);
    console.log('User logged', user);
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({
        success: true,
        message: 'User logged successfully',
        data: user,
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

export default signInUser;
