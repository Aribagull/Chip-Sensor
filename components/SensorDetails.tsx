import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Thermometer, MapPin, ArrowLeft, Edit2, X } from "lucide-react"; // X icon added
import TemperatureChart from "../components/dashboard/TemperatureChart";
import { getSensorById, updateSensorById } from "../Api/Sensors/AddSensor";
import { FiActivity, FiAlertCircle, FiThermometer } from "react-icons/fi";

const SensorDetails: React.FC = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const [sensor, setSensor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Local state for editable fields
  const [minTempF, setMinTempF] = useState<number>(0);
  const [maxTempF, setMaxTempF] = useState<number>(0);
  const [notificationOn, setNotificationOn] = useState<boolean>(false);
  const [deviceIp, setDeviceIp] = useState<string>("");


useEffect(() => {
  if (sensorId) {
    getSensorById(sensorId)
      .then((res) => {
        if (res.success && res.sensor) {
          setSensor(res.sensor);
          setMinTempF(res.sensor.minTempF || 0);
          setMaxTempF(res.sensor.maxTempF || 0);
          setNotificationOn(res.sensor.notificationStatus === "on");
          setDeviceIp(res.sensor.deviceIp || "");
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }
}, [sensorId]);


  const avgTemp =
    sensor?.temperatureRecords.reduce((sum: number, r: any) => sum + r.temperatureC, 0) /
      (sensor?.temperatureRecords.length || 1) || 0;

 const handleUpdate = async () => {
  if (!sensorId || !sensor) return;

  try {
    const res = await updateSensorById(sensorId, { 
      sensorName: sensor.sensorName,
      deviceName: sensor.deviceName,
      minTempF,
      maxTempF,
      notificationOn
    }, sensor); 

    if (res.success) {
      setSensor(res.sensor); 
      setEditModalOpen(false);
    } else {
      alert(res.message);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to update sensor");
  }
};



  if (loading)
    return <p className="text-center mt-10 text-gray-800 dark:text-white">Loading sensor details...</p>;
  if (!sensor)
    return <p className="text-center mt-10 text-gray-800 dark:text-white">Sensor not found</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white">
      {/* Back Link */}
      <Link
        to={isAdmin ? "/admin/locations/" : "/dashboard/locations"}
        className="flex items-center w-48 border rounded-lg p-2 border-gray-500 hover:text-primary dark:hover:text-primary transition-colors mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to My Stores
      </Link>

      {/* Sensor Info */}
      <div className="mb-10">
        <h1 className="flex items-center text-2xl lg:text-3xl text-gray-500 dark:text-gray-400 gap-2">
          <Thermometer className="h-4 w-4" />
          {sensor.sensorName || "Substore Name"}
        </h1>
        <div className="flex items-center gap-1.5 mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          {sensor.storeId?.address || "Address not available"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE – Sensor Details */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg space-y-6">
          {/* Status Row with Edit Icon */}
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Thermometer className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {sensor.sensorName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Device Name: {sensor.deviceName || "sensor-3"}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              {sensor.status || "Active"}
            </span>

            {/* Edit Icon */}
          {!isAdmin && (
  <div 
    className="absolute right-0 top-[90px] border p-2 rounded hover:border-blue-500 border-gray-300 dark:border-gray-600 flex items-center gap-1 cursor-pointer text-gray-600 hover:text-blue-500"
    onClick={() => setEditModalOpen(true)}
  >
    <Edit2 className="w-5 h-5" />
    <span className="text-sm font-medium">Edit Temp</span>
  </div>
)}



          </div>

          {/* Current Temp */}
          <div>
            <p className="text-gray-500 dark:text-gray-400">Current Temperature</p>
            <p className="text-5xl font-bold mt-2">
              {sensor.currentTempF?.toFixed(1) || avgTemp.toFixed(1)}°F
            </p>
          </div>

          {/* Min / Max / Avg */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-4 text-center border-2 border-blue-300">
              <p className="text-sm text-gray-500 dark:text-gray-400">Min</p>
              <p className="text-xl font-semibold mt-1">{sensor.minTempF?.toFixed(1) ?? "--"}°F</p>
            </div>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-4 text-center border-2 border-blue-300">
              <p className="text-sm text-gray-500 dark:text-gray-400">Max</p>
              <p className="text-xl font-semibold mt-1">{sensor.maxTempF?.toFixed(1) ?? "--"}°F</p>
            </div>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-4 text-center border-2 border-blue-300">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg</p>
              <p className="text-xl font-semibold mt-1">{sensor.avgTempF?.toFixed(1) ?? "--"}°F</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Notification Alerts</span>
  
  {/* View-only toggle */}
  <div
    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
      sensor.notificationStatus === "on" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
        sensor.notificationStatus === "on" ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </div>
</div>
        </div>

        {/* RIGHT SIDE – Temperature Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Temperature Records</h3>
          <TemperatureChart
            data={sensor.temperatureRecords.map((r: any) => r.temperatureC)}
            labels={sensor.temperatureRecords.map((r: any) =>
              new Date(r.recordedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            )}
            minTemp={sensor.minTempC}
            maxTemp={sensor.maxTempC}
          />
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

  {/* Smart Insights */}
  <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg space-y-4">
    <div className="flex items-center gap-2 mb-3">
      <FiActivity className="text-xl text-blue-600 dark:text-blue-400" />
      <h3 className="text-lg font-semibold">Smart Insights</h3>
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
        <span className="text-red-600">❗</span>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          1 sensor exceeded maximum temperature threshold.
        </p>
      </div>
      <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
        <span className="text-yellow-600">⚠️</span>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          1 sensor is currently offline.
        </p>
      </div>
    </div>
  </div>

  {/* Recent Alerts */}
  <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
    <div className="flex items-center gap-2 mb-3">
      <FiAlertCircle className="text-xl text-red-600 dark:text-red-400" />
      <h3 className="text-lg font-semibold">Recent Alerts</h3>
    </div>
    <div className="flex items-center justify-between bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Lab Refrigerator</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">22.1°C • High temp</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500">Dec 31, 16:07</span>
    </div>
  </div>

  {/* Temperature Summary */}
  <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-3">Temperature Summary (Last 7 Days)</h3>
  
  <div className="lg:col-span-1 grid grid-cols-3 gap-4">
    
    {/* Lowest */}
    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl text-center">
      <FiThermometer className="mx-auto text-blue-600 dark:text-blue-400 text-2xl mb-1" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Lowest Recorded</p>
      <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-1">17.4°C</p>
    </div>


    {/* Average */}
    <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl text-center">
      <FiThermometer className="mx-auto text-gray-600 dark:text-gray-300 text-2xl mb-1" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Average Temperature</p>
      <p className="text-xl font-semibold mt-1">21.8°C</p>
    </div>

    {/* Highest */}
    <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-xl text-center">
      <FiThermometer className="mx-auto text-orange-600 dark:text-orange-400 text-2xl mb-1" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Highest Recorded</p>
      <p className="text-xl font-semibold text-orange-600 dark:text-orange-400 mt-1">27.0°C</p>
    </div>
  </div>
</div>
</div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-96 space-y-4 relative">
            {/* Close Button */}
            <X
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500"
              onClick={() => setEditModalOpen(false)}
            />

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Edit Sensor</h3>

            {/* Min Temp */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 dark:text-gray-300">Min Temperature (°F)</label>
              <input
                type="number"
                value={minTempF}
                onChange={(e) => setMinTempF(Number(e.target.value))}
                className="mt-1 p-2 rounded border dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Max Temp */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 dark:text-gray-300">Max Temperature (°F)</label>
              <input
                type="number"
                value={maxTempF}
                onChange={(e) => setMaxTempF(Number(e.target.value))}
                className="mt-1 p-2 rounded border dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Notification Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Notification Alerts</span>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  notificationOn ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setNotificationOn(!notificationOn)}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                    notificationOn ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-3 py-1 bg-transparent border border-white rounded text-gray-800 dark:text-white"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorDetails;
