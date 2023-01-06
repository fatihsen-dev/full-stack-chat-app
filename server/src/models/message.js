import { Schema, model } from "mongoose";

const messageSchema = new Schema(
   {
      users: [{ type: Schema.Types.ObjectId, ref: "User" }],
      messages: [
         {
            date: { type: Date, default: Date.now },
            user: { type: Schema.Types.ObjectId, ref: "User" },
            message: { type: String },
         },
      ],
   },
   { timestamps: true }
);

export const Message = model("Message", messageSchema);
