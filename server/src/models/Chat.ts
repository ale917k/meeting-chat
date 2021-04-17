import mongoose from "mongoose";

export type ChatDocument = mongoose.Document & {
  _id: string;
  topicId: string;
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
    topicId: String,
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
