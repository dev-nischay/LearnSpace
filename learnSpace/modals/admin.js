import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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

export const Admin = new mongoose.model("admin", adminSchema);
