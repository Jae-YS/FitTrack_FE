import { Clock, Moon, Footprints } from "lucide-react";

export const goals = [
  {
    label: "Workout (min)",
    icon: <Clock size={24} />,
    completed: 180,
    target: 250,
    color: "#4ade80",
  },
  {
    label: "Sleep (hrs)",
    icon: <Moon size={24} />,
    completed: 20,
    target: 42,
    color: "#60a5fa",
  },
  {
    label: "Steps",
    icon: <Footprints size={24} />,
    completed: 28000,
    target: 35000,
    color: "#facc15",
  },
];

export const days = [
  { day: "Mon", date: 10, completed: true, expectedCalories: 300 },
  { day: "Tue", date: 11, completed: true, expectedCalories: 250 },
  { day: "Wed", date: 12, completed: false, expectedCalories: 0 },
  { day: "Thu", date: 13, completed: true, expectedCalories: 500 },
  { day: "Fri", date: 14, completed: false, expectedCalories: 0 },
  { day: "Sat", date: 15, completed: false, expectedCalories: 0 },
  { day: "Sun", date: 16, completed: false, expectedCalories: 0 },
];

export const workoutEntries = [
  {
    date: "2025-06-09",
    type: "Strength Training",
    duration: "45 min",
    calories: "320 kcal",
    description:
      "Upper body push day focusing on chest and triceps. Included bench press, overhead press, and dips.",
    summary:
      "You maintained consistent volume and good exercise variety. Consider increasing weight slightly next week for progressive overload.",
  },
  {
    date: "2025-06-10",
    type: "Running",
    duration: "30 min",
    calories: "280 kcal",
    description:
      "Outdoor tempo run at moderate pace. Covered ~4.2 km with minimal rest breaks.",
    summary:
      "Solid endurance session. Maintaining this pace will support cardiovascular health and caloric burn goals.",
  },
  {
    date: "2025-06-11",
    type: "Yoga",
    duration: "20 min",
    calories: "90 kcal",
    description:
      "Morning mobility flow with emphasis on hip and spine flexibility. Low intensity, restorative.",
    summary:
      "Excellent for recovery and joint mobility. Keep incorporating light days like this to balance intensity.",
  },
  {
    date: "2025-06-12",
    type: "Rest Day",
    duration: "-",
    calories: "-",
    description: "No training. Focused on hydration, meal prep, and sleep.",
    summary: "Rest is key to recovery. Good job balancing training demands.",
  },
];

export const workoutEntriesPast = [
  {
    date: "2025-06-09",
    type: "Strength Training",
    duration: "45 min",
    calories: "320 kcal",
    description:
      "Upper body push day focusing on chest and triceps. Included bench press, overhead press, and dips.",
    summary:
      "You maintained consistent volume and good exercise variety. Consider increasing weight slightly next week for progressive overload.",
  },
  {
    date: "2025-06-10",
    type: "Running",
    duration: "30 min",
    calories: "280 kcal",
    description:
      "Outdoor tempo run at moderate pace. Covered ~4.2 km with minimal rest breaks.",
    summary:
      "Solid endurance session. Maintaining this pace will support cardiovascular health and caloric burn goals.",
  },
  {
    date: "2025-06-11",
    type: "Yoga",
    duration: "20 min",
    calories: "90 kcal",
    description:
      "Morning mobility flow with emphasis on hip and spine flexibility. Low intensity, restorative.",
    summary:
      "Excellent for recovery and joint mobility. Keep incorporating light days like this to balance intensity.",
  },
  {
    date: "2025-06-12",
    type: "Rest Day",
    duration: "-",
    calories: "-",
    description: "No training. Focused on hydration, meal prep, and sleep.",
    summary: "Rest is key to recovery. Good job balancing training demands.",
  },
  {
    date: "2025-06-13",
    type: "Swimming",
    duration: "35 min",
    calories: "250 kcal",
    description: "Freestyle and backstroke laps with minimal rest.",
    summary: "Low impact, great cardio. Watch shoulder fatigue.",
  },
  {
    date: "2025-06-14",
    type: "Strength Training",
    duration: "50 min",
    calories: "360 kcal",
    description: "Pull-focused routine with rows and deadlifts.",
    summary: "Strong effort. Maintain grip focus for back work.",
  },
  {
    date: "2025-06-15",
    type: "Rest Day",
    duration: "-",
    calories: "-",
    description: "Light stretching and walking only.",
    summary: "Recovery day. Good reset for upcoming week.",
  },
  {
    date: "2025-06-16",
    type: "Running",
    duration: "35 min",
    calories: "300 kcal",
    description: "Evening jog with hill work.",
    summary: "Solid aerobic work. Stay hydrated and stretch post-run.",
  },
  {
    date: "2025-06-17",
    type: "Yoga",
    duration: "25 min",
    calories: "110 kcal",
    description: "Focused breathing and core activation.",
    summary: "Great for midweek reset. Stay consistent with mobility work.",
  },
];

export const progressData = [
  { date: "2025-06-01", sleepHours: 7.2, workoutMinutes: 40 },
  { date: "2025-06-02", sleepHours: 6.5, workoutMinutes: 30 },
  { date: "2025-06-03", sleepHours: 8.0, workoutMinutes: 50 },
  { date: "2025-06-04", sleepHours: 6.0, workoutMinutes: 0 },
  { date: "2025-06-05", sleepHours: 7.8, workoutMinutes: 20 },
  { date: "2025-06-06", sleepHours: 5.5, workoutMinutes: 35 },
  { date: "2025-06-07", sleepHours: 7.0, workoutMinutes: 60 },
  { date: "2025-06-08", sleepHours: 6.2, workoutMinutes: 25 },
  { date: "2025-06-09", sleepHours: 8.1, workoutMinutes: 45 },
];
