import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

export const User = mongoose.model("user", userSchema);
