import User from '../../../models/users/user.model.js';

class SignUpUser {
  async registerUser(data, next) {
    try {
      const existingUser = await User.findOne({ username: data.username });
      if (existingUser) {
        // eslint-disable-next-line quotes
        throw new Error("User already exists");
      }
      const savedUser = await User.create(data);
      console.log('User created', savedUser);

      // Aquí puedes enviar un correo electrónico al usuario si lo deseas

      return savedUser;
    } catch (error) {
      next(error);
    }
    return null;
  }
}

export default new SignUpUser();
