import api from "../axiosInstance";

// Get all users 
export const getAllUsers = async (
  page: number = 1,
  limit: number = 10
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await api.get("/auth/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
    },
  });

  return response.data;
};



// Get user by ID
export const getUserById = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.get(`/auth/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
};

// Delete user by ID
export const deleteUserById = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.delete(`/auth/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};