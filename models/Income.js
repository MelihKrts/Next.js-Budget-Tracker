import mongoose from "mongoose";

const income = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Income || mongoose.model("Income", income);
