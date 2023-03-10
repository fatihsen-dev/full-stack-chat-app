import { useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { allMessagesRequest } from "../axios";
import { setMessages } from "../store/message";

export default function Home({ socket }: { socket: any }) {
   const { user } = useSelector((state: RootState) => state.auth);
   const listRef = useRef<any>();
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         const { data } = await allMessagesRequest(user._id);
         dispatch(setMessages({ messages: data }));
      })();
   }, []);

   return (
      <div className='flex w-full h-full 2xl:container xl:container 2xl:my-5 xl:my-5'>
         <Sidebar listRef={listRef} />
         <MessageArea listRef={listRef} socket={socket} user={user} />
      </div>
   );
}
