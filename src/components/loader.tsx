import { CircularProgress, Box } from "@mui/material";

function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      <CircularProgress size={60} />
    </Box>
  );
}

export default Loader;
