import api from "../axiosInstance";

// Get admin dashboard analytics
export const adminAnalytics = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.get("/auth/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
