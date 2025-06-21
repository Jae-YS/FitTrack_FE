import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export * from "./auth";
export * from "./user";
export * from "./workout";
export * from "./log";
export * from "./route";
