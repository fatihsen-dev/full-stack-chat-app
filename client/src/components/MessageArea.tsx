import { useState } from "react";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function MessageArea({
   socket,
   user,
}: {
   socket: any;
   user: { _id: string; username: string; token: string };
}) {
   const { activeUser } = useSelector((state: RootState) => state.messages);
   const [message, setMessage] = useState("");

   const submitHandle = (e: any) => {
      e.preventDefault();
      socket.emit("send_message", {
         message,
         username: user.username,
         userid: user._id,
      });
   };

   return (
      <div className='flex-1 bg-dark grid place-items-center'>
         {activeUser.username.length > 0 ? (
            <div className='flex flex-col w-full h-full p-3 gap-3'>
               <div className='bg-lightv1 h-14'>
                  <div>
                     <Avatar name={activeUser.username} size={20} />
                  </div>
               </div>
               <ul className='flex-1 bg-red-500'></ul>
               <div className='bg-lightv1 h-14 flex items-center p-3'>
                  <form onSubmit={submitHandle} className='flex w-full gap-3'>
                     <input
                        value={message}
                        onChange={(e: any) => setMessage(e.target.value)}
                        className='border border-gray px-1.5 text-lg flex-1 rounded-sm'
                        type='text'
                     />
                     <button className='bg-blue text-lightv1 px-10 rounded-sm py-2'>
                        Send
                     </button>
                  </form>
               </div>
            </div>
         ) : (
            <span className='text-lg text-lightv1 font-[200] select-none'>
               Chat appears empty.
            </span>
         )}
      </div>
   );
}
