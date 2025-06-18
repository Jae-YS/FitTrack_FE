import type { User, OnboardingForm, DayCompletion, SuggestedWorkout } from "../constant/types";
import axios from "axios";

// Suggested Workouts
export async function getSuggestedWorkouts(userId: number): Promise<SuggestedWorkout[]> {
  try {
    const res = await axios.get(`/api/suggested-workouts/${userId}`);
    console.log("📥 Suggested workouts response:", res.data, res.statusText);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch suggested workouts:", err);
    throw err;
  }
}

// Current logged-in user
export async function getCurrentUser(): Promise<User> {
  try {
    const res = await fetch("/api/me", {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Not authenticated");
    return await res.json();
  } catch (err) {
    console.error("Failed to get current user:", err);
    throw err;
  }
}

// Register user
export async function registerUser(user: OnboardingForm) {
  try {
    console.log("Sending registration request with:", user);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });

    console.log("📥 Registration response:", res.status, res.statusText);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Registration failed:", errorText);
      throw new Error("Registration failed");
    }

    return res.json();
  } catch (err) {
    console.error("registerUser error:", err);
    throw err;
  }
}

// Login user
export async function loginUser({ email, password }: { email: string; password: string }) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errBody = await res.json();
      const error: any = new Error("Login failed");
      error.response = { data: errBody };
      throw error;
    }

    return res.json();
  } catch (err) {
    console.error("loginUser error:", err);
    throw err;
  }
}

// Submit daily log
export async function submitLog(log: any) {
  try {
    const res = await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(log),
    });

    if (!res.ok) throw new Error("Failed to submit log");
    return res.json();
  } catch (err) {
    console.error("submitLog error:", err);
    throw err;
  }
}

// Submit workout
export async function submitWorkout(workout: {
  user_id: number;
  type: string;
  description: string;
  duration_minutes: number;
}) {
  try {
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(workout),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Workout creation failed: ${msg}`);
    }

    return res.json();
  } catch (err) {
    console.error("submitWorkout error:", err);
    throw err;
  }
}

// Get user history
export async function getUserHistory(userId: number) {
  try {
    const res = await fetch(`/api/users/${userId}/history`);
    if (!res.ok) throw new Error("Failed to fetch user history");
    return res.json();
  } catch (err) {
    console.error("getUserHistory error:", err);
    throw err;
  }
}

// Check if today's log exists
export async function checkDailyLogExists(userId: number): Promise<boolean> {
  try {
    const res = await fetch(`/api/log/exists/${userId}`);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("checkDailyLogExists server error:", errorText);
      throw new Error("Failed to check log existence");
    }

    const data = await res.json();
    return data.exists;
  } catch (err) {
    console.error("checkDailyLogExists error:", err);
    throw err;
  }
}

// Weekly dashboard data
export async function getWeeklyDashboardData(userId: number) {
  try {
    const res = await fetch(`/api/dashboard/weekly/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch dashboard data");
    return res.json();
  } catch (err) {
    console.error("getWeeklyDashboardData error:", err);
    throw err;
  }
}

// Weekly progress
export async function getWeeklyProgress(userId: number) {
  try {
    const res = await fetch(`/api/weekly-progress/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch weekly progress");
    const data = await res.json();
    console.log("📥 Weekly progress response:", data);
    return data;
  } catch (err) {
    console.error("getWeeklyProgress error:", err);
    throw err;
  }
}

// Fetch calorie data by day
export async function fetchDaysWithCalories(
  userId: number,
  days: DayCompletion[]
): Promise<DayCompletion[]> {
  try {
    const payload = {
      user_id: userId,
      days: days.map((d) => ({
        date: d.date,
        workouts: d.workouts || [],
      })),
    };

    const response = await axios.post("/api/calculate-calories", payload);
    return response.data.days;
  } catch (err) {
    console.error("fetchDaysWithCalories error:", err);
    throw err;
  }
}
