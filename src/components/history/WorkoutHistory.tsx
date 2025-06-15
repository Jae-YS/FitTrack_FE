import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import type { WorkoutEntry } from "../../constant/types";

interface WorkoutHistoryProps {
  allEntries: WorkoutEntry[];
}

export const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({
  allEntries,
}) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<WorkoutEntry | null>(null);

  const weeks: WorkoutEntry[][] = [];
  for (let i = 0; i < allEntries.length; i += 7) {
    weeks.push(allEntries.slice(i, i + 7));
  }

  const entries = weeks[currentWeek] ?? [];

  const handleOpen = (entry: WorkoutEntry) => {
    setSelectedEntry(entry);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEntry(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>
        Workout History
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, i) => (
                <TableRow
                  key={i}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpen(entry)}
                >
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination Buttons */}
      <Stack direction="row" spacing={1}>
        {weeks.map((_, i) => (
          <Button
            key={i}
            variant={i === currentWeek ? "contained" : "outlined"}
            onClick={() => setCurrentWeek(i)}
          >
            {i + 1}
          </Button>
        ))}
      </Stack>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Workout Details</DialogTitle>
        <DialogContent>
          {selectedEntry && (
            <>
              <DialogContentText sx={{ mb: 2 }}>
                <strong>Date:</strong> {selectedEntry.date}
              </DialogContentText>
              <DialogContentText sx={{ mb: 2 }}>
                <strong>Type:</strong> {selectedEntry.type}
              </DialogContentText>
              <DialogContentText sx={{ mb: 2 }}>
                <strong>Duration:</strong> {selectedEntry.duration}
              </DialogContentText>
              <DialogContentText sx={{ mb: 2 }}>
                <strong>Calories:</strong> {selectedEntry.calories}
              </DialogContentText>
              <DialogContentText sx={{ mb: 2 }}>
                <strong>Description:</strong> {selectedEntry.description}
              </DialogContentText>
              <DialogContentText>
                <strong>AI Summary:</strong> {selectedEntry.summary}
              </DialogContentText>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
