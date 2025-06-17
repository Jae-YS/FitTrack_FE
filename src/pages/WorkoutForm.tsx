import { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { submitWorkout } from "../api";
import { useNavigate } from "react-router";
import type { User } from "../constant/types";

const WORKOUT_TYPES = [
  "Easy Run",
  "Tempo Run",
  "Long Run",
  "Strength",
  "Cross Train",
  "Rest",
];

const EFFORT_LEVELS = ["Easy", "Moderate", "Hard"];

export default function WorkoutForm({ user }: { user: User }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "",
    description: "",
    duration_minutes: "",
    distance_km: "",
    pace_min_per_km: "",
    effort_level: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    const distance = parseFloat(
      name === "distance_km" ? value : updatedForm.distance_km
    );
    const duration = parseFloat(
      name === "duration_minutes" ? value : updatedForm.duration_minutes
    );

    if (distance > 0 && duration > 0) {
      updatedForm.pace_min_per_km = (duration / distance).toFixed(2);
    } else {
      updatedForm.pace_min_per_km = "";
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const workout = {
      user_id: user.id,
      type: form.type,
      description: form.description,
      duration_minutes: parseInt(form.duration_minutes, 10),
      distance_km: form.distance_km ? parseFloat(form.distance_km) : null,
      pace_min_per_km: form.pace_min_per_km
        ? parseFloat(form.pace_min_per_km)
        : null,
      effort_level: form.effort_level || null,
    };

    try {
      await submitWorkout(workout);
      alert("Workout submitted!");
      setForm({
        type: "",
        description: "",
        duration_minutes: "",
        distance_km: "",
        pace_min_per_km: "",
        effort_level: "",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to submit workout:", error);
      alert("Error submitting workout. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        maxWidth: 600,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Add Workout
      </Typography>

      <TextField
        select
        name="type"
        label="Workout Type"
        value={form.type}
        onChange={handleChange}
        fullWidth
        required
      >
        <MenuItem value="">Select Workout Type</MenuItem>
        {WORKOUT_TYPES.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="description"
        label="Activity Description"
        value={form.description}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        name="duration_minutes"
        label="Duration (minutes)"
        type="number"
        value={form.duration_minutes}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        name="distance_km"
        label="Distance (km)"
        type="number"
        value={form.distance_km}
        onChange={handleChange}
        fullWidth
      />
      {form.pace_min_per_km && (
        <Typography variant="subtitle2" color="text.secondary">
          Calculated pace: {form.pace_min_per_km} min/km
        </Typography>
      )}

      <TextField
        select
        name="effort_level"
        label="Effort Level"
        value={form.effort_level}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="">Select Effort</MenuItem>
        {EFFORT_LEVELS.map((level) => (
          <MenuItem key={level} value={level.toLowerCase()}>
            {level}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit Workout
      </Button>
    </Box>
  );
}
