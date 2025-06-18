import { Box, Typography } from "@mui/material";
import type { SuggestedWorkout } from "../../constant/types";

export default function WeeklyGoalsCard({
  workouts,
}: {
  workouts: SuggestedWorkout[];
}) {
  const goal =
    workouts.find((w) => w.goal)?.goal ?? "Stay consistent this week!";
  const focus =
    (workouts.find((w) => w.focus)?.focus as string) ??
    "Stay focused and keep progressing!";
  const distance =
    (workouts.find((w) => w.distance_km)?.distance_km as number) ?? null;
  const intensity =
    (workouts.find((w) => w.intensity)?.intensity as string) ?? null;

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
        <strong>Focus:</strong> {focus}
      </Typography>
      {distance && (
        <Typography variant="body2" gutterBottom>
          <strong>Distance:</strong> {distance} km
        </Typography>
      )}
      {intensity && (
        <Typography variant="body2" gutterBottom>
          <strong>Intensity:</strong> {intensity}
        </Typography>
      )}

      <Typography variant="body2" gutterBottom>
        <strong>Weekly Plan:</strong>
      </Typography>

      <ul style={{ paddingLeft: 16, margin: 0 }}>
        {workouts.map((w) => (
          <li key={w.id} style={{ fontSize: "1rem", marginBottom: 4 }}>
            {new Date(w.recommended_date).toLocaleDateString(undefined, {
              weekday: "long",
            })}
            : {w.description}
          </li>
        ))}
      </ul>

      <Typography variant="body2" mt={2}>
        <strong>Goal:</strong> {goal}
      </Typography>
    </Box>
  );
}
