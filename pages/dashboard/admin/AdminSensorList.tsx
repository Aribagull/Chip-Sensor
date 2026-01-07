import React, { useState } from "react";
import { Thermometer, DoorOpen, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TemperatureChart from "@/components/dashboard/TemperatureChart";

interface SensorListProps {
  sensors: any[];
  showChart?: boolean;   
}

const AdminSensorList: React.FC<SensorListProps> = ({ sensors }) => {
  const navigate = useNavigate();
  const [selectedSensor, setSelectedSensor] = useState(sensors[0] || null);

  if (!sensors || sensors.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-400">
        ℹ️ No sensors available for this sub-store.
      </div>
    );
  }

  const validRecords = selectedSensor.temperatureRecords.filter(
  (r) => r.temperatureC !== null && r.temperatureC !== undefined
);
const chartData = validRecords.map(r =>
  Number(r.temperatureC.toFixed(2))
);

const minTemp =
  Math.floor(Math.min(...chartData)) - 1;

const maxTemp =
  Math.ceil(Math.max(...chartData)) + 1;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT: Sensor List */}
      <div className="space-y-3">
        {sensors.map((sensor) => (
          <div
  key={sensor._id}
  onClick={(e) => {
    e.stopPropagation();  
    setSelectedSensor(sensor);
  }}
  className="bg-white dark:bg-slate-800 p-3 rounded-xl border flex items-center justify-between cursor-pointer hover:shadow"
>

            <div className="flex items-center">
              <div
                className={`p-2 rounded-lg mr-3 ${
                  sensor.type === "temp"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                {sensor.type === "temp" ? (
                  <Thermometer className="h-4 w-4" />
                ) : (
                  <DoorOpen className="h-4 w-4" />
                )}
              </div>

              <div>
                <p className="text-sm font-bold">{sensor.sensorName}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      sensor.status === "on"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <span>
                    {sensor.status === "on" ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            <span className="font-mono font-bold">
              {sensor.currentTempC?.toFixed(1)}°C
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT: Selected Sensor Info */}
      {selectedSensor && (
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-xl border">
          <div className="flex justify-end mb-3">
            <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(
      `/admin/sensors/sensor/${selectedSensor._id}`,
      {
        state: {
          pageTitle: selectedSensor.sensorName,
        },
      }
    );
  }}
  className="flex items-center gap-1 text-sm border px-2 py-1 rounded"
>
  <Eye className="h-4 w-4" />
  View Details
</button>

          </div>

<div className="flex justify-between">
<h4 className="font-bold mb-2">
            {selectedSensor.sensorName} - 24h Temperature Data
          </h4>
          <div className="flex gap-2">
      <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs rounded font-bold">
        Last 24h
      </span>
    </div>
</div>
          

         <div className="h-56">
  {validRecords.length > 0 ? (
    <TemperatureChart
  data={chartData}
  labels={validRecords.map(r =>
    new Date(r.recordedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  )}
  minTemp={minTemp}
  maxTemp={maxTemp}
/>

  ) : (
    <p className="text-sm text-gray-400 text-center">
      No valid temperature data available
    </p>
  )}
</div>

        </div>
      )}
    </div>
  );
};

export default AdminSensorList;
