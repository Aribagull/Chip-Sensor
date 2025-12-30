import api from "./axiosInstance";

// User registration 
export interface RegisterUserData {
  name: string;
  organizationName: string;
  email: string;
  password: string;
  phone: string;
  role?: "customer" | "admin";
}
export const registerUser = async (data: RegisterUserData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};


// User login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Network error' };
  }
};


// User logout
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await api.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("token");

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Logout failed" };
  }
};


// User profile fetch

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found");

  const response = await api.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}


// User profile update 
export const updateUserProfile = async (data: { name?: string; phone?: string }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await api.put(
      "/auth/profile",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Update failed" };
  }
};

// Change user password
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.put(
    "/auth/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );

  return response.data;
};
