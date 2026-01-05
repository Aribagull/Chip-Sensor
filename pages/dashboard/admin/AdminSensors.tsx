import React, { useEffect, useState } from "react";
import { Plus, Thermometer, DoorOpen, Wifi, WifiOff } from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { getAllAdminSensors, addAdminSensor } from "../../../Api/Sensors/AddSensor";
import { getAllUsers } from "../../../Api/admin/customers";
import { getAllStores } from "../../../Api/Stores/store";
import ClipLoader from "react-spinners/ClipLoader";



const AdminSensors: React.FC = () => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [sensors, setSensors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Assign modal states
  const [assignCustomer, setAssignCustomer] = useState("");
  const [assignLocation, setAssignLocation] = useState("");


  // Sensor form states
  const [serialNumber, setSerialNumber] = useState("");
  const [sensorType, setSensorType] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [sensorIndex, setSensorIndex] = useState(0);
  const [minTempF, setMinTempF] = useState(0);
  const [maxTempF, setMaxTempF] = useState(0);
  const [notificationStatus, setNotificationStatus] = useState(true);

  const [storesData, setStoresData] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredStores, setFilteredStores] = useState<any[]>([]);
  const [subStores, setSubStores] = useState<any[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSubStore, setSelectedSubStore] = useState("");

// Customers fetch
useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const data = await getAllUsers(1, 100);
      const onlyCustomers = data.users.filter(u => u.role === "customer");
      setCustomers(onlyCustomers);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };
  fetchCustomers();
}, []);


 useEffect(() => {
  const fetchAllStores = async () => {
    try {
      const stores = await getAllStores(); 
      setStoresData(stores || []);
    } catch (error) {
      console.error("Error fetching stores", error);
    }
  };
  fetchAllStores();
}, []);

// ------------------- Filter Stores by Customer -------------------
useEffect(() => {
  if (!selectedCustomer) {
    setFilteredStores([]);
    setSelectedStore("");
    setSubStores([]);
    setSelectedSubStore("");
    return;
  }

  const filtered = storesData.filter(
    store => store.ownerUserId?._id === selectedCustomer
  );

  setFilteredStores(filtered);
  setSelectedStore("");
  setSubStores([]);
  setSelectedSubStore("");
}, [selectedCustomer, storesData]);


// ------------------- Set SubStores on Store select -------------------
useEffect(() => {
  if (!selectedStore) {
    setSubStores([]);
    setSelectedSubStore("");
    return;
  }

  const store = filteredStores.find(s => s._id === selectedStore);
  if (store?.subStores) {
    setSubStores(store.subStores);
  } else {
    setSubStores([]);
  }
  setSelectedSubStore("");
}, [selectedStore, filteredStores]);

  // ------------------- Fetch Sensors -------------------
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setLoading(true);
        const res = await getAllAdminSensors({ page: 1, limit: 50 });
        setSensors(res.sensors);
      } catch (error) {
        console.error("Error fetching admin sensors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSensors();
  }, []);

  const handleAddSensor = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedCustomer || !selectedStore) {
    alert("Please select a customer and store");
    return;
  }

  const payload = {
    storeId: selectedStore,
    subStoreId: selectedSubStore || undefined,
    deviceIp: serialNumber,
    deviceName,
    sensorIndex: Number(sensorIndex),
    sensorName: sensorType,
    minTempF: Number(minTempF),
    maxTempF: maxTempF ? Number(maxTempF) : undefined,
    notificationStatus: notificationStatus ? "on" : "off",
  };

  try {
    const res = await addAdminSensor(payload);

    if (res?.sensor) {
      setSensors(prev => [...prev, res.sensor]); 
    } else {
      console.error("No sensor returned in response", res);
    }

    // Reset form
    setIsAssignModalOpen(false);
    setSerialNumber("");
    setSensorType("");
    setDeviceName("");
    setSensorIndex(0);
    setMinTempF(0);
    setMaxTempF(0);
    setNotificationStatus(true);
    setSelectedCustomer("");
    setSelectedStore("");
    setSelectedSubStore("");
  } catch (error: any) {
    console.error("Error adding sensor:", error);
    alert(error?.response?.data?.message || "Failed to add sensor");
  }
};




  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Sensors
        </h1>
        <Button onClick={() => setIsAssignModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" /> Assign Sensor
        </Button>
      </div>

      {/* Sensors Table */}
      <Card className="p-0 overflow-hidden border-none shadow-soft" noPadding>
        <div className="overflow-x-auto">
         
           <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
  <thead className="bg-gray-50 dark:bg-slate-800/50">
    <tr>
      <th className="px-6 py-4 text-left text-xs font-bold uppercase">Status</th>
      <th className="px-6 py-4 text-left text-xs font-bold uppercase">Sensor</th>
      <th className="px-6 py-4 text-left text-xs font-bold uppercase">Location</th> 
      <th className="px-6 py-4 text-left text-xs font-bold uppercase">User Info</th> 
      <th className="px-6 py-4 text-left text-xs font-bold uppercase">Reading</th>
      <th className="px-6 py-4 text-right text-xs font-bold uppercase">Action</th>
    </tr>
  </thead>

  <tbody className="bg-white dark:bg-slate-800 divide-y">
    {loading ? (
      <tr>
        <td colSpan={6} className="py-10 text-center">
          <ClipLoader color="#3b82f6" size={50} />
        </td>
      </tr>
    ) : sensors.length ? (
      sensors.map(sensor => (
        <tr key={sensor._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
          {/* Status */}
          <td className="px-6 py-4">
            {sensor.status === "on" ? (
              <div className="flex items-center text-green-600 text-sm font-bold">
                <Wifi className="h-4 w-4 mr-2" /> Online
              </div>
            ) : (
              <div className="flex items-center text-red-600 text-sm font-bold">
                <WifiOff className="h-4 w-4 mr-2" /> Offline
              </div>
            )}
          </td>

          {/* Sensor Info */}
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
                {sensor.sensorIndex === 0 ? (
                  <Thermometer className="h-4 w-4" />
                ) : (
                  <DoorOpen className="h-4 w-4" />
                )}
              </div>
              <div>
                <div className="text-sm font-bold">{sensor.sensorName || "N/A"}</div>
                <div className="text-xs text-gray-500">Device Name: {sensor.deviceName || "N/A"}</div>
                <div className="text-xs text-gray-400">Sensors: {sensor.sensorIndex ?? "N/A"}</div>
              </div>
            </div>
          </td>

          {/* Location */}
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
            {sensor.storeId?.storeName || "N/A"} → {sensor.subStoreId?.name || "N/A"}
          </td>

          {/* User Info */}
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
            <div>Organization: {sensor.ownerUserId?.organizationName || "N/A"}</div>
            <div>{sensor.ownerUserId?.name || "N/A"} ({sensor.ownerUserId?.email || "N/A"})</div>
          </td>

          {/* Reading */}
          <td className="px-6 py-4">
            <span className="text-sm font-mono font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {sensor.currentTempC ?? "N/A"}°C / {sensor.currentTempF ?? "N/A"}°F
            </span>
            <div className="text-xs text-gray-400 mt-1">
              Min: {sensor.minTempF ?? "N/A"}°F | Max: {sensor.maxTempF ?? "N/A"}°F
            </div>
            {sensor.temperatureRecords?.length ? (
              <div className="text-xs mt-1 text-gray-500">
                Last readings:{" "}
                {sensor.temperatureRecords
                  .slice(-3)
                  .map(r => `${r.temperatureF ?? "N/A"}°F`)
                  .join(", ")}
              </div>
            ) : null}
          </td>

          {/* Action */}
          <td className="px-6 py-4 text-right">
            <Button size="sm" variant="outline">View History</Button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={6} className="text-center py-6 text-gray-400">
          No sensors found
        </td>
      </tr>
    )}
  </tbody>
</table>

          
        </div>
      </Card>

      {/* Assign Sensor Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        size="xl"
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign New Sensor"
      >
        <form className="space-y-4" onSubmit={handleAddSensor}>
          {/* Device IP & Device Name in one line */}
          <div className="flex gap-4">
            <Input
              label="Serial Number / Device IP"
              value={serialNumber}
              onChange={e => setSerialNumber(e.target.value)}
              required
            />
            <Input
              label="Device Name"
              value={deviceName}
              onChange={e => setDeviceName(e.target.value)}
              required
            />
          </div>

         <Input
  label="Sensor Name"
  value={sensorType}
  onChange={e => setSensorType(e.target.value)}
  placeholder="e.g. Main Storage Temp"
  required
/>

          <Input
            label="Sensor Index"
            type="number"
            value={sensorIndex}
            onChange={e => setSensorIndex(Number(e.target.value))}
            required
          />

          {/* Min & Max Temp in one line */}
          <div className="flex gap-4">
            <Input
              label="Min Temp (°F)"
              type="number"
              value={minTempF}
              onChange={e => setMinTempF(Number(e.target.value))}
              required
            />
            <Input
              label="Max Temp (°F)"
              type="number"
              value={maxTempF}
              onChange={e => setMaxTempF(Number(e.target.value))}
            />
          </div>



          {/* Customer, Store & SubStore in one line */}
          <div className="flex gap-4">
          <Select
  label="Customer"
  value={selectedCustomer}
  onChange={e => setSelectedCustomer(e.target.value)}
  options={customers.map(c => ({ value: c._id, label: c.name }))}
/>

<Select
  label="Store"
  value={selectedStore}
  onChange={e => setSelectedStore(e.target.value)}
  options={filteredStores.map(s => ({ value: s._id, label: s.storeName }))}
  disabled={!selectedCustomer || filteredStores.length === 0}
/>

<Select
  label="SubStore"
  value={selectedSubStore}
  onChange={e => setSelectedSubStore(e.target.value)}
  options={subStores.map(ss => ({ value: ss._id, label: ss.name }))}
  disabled={!selectedStore}
/>

          </div>


          {/* Notification Toggle */}
          <div className="flex  items-center gap-2">
            <button
              type="button"
              onClick={() => setNotificationStatus(prev => !prev)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${notificationStatus ? "bg-green-500" : "bg-gray-400"
                }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${notificationStatus ? "translate-x-6" : "translate-x-0"
                  }`}
              />
            </button>
            <span>Enable Notification</span>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
            <Button type="submit">Assign Sensor</Button>
          </div>
        </form>
      </Modal>


    </div>
  );
};

export default AdminSensors;
