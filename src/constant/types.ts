import type { JSX } from "react";

// --- Types ---
export type User = {
  id: number;
    email: string;
  name?: string;
  sex?: string;
  height?: number;
  weight?: number;
};

export type DayCompletion = {
  day: string;
  date: number;
  completed: boolean;
  expectedCalories: number;
};

export type GoalProgress = {
  label: string;
  icon: JSX.Element;
  completed: number;
  target: number;
  color: string;
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
