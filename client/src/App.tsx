import { useEffect } from "react";
import type { RootState } from "./store/index";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/user";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { controlRequest } from "./axios";

function App() {
   const { userStatus } = useSelector((state: RootState) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

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
               navigate("/login");
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
