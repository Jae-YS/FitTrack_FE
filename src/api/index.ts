import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;


export * from "./auth";
export * from "./user";
export * from "./workout";
export * from "./log";
export * from "./route";
