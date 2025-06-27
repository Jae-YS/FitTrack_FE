import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark" if you want to invert the layout
    primary: {
      main: "#F2543D",         // coral red-orange
      contrastText: "#FFFFFF", // white text on primary
    },
    background: {
      default: "#F3F3F3",       // light background
      paper: "#FFFFFF",         // card background
    },
    text: {
      primary: "#1D1E28",       // dark navy text
      secondary: "#7A7A7A",     // gray subtext
    },
    divider: "#E0E0E0",         // subtle borders
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontWeightMedium: 600,
    h4: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        
      },
    },

     MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #F3F3F3 0%, #E6E6E6 100%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

export default theme;
