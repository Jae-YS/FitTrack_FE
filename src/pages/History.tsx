import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { WorkoutHistory } from "../components/history/WorkoutHistory";
import { ProgressGraph } from "../components/history/ProgressGraph";
import { getUserHistory } from "../api";
import type { User, WorkoutEntry } from "../constant/types";

export default function HistoryPage({ user }: { user: User }) {
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [summaryData, setSummaryData] = useState<
    { date: string; sleep_hours?: number; total_workout_minutes?: number }[]
  >([]);

  useEffect(() => {
    getUserHistory(user.id)
      .then(({ summary, entries }) => {
        setSummaryData(summary);
        setWorkouts(entries);
      })
      .catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        m: 2,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
      }}
    >
      <ProgressGraph
        data={summaryData.map((entry) => ({
          date: entry.date,
          sleepHours: entry.sleep_hours ?? 0,
          workoutMinutes: entry.total_workout_minutes ?? 0,
        }))}
      />
      <WorkoutHistory allEntries={workouts} />
    </Box>
  );
}
