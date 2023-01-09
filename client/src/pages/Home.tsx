import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Home({ socket }: { socket: any }) {
   const { user } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      
   }, []);

   return (
      <div className='flex w-full h-full 2xl:container xl:container 2xl:my-5 xl:my-5'>
         <Sidebar />
         <MessageArea socket={socket} user={user} />
      </div>
   );
}
