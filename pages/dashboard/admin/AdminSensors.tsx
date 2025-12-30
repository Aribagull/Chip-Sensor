import React, { useState } from 'react';
import { Plus, Thermometer, DoorOpen, Wifi, WifiOff } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { mockLocations, mockCustomers } from '../../../utils/mockData';

const AdminSensors: React.FC = () => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  
  // Flattening data
  const allSensors = mockLocations.flatMap(loc => 
    loc.subStores.flatMap(sub => 
      sub.sensors.map(s => ({
        ...s,
        customerId: loc.customerId,
        customerName: mockCustomers.find(c => c.id === loc.customerId)?.name || 'Unknown',
        locationName: loc.name,
        subStoreName: sub.name
      }))
    )
  );

  // Assign Sensor Modal State
  const [assignCustomer, setAssignCustomer] = useState('');
  const [assignLocation, setAssignLocation] = useState('');

  // Cascading Logic
  const customerOptions = mockCustomers.map(c => ({ value: c.id, label: c.name }));
  const locationOptions = mockLocations
    .filter(l => l.customerId === assignCustomer)
    .map(l => ({ value: l.id, label: l.name }));
  
  const subStoreOptions = mockLocations
    .find(l => l.id === assignLocation)
    ?.subStores.map(s => ({ value: s.id, label: s.name })) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Sensors</h1>
        <Button onClick={() => setIsAssignModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" /> Assign Sensor
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-soft dark:shadow-none" noPadding>
         <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sensor ID / Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reading</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
               {allSensors.map(sensor => (
                 <tr key={sensor.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                   <td className="px-6 py-4 whitespace-nowrap">
                     {sensor.status === 'online' ? (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-bold">
                          <Wifi className="h-4 w-4 mr-2" /> Online
                        </div>
                     ) : (
                        <div className="flex items-center text-red-600 dark:text-red-400 text-sm font-bold">
                          <WifiOff className="h-4 w-4 mr-2" /> Offline
                        </div>
                     )}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg mr-3 text-gray-500 dark:text-gray-400">
                          {sensor.type === 'temp' ? <Thermometer className="h-4 w-4" /> : <DoorOpen className="h-4 w-4" />}
                       </div>
                       <div>
                         <div className="text-sm font-bold text-gray-900 dark:text-white">{sensor.id}</div>
                         <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{sensor.type === 'temp' ? 'Temperature Probe' : 'Door Sensor'}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="text-sm text-gray-900 dark:text-white font-bold">{sensor.customerName}</div>
                     <div className="text-xs text-gray-500 dark:text-gray-400">{sensor.locationName} → {sensor.subStoreName}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className="text-sm font-mono font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">{sensor.value}</span>
                     <div className="text-xs text-gray-400 mt-1">{sensor.lastUpdated}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right">
                     <Button size="sm" variant="outline" className="dark:text-gray-300 dark:border-slate-600 dark:hover:bg-slate-700">View History</Button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
         </div>
      </Card>

      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Assign New Sensor">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAssignModalOpen(false); }}>
          <Input label="Serial Number" placeholder="e.g. SN-TEMP-12345" required />
          <Select 
            label="Sensor Type" 
            options={[
              { value: 'temp', label: 'Temperature Probe' },
              { value: 'door', label: 'Door Sensor' }
            ]} 
            required 
          />
          
          <div className="border-t border-gray-100 pt-4 mt-2">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Assignment Details</h4>
            <div className="space-y-4">
              <Select 
                label="Customer" 
                options={customerOptions} 
                value={assignCustomer}
                onChange={(e) => { setAssignCustomer(e.target.value); setAssignLocation(''); }}
                required 
              />
              <Select 
                label="Location" 
                options={locationOptions}
                value={assignLocation}
                onChange={(e) => setAssignLocation(e.target.value)}
                disabled={!assignCustomer}
                required 
              />
              <Select 
                label="Sub-Store" 
                options={subStoreOptions}
                disabled={!assignLocation}
                required 
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
            <Button type="submit">Assign Sensor</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminSensors;