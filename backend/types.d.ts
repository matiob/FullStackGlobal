import mongoose, { Document } from "mongoose";

interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  // isDone: boolean;
  // isDeleted: boolean;
}
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

declare module "express-session" {
  interface SessionData {
    userId?: mongoose.Types.ObjectId;
  }
}