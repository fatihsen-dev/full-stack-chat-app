import axios from "axios";
const HTTP = axios.create({
   baseURL: import.meta.env.VITE_SERVER_URL,
});

export const loginRequest = async (data: { username: string; password: string }) =>
   await HTTP.post("/user/login", data);

export const registerRequest = async (data: { username: string; password: string }) =>
   await HTTP.post("/user/register", data);

export const controlRequest = async (data: { username: string; token: string }) =>
   await HTTP.post("/user/control", data);
