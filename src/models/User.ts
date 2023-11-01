import mongoose, { Schema, model } from 'mongoose';

interface UserProps {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
  image?: string;
  role?: 'user' | 'admin';
}

const userSchema = new Schema<UserProps>(
  {
    username: String,
    image: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: String,
    last_name: String,
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    toJSON: {
      getters: true,
    },
  },
);

const User = mongoose.models?.User || model<UserProps>('User', userSchema);

export default User;
