import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Bed, Footprints } from "lucide-react";

import { RadialProgressChart } from "../components/dashboard/ProgressChart";
import WeekdayCaloriesChart from "../components/dashboard/DayCompletion";
import { WorkoutTable } from "../components/dashboard/WorkoutTable";
import InitialQ from "../components/dashboard/InitalQuestion";
import CountdownTimer from "../components/dashboard/CountDownTimer";
import WeeklyGoalsCard from "../components/dashboard/WeeklyGoalsCard";

import {
  checkDailyLogExists,
  generateNewWorkout,
  getSuggestedWorkouts,
  getWeeklyDashboardData,
  getWeeklyProgress,
  logoutUser,
} from "../api";

import type {
  User,
  WorkoutEntry,
  DayCompletion,
  SuggestedWorkout,
  GoalProgress,
} from "../constant/types";

export default function Dashboard({
  user,
  setUser,
  setLoading,
}: {
  user: User;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}) {
  const [showDailyCheck, setShowDailyCheck] = useState(false);

  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const [suggestedWorkouts, setSuggestedWorkouts] = useState<
    SuggestedWorkout[]
  >([]);
  const [goalProgress, setGoalProgress] = useState<GoalProgress[]>([]);
  const [daysWithCalories, setDaysWithCalories] = useState<DayCompletion[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const [exists, dashboardData, suggestions, progress] =
          await Promise.all([
            checkDailyLogExists(user.id),
            getWeeklyDashboardData(user.id),
            getSuggestedWorkouts(user.id),
            getWeeklyProgress(user.id),
          ]);

        setShowDailyCheck(!exists);
        setSuggestedWorkouts(suggestions);

        setDaysWithCalories(
          dashboardData.days.map((d: any) => ({
            ...d,
            day: d.day.slice(0, 3) + ".",
            expectedCalories: Math.round(d.expectedCalories || 0),
          }))
        );

        setEntries(
          dashboardData.entries.sort(
            (
              a: { date: string | number | Date },
              b: { date: string | number | Date }
            ) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );

        setGoalProgress([
          {
            label: "Distance",
            completed: progress.distance_km_workouts,
            target: progress.distance_km_suggested,
            color: "#3b82f6",
            icon: <Footprints size={20} color="#1f2937" />,
          },
          {
            label: "Sleep",
            completed: progress.sleep_hours,
            target: 56,
            color: "#10b981",
            icon: <Bed size={20} color="#1f2937" />,
          },
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard init error:", err);
        setLoading(false);
      }
    };

    init();
  }, [user.id]);

  useEffect(() => {
    console.log("Calling generateNewWorkout for user", user.id);

    const generate = async () => {
      try {
        const workout = await generateNewWorkout(user.id);
        if (workout?.id) {
          setSuggestedWorkouts((prev) => [...prev, workout]);
        }
      } catch (err: any) {
        if (err.response?.status === 403) {
          console.log("Not Sunday — skipping workout generation");
        } else {
          console.error("Workout generation error:", err);
        }
      }
    };

    if (user?.id) generate();
  }, [user?.id]);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <>
      <InitialQ
        open={showDailyCheck}
        onClose={() => setShowDailyCheck(false)}
        userId={user.id}
        onSubmitted={() => setShowDailyCheck(false)}
      />

      <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 5 }}>
        {user.race_date && <CountdownTimer raceDate={user.race_date} />}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Welcome Back
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Log Out
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Typography variant="h6" fontWeight="medium">
            This Week's Progress
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={() => navigate("/workout")}>
              Add Workout
            </Button>
            <Button variant="contained" onClick={() => navigate("/map")}>
              Generate Route
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <WeekdayCaloriesChart days={daysWithCalories} />
          <RadialProgressChart goals={goalProgress} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 10,
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <WorkoutTable entries={entries} />
          </Box>
          <WeeklyGoalsCard workouts={suggestedWorkouts} />
        </Box>
      </Box>
    </>
  );
}
