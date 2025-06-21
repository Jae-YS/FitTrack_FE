import api from "./index";
import type { SuggestedWorkout } from "../constant/types";

export async function getSuggestedWorkouts(userId: number): Promise<SuggestedWorkout[]> {
  const res = await api.get(`/suggestions/suggested-workouts/${userId}`);
  return res.data;
}

export async function submitWorkout(workout: {
  user_id: number;
  type: string;
  description: string;
  duration_minutes: number;
}): Promise<any> {
  const res = await api.post("/logs/workouts", workout); // workout logging is under the logs router
  return res.data;
}
