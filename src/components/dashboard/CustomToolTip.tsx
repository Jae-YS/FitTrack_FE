import type { TooltipProps } from "recharts";
import { Box, Typography } from "@mui/material";

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<any, any>) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: 1,
        p: 1,
      }}
    >
      <Typography fontWeight="bold">{label}</Typography>
      <Typography color="text.primary">
        Calories Burned: {data.expectedCalories}
      </Typography>
    </Box>
  );
};
