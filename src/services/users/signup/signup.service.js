// import User from "../../../models/users/user.model";

class SignUpUser {
  async registerUser(data, next) {
    try {
      // const createUser = aswait User.create(data);
      console.log('User created', data);
      // ? check if user exists
      // ? create user
      // ? send email
    } catch (error) {
      next(error);
    }
  }
}

export default new SignUpUser();
