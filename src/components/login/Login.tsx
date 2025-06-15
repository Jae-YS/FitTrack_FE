import { Typography, TextField, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export const LoginPage = ({
  onSubmit,
}: {
  onSubmit: (email: string) => void;
}) => {
  const [email, setEmail] = useState("");

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Log In
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => onSubmit(email)}
      >
        Log In
      </Button>
    </Paper>
  );
};
