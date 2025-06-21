import api from "./index";
import type { DayCompletion } from "../constant/types";

export async function submitLog(log: any): Promise<any> {
  const res = await api.post("/logs", log);
  return res.data;
}

export async function getWeeklyDashboardData(userId: number): Promise<any> {
  const res = await api.get(`/logs/dashboard/weekly/${userId}`);
  return res.data;
}

export async function getWeeklyProgress(userId: number): Promise<any> {
  const res = await api.get(`/logs/weekly-progress/${userId}`);
  return res.data;
}

export async function fetchDaysWithCalories(
  userId: number,
  days: DayCompletion[]
): Promise<DayCompletion[]> {
  const payload = {
    user_id: userId,
    days: days.map((d) => ({ date: d.date, workouts: d.workouts || [] })),
  };
  const res = await api.post("/logs/calculate-calories", payload);
  return res.data.days;
}
