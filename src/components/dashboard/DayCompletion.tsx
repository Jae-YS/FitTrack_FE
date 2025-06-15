import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { DayCompletion } from "../../constant/types";

interface WeekdayCaloriesChartProps {
  days: DayCompletion[];
}

const WeekdayCaloriesChart: React.FC<WeekdayCaloriesChartProps> = ({
  days,
}) => {
  const completedCount = days.filter((d) => d.completed).length;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        gap: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 3,
        p: 2,
        width: "100%",
        maxWidth: 900,
      }}
    >
      {/* Left: Tracker */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Workout 5x
        </Typography>
        <Typography variant="body2" mb={2}>
          {completedCount} days completed
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {days.map((d) => (
            <Box
              key={d.day}
              sx={{
                width: 48,
                height: 64,
                borderRadius: 2,
                backgroundColor: d.completed ? "#c3f2a0" : "#e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontSize="14px" fontWeight="bold" mb={0.5}>
                {d.completed ? "✔️" : d.date}
              </Typography>
              <Typography fontSize="12px" color="text.primary">
                {d.day}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right: Bar Chart */}
      <Box sx={{ flex: 1, minHeight: 200 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Expected Calories Burned
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={days}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="expectedCalories"
              fill="#82ca9d"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default WeekdayCaloriesChart;
