import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accounts',
      required: true,
    },
    bugType: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    pageOrFeature: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved'],
      default: 'Open',
    },
  },
  { timestamps: true }
);

const Bug = mongoose.models?.Bug || mongoose.model('Bug', bugSchema);

export default Bug;
