import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { registerRequest } from "../axios";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";
import toast from "react-hot-toast";

export default function Register() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [username, setUsername] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [confirm, setConfirm] = useState<boolean>(false);
   const [passwordConfirm, setPasswordConfirm] = useState<string>("");

   const [error, setError] = useState({
      username: {
         status: false,
         message: "error",
      },
      password: {
         status: false,
         message: "error",
      },
      passwordConfirm: {
         status: false,
         message: "error",
      },
   });

   useEffect(() => {
      if (
         password.length > 0 &&
         passwordConfirm.length > 0 &&
         password !== passwordConfirm
      ) {
         setConfirm(true);
         setError({
            ...error,
            password: {
               status: true,
               message: "Password does not match",
            },
            passwordConfirm: {
               status: true,
               message: "Password does not match",
            },
         });
      } else if (password === passwordConfirm) {
         setConfirm(false);
         setError({
            ...error,
            password: {
               status: false,
               message: "error",
            },
            passwordConfirm: {
               status: false,
               message: "error",
            },
         });
      }
   }, [password, passwordConfirm]);

   const usernameHandle = (e: any) => {
      setUsername(e.target.value);

      if (e.target.value.length <= 3 || e.target.value.length >= 19) {
         setError({
            ...error,
            username: {
               status: true,
               message: "Must be greater than 4 and less than 18",
            },
         });
      } else {
         setError({
            ...error,
            username: {
               status: false,
               message: "error",
            },
         });
      }
   };

   const passwordHandle = (e: any) => {
      setPassword(e.target.value);

      if (e.target.value.length <= 5 || e.target.value.length >= 31) {
         setError({
            ...error,
            password: {
               status: true,
               message: "Must be greater than 6 and less than 30",
            },
         });
      } else {
         setError({
            ...error,
            password: {
               status: false,
               message: "error",
            },
         });
      }
   };

   const passwordConfirmHandle = (e: any) => {
      setPasswordConfirm(e.target.value);

      if (e.target.value.length <= 5 || e.target.value.length >= 31) {
         setError({
            ...error,
            passwordConfirm: {
               status: true,
               message: "Must be greater than 6 and less than 30",
            },
         });
      } else {
         setError({
            ...error,
            passwordConfirm: {
               status: false,
               message: "error",
            },
         });
      }
   };

   const registerHandle = async (e: any) => {
      e.preventDefault();
      try {
         const { data } = await registerRequest({ username, password });
         localStorage.setItem(
            "token",
            JSON.stringify({ token: data.token, userid: data._id })
         );
         dispatch(login({ status: true, user: data }));
         navigate("/");
      } catch (error: any) {
         toast.error(error.response.data.message);
      }
   };

   return (
      <form
         onSubmit={registerHandle}
         className='flex flex-col p-10 rounded-sm gap-2 bg-white'>
         <h3 className='text-slate-900 font-semibold mb-1 text-3xl'>Register</h3>
         <div className='flex flex-col gap-0.5'>
            <input
               className={`input-placeholder text-slate-900 font-medium bg-slate-200 border w-80 rounded-sm p-1.5 border-slate-300 ${
                  error.username.status ? "error" : ""
               }`}
               type='text'
               placeholder='USERNAME'
               name='username'
               onChange={usernameHandle}
            />
            <span
               style={error.username.status ? { opacity: 1 } : { opacity: 0 }}
               className='opacity-0 text-xs text-red-500'>
               {error.username.message}
            </span>
         </div>
         <div className='flex flex-col gap-0.5'>
            <input
               className={`input-placeholder text-slate-900 font-medium bg-slate-200 border w-80 rounded-sm p-1.5 border-slate-300 ${
                  error.password.status ? "error" : ""
               }`}
               type='password'
               placeholder='PASSWORD'
               name='password'
               onChange={passwordHandle}
            />
            <span
               style={error.password.status ? { opacity: 1 } : { opacity: 0 }}
               className='opacity-0 text-xs text-red-500'>
               {error.password.message}
            </span>
         </div>
         <div className='flex flex-col gap-0.5'>
            <input
               className={`input-placeholder text-slate-900 font-medium bg-slate-200 border w-80 rounded-sm p-1.5 border-slate-300 ${
                  error.passwordConfirm.status ? "error" : ""
               }`}
               type='password'
               placeholder='PASSWORD'
               name='password'
               onChange={passwordConfirmHandle}
            />
            <span
               style={error.passwordConfirm.status ? { opacity: 1 } : { opacity: 0 }}
               className='opacity-0 text-xs text-red-500'>
               {error.passwordConfirm.message}
            </span>
         </div>
         <div className='flex flex-col gap-2'>
            <button
               disabled={
                  username.length <= 3 ||
                  username.length >= 19 ||
                  password.length <= 5 ||
                  password.length >= 31 ||
                  passwordConfirm.length <= 5 ||
                  passwordConfirm.length >= 31 ||
                  confirm
               }
               className='mt-2 disabled:bg-slate-600 bg-slate-800 hover:bg-slate-800/95 transition-colors text-white rounded-sm py-2'>
               Register
            </button>
            <NavLink className='text-slate-900 underline ml-auto' to='/login'>
               Login
            </NavLink>
         </div>
      </form>
   );
}
