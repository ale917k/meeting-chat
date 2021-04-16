import mongoose from "mongoose";

export type TopicDocument = mongoose.Document & {
  _id: string;
  title: string;
  category: string;
  creatorId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  new (...args: any): TopicDocument;
};

const topicSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    creatorId: String,
    active: Boolean,
  },
  {
    collection: "topics",
    timestamps: true,
    versionKey: false,
  },
);

const Topic = mongoose.model<TopicDocument>("Topic", topicSchema);

export default Topic;
