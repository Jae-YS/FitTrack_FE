import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function getTimeRemaining(targetDate: Date) {
  const total = targetDate.getTime() - new Date().getTime();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

export default function CountdownTimer({ raceDate }: { raceDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(
    getTimeRemaining(new Date(raceDate))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(new Date(raceDate)));
    }, 1000);

    return () => clearInterval(timer);
  }, [raceDate]);

  if (timeLeft.total <= 0) return null;

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <Box textAlign="center" mx={1}>
      <Typography variant="h4" fontWeight="bold">
        {String(value).padStart(2, "0")}
      </Typography>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
      <Typography variant="h4" mb={1} fontWeight="medium">
        Until next race
      </Typography>

      <Box display="flex" justifyContent="center">
        <TimeBox value={timeLeft.days} label="DAYS" />
        <TimeBox value={timeLeft.hours} label="HOURS" />
        <TimeBox value={timeLeft.minutes} label="MINUTES" />
        <TimeBox value={timeLeft.seconds} label="SECONDS" />
      </Box>
    </Box>
  );
}
