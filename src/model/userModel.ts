import { timeStamp } from "console";
import { Timestamp } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}

const userScema: Schema<UserDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    picture: {
      type: String,
      default: "https://i.ibb.co/Qd16vVN/istockphoto-522855255-612x612.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userScema);

export default User;
