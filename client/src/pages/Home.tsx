import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Home({ socket }: { socket: any }) {
   const { user, userStatus } = useSelector((state: RootState) => state.user);
   useEffect(() => {
      socket.on("receive_message", (message: any) => {
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