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
    },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
