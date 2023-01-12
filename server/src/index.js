import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
const app = express();
import { createServer } from "http";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import { Message } from "./models/message.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static("src/public"));
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

const server = createServer(app);
const socketio = new Server(server);

socketio.on("connection", (socket) => {
   socket.on("send_message", async (data) => {
      try {
         Message.findOne(
            {
               $and: [
                  { users: { $in: [mongoose.Types.ObjectId(data.sender)] } },
                  { users: { $in: [mongoose.Types.ObjectId(data.send)] } },
               ],
            },
            async (err, results) => {
               if (err) {
                  console.log(err);
               }
               if (results) {
                  await Message.findByIdAndUpdate(results._id, {
                     messages: [...data.messages],
                  });
                  return socket.broadcast.emit("receive_message", data);
               }
               await Message.create({
                  users: [data.sender, data.send],
                  messages: [...data.messages],
               });
            }
         );
      } catch (error) {
         console.log(error);
      }
   });

   socket.on("disconnect", (socket) => {
      // console.log(socket);
   });
});

server.listen(process.env.port || 5000, () => {
   console.log(`Server listen ${process.env.port || 5000}`);
});

app.use("/user", userRouter);
app.use("/message", messageRouter);

(async () => {
   try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.DB_URL);
      return console.log("connected db");
   } catch (err) {
      return console.log(err);
   }
})();
