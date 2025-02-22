import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    reviewBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accounts',
      required: true,
    },
    stars: {
      type: Number,
      default: 1,
    },
    review: {
      type: String,
      trim: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Review =
  mongoose.models?.Review || mongoose.model('Review', reviewSchema);

export default Review;
