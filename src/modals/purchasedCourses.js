import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const purchaseSchema = new Schema({
  courseId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  creatorId: {
    required: true,
    type: ObjectId,
  },
});

export const Purchases = new mongoose.model("purchase", purchaseSchema);
