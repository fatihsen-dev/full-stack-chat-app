import { useEffect, useRef, useState } from "react";
import { searchRequest } from "../axios";
import Avatar from "./Avatar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setActiveUser } from "../store/message";

export default function Sidebar({ listRef }: { listRef: any }) {
   const { user } = useSelector((state: RootState) => state.auth);
   const { activeUser, messages } = useSelector((state: RootState) => state.messages);
   const dispatch = useDispatch();

   const inputRef = useRef<any>();

   const [searchActive, setSearchActive] = useState<boolean>(false);
   const [searchingUser, setSearchingUser] = useState<
      Array<{ username: string; _id: string }>
   >([]);

   const searchHandle = async (e: any) => {
      if (e.target.value.length > 0) {
         setSearchActive(true);
         const { data } = await searchRequest(e.target.value);
         setSearchingUser(
            data.filter((dt: { username: string; _id: string }) => dt._id !== user._id)
         );
      } else {
         setSearchActive(false);
      }
   };

   const setActiveHandle = (username: any, _id: any, messages: Array<any>) => {
      dispatch(setActiveUser({ user: { _id, username }, messages }));
      inputRef.current.value = "";
      setSearchingUser([]);
      setSearchActive(false);
      setTimeout(() => {
         listRef.current.scroll({
            top: listRef.current.scrollHeight,
            behavior: "auto",
         });
      }, 0);
   };

   return (
      <div className='2xl:flex md:flex bg-lightv1 w-96 sm:hidden hidden flex-col relative overflow-hidden'>
         <div className='bg-lightv2 p-2 flex items-center gap-1'>
            <input
               ref={inputRef}
               placeholder='Search'
               onInput={searchHandle}
               className='flex-1 placeholder:text-gray h-full p-2 text-lg bg-lightv1 border rounded-sm border-gray'
               type='text'
            />
         </div>
         <div className='h-full'>
            {searchActive ? (
               <div className='p-2 gap-2 flex overflow-auto flex-col w-full h-full bg-lightv1'>
                  {searchingUser.length > 0 &&
                     searchingUser.map(
                        (u: { username: string; _id: string }, index: number) => (
                           <li
                              onClick={() => setActiveHandle(u.username, u._id, [])}
                              key={index}
                              className='flex cursor-pointer p-2 items-center gap-2 bg-lightv2 rounded-sm'>
                              <Avatar name={u.username} size={30} />
                              <div className='flex flex-col justify-center translate-y-1'>
                                 <span className='text-lg leading-3 font-medium'>
                                    {u.username}
                                 </span>
                                 <span className='text-sm text-dark/50'>
                                    Lorem ipsum dolor sit amet...
                                 </span>
                              </div>
                           </li>
                        )
                     )}
               </div>
            ) : (
               <>
                  {messages.length > 0 ? (
                     <ul className='p-2 gap-2 flex overflow-auto flex-col w-full h-full bg-lightv1'>
                        {messages.map(
                           (
                              msg: {
                                 _id: string;
                                 users: Array<{ _id: string; username: string }>;
                                 messages: Array<object>;
                              },
                              index: number
                           ) => (
                              <li
                                 onClick={() =>
                                    setActiveHandle(
                                       msg.users.find(
                                          (u: { username: string; _id: string }) =>
                                             u._id !== user._id
                                       )?.username,
                                       msg.users.find(
                                          (u: { username: string; _id: string }) =>
                                             u._id !== user._id
                                       )?._id,
                                       msg.messages
                                    )
                                 }
                                 key={index}
                                 className='flex cursor-pointer p-2 items-center gap-2 bg-lightv2 rounded-sm'>
                                 <Avatar
                                    name={
                                       msg.users.find(
                                          (u: { username: string; _id: string }) =>
                                             u._id !== user._id
                                       )?.username
                                    }
                                    size={30}
                                 />
                                 <div className='flex flex-col justify-center translate-y-1'>
                                    <span className='text-lg leading-3 font-medium'>
                                       {
                                          msg.users.find(
                                             (u: { username: string; _id: string }) =>
                                                u._id !== user._id
                                          )?.username
                                       }
                                    </span>
                                    <span className='text-sm text-dark/50'>
                                       Lorem ipsum dolor sit amet...
                                    </span>
                                 </div>
                              </li>
                           )
                        )}
                     </ul>
                  ) : (
                     <div className='h-full text-center pt-5 text-dark/80'>Empty</div>
                  )}
               </>
            )}
         </div>
      </div>
   );
}
