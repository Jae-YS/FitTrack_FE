import React, { type JSX } from "react";
import { Box, Typography, Avatar, useTheme } from "@mui/material";

const currentDate = new Date();
const year = 2025;
const month = 5; // June (0-indexed)

const daysInMonth = new Date(year, month + 1, 0).getDate();
const startDay = new Date(year, month, 1).getDay();

const doneDays = [1, 5, 17, 19, 23];
const scheduledDays = [14, 28];

const TrainingCalendar: React.FC = () => {
  const theme = useTheme();
  const days: JSX.Element[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(<Box key={`empty-${i}`} />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      currentDate.getDate() === d &&
      currentDate.getMonth() === month &&
      currentDate.getFullYear() === year;
    const isDone = doneDays.includes(d);
    const isScheduled = scheduledDays.includes(d);

    let bgColor = "transparent";
    let textColor = theme.palette.text.secondary;
    let fontWeight = "normal";

    if (isDone) {
      bgColor = theme.palette.primary.main;
      textColor = theme.palette.primary.contrastText;
      fontWeight = "bold";
    } else if (isScheduled) {
      bgColor = "#3a3a3a";
      textColor = "#fff";
    }

    days.push(
      <Box
        key={`day-${d}`}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          sx={{
            bgcolor: bgColor,
            color: textColor,
            width: 28,
            height: 28,
            fontWeight,
            fontSize: 12,
          }}
        >
          {d}
        </Avatar>
        {isToday && (
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              width: 5,
              height: 5,
              bgcolor: "#9be378",
              borderRadius: "50%",
            }}
          />
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        p: 2,
        borderRadius: theme.shape.borderRadius,
        width: "fit-content",
        boxShadow: 1,
      }}
    >
      <Typography variant="subtitle2" color="text.primary" mb={0.5}>
        Your Training Days
      </Typography>
      <Typography variant="caption" color="text.secondary" mb={1}>
        June
      </Typography>
      {/* Weekday Labels */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} mb={1}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <Box
            key={`label-${i}`}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.05em",
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              {d}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Date Cells */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {days.map((day, index) => (
          <Box key={`cell-${index}`} display="flex" justifyContent="center">
            {day}
          </Box>
        ))}
      </Box>

      <Box display="flex" gap={2} mt={2} alignItems="center">
        <LegendDot color="#9be378" label="Current day" />
        <LegendDot color={theme.palette.primary.main} label="Done" />
        <LegendDot color="#3a3a3a" label="Scheduled" />
      </Box>
    </Box>
  );
};

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <Box display="flex" alignItems="center" gap={0.5}>
    <Box width={6} height={6} borderRadius="50%" bgcolor={color} />
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

export default TrainingCalendar;
