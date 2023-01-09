import mongoose from "mongoose";
import { Message } from "../models/message.js";

export const index = async (req, res) => {
   const { userid } = req.params;
   try {
      Message.find(
         {
            users: {
               $in: [mongoose.Types.ObjectId(userid)],
            },
         },
         function (err, docs) {
            return res.send(docs);
         }
      )
         .select("-__v")
         .populate("users", "-token -__v -password -updatedAt");
   } catch (error) {
      console.log(error);
      return res.status(500).send("Server error (message index)");
   }
};
