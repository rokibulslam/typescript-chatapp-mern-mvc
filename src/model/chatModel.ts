import { UserDocument } from './userModel';
import mongoose, { Schema } from 'mongoose';
import { MessageDocument } from './messageModel';

export interface SingleChat {
  chatName: string;
  isGroupChat: boolean;
  users: Array<UserDocument["_id"]>;
}
export interface GroupChat extends SingleChat{
  groupAdmin?: UserDocument["_id"];
}
export interface ChatDocument extends GroupChat, mongoose.Document {
  
  
  latestMessage?: MessageDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}
const chatModel: Schema<ChatDocument> = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);


const Chat = mongoose.model<ChatDocument>("Chat", chatModel);

export default Chat

//chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

