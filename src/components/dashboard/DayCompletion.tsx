import { Box, Typography, useTheme, Paper } from "@mui/material";
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
import { CustomTooltip } from "./CustomToolTip";
import TrainingCalendar from "./TrainingCalendar";

interface WeekdayCaloriesChartProps {
  days: DayCompletion[];
}

const WeekdayCaloriesChart: React.FC<WeekdayCaloriesChartProps> = ({
  days,
}) => {
  const theme = useTheme();
  const completedCount = days.filter((d) => d.completed).length;

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        borderRadius: 3,
        p: 3,
        width: "100%",
        maxWidth: 1000,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Left: Streak + Calendar */}
      <Box
        sx={{
          flex: 1,
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Ongoing Streak
          </Typography>
          <Typography variant="body2" mb={2}>
            {completedCount} days completed
          </Typography>
        </Box>

        <TrainingCalendar />
      </Box>

      {/* Right: Calories Chart */}
      <Box
        sx={{
          flex: 1,
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Expected Calories Burned
        </Typography>

        <Box sx={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={days}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="expectedCalories"
                fill={theme.palette.primary.main}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default WeekdayCaloriesChart;
