import api from "./index";
import type { User, OnboardingForm } from "../constant/types";

export async function getCurrentUser(): Promise<User> {
  const res = await api.get("/users/me");
  return res.data;
}

export async function registerUser(user: Omit<OnboardingForm, "pr_5k" | "pr_10k" | "pr_half" | "pr_full"> & {
  pr_5k?: number;
  pr_10k?: number;
  pr_half?: number;
  pr_full?: number;
}): Promise<User> {
  const res = await api.post("/users/register", user);
  return res.data;
}


export async function loginUser(credentials: { email: string; password: string }): Promise<User> {
  try {
    const res = await api.post("/users/login", credentials);
    return res.data.user;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Login failed");
  }
}


export async function logoutUser(): Promise<void> {
  await api.post("/users/logout", { credentials: "include" });

}

