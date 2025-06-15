import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import WorkoutForm from "./pages/WorkoutForm";
import History from "./pages/History";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./api";
import type { User } from "./constant/types";
import { CircularProgress, Box } from "@mui/material";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/workout" element={<WorkoutForm user={user} />} />
            <Route path="/history" element={<History user={user} />} />
          </>
        ) : (
          <Route path="/" element={<Auth onAuthenticated={setUser} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
