import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_SERVER_URL);

function App() {
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
      <div className='h-full flex justify-center items-center bg-slate-900'>
         <form
            className='flex flex-col bg-slate-100 p-3 gap-2 rounded-sm'
            onSubmit={submitHandle}>
            <input
               value={message}
               className='border w-80 p-1.5'
               type='text'
               placeholder='Text...'
               onChange={(e: any) => setMessage(e.target.value)}
            />
            <button className='bg-slate-800 py-1 rounded-sm text-white'>Send</button>
         </form>
      </div>
   );
}

export default App;
