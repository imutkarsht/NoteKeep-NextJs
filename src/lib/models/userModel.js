import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    role: { type: String, default: 'user' },
    image: {
      type: String,
      default: '#',
    },
    isVerified: { type: Boolean, default: false },
    authProviderId: { type: String },
  },
  { timestamps: true }
);

const Accounts =
  mongoose.models?.Accounts || mongoose.model('Accounts', accountSchema);

export default Accounts;
