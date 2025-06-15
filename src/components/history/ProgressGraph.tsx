import React, { useState } from "react";
import { Box, Typography, Paper, Pagination } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DayData } from "../../constant/types";

interface ProgressGraphProps {
  data: DayData[];
}

export const ProgressGraph: React.FC<ProgressGraphProps> = ({ data }) => {
  const pageSize = 7;
  const totalPages = Math.ceil(data.length / pageSize);
  const [page, setPage] = useState(1);

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1, width: "100%" }}>
      <Typography variant="h6" mb={2}>
        Sleep vs Workout (Weekly)
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={paginatedData}>
          <XAxis dataKey="date" />
          <YAxis
            yAxisId="left"
            label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Hours", angle: -90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="workoutMinutes"
            stroke="#4ade80"
            name="Workout (min)"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="sleepHours"
            stroke="#60a5fa"
            name="Sleep (hrs)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </Box>
    </Paper>
  );
};
