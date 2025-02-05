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
      default:
        'https://res-console.cloudinary.com/dsa97hyht/media_explorer_thumbnails/c2bebabd2529847478a413886bd8d96e/detailed',
    },
    authProviderId: { type: String },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const Accounts = mongoose.models?.Accounts || mongoose.model('Accounts', accountSchema);

export default Accounts;
