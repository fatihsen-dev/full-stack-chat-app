import { Schema, model } from "mongoose";

const userSchema = new Schema(
   {
      username: { type: String, unique: true, min: 4, max: 18 },
      password: { type: String, min: 6, max: 30 },
      token: { type: String, default: null },
   },
   { timestamps: true }
);

export const User = model("User", userSchema);
