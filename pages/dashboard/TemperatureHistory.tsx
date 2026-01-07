import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TemperatureChart from '@/components/dashboard/TemperatureChart';
import { getMyStores } from '../../Api/Stores/store';
import { Thermometer, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import ClipLoader from "react-spinners/ClipLoader";

const TemperatureHistory: React.FC = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedSubStore, setSelectedSubStore] = useState<any>(null);
  const [selectedSensor, setSelectedSensor] = useState<any>(null);
  const [dateRange, setDateRange] = useState<string>('Last 24 Hours');

  // Fetch stores on component mount
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await getMyStores(1); // page = 1
        if (res.success && res.stores) {
          setStores(res.stores);
          setSelectedStore(res.stores[0]); // default first store
          setSelectedSubStore(res.stores[0].subStores?.[0] || null); // default first substore
          setSelectedSensor(res.stores[0].subStores?.[0]?.sensors?.[0] || null); // default first sensor
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);



  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Temperature History</h1>

      {/* Filters */}
      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Store Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Location</label>
            <select
              className="block w-full border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm outline-none"
              value={selectedStore?._id || ''}
              onChange={(e) => {
                const store = stores.find(s => s._id === e.target.value);
                setSelectedStore(store);
                setSelectedSubStore(store?.subStores?.[0] || null);
                setSelectedSensor(store?.subStores?.[0]?.sensors?.[0] || null);
              }}
            >
              {stores.map(store => (
                <option key={store._id} value={store._id}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>

          {/* Substore Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Sub-Store</label>
            <select
              className="block w-full border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm outline-none"
              value={selectedSubStore?._id || ''}
              onChange={(e) => {
                const substore = selectedStore?.subStores?.find(ss => ss._id === e.target.value);
                setSelectedSubStore(substore);
                setSelectedSensor(substore?.sensors?.[0] || null); // first sensor default
              }}
              disabled={!selectedStore} // disabled until store selected
            >
              {selectedStore?.subStores?.map(ss => (
                <option key={ss._id} value={ss._id}>{ss.name}</option>
              ))}
            </select>
          </div>

          {/* Sensor Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Sensor</label>
            <select
              className="block w-full border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm outline-none"
              value={selectedSensor?._id || ''}
              onChange={(e) => {
                const sensor = selectedSubStore?.sensors?.find(s => s._id === e.target.value);
                setSelectedSensor(sensor);
              }}
              disabled={!selectedSubStore} // disabled until substore selected
            >
              {selectedSubStore?.sensors?.map(sensor => (
                <option key={sensor._id} value={sensor._id}>{sensor.sensorName}</option>
              ))}
            </select>
          </div>

          {/* Date Range Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Date Range</label>
            <select
              className="block w-full border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm outline-none"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              disabled={!selectedSensor} // disabled until sensor selected
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <Button>Update View</Button>
        </div>
      </Card>

      {/* Temperature Chart */}
      <Card title="Temperature Trend" className="h-96">
        <div className="h-full flex justify-center items-center">
          {loading ? (
            <ClipLoader color="#3b82f6" size={50} />
          ) : selectedSensor && selectedSensor.temperatureRecords?.length ? (
            <TemperatureChart
              data={selectedSensor.temperatureRecords
                .map((r: any) => r.temperatureC)
                .filter(t => t !== null && t !== undefined)}
              labels={selectedSensor.temperatureRecords
                .filter((r: any) => r.temperatureC !== null && r.temperatureC !== undefined)
                .map((r: any) => {
                  const d = new Date(r.recordedAt);
                  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
                })}
              minTemp={Math.min(
                ...selectedSensor.temperatureRecords
                  .map((r: any) => r.temperatureC)
                  .filter(t => t !== null && t !== undefined),
                0
              )}
              maxTemp={Math.max(
                ...selectedSensor.temperatureRecords
                  .map((r: any) => r.temperatureC)
                  .filter(t => t !== null && t !== undefined),
                100
              )}
            />

          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No temperature records found</p>
          )}
        </div>
      </Card>


      {/* Sensor Daily Temperature Table */}
      {selectedSensor && selectedSensor.temperatureRecords?.length ? (
        <Card title={`Daily Temperature Records for ${selectedSensor.sensorName}`} noPadding>
          <div className="overflow-x-auto rounded-b-2xl">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 text-sm">
              <thead className="bg-gray-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">Date</th>

                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-blue-600 dark:text-blue-400">
                    <span className="inline-flex items-center gap-1"><ArrowDown size={16} /> Min Temp (°C)</span>
                  </th>

                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-red-600 dark:text-red-400">
                    <span className="inline-flex items-center gap-1"><ArrowUp size={16} /> Max Temp (°C)</span>
                  </th>

                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-yellow-600 dark:text-yellow-400">
                    <span className="inline-flex items-center gap-1"><Activity size={16} /> Avg Temp (°C)</span>
                  </th>

                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-green-600 dark:text-green-400">
                    <span className="inline-flex items-center gap-1"><Thermometer size={16} /> Current Temp (°C)</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
                {(() => {
                  // Group records by date
                  const grouped: Record<string, any[]> = {};
                  selectedSensor.temperatureRecords.forEach((r: any) => {
                    const d = new Date(r.recordedAt);
                    const dateKey = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
                    if (!grouped[dateKey]) grouped[dateKey] = [];
                    grouped[dateKey].push(r.temperatureC);
                  });

                  // Create table rows per day
                  return Object.keys(grouped).map(date => {
                    const temps = grouped[date];
                    const validTemps = temps.filter(t => t != null);
                    if (validTemps.length === 0) return null;

                    const minTemp = Math.min(...validTemps);
                    const maxTemp = Math.max(...validTemps);
                    const avgTemp = (validTemps.reduce((a, b) => a + b, 0) / validTemps.length).toFixed(1);
                    const currentTemp = validTemps[validTemps.length - 1].toFixed(1);


                    return (
                      <tr key={date} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-200 whitespace-nowrap">{date}</td>

                        <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1"><ArrowDown size={16} /> {minTemp.toFixed(1)}</span>
                        </td>

                        <td className="px-6 py-4 font-mono text-red-600 dark:text-red-400 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1"><ArrowUp size={16} /> {maxTemp.toFixed(1)}</span>
                        </td>

                        <td className="px-6 py-4 font-mono text-yellow-600 dark:text-yellow-400 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1"><Activity size={16} /> {avgTemp}</span>
                        </td>

                        <td className="px-6 py-4 font-mono text-green-600 dark:text-green-400 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1"><Thermometer size={16} /> {currentTemp}</span>
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No temperature records found</p>
      )}

    </div>
  );
};

export default TemperatureHistory;
