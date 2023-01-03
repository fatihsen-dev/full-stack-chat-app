import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const socket = io(import.meta.env.VITE_SERVER_URL, {
   transports: ["websocket", "polling", "flashsocket"],
});

export default function Home() {
   const { user, userStatus } = useSelector((state: RootState) => state.user);

   useEffect(() => {
      socket.on("receive_message", (message) => {
         console.log(message);
      });
   }, [socket]);

   return (
      <div className='flex w-full h-full 2xl:container xl:container 2xl:my-5 xl:my-5'>
         <Sidebar />
         <MessageArea socket={socket} user={user} />
      </div>
   );
}
