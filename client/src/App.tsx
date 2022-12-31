import { useState } from "react";
import { useEffect } from "react";
import type { RootState } from "./store/index";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/user";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";

// Socket.io
import { io } from "socket.io-client";
import Login from "./pages/Login";
import { Player } from "@lottiefiles/react-lottie-player";
import Register from "./pages/Register";
import { controlRequest } from "./axios";
const socket = io(import.meta.env.VITE_SERVER_URL);

function App() {
   // redux
   const { userStatus } = useSelector((state: RootState) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // useState
   const [message, setMessage] = useState();

   useEffect(() => {
      socket.on("receive_message", (data) => {
         console.log(data);
      });
   }, [socket]);

   const submitHandle = (e: any) => {
      e.preventDefault();
      socket.emit("send_message", { message: message });
   };

   useEffect(() => {
      if (localStorage.getItem("token")) {
         (async () => {
            try {
               const { data } = await controlRequest(
                  JSON.parse(`${localStorage.getItem("token")}`)
               );
               dispatch(login({ status: true, user: data }));
            } catch (error) {
               dispatch(
                  login({ status: false, user: { token: "", username: "", _id: "" } })
               );
               localStorage.removeItem("token");
            }
         })();
      } else {
         dispatch(logout());
         navigate("/login");
      }
   }, []);

   if (userStatus === true) {
      return <Home />;
   } else if (userStatus === false) {
      return (
         <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
         </Routes>
      );
   } else {
      return (
         <Player
            autoplay
            loop
            src='https://lottie.host/083218fc-9251-4ee4-9c71-be12512f3b6e/xrQ2pS2EI6.json'
            style={{ height: "300px", width: "300px" }}></Player>
      );
   }
}

export default App;
