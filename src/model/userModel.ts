import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

export interface UserInput {
  email: string;
  name: string;
  password: string;
  picture: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<Boolean>;
}

const userScema = new mongoose.Schema(
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
userScema.methods.comparePassword = async function (
  pass: string
): Promise<boolean> {
  return await bcrypt.compare(pass, this.password);
};
userScema.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<UserDocument>("User", userScema);

export default User;
