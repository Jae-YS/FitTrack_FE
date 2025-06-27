import { Paper, IconButton, Typography, Box, Slide } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import type { User } from "../constant/types";

function getTimeRemaining(targetDate: Date) {
  const total = targetDate.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

export default function Countdown({ user }: { user: User }) {
  const [open, setOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(
    getTimeRemaining(new Date(user.race_date ?? ""))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(new Date(user.race_date ?? "")));
    }, 1000);
    return () => clearInterval(timer);
  }, [user.race_date]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <Box textAlign="center" mx={1}>
      <Typography variant="h4" fontWeight="bold">
        {String(value).padStart(2, "0")}
      </Typography>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            width: 400,
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="subtitle1">Until Race</Typography>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "inherit" }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="center" py={2}>
            <TimeBox value={timeLeft.days} label="DAYS" />
            <TimeBox value={timeLeft.hours} label="HOURS" />
            <TimeBox value={timeLeft.minutes} label="MINUTES" />
            <TimeBox value={timeLeft.seconds} label="SECONDS" />
          </Box>
        </Paper>
      </Slide>

      {/* Toggle Button stays anchored */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <ExpandLessIcon />
        </IconButton>
      )}
    </Box>
  );
}
