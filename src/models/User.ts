// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    image: String,
    // models/User.ts এর মধ্যে

    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    }

  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
