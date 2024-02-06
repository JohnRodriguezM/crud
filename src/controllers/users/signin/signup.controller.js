import SignUpUserService from '../../../services/users/signup/signup.service.js';

const signUpUser = async (req, res, next) => {
  try {
    // const createUser = aswait User.create(data);
    // console.log('User created', user);
    const newUser = await SignUpUserService.registerUser(req.body, next);
    if (newUser) {
      res.status(201).json({ message: 'User created' });
    }
    // console.log('User created', newUser);
    // ? check if user exists
    // ? create user
    // ? send email
  } catch (error) {
    next(error);
  }
};

export default signUpUser;
