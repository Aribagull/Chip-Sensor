// AdminSubStores.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllStores } from "../../../Api/Stores/store";
import { FiPhone, FiMail } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";
import AdminSensorList from "./AdminSensorList";




interface SubStore {
  _id: string;
  storeId: string;
  name: string;
  location: string;
  notification_status: string;
  phoneNumbersLevel1: string;
  phoneNumbersLevel2: string;
  phoneNumbersLevel3: string;
  emailRecipientsLevel1: string;
  emailRecipientsLevel2: string;
  emailRecipientsLevel3: string;
  coolerSmsSubscribers: string;
  sensors: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  currentTemperature?: number;
  activeSensors?: number;
  status?: "normal" | "warning" | "critical";
}

interface Store {
  _id: string;
  name: string;
  address: string;
  subStores: SubStore[];
}

const statusDot = (status?: SubStore["status"]) => {
  switch (status) {
    case "normal":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "critical":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const Toggle = ({ enabled }: { enabled: boolean }) => (
  <div
    className={`w-11 h-6 flex items-center rounded-full p-1 transition ${enabled ? "bg-blue-500" : "bg-gray-600"
      }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${enabled ? "translate-x-5" : ""
        }`}
    />
  </div>
);


const getSubStoreStatusColor = (sub: any) => {
  if (!sub.sensors || sub.sensors.length === 0) {
    return "bg-gray-400";
  }

  const hasOnSensor = sub.sensors.some(
    (sensor: any) => sensor.status === "on"
  );

  return hasOnSensor ? "bg-green-500" : "bg-gray-400";
};


const AdminSubStores: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [expandedSubStore, setExpandedSubStore] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await getAllStores();
        console.log("Stores API response:", response);
        const storesArray = response.stores || response || [];
        const selectedStore = storesArray.find((s: Store) => s._id === storeId);
        setStore(selectedStore || null);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStore();
  }, [storeId]);


  const toggleSubStore = (subStoreId: string) => {
    if (expandedSubStore === subStoreId) {
      setExpandedSubStore(null);
    } else {
      setExpandedSubStore(subStoreId);
    }
  };



  if (!store) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <ClipLoader
          color="#0f41ccff"
          size={50}
        />
      </div>
    );
  }


  return (
    <div className="space-y-6 p-6">
      <Link
        to="/admin/locations"
        className="text-sm text-blue-400 hover:underline flex items-center mb-2"
      >
        &larr; Back to All Locations
      </Link>

      {/* Store Card */}
      <div className="dark:bg-gray-800 bg-white shadow-soft dark:shadow-none rounded-lg p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{store.name}</h1>
          <p className="text-gray-400">{store.address}</p>
        </div>
        <span className="dark:bg-gray-700 bg-gray-200 dark:text-gray-200 text-black px-3 py-1 rounded-full text-sm">
          Admin Mode: Full Access
        </span>
      </div>

      {/* SubStores */}
      <div className="space-y-4">
        {store.subStores.map((sub) => (
          <div
            key={sub._id}
            className="dark:bg-gray-800 bg-white shadow-soft dark:shadow-none rounded-lg p-4 cursor-pointer"
            onClick={() => toggleSubStore(sub._id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                 <span
    className={`h-3 w-3 rounded-full ${getSubStoreStatusColor(sub)}`}
  ></span>
                <div>
                  <p className="font-semibold">{sub.name}</p>
                  <p className="text-gray-400 text-sm">
                    {sub.sensors
                      ? sub.sensors.filter((s: any) => s.status === "on").length
                      : 0}{" "}
                    Active Sensor
                    {sub.sensors &&
                      sub.sensors.filter((s: any) => s.status === "on").length > 1
                      ? "s"
                      : ""}
                  </p>

                </div>
              </div>
              <p
                className={`font-semibold ${sub.currentTemperature !== undefined
                  ? sub.currentTemperature < 32
                    ? "text-green-500"
                    : sub.currentTemperature >= 38
                      ? "text-yellow-500"
                      : "text-gray-200"
                  : "text-gray-200"
                  }`}
              >
                {sub.currentTemperature !== undefined
                  ? `${sub.currentTemperature}°F`
                  : "-"}
              </p>
            </div>

            {/* Collapsible Content */}
            {expandedSubStore === sub._id && (
              <div className="mt-4 space-y-4">

                {/* Sensors List */}
               {expandedSubStore === sub._id && (
  <div className="mt-4">
    <AdminSensorList sensors={sub.sensors} />
  </div>
)}


                {/* Alert Configuration */}
                <div className="mt-6 bg-gray-100 dark:bg-gray-900 rounded-xl p-4">

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">SubStore Level Notification</h3>
                    <div
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Toggle enabled={sub.notification_status === "on"} />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Level 1 */}
                    <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow-soft dark:shadow-none 
                     border border-red-300 dark:border-red-700
                     bg-gradient-to-b from-red-100 dark:from-red-900/40 to-white dark:to-gray-800">

                      <p className="text-red-400 font-semibold mb-2">
                        Level 1: Critical
                      </p>
                      <div className="text-sm text-gray-300 space-y-2">
                        <div className="bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 text-gray-700 dark:text-gray-300">

                          Quick Alert – 15 min
                        </div>
                        <div className="flex flex-col gap-2">
                          {sub.phoneNumbersLevel1.map((phone, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                              <FiPhone className="text-red-400 text-sm" />
                              <span>{phone}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          {sub.emailRecipientsLevel1.map((email, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                              <FiMail className="text-red-400 text-sm" />
                              <span>{email}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Level 2 */}
                    <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow-soft dark:shadow-none
                      border border-yellow-300 dark:border-yellow-600
                      bg-gradient-to-b from-yellow-100 dark:from-yellow-900/40 to-white dark:to-gray-800">

                      <p className="text-yellow-400 font-semibold mb-2">
                        Level 2: Warning
                      </p>
                      <div className="text-sm text-gray-300 space-y-2">
                        <div className="bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 text-gray-700 dark:text-gray-300">

                          Take Action – 20 min
                        </div>
                        <div className="flex flex-col gap-2">
                          {sub.phoneNumbersLevel2.map((phone, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                              <FiPhone className="text-red-400 text-sm" />
                              <span>{phone}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2">
                          {sub.emailRecipientsLevel2.map((email, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                              <FiMail className="text-red-400 text-sm" />
                              <span>{email}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>

                    {/* Level 3 */}
                    <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow-soft dark:shadow-none
                     border border-blue-300 dark:border-blue-600
                     bg-gradient-to-b from-blue-100 dark:from-blue-900/40 to-white dark:to-gray-800">

                      <p className="text-blue-400 font-semibold mb-2">
                        Level 3: Info
                      </p>
                      <div className="text-sm text-gray-300 space-y-2">
                        <div className="bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 text-gray-700 dark:text-gray-300">

                          Daily / Weekly Reports
                        </div>
                        <div className="flex flex-col gap-2">
                          {sub.phoneNumbersLevel3.map((phone, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                              <FiPhone className="text-red-400 text-sm" />
                              <span>{phone}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          {sub.emailRecipientsLevel1.map((email, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                              <FiMail className="text-red-400 text-sm" />
                              <span>{email}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>


                  </div>
                </div>

              </div>


            )}

          </div>


        ))}
      </div>
    </div>
  );
};

export default AdminSubStores;
