import React from 'react';
import { Thermometer, DoorOpen, Wifi, WifiOff } from 'lucide-react';
import Card from '../../components/ui/Card';
import { mockLocations } from '../../utils/mockData';

const Sensors: React.FC = () => {
  // Flattening data for table view
  const allSensors = mockLocations.flatMap(loc => 
    loc.subStores.flatMap(sub => 
      sub.sensors.map(s => ({
        ...s,
        locationName: loc.name,
        subStoreName: sub.name
      }))
    )
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Sensors</h1>
        <div className="flex space-x-4">
           {/* Mock Filters */}
           <select className="border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl text-sm p-2.5 focus:ring-primary outline-none"><option>All Locations</option></select>
           <select className="border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl text-sm p-2.5 focus:ring-primary outline-none"><option>All Types</option></select>
        </div>
      </div>

      <Card className="overflow-hidden p-0 border-none shadow-soft dark:shadow-none" noPadding>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sensor Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reading</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
              {allSensors.map((sensor) => (
                <tr key={sensor.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sensor.status === 'online' ? (
                       <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                         <Wifi className="h-4 w-4 mr-2" /> Online
                       </div>
                    ) : (
                       <div className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium">
                         <WifiOff className="h-4 w-4 mr-2" /> Offline
                       </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                         {sensor.type === 'temp' ? <Thermometer className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <DoorOpen className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{sensor.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">{sensor.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">{sensor.locationName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sensor.subStoreName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">{sensor.value}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sensor.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors">History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Sensors;