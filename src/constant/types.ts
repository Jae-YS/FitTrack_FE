import type { JSX } from "react";

// --- Types ---
export type User = {
  id: number;
  email: string;
  name?: string;
  sex?: string;
  race_date?: Date;
  height?: number;
  weight?: number;
};

export type OnboardingForm = {
  email: string;
  password: string;
  name: string;
  sex: string;
  height: number;
  weight: number;
  race_date?: Date;
  race_type?: string;
  race_level?: "beginner" | "intermediate" | "advanced";
  pr_5k?: number;
  pr_10k?: number;
  pr_half?: number;
  pr_full?: number;
};

export type SuggestedWorkout = {
  focus: unknown;
  id: number;
  week: number;
  recommended_date: string;
  workout_type: string;
  description: string;
  duration_minutes: number | null;
  distance_km: number | null;
  pace: string | null;
  goal: string | null;
  intensity: string | null;
};


export type GoalProgress = {
  label: string;
  completed: number;
  target: number;
  color: string;
  icon: JSX.Element;
};

export type WorkoutEntry ={
  date: string;
  type: string;
  duration: string;
  calories: string;
  description: string;
  summary: string;
}

export type DayData = {
  date: string;
  sleepHours: number;
  workoutMinutes: number;
}

export type WorkoutLog = {
  calories_burned: number;
  type: string;
  duration_minutes: number;
};

export type DayCompletion = {
  day: string;
  date: string;
  completed: boolean;
  workouts: WorkoutLog[];
  expectedCalories?: number;
};

