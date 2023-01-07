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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static("src/public"));
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

const server = createServer(app);
const socketio = new Server(server);

socketio.on("connection", (socket) => {
   console.log(`User connected: ${socket.id}`);

   socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
   });

   socket.on("disconnect", (socket) => {
      // console.log(socket);
   });
});

server.listen(process.env.port || 5000, () => {
   console.log(`Server listen ${process.env.port || 5000}`);
});

app.use("/user", userRouter);

(async () => {
   try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.DB_URL);
      return console.log("connected db");
   } catch (err) {
      return console.log(err);
   }
})();
