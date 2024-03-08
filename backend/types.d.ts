import { Document } from "mongoose";

interface ITask extends Document {
  title: string;
  content: string;
}
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}
interface SignUpBody {
  userName?: string,
  email?: string,
  password?: string,
}

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}
