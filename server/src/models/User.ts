import mongoose, { PassportLocalSchema, PassportLocalModel, PassportLocalDocument } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export type UserDocument = PassportLocalDocument & {
  _id: string;
  username: string;
  born: Date;
  status: boolean;
  activeTopic: {
    title: string;
    category: string;
  };
  chats: string[];
  blockedUsers: string[];
  hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
  new (...args: any): UserDocument;
};

const userSchema = new mongoose.Schema(
  {
    username: String,
    born: Date,
    status: Boolean,
    activeTopic: {
      title: String,
      category: String,
    },
    chats: Array,
    blockedUsers: Array,
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  },
);

userSchema.plugin(passportLocalMongoose);

const User: PassportLocalModel<UserDocument> = mongoose.model("User", userSchema as PassportLocalSchema);

export default User;
