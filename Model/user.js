import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    department:{
      type: String,
    },
    designation:{
      type: String,
    },
    phone:{
      type: String,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Inactive',
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model('User', userSchema);
export default User;
