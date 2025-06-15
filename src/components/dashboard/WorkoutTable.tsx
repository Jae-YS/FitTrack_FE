import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import type { WorkoutEntry } from "../../constant/types";

interface WorkoutTableProps {
  entries: WorkoutEntry[];
}

export const WorkoutTable: React.FC<WorkoutTableProps> = ({ entries }) => {
  const [open, setOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<WorkoutEntry | null>(null);

  const navigate = useNavigate();

  const handleOpen = (entry: WorkoutEntry) => {
    setSelectedEntry(entry);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEntry(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1, width: "100%" }}>
        <Box
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Typography variant="h6" mb={2}>
            This Week's Workouts
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/history")}
          >
            Past Workouts
          </Button>
        </Box>
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
              {entries.map((entry, index) => (
                <TableRow
                  key={index}
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
