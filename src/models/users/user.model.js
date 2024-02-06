import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      unique: true,
      type: String,
      required: [true, 'Username is required, please provide it'],
    },
    password: {
      type: String,
      required: [true, 'Password is required, please provide it'],
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must have at least 8 characters and contain at least one letter and one number',
      ],
    },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
