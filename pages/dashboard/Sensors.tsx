import React, { useEffect, useState } from 'react';
import { Thermometer, DoorOpen, Wifi, WifiOff } from 'lucide-react';
import Card from '../../components/ui/Card';
import { getMySensors } from '../../Api/Sensors/AddSensor'; 
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const Sensors: React.FC = () => {
  const [sensors, setSensors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const res = await getMySensors();
        if (res.statusCode === 200 && res.sensors) {
          setSensors(res.sensors);
        }
      } catch (err) {
        console.error("Error fetching sensors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSensors();
  }, []);

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Sensors</h1>
      </div>

      <Card className="overflow-hidden p-0 border-none shadow-soft dark:shadow-none" noPadding>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sensor Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Temp (°C)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                <th className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
              {/* Conditional rendering inside tbody */}
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex justify-center items-center py-20">
                      <ClipLoader color="#3b82f6" size={40} />
                    </div>
                  </td>
                </tr>
              ) : sensors.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <p className="text-center text-gray-800 dark:text-white py-20">No sensors found</p>
                  </td>
                </tr>
              ) : (
                sensors.map(sensor => (
                  <tr key={sensor._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {sensor.status === 'on' ? (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                          <Wifi className="h-4 w-4 mr-2" /> Active
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium">
                          <WifiOff className="h-4 w-4 mr-2" /> Inactive
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          {sensor.sensorName.toLowerCase().includes("temp") ? (
                            <Thermometer className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <DoorOpen className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{sensor.sensorName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">Device Name: {sensor.deviceName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">{sensor.storeId?.storeName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sensor.subStoreId?.name}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-900 dark:text-white">
                      {sensor.currentTempC?.toFixed(1) ?? '--'}°C
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sensor.createdAt).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/dashboard/sensors/sensor/${sensor._id}`} 
                        className="text-primary hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors"
                      >
                        History
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Sensors;
