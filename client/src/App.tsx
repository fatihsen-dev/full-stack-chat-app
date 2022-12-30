import { useState } from "react";
import { useEffect } from "react";
import type { RootState } from "./store/index";
import { useSelector, useDispatch } from "react-redux";
import {} from "./store/user";

// Socket.io
import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_SERVER_URL);

function App() {
   // redux
   const { user } = useSelector((state: RootState) => state.user);
   const dispatch = useDispatch();

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
      <div className='h-full flex flex-col justify-center items-center bg-slate-900'></div>
   );
}

export default App;
