import type { User } from "../constant/types";

//  Current logged-in user
export async function getCurrentUser() {
  const res = await fetch("/api/me", { credentials: "include" });
  if (!res.ok) throw new Error("Not logged in");
  return res.json();
}

//  Register new user after onboarding
export async function registerUser(user: User) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error(`Registration failed: ${res.status}`);
  }

  return res.json();
}


//  Login via email
export async function loginUser(email: string) {
  console.log("📤 Sending login request to /api/login with:", email);

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  console.log("📥 Received login response:", res.status, res.statusText);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Login failed response body:", errorText);
    throw new Error("Login failed");
  }

  const data = await res.json();
  console.log("✅ Parsed login response JSON:", data);
  return data;
}

//  Submit daily log
export async function submitLog(log: any) {
  const res = await fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(log),
  });

  if (!res.ok) throw new Error("Failed to submit log");
  return res.json();
}


//  Submit a workout entry
export async function submitWorkout(workout: {
  user_id: number;
  type: string;
  description: string;
  duration_minutes: number;
}) {
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
}

export async function getUserHistory(userId: number) {
  const res = await fetch(`/api/users/${userId}/history`);
  if (!res.ok) throw new Error("Failed to fetch user history");
  return res.json(); 
}

//  Check if today's log exists
export async function checkDailyLogExists(userId: number): Promise<boolean> {
  const res = await fetch(`/api/log/exists/${userId}`);
  if (!res.ok) throw new Error("Failed to check log existence");
  const data = await res.json();
  return data.exists;
}

export async function getWeeklyDashboardData(userId: number) {
  const res = await fetch(`/api/dashboard/weekly/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json(); 
}