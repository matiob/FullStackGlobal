import bcrypt from "bcrypt";
import User from "../models/User";
import { IUser, SignUpBody } from "../../types";

export const userService = {
  getUserById: async (userId: string): Promise<IUser | null> => {
    try {
      const user = await User.findById(userId).select("+email").exec();
      return user;
    } catch (error) {
      console.error(
        "[userService-getUserByName] ERROR->",
        (error as Error).message
      );
      throw error;
    }
  },
  getUserByName: async (userName: string): Promise<IUser | null> => {
    try {
      const user = await User.findOne({ username: userName })
        .select("+password +email")
        .exec();
      // User.findOne({ username: username }).exec(); // para el signUp
      return user;
    } catch (error) {
      console.error(
        "[userService-getUserByName] ERROR->",
        (error as Error).message
      );
      throw error;
    }
  },
  getUserByEmail: async (email: string): Promise<IUser | null> => {
    try {
      const user = await User.findOne({ email: email }).exec();
      return user;
    } catch (error) {
      console.error(
        "[userService-getUserByName] ERROR->",
        (error as Error).message
      );
      throw error;
    }
  },
  saveUser: async (data: SignUpBody): Promise<IUser> => {
    try {
      const { userName, email, password } = data;
      const user = await User.create({
        username: userName,
        email,
        password,
      });
      return user;
    } catch (error) {
      console.error("[userService-saveUser] ERROR->", (error as Error).message);
      throw error;
    }
  },
  comparePassword: async (
    passwordRaw: string,
    userPassword: string
  ): Promise<boolean> => {
    try {
      const passwordMatch = await bcrypt.compare(passwordRaw, userPassword);
      return passwordMatch;
    } catch (error) {
      console.error("[userService-comparePassword] ERROR->", (error as Error).message);
      throw error;
    }
  },
};