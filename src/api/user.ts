import api from "./index";

export async function getUserHistory(userId: number): Promise<any> {
  const res = await api.get(`/logs/users/${userId}/history`);
  return res.data;
}

export async function checkDailyLogExists(userId: number): Promise<boolean> {
  const res = await api.get(`/logs/exists/${userId}`);
  return res.data.exists;
}

