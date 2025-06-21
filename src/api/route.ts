import api from "./index";

export async function generateRoute(
  userId: number,
  lat: number,
  lng: number
): Promise<any> {
  const res = await api.post("/routes/generate-route", {
    user_id: userId,
    start_lat: lat,
    start_lng: lng,
  });
  return res.data.routes;
}

export async function geocodeLocation(query: string): Promise<[number, number]> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  if (!data.length) throw new Error("Location not found");
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}
