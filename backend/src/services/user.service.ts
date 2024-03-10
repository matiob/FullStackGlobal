import bcrypt from "bcrypt";
import User from "../models/User";
import { IUser } from "../../types";

export const userService = {

  // Get user from DB to keep session open
  getUserById: async (userId: Object): Promise<IUser | null> => {
    try {
      const user = await User.findById(userId).select("+email");
      return user;
    } catch (error) {
      console.error(
        "[userService-getUserByName] ERROR->",
        (error as Error).message
      );
      throw error;
    }
  },

  // Find user from DB by username
  getUserByName: async (userName: string): Promise<IUser | null> => {
    try {
      const user = await User.findOne({ username: userName })
        .select("+password +email")
        .exec();
      return user;
    } catch (error) {
      console.error(
        "[userService-getUserByName] ERROR->",
        (error as Error).message
      );
      throw error;
    }
  },

  // Find user from DB by user email
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

  // Add a user to DB
  saveUser: async (data: IUser): Promise<IUser> => {
    try {
      const { username, email, password } = data;
      const user = await User.create({
        username,
        email,
        password,
      });
      return user;
    } catch (error) {
      console.error("[userService-saveUser] ERROR->", (error as Error).message);
      throw error;
    }
  },

  // Compare given password to user password from DB
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