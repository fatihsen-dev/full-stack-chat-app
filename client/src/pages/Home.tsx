import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
const socket = io(import.meta.env.VITE_SERVER_URL);

export default function Home() {
   // useState
   const [message, setMessage] = useState();

   useEffect(() => {
      socket.on("receive_message", (data) => {
         console.log(data);
      });
   }, [socket]);

   const submitHandle = (e: any) => {
      e.preventDefault();
      socket.emit("send_message", { message: message });
   };
   return (
      <div className='flex w-full h-full max-h-[800px] container'>
         <Sidebar />
         <MessageArea />
      </div>
   );
}
