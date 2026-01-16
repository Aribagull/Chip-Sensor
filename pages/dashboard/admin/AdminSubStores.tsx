// AdminSubStores.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { getAllUsers } from '../../../Api/admin/customers';
import { FiPhone, FiMail, } from "react-icons/fi";
import PulseLoader from "react-spinners/PulseLoader";
import AdminSensorList from "./AdminSensorList";
import { Store, MapPin, AlertTriangle, Mail, MessageCircle, Inbox, ChevronLeft } from 'lucide-react';
import PendingRequestCard from "./PendingRequestCard";




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
  const location = useLocation();
const fromPage = location.state?.from as
  | "customers"
  | "locations"
  | undefined;
  console.log("fromPage =", fromPage);
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<any[]>([]);


  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getAllUsers();
        const customers = data.customers || [];

        const allStores: Store[] = customers.flatMap((customer: any) =>
          (customer.stores || []).map((store: any) => ({
            ...store,
            ownerUserId: {
              _id: customer._id,
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
            },
            subStores: (store.subStores || []).map((sub: any) => ({
              ...sub,
              requests: (customer.requests || []).filter((r: any) => r.subStoreId === sub._id),
              alerts: (customer.alerts || []).filter((a: any) => a.subStoreId === sub._id),
            })),
          }))
        );


        const selectedStore = allStores.find((s) => s._id === storeId);

        setStore(selectedStore || null);
      } catch (error) {
        console.error("Error fetching stores from customers:", error);
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

  const getCurrentTemperature = (sub: SubStore) => {
    if (!sub.sensors || sub.sensors.length === 0) return undefined;
    return sub.sensors[0].currentTempF;
  };




  if (!store) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <PulseLoader
          color="#3b82f6"
          size={15}
        />
      </div>
    );
  }

  if (showPendingRequests) {
    return (
      <div className="p-6 space-y-4">
        <button
          onClick={() => setShowPendingRequests(false)}
          className="text-blue-500 hover:underline"
        >
          ← Back to SubStore
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pending Requests
        </h2>

        {selectedRequests.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No pending requests found.
          </p>
        ) : (
          selectedRequests.map((r) => (
            <PendingRequestCard key={r._id} request={r} />
          ))
        )}
      </div>
    );
  }




  return (

    <div className="space-y-6 py-6">
     {/* Back Button */}
<div className="mb-6">
  <button
    onClick={() => {
      if (fromPage === "customers") {
        navigate("/admin/customers");
      } else if (fromPage === "locations") {
        navigate("/admin/locations");
      } else {
        navigate(-1); // fallback
      }
    }}
    className="
      flex items-center gap-2
      px-4 py-2
      bg-white dark:bg-gray-800
      text-gray-700 dark:text-gray-200
      font-semibold
      rounded-lg
      shadow hover:shadow-md
      border border-gray-200 dark:border-gray-700
      transition-all duration-200
      hover:bg-gray-50 dark:hover:bg-gray-700
      active:scale-95
    "
  >
    <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-300" />
    {fromPage === "customers" && "Back to Customers"}
    {fromPage === "locations" && "Back to Locations"}
    {!fromPage && "Back"}
  </button>
</div>






      {/* Store Card */}
      <div className="dark:bg-gray-800 bg-white shadow-soft dark:shadow-none rounded-lg p-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold flex items-center gap-2"><Store />{store.storeName}</h1>
            {store.subStores.map((sub: any) => (
              <span
                key={sub._id}
                className="text-sm font-medium bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
              >
                Substore: {sub.name}
              </span>
            ))}
          </div>
          <p className="text-gray-400 flex items-center gap-1 mt-1">
            <MapPin className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            {store.address}
          </p>
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
            className="dark:bg-gray-800 bg-white shadow-soft dark:shadow-none rounded-lg p-8 shadow-soft dark:shadow-none transition-all duration-300 ring-2 ring-primary border-transparent shadow-lg "
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
                className={`font-semibold${getCurrentTemperature(sub) !== undefined
                  ? getCurrentTemperature(sub)! < 32
                    ? "text-green-500"
                    : getCurrentTemperature(sub)! >= 38
                      ? "text-yellow-500"
                      : "text-gray-200"
                  : "text-gray-200"
                  }`}
              >
                {getCurrentTemperature(sub) !== undefined
                  ? `${getCurrentTemperature(sub)?.toFixed(1)}°F`
                  : "-"}
              </p>

            </div>

            {/* Collapsible Content */}

            <div className="mt-4 space-y-4">



              {sub.requests && sub.requests.some((r: any) => r.status === "pending") ? (
                sub.requests
                  .filter((r: any) => r.status === "pending")
                  .map((r: any) => (
                    <div
                      key={r._id}
                      className="flex justify-between items-center bg-yellow-50 dark:bg-yellow-900/50 p-3 rounded-xl mb-2 text-sm hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-all cursor-pointer shadow-sm"
                      onClick={() => {
                        const pendingRequests = sub.requests
                          .filter((r: any) => r.status === "pending")
                          .map((r: any) => ({
                            ...r,

                            customer: {
                              _id: store.ownerUserId._id,
                              name: store.ownerUserId.name,
                              email: store.ownerUserId.email,
                              phone: store.ownerUserId.phone,
                            },
                            store: {
                              _id: store._id,
                              storeName: store.storeName,
                            },

                            subStore: {
                              _id: sub._id,
                              name: sub.name,
                            },
                          }));

                        setSelectedRequests(pendingRequests);
                        setShowPendingRequests(true);
                      }}


                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-yellow-600 dark:text-yellow-300">Note: {r.description}</p>
                        <p className="text-yellow-500 dark:text-yellow-200 text-sm">Status: {r.status}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Sensors Request: {r.sensors ? r.sensors.length : 0}
                        </p>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="flex items-center justify-end bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-gray-500 dark:text-gray-400 text-sm font-medium gap-2 shadow-sm">
                  <Inbox className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  No pending requests
                </div>
              )}

              {/* Sensors List */}

              <div className="mt-4">
                <AdminSensorList sensors={sub.sensors} />
              </div>


              <div className="flex flex-col">



                {/* Alerts Summary */}
                <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md dark:shadow-none">
                  {/* Title */}
                  <h1 className="text-2xl font-bold mb-5 text-gray-700 dark:text-gray-200 flex items-center gap-3">
                    <AlertTriangle className="w-7 h-7 text-red-500" /> Alerts Summary
                  </h1>

                  {/* Alerts Boxes */}
                  <div className="grid grid-cols-3 gap-5">
                    {/* Total Alerts */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
                      <MessageCircle className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm">Total Alerts</p>
                        <p className="text-2xl font-bold">{sub.totalAlerts}</p>
                      </div>
                    </div>

                    {/* SMS Alerts */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/50 dark:to-yellow-800 p-4 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
                      <MessageCircle className="w-6 h-6 text-yellow-800 dark:text-yellow-300" />
                      <div>
                        <p className="text-yellow-800 dark:text-yellow-300 font-semibold text-sm">SMS Alerts</p>
                        <p className="text-2xl font-bold">{sub.alertsByChannel.sms}</p>
                      </div>
                    </div>

                    {/* Email Alerts */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800 p-4 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
                      <Mail className="w-6 h-6 text-blue-800 dark:text-blue-300" />
                      <div>
                        <p className="text-blue-800 dark:text-blue-300 font-semibold text-sm">Email Alerts</p>
                        <p className="text-2xl font-bold">{sub.alertsByChannel.email}</p>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Alert Configuration */}
                <div className="mt-6 bg-gray-100 dark:bg-gray-900 rounded-xl p-6 py-8">

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
            </div>
          </div>


        ))}
      </div>
    </div>
  );
};

export default AdminSubStores;
