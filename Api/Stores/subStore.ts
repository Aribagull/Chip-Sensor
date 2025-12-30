import api from "../axiosInstance";

// Create SubStore
export const createSubStore = async (
  storeId: string,
  subStoreData: {
    name: string;
    location: string;
    Notification_status: "on" | "off";
    phoneNumbersLevel1?: string;
    phoneNumbersLevel2?: string;
    phoneNumbersLevel3?: string;
    emailRecipientsLevel1?: string;
    emailRecipientsLevel2?: string;
    emailRecipientsLevel3?: string;
    coolerSmsSubscribers?: string;
  }
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    `/stores/${storeId}/substores`,
    subStoreData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Update SubStore
export const updateSubStore = async (
  storeId: string,
  subStoreId: string,
  subStoreData: {
    name?: string;
    location?: string;
    Notification_status?: "on" | "off";
    phoneNumbersLevel1?: string;
    phoneNumbersLevel2?: string;
    phoneNumbersLevel3?: string;
    emailRecipientsLevel1?: string;
    emailRecipientsLevel2?: string;
    emailRecipientsLevel3?: string;
    coolerSmsSubscribers?: string;
  }
) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/stores/${storeId}/substores/${subStoreId}`,
    subStoreData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete Substore
export const deleteSubStore = async (storeId: string, subStoreId: string) => {
  const response = await api.delete(
    `/stores/${storeId}/substores/${subStoreId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};