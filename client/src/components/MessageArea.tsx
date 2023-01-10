import { useEffect, useRef, useState } from "react";
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
         user: string;
         message: string;
      }>
   >([]);

   const listRef = useRef<any>();

   const submitHandle = (e: any) => {
      e.preventDefault();
      if (message.length > 0) {
         setMessages([...messages, { user: user._id, message }]);
         socket.emit("send_message", {
            messages: [...messages, { user: user._id, message }],
            username: user.username,
            sender: user._id,
            send: activeUser._id,
         });
         setMessage("");
         listRef.current.focus;
         setTimeout(() => {
            listRef.current.scroll({
               top: listRef.current.scrollHeight,
               behavior: "smooth",
            });
         }, 50);
      }
   };

   useEffect(() => {
      socket.on("receive_message", (messages: any) => {
         setMessages([...messages.messages]);
         setTimeout(() => {
            listRef.current.scroll({
               top: listRef.current.scrollHeight,
               behavior: "smooth",
            });
         }, 50);
      });
   }, [socket]);

   return (
      <div className='flex-1 bg-dark flex justify-center items-center'>
         {activeUser.username.length > 0 ? (
            <div className='flex flex-col w-full h-full p-3 gap-3'>
               <div className='bg-lightv1 h-14 flex items-center px-3 justify-between'>
                  <div className='flex items-center gap-2'>
                     <Avatar name={activeUser.username} size={30} />
                     <span className='text-xl font-medium flex leading-5'>
                        {activeUser.username}
                     </span>
                  </div>
                  <span className='text-xl font-medium flex leading-5'>
                     {user.username}
                  </span>
               </div>
               <ul
                  ref={listRef}
                  className='overflow-auto flex-1 flex flex-col gap-2 text-lg pr-2'>
                  {messages &&
                     messages.map((mes: any, index: any) =>
                        user._id !== mes.user ? (
                           <li
                              className='bg-lightv1 px-2 py-1 rounded-sm mr-auto'
                              key={index}>
                              {mes.message}
                           </li>
                        ) : (
                           <li
                              className='bg-green/90 px-2 py-1 rounded-sm ml-auto'
                              key={index}>
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
