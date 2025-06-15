import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";

interface OnboardingPageProps {
  form: {
    email: string;
    name: string;
    sex: string;
    height: string;
    weight: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const OnboardingPage = ({
  form,
  onChange,
  onSubmit,
}: OnboardingPageProps) => {
  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Welcome! Let's Get Started
      </Typography>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={onChange}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={form.email}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Sex"
        name="sex"
        select
        fullWidth
        margin="normal"
        value={form.sex}
        onChange={onChange}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      <TextField
        label="Height (in)"
        name="height"
        fullWidth
        margin="normal"
        value={form.height}
        onChange={onChange}
      />
      <TextField
        label="Weight (lbs)"
        name="weight"
        fullWidth
        margin="normal"
        value={form.weight}
        onChange={onChange}
      />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={onSubmit}>
        Finish Setup
      </Button>
    </Paper>
  );
};
