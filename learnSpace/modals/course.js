import mongoose from "mongoose";
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
  price: {
    required: true,
    type: String,
  },
  isPublished: {
    required: true,
    type: Boolean,
  },
});

export const Course = new mongoose.model("course", courseSchema);
