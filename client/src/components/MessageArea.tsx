import { useEffect, useState } from "react";
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
   const [message, setMessage] = useState<string>("");
   const [messages, setMessages] = useState<
      Array<{
         username: string;
         message: string;
      }>
   >([]);

   const submitHandle = (e: any) => {
      e.preventDefault();
      setMessages([...messages, { username: user.username, message }]);
      socket.emit("send_message", {
         messages: [...messages, { username: user.username, message }],
         username: user.username,
         userid: user._id,
      });
   };

   useEffect(() => {
      socket.on("receive_message", (messages: any) => {
         setMessages([...messages.messages]);
      });
   }, [socket]);

   return (
      <div className='flex-1 h-full bg-dark grid place-items-center'>
         {activeUser.username.length > 0 ? (
            <div className='flex flex-col w-full h-full p-3 gap-3'>
               <div className='bg-lightv1 h-14 flex items-center px-3'>
                  <div className='flex items-center gap-2'>
                     <Avatar name={activeUser.username} size={30} />
                     <span className='text-xl font-medium flex leading-5'>
                        {activeUser.username}
                     </span>
                  </div>
               </div>
               <ul className='overflow-auto max-h-full flex flex-col gap-2 text-lg'>
                  {messages &&
                     messages.map((mes: any, index: any) =>
                        user.username !== mes.username ? (
                           <li className='bg-lightv1 p-2 rounded-sm mr-auto' key={index}>
                              {mes.message}
                           </li>
                        ) : (
                           <li className='bg-green/90 p-2 rounded-sm ml-auto' key={index}>
                              {mes.message}
                           </li>
                        )
                     )}
               </ul>
               <div className='bg-lightv1 h-14 flex items-center p-3 mt-auto'>
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
