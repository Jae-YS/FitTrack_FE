import { Box, Typography } from "@mui/material";

const WeeklyGoalsCard = () => {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Weekly Focus & Goals
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Focus:</strong> This week emphasizes building endurance with a
        long run and incorporating speed work for improved pacing.
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Weekly Plan:</strong>
      </Typography>
      <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
        <li>Monday: Easy run, 8 km at a comfortable pace (5:50–6:10/km)</li>
        <li>
          Tuesday: Tempo run, 6 km (2 km warm-up, 2 km at 4:50/km, 2 km
          cool-down)
        </li>
        <li>Wednesday: Cross-training, 45 min cycling or swimming</li>
        <li>Thursday: Easy run, 10 km at a relaxed pace (5:50–6:10/km)</li>
        <li>Friday: Rest day</li>
        <li>Saturday: Long run, 14 km at an easy pace (6:00-6:20/km)</li>
        <li>Sunday: Yoga or stretching</li>
      </Typography>
      <Typography variant="body2" mt={2}>
        <strong>Goal:</strong> Build endurance and speed, targeting a total of
        38 kilometers this week.
      </Typography>
    </Box>
  );
};

export default WeeklyGoalsCard;
