import api from "../axiosInstance";

// Create a new store
export const createStore = async (storeData: {
  storeName: string;
  storeShortCode: string;
  storeType: string;
  address: string;
}) => {
  const token = localStorage.getItem('token'); 
  const response = await api.post('/stores', storeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get list of stores
export const getMyStores = async (page = 1 ) => {
  const token = localStorage.getItem('token');
  const response = await api.get("/stores", {
    params: { page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// Get store by ID
export const getStoreById = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await api.get(`/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.store;
};

// Update store
export const updateStore = async (id: string, storeData: {
  storeName?: string;
  storeType?: string;
  address?: string;
}) => {
  const token = localStorage.getItem('token');
  const response = await api.put(`/stores/${id}`, storeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// Delete store
export const deleteStore = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await api.delete(`/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// Get all stores (admin only)
export const getAllStores = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get("/stores/admin/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.stores; 
};

// store by customer id (only admin) 
export const getCustomerStores = async (customerId: string) => {
  const response = await api.get(`/auth/${customerId}/stores`);
  return response.data.stores; 
};
