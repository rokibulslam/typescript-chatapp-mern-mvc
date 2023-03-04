import { ChatDocument } from './chatModel';
import { UserDocument } from './userModel';
import mongoose, { Schema } from "mongoose";

export interface MessageDocument extends mongoose.Document {
  sender: UserDocument["_id"];
  content: string;
  chat: ChatDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const messageModel:Schema<MessageDocument> =new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
    content: { type: String, trim: true },
    chat:{type:mongoose.Schema.Types.ObjectId, ref:"Chat"}
}, { timestamps: true })


const Message = mongoose.model<MessageDocument>("Message", messageModel)

export default Message;