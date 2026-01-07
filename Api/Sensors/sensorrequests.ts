import api from "../axiosInstance";

interface CreateRequestData {
  storeId: string;
  subStoreId: string;
  description?: string;
  sensorType: "temperature" | "humidity" | "pressure" | "multi" | "other" | "door";
  requestedSensors: number;
}

export const createRequest = async (data: CreateRequestData) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    `/requests/${data.storeId}/${data.subStoreId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export interface RequestData {
  _id: string;
  locationName: string;
  subStoreName: string;
  items: string[];
  status: "pending" | "approved" | "installed" | "rejected" | "payment_pending" | "active" | "completed" | "cancelled";
  date: string;
  urgency?: "urgent";
  adminNote?: string;
}

export const getMyRequests = async (status?: string): Promise<RequestData[]> => {
  const token = localStorage.getItem("token");
  let url = '/requests';
  if (status && status !== 'all') {
    url += `?status=${status}`;
  }

  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

   return response.data.requests || [];
};


// DELETE a request
export const deleteRequest = async (id: string) => {
  const res = await api.delete(`/requests/${id}`);
  return res.data;
};

// Admin: Get all service sensor requests
export interface ServiceRequestData {
  _id: string;
  customerName: string;
  locationName: string;
  subStoreName: string;
  items: string[];
  reason: string;
  notes?: string;
  status: "pending" | "approved" | "scheduled" | "installed";
  urgency?: "urgent";
  targetTemp?: string;
  date: string;
}

export const getAllRequests = async (status?: string, page = 1, limit = 10) => {
  const token = localStorage.getItem("token");
  let url = `/requests/admin/all?page=${page}&limit=${limit}`;
  if (status) {
    url += `&status=${status}`;
  }

  const res = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data.requests as ServiceRequestData[];
};

// Admin: Delete a service sensor request
export const deleteAdminSensorRequest = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.delete(`/requests/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting request:", err);
    throw err;
  }
};

// Admin: Update service sensor request status
export const updateAdminSensorRequestStatus = async (id: string, status: string) => {
  try {
    const response = await api.put(`/requests/admin/${id}/status`, { status });
    return response.data;
  } catch (err) {
    console.error("Error updating request status:", err);
    throw err;
  }
};