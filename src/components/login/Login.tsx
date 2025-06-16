import { Typography, TextField, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export const LoginPage = ({
  onSubmit,
  onCreateAccountClick,
}: {
  onSubmit: (email: string, password: string) => void;
  onCreateAccountClick: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => onSubmit(email, password)}
      >
        Log In
      </Button>
      <Button
        onClick={onCreateAccountClick}
        variant="text"
        color="primary"
        style={{ marginTop: "1rem" }}
      >
        Create a New Account
      </Button>
    </Paper>
  );
};
