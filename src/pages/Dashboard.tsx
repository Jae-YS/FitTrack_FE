import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadialProgressChart } from "../components/dashboard/ProgressChart";
import WeekdayCaloriesChart from "../components/dashboard/DayCompletion";
import { WorkoutTable } from "../components/dashboard/WorkoutTable";
import { Box, Button, Typography } from "@mui/material";
import type { User, WorkoutEntry, DayCompletion } from "../constant/types";
import InitialQ from "../components/dashboard/InitalQuestion";
import CountdownTimer from "../components/dashboard/CountDownTimer";
import WeeklyGoalsCard from "../components/dashboard/WeeklyGoalsCard";
import { checkDailyLogExists, getWeeklyDashboardData } from "../api";

export default function Dashboard({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User | null) => void;
}) {
  const [showDailyCheck, setShowDailyCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const [daysWithCalories, setDaysWithCalories] = useState<DayCompletion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const exists = await checkDailyLogExists(user.id);
        setShowDailyCheck(!exists);

        const { days, entries } = await getWeeklyDashboardData(user.id);

        const processedDays = days.map((d: any) => ({
          ...d,
          day: d.day.slice(0, 3) + ".",
          expectedCalories: Math.round(d.expectedCalories || 0),
        }));

        const sortedEntries = [...entries].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setDaysWithCalories(processedDays);
        setEntries(sortedEntries);
      } catch (err) {
        console.error("Dashboard init error:", err);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user.id]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
    navigate("/", { replace: true });
  };

  if (loading) return null;

  return (
    <>
      <InitialQ
        open={showDailyCheck}
        onClose={() => setShowDailyCheck(false)}
        userId={user.id}
        onSubmitted={() => {
          setShowDailyCheck(false);
        }}
      />

      <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 5 }}>
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
              p: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Typography variant="h6" fontWeight="medium" mb={2}>
              This Week's Progress
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/workout")}
            >
              Add Workout
            </Button>
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
            <RadialProgressChart goals={[]} />
          </Box>
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

          <WeeklyGoalsCard />
        </Box>
      </Box>
    </>
  );
}
