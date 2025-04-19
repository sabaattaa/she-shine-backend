import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_no: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'CUSTOMER', 'VIEWER'], default: 'VIEWER' },
  thumbnail: { type: String }, // image URL
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
