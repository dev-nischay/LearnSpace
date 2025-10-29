import mongoose, { Mongoose } from "mongoose";
import { Types } from "mongoose";
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  courseId: {
    required: true,
    type: Types.ObjectId,
    ref: "course",
  },
  userId: {
    required: true,
    type: Types.ObjectId,
    ref: "user",
  },
  creatorId: {
    required: true,
    type: Types.ObjectId,
    ref: "admin",
  },
});

export const Purchases = mongoose.model("purchase", purchaseSchema);
