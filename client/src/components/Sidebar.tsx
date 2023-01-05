import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { searchRequest } from "../axios";
import Avatar from "./Avatar";

export default function Sidebar() {
   const [inputVal, setInputVal] = useState("");
   const [popupActive, setPopupActive] = useState<boolean>(false);
   const [newUser, setNewUser] = useState<boolean>(false);
   const [newUsers, setNewUsers] = useState<
      Array<{
         _id: string;
         username: string;
      }>
   >();

   const searchHandle = async (e: any) => {
      setInputVal(e.target.value);
      if (e.target.value.length > 0 && newUser) {
         const response = await searchRequest(e.target.value);
         setNewUsers(response.data);
      } else if (e.target.value.length === 0) {
         setNewUsers([]);
      }
   };

   return (
      <div className='2xl:flex md:flex bg-lightv1 w-96 sm:hidden hidden flex-col relative overflow-hidden'>
         <div className='bg-lightv2 p-2 flex items-center gap-1'>
            <input
               value={inputVal}
               onChange={searchHandle}
               placeholder={newUser ? "Search others users" : "Search"}
               className='flex-1 placeholder:text-gray h-full px-2 text-lg bg-lightv1 border rounded-sm border-gray'
               type='text'
            />
            <button
               onClick={() => {
                  setPopupActive(!popupActive);
                  setNewUser(!newUser);
                  setInputVal("");
               }}
               className='text-2xl p-2 text-NavyBlue bg-lightv1 border border-gray hover:bg-lightv1/60'>
               <AiOutlinePlus
                  className='transition-all'
                  style={popupActive ? { rotate: "45deg" } : {}}
               />
            </button>
         </div>
         <div className='w-full h-full relative'>
            <ul></ul>
            <ul
               style={popupActive ? { left: 0 } : {}}
               className='absolute p-2 gap-2 flex flex-col transition-all -left-full top-0 w-full h-full bg-lightv1'>
               {newUsers &&
                  newUsers.map((user, index) => (
                     <li
                        className='flex cursor-pointer p-2 items-center gap-2 bg-lightv2 rounded-sm'
                        key={index}>
                        <Avatar name={user.username} size={30} />
                        <div className='flex flex-col justify-center translate-y-1'>
                           <span className='text-lg leading-3 font-medium'>
                              {user.username}
                           </span>
                           <span className='text-sm text-dark/50'>
                              Lorem ipsum dolor sit amet...
                           </span>
                        </div>
                     </li>
                  ))}
            </ul>
         </div>
      </div>
   );
}
