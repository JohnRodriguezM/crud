import User from '../../../models/users/user.model.js';

class SignInUser {
  async loginUser(data, next) {
    try {
      const user = await User.findOne({
        username: data.username,
      });
      if (!user) {
        throw new Error('User not found');
      }
      if (user.password !== data.password) {
        throw new Error('Invalid password');
      }
      return user;
    } catch (error) {
      next(error);
    }
    return null;
  }
}

export default new SignInUser();
