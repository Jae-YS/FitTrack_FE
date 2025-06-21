import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import type { OnboardingForm } from "../../constant/types"; // or wherever your type is

interface OnboardingPageProps {
  form: OnboardingForm;
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
        onChange={onChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={onChange}
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
        type="number"
        label="Height (cm)"
        name="height"
        fullWidth
        margin="normal"
        value={form.height}
        onChange={onChange}
      />
      <TextField
        type="number"
        label="Weight (kg)"
        name="weight"
        fullWidth
        margin="normal"
        value={form.weight}
        onChange={onChange}
      />

      <TextField
        label="Race Date"
        name="race_date"
        InputLabelProps={{ shrink: true }}
        type="date"
        fullWidth
        margin="normal"
        value={form.race_date ? form.race_date.toISOString().split("T")[0] : ""}
        onChange={onChange}
      />
      <TextField
        label="Race Type"
        name="race_type"
        select
        fullWidth
        margin="normal"
        value={form.race_type}
        onChange={onChange}
      >
        <MenuItem value="5k">5K</MenuItem>
        <MenuItem value="10k">10K</MenuItem>
        <MenuItem value="half_marathon">Half Marathon</MenuItem>
        <MenuItem value="full_marathon">Full Marathon</MenuItem>
      </TextField>

      <TextField
        label="Current Level"
        name="race_level"
        select
        fullWidth
        margin="normal"
        value={form.race_level}
        onChange={onChange}
      >
        <MenuItem value="beginner">Beginner</MenuItem>
        <MenuItem value="intermediate">Intermediate</MenuItem>
        <MenuItem value="advanced">Advanced</MenuItem>
      </TextField>

      <TextField
        label="5K PR (mm:ss)"
        name="pr_5k"
        type="text"
        value={form.pr_5k}
        onChange={onChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="10K PR (mm:ss)"
        name="pr_10k"
        type="text"
        value={form.pr_10k}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Half PR (mm:ss)"
        name="pr_half"
        type="text"
        value={form.pr_half}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Full PR (mm:ss)"
        name="pr_full"
        type="text"
        value={form.pr_full}
        onChange={onChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={onSubmit}>
        Finish Setup
      </Button>
    </Paper>
  );
};
