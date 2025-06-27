import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Countdown from "./components/Countdown";
import Dashboard from "./pages/Dashboard";
import WorkoutForm from "./pages/WorkoutForm";
import History from "./pages/History";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./api/auth";
import type { User } from "./constant/types";
import Loader from "./components/loader";
import MapView from "./pages/MapView";
import "leaflet/dist/leaflet.css";
import "./App.css"; // Import global styles

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to restore session
    const checkSession = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error("Session check failed", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <BrowserRouter>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255,255,255,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}

      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  user={user}
                  setUser={setUser}
                  setLoading={setLoading}
                />
              }
            />
            <Route path="/workout" element={<WorkoutForm user={user} />} />
            <Route path="/history" element={<History user={user} />} />
            <Route
              path="/map"
              element={
                <MapView
                  user={user}
                  setLoading={setLoading}
                  loading={loading}
                />
              }
            />
          </>
        ) : (
          <Route path="/" element={<Auth onAuthenticated={setUser} />} />
        )}
      </Routes>
      {user && <Countdown user={user} />}
    </BrowserRouter>
  );
}

export default App;
