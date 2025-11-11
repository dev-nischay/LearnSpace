import mongoose, { Mongoose } from "mongoose";
import { Types } from "mongoose";

const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "INR",
  },

  items: [
    {
      courseId: {
        type: Types.ObjectId,
        ref: "course",
        required: true,
      },
    },
  ],
});

export const Purchases = mongoose.model("purchase", purchaseSchema);
