import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadialProgressChart } from "../components/dashboard/ProgressChart";
import WeekdayCaloriesChart from "../components/dashboard/DayCompletion";
import { WorkoutTable } from "../components/dashboard/WorkoutTable";
import { Box, Button, Typography } from "@mui/material";
import type { User, WorkoutEntry, DayCompletion } from "../constant/types";
import InitialQ from "../components/dashboard/InitalQuestion";
import { checkDailyLogExists, getWeeklyDashboardData } from "../api";

export default function Dashboard({ user }: { user: User }) {
  const [showDailyCheck, setShowDailyCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<DayCompletion[]>([]);
  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const exists = await checkDailyLogExists(user.id);
        setShowDailyCheck(!exists);

        const { days, entries } = await getWeeklyDashboardData(user.id);
        const abbreviatedDays = days.map((d: { day: string }) => ({
          ...d,
          day: d.day.slice(0, 3) + ".",
        }));
        setDays(abbreviatedDays);
        setEntries(entries);
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

        <Box>
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
            <WeekdayCaloriesChart days={days} />
            <RadialProgressChart goals={[]} />
          </Box>
        </Box>

        <WorkoutTable entries={entries} />
      </Box>
    </>
  );
}
