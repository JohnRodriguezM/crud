import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export { connectDb };
