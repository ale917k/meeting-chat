import mongoose from "mongoose";

type Message = {
  userId: string;
  text: string;
};

export type TopicDocument = mongoose.Document & {
  _id: string;
  title: string;
  category: string;
  creatorId: string;
  joinerId: string;
  active: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  new (...args: any): TopicDocument;
};

const topicSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    creatorId: String,
    joinerId: String,
    active: Boolean,
    messages: Array,
  },
  {
    collection: "topics",
    timestamps: true,
    versionKey: false,
  },
);

const Topic = mongoose.model<TopicDocument>("Topic", topicSchema);

export default Topic;
