import api from "./index";

export async function generateRoute(
  userId: number,
  lat: number,
  lng: number
): Promise<any> {
  console.log("Generating route for user:", userId);
  console.log("Start coordinates:", { lat, lng });
  const res = await api.post("/routes/generate-route", {
    user_id: userId,
    start_lat: lat,
    start_lng: lng,
  });
  return res.data.routes;
}

export async function geocodeLocation(query: string): Promise<[number, number]> {
  const res = await api.get(`/routes/geocode?q=${encodeURIComponent(query)}`);
  const { lat, lon } = res.data;
  return [lat, lon];
}
