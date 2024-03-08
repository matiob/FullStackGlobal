import { Schema, model, Model } from "mongoose";
import { IUser } from "../../types";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      select: false,
      trim: true,
    },
    password: { type: String, required: true, select: false, trim: true },
  },
  { timestamps: true }
);

// hash user password
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const userModel: Model<IUser> = model<IUser>("User", userSchema);

export default userModel;
