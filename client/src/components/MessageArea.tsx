import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setActiveUser } from "../store/message";

export default function MessageArea({
   socket,
   user,
   listRef,
}: {
   socket: any;
   user: { _id: string; username: string; token: string };
   listRef: any;
}) {
   const { activeUser } = useSelector((state: RootState) => state.messages);
   const dispatch = useDispatch();

   const [message, setMessage] = useState<string>("");

   const submitHandle = async (e: any) => {
      e.preventDefault();
      if (message.length > 0) {
         dispatch(
            setActiveUser({
               user: activeUser.user,
               messages: [...activeUser.messages, { user: user._id, message }],
            })
         );
         console.log(activeUser.user.username);
         socket.emit("send_message", {
            messages: [...activeUser.messages, { user: user._id, message }],
            senderid: user._id,
            sendid: activeUser.user._id,
            username: user.username,
         });
         setMessage("");
         setTimeout(() => {
            listRef.current.scroll({
               top: listRef.current.scrollHeight,
               behavior: "smooth",
            });
            listRef.current.focus;
         }, 0);
      }
   };

   type MsgType = {
      messages: Array<{
         user: string;
         message: string;
         _id?: string | undefined;
         date?: string | undefined;
      }>;
      sendid: string;
      senderid: string;
      username: string;
   };

   useEffect(() => {
      socket.on("receive_message", async (messages: MsgType) => {
         dispatch(
            setActiveUser({
               user: { _id: messages.sendid, username: messages.username },
               messages: [...messages.messages],
            })
         );

         setTimeout(() => {
            listRef.current.scroll({
               top: listRef.current.scrollHeight,
               behavior: "smooth",
            });
         }, 0);
      });
   }, [socket]);

   return (
      <div className='flex-1 bg-dark flex justify-center items-center'>
         {activeUser.user.username.length > 0 ? (
            <div className='flex flex-col w-full h-full p-3 gap-3'>
               <div className='bg-lightv1 h-14 flex items-center px-3 justify-between'>
                  <div className='flex items-center gap-2'>
                     <Avatar name={activeUser.user.username} size={30} />
                     <span className='text-xl font-medium flex leading-5'>
                        {activeUser.user.username}
                     </span>
                  </div>
               </div>
               {activeUser.messages.length > 0 && (
                  <ul
                     ref={listRef}
                     className='overflow-auto flex-1 flex flex-col gap-2 text-lg pr-2'>
                     {activeUser.messages.map(
                        (
                           mes: {
                              user: string;
                              message: string;
                              _id?: string;
                              date?: string;
                           },
                           index: any
                        ) =>
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
               )}
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
