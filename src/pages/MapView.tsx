import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { generateRoute, geocodeLocation } from "../api";
import type { User } from "../constant/types";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";

interface MapViewProps {
  user: User;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

export default function MapView({ user, setLoading }: MapViewProps) {
  const [routeData, setRouteData] = useState<any | null>(null);
  const [startQuery, setStartQuery] = useState("");
  const [startCoord, setStartCoord] = useState<[number, number] | null>(null);

  async function fetchRoutes() {
    if (!startCoord) return;

    const [lat, lng] = startCoord;
    console.log("Fetching routes from backend...");
    console.log("User ID:", user.id);
    console.log("Start coordinates:", { lat, lng });

    try {
      setLoading(true);
      const geojson = await generateRoute(user.id, lat, lng);
      console.log("Routes received from backend:", geojson);
      setRouteData(geojson);
    } catch (err) {
      console.error("Failed to fetch routes:", err);
      alert("Failed to fetch route.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (startCoord) {
      fetchRoutes();
    }
  }, [startCoord]);

  function FlyToStart({ coord }: { coord: [number, number] | null }) {
    const map = useMap();

    useEffect(() => {
      if (coord) {
        map.flyTo(coord, 14);
      }
    }, [coord]);

    return null;
  }

  const firstFeature = routeData?.features?.[0];
  const distance = firstFeature?.properties?.distance_km;
  const duration = firstFeature?.properties?.duration_min;

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      {/* Top Left Search */}
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1000,
          p: 2,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          label="Starting location"
          size="small"
          value={startQuery}
          onChange={(e) => setStartQuery(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            try {
              console.log("Geocoding location:", startQuery);
              const coord = await geocodeLocation(startQuery);
              console.log("Geocoded coordinates:", coord);
              setStartCoord(coord);
            } catch (err) {
              console.error("Geocoding failed:", err);
              alert("Location not found");
            }
          }}
        >
          Set Start
        </Button>
      </Paper>

      {distance && duration && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1000,
            p: 2,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Route Summary
          </Typography>
          <Typography variant="body2">Distance: {distance} km</Typography>
          <Typography variant="body2">Duration: {duration} min</Typography>
        </Paper>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <FlyToStart coord={startCoord} />

        {routeData?.features?.map((feature: any, idx: number) => (
          <GeoJSON
            key={idx}
            data={feature}
            style={{
              color: ["blue", "green", "purple"][idx % 3],
              weight: 4,
              opacity: 0.8,
            }}
            onEachFeature={(feature, layer) => {
              const dist = feature.properties?.distance_km;
              const dur = feature.properties?.duration_min;
              layer.bindPopup(
                `Route ${
                  idx + 1
                }<br>Distance: ${dist} km<br>Duration: ${dur} min`
              );
            }}
          />
        ))}
      </MapContainer>
    </Box>
  );
}
