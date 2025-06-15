import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { submitLog } from "../../api";

export default function InitialQ({
  open,
  onClose,
  userId,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  userId: number;
  onSubmitted: () => void;
}) {
  const [sleepHours, setSleepHours] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = async () => {
    const today = new Date().toISOString().split("T")[0];

    const log = {
      user_id: userId,
      date: today,
      mood,
      sleep_hours: parseFloat(sleepHours),
      workouts: [],
    };

    try {
      await submitLog(log);
      setSleepHours("");
      setMood("");
      onSubmitted();
    } catch (error) {
      console.error("Failed to submit daily log:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Daily Check-In</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Hours of Sleep"
          type="number"
          fullWidth
          variant="standard"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Mood (1-10)"
          type="number"
          fullWidth
          variant="standard"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
