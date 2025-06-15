import { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { submitWorkout } from "../api";
import { useNavigate } from "react-router";
import type { User } from "../constant/types";

export default function WorkoutForm({ user }: { user: User }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    workout_type: "",
    activity: "",
    duration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const workout = {
      user_id: user.id,
      type: form.workout_type,
      description: form.activity,
      duration_minutes: parseInt(form.duration, 10),
    };

    try {
      await submitWorkout(workout);
      alert("Workout submitted!");
      setForm({ workout_type: "", activity: "", duration: "" });
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
        name="workout_type"
        label="Workout Type"
        value={form.workout_type}
        onChange={handleChange}
        fullWidth
        required
      >
        <MenuItem value="">Select Workout Type</MenuItem>
        <MenuItem value="Strength">Strength</MenuItem>
        <MenuItem value="Cardio">Cardio</MenuItem>
        <MenuItem value="Rest">Rest</MenuItem>
      </TextField>

      <TextField
        name="activity"
        label="Activity Description"
        value={form.activity}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        name="duration"
        label="Duration (minutes)"
        type="number"
        value={form.duration}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit Workout
      </Button>
    </Box>
  );
}
