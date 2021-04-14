import mongoose from "mongoose";

type Message = {
  user: string;
  text: string;
};

export type ChatDocument = mongoose.Document & {
  _id: string;
  title: string;
  category: string;
  creatorId: string;
  joinerId: string;
  active: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  new (...args: any): ChatDocument;
};

const chatSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    creatorId: String,
    joinerId: String,
    active: Boolean,
    messages: Array,
  },
  {
    collection: "chats",
    timestamps: true,
    versionKey: false,
  },
);

const Chat = mongoose.model<ChatDocument>("Chat", chatSchema);

export default Chat;
