import React, { useEffect, useState } from "react";
import { Plus, Thermometer, DoorOpen, Wifi, WifiOff, Store, Layers, User, Mail, Briefcase } from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { getAllAdminSensors, addAdminSensor, getDevices } from "../../../Api/Sensors/AddSensor";
import { getAllUsers } from "../../../Api/admin/customers";
import { getAllStores } from "../../../Api/Stores/store";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from 'react-router-dom';



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
  const [minTempF, setMinTempF] = useState<string>("");
  const [maxTempF, setMaxTempF] = useState<string>("");
  const [avgTempF, setAvgTempF] = useState<number | "">("");


  const [notificationStatus, setNotificationStatus] = useState(true);

  const [storesData, setStoresData] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredStores, setFilteredStores] = useState<any[]>([]);
  const [subStores, setSubStores] = useState<any[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSubStore, setSelectedSubStore] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sensorsPerPage] = useState(10);
  const [totalSensors, setTotalSensors] = useState(0);
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [deviceSensors, setDeviceSensors] = useState<any[]>([]);
  const [selectedSensor, setSelectedSensor] = useState("");


  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices", error);
      }
    };
    fetchDevices();
  }, []);

  // Customers fetch
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllUsers(1, 100);
        setCustomers(data.customers || []);
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    };
    fetchCustomers();
  }, []);


  // Stores fetch
  useEffect(() => {
    const fetchAllStores = async () => {
      try {
        const res = await getAllStores();
        setStoresData(res.stores || []);
      } catch (error) {
        console.error("Error fetching stores", error);
      }
    };
    fetchAllStores();
  }, []);

  // Filter stores by selectedCustomer
  useEffect(() => {
    if (!selectedCustomer) return setFilteredStores([]);

    const filtered = storesData.filter(store => store.ownerId === selectedCustomer);

    setFilteredStores(filtered);
  }, [selectedCustomer, storesData]);



  // ------------------- Filter Stores by Customer -------------------
  useEffect(() => {
    const customer = customers.find(c => c._id === selectedCustomer);

    if (customer) {
      setFilteredStores(customer.stores || []);
    } else {
      setFilteredStores([]);
    }

    setSelectedStore("");
    setSubStores([]);
    setSelectedSubStore("");
  }, [selectedCustomer, customers]);




  // ------------------- Set SubStores on Store select -------------------
  useEffect(() => {
    const store = filteredStores.find(s => s._id === selectedStore);

    if (store) {
      setSubStores(store.subStores || []);
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
        const res = await getAllAdminSensors({ page: 1, limit: 1000 });
        setSensors(res.sensors);
        setTotalSensors(res.sensors.length);
      } catch (error) {
        console.error("Error fetching admin sensors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSensors();
  }, []);

  useEffect(() => {
    if (avgTempF === "" && minTempF !== "" && maxTempF !== "") {
      setAvgTempF((Number(minTempF) + Number(maxTempF)) / 2);
    }
  }, [minTempF, maxTempF]);



  const indexOfLast = currentPage * sensorsPerPage;
  const indexOfFirst = indexOfLast - sensorsPerPage;
  const currentSensors = sensors.slice(indexOfFirst, indexOfLast);


  const handleAddSensor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomer || !selectedStore) {
      alert("Please select a customer and store");
      return;
    }

    const payload = {
      storeId: selectedStore,
      subStoreId: selectedSubStore || undefined,
      deviceId: selectedDevice,
      sensorSlug: selectedSensor,
      minTempF: Number(minTempF),
      maxTempF: maxTempF ? Number(maxTempF) : undefined,
      avgTempHours: avgTempF ? Number(avgTempF) : undefined,
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
      setMinTempF("");
      setMaxTempF("");
      setAvgTempF("");
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
                    <div className="flex justify-center items-center py-10">
                      <PulseLoader color="#3b82f6" size={15} />
                    </div>
                  </td>
                </tr>
              ) : currentSensors.length ? (
                currentSensors.map(sensor => (
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
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {/* Store */}
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Store className="h-3 w-3 text-yellow-500" />
                        </div>
                        <span>{sensor.storeId?.storeName || "N/A"}</span>
                      </div>

                      {/* Substore */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Layers className="h-3 w-3 text-blue-500" />
                        </div>
                        <span>{sensor.subStoreId?.name || "N/A"}</span>
                      </div>
                    </td>


                    {/* User Info */}
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {/* Organization */}
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Briefcase className="h-3 w-3 text-white" />
                        </div>
                        <span>{sensor.ownerUserId?.organizationName || "N/A"}</span>
                      </div>

                      {/* User Name */}
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span>{sensor.ownerUserId?.name || "N/A"}</span>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Mail className="h-3 w-3 text-white" />
                        </div>
                        <span>{sensor.ownerUserId?.email || "N/A"}</span>
                      </div>
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
                    <td className="px-6 py-4 text-sm text-right">
                      <Link
                        to={`/admin/sensors/sensor/${sensor._id}`}
                        state={{ sensorName: sensor.sensorName }}
                        className="text-primary hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors border border-blue-500 p-2 rounded-lg"
                      >
                        View History
                      </Link>
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-b-xl">
            <span className="text-sm text-gray-500">
              Page {currentPage} of {Math.ceil(sensors.length / sensorsPerPage)}
            </span>

            <div className="flex gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>

              <Button
                disabled={currentPage === Math.ceil(sensors.length / sensorsPerPage)}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>



        </div>
      </Card>

      {/* Assign Sensor Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        size="lg"
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign New Sensor"
      >
        <form className="space-y-4" onSubmit={handleAddSensor}>

          <div className="flex gap-4">
            {/* Device Dropdown */}
            <Select
              label="Device"
              value={selectedDevice}
              onChange={(e) => {
                setSelectedDevice(e.target.value);
                const device = devices.find(d => d._id === e.target.value);
                setDeviceSensors(device?.sensors || []);
                setSelectedSensor("");
              }}
              options={devices.map(d => ({ value: d._id, label: d.deviceId }))}
              required
              className="text-black dark:text-white"
            />


            <Select
              label="Sensor"
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
              options={deviceSensors.map(s => ({ value: s.slug, label: s.name }))}
              disabled={!selectedDevice}
              required
              className="text-black dark:text-white"
            />
          </div>



          <div className="flex gap-4">
            <Input
              label="Min Temp (°F)"
              type="number"
              value={minTempF}
              onChange={e => setMinTempF(e.target.value)}
            />
            <Input
              label="Max Temp (°F)"
              type="number"
              value={maxTempF}
              onChange={e => setMaxTempF(e.target.value)}
            />
            <Input
              label="Avg Temp (°F)"
              type="number"
              value={avgTempF}
              onChange={e => setAvgTempF(Number(e.target.value))}
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
          <div className="flex items-center gap-2">
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
            <Button type="button" variant="secondary" onClick={() => setIsAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Assign Sensor</Button>
          </div>
        </form>
      </Modal>



    </div>
  );
};

export default AdminSensors;
