import mongoose, { Types } from "mongoose";
import { required } from "zod/mini";
const Schema = mongoose.Schema;

let courseSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: String,
  },
  isPublished: {
    required: true,
    type: Boolean,
  },
  createdBy: {
    required: true,
    type: Types.ObjectId,
    ref: "admin",
  },
});

export const Course = mongoose.model("course", courseSchema);
