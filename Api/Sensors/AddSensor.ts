import api from "../axiosInstance";

export const getSensorById = async (sensorId: string) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/sensors/sensor/${sensorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};


// UPDATE Sensor (Customer only)
export const updateSensorById = async (sensorId: string, data: any, sensor: any) => {
  const token = localStorage.getItem("token");
  const payload = {
    sensorName: data.sensorName,
    deviceName: data.deviceName,
    minTempF: data.minTempF,
    maxTempF: data.maxTempF,
    notificationStatus: data.notificationOn ? "on" : "off",
    deviceIp: sensor.deviceIp, 
  };

  const response = await api.put(`/sensors/update/${sensorId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// Get all sensors by Admin 
export const getAllAdminSensors = async (params?: {
  storeId?: string;
  subStoreId?: string;
  status?: string;
  ownerUserId?: string;
  page?: number;
  limit?: number;
}) => {
  const token = localStorage.getItem("token");

  const response = await api.get("/sensors/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params || {},
  });

  return response.data;
};

// Add a new sensor by Admin
export const addAdminSensor = async (sensorData: any) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await api.post("/sensors/admin", sensorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Fetch all devices and their sensors
export const getDevices = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/sensors/admin/getdevices", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.devices || []; 
  } catch (error: any) {
    throw error;
  }
};

// Get sensors for user
export const getMySensors = async (subStoreId?: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/sensors", {
      headers: { Authorization: `Bearer ${token}` },
      params: subStoreId ? { subStoreId } : {},
    });
    return response.data; 
  } catch (error: any) {
    throw error;
  }
};
