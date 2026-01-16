import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Thermometer, DoorOpen, Settings, Info, Zap, Box, Phone, Mail, Activity, Edit, Trash2, Eye } from 'lucide-react';
import { SubStore } from '../../types';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import TemperatureChart from './TemperatureChart';
import AddSubStoreModal from './AddSubStoreModal';
import { updateSubStore, deleteSubStore } from "../../Api/Stores/subStore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiPhone, FiMail } from "react-icons/fi";
import Modal from '../ui/Modal';


interface SubStoreAccordionProps {
   subStore: SubStore;
   onRequestSensor: () => void;
   onEdit: () => void;
   onUpdate: (updatedSubStore: SubStore) => void;
   isAdmin?: boolean;
   navigateToSubStore?: boolean;
   isSelected?: boolean;
   onDelete: (id: string) => void;
}


const SubStoreAccordion: React.FC<SubStoreAccordionProps> = ({ subStore, onRequestSensor, onEdit, onUpdate, onDelete, isAdmin = false }) => {
   const navigate = useNavigate();
   const [isExpanded, setIsExpanded] = useState(false);
   const [isEditOpen, setIsEditOpen] = useState(false);
   const [requestSubmitted, setRequestSubmitted] = useState(false);
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);

   const hasSensors = subStore.sensors && subStore.sensors.length > 0;

   const [editForm, setEditForm] = useState({
      name: subStore.name || '',
      location: subStore.location || '',
      notificationStatus: subStore.notification_status === 'on',
      phoneNumbersLevel1: subStore.phoneNumbersLevel1 || [],
      emailRecipientsLevel1: subStore.emailRecipientsLevel1 || [],
      phoneNumbersLevel2: subStore.phoneNumbersLevel2 || [],
      emailRecipientsLevel2: subStore.emailRecipientsLevel2 || [],
      phoneNumbersLevel3: subStore.phoneNumbersLevel3 || [],
      emailRecipientsLevel3: subStore.emailRecipientsLevel3 || [],
   });
   // Status Helper
   const getStatusColor = (status: string) => {
      switch (status) {
         case 'good': return 'text-green-500 dark:text-green-400';
         case 'warning': return 'text-yellow-500 dark:text-yellow-400';
         case 'critical': return 'text-red-500 dark:text-red-400';
         default: return 'text-gray-400';
      }
   };


   const [selectedSensor, setSelectedSensor] = useState(subStore.sensors[0] || null);
   const notificationEnabled = subStore.notification_status === 'on';

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

   const handleDeleteSubStore = async () => {
      try {
         setIsDeleting(true);
         await deleteSubStore(subStore.storeId, subStore._id);

         toast.success("Sub-Store deleted successfully");
         onDelete(subStore._id);
         setIsDeleteOpen(false);
      } catch (error) {
         console.error(error);
         toast.error("Failed to delete Sub-Store");
      } finally {
         setIsDeleting(false);
      }
   };



   const getStatusBg = (status: string) => {
      switch (status) {
         case 'good': return 'bg-green-500';
         case 'warning': return 'bg-yellow-500';
         case 'critical': return 'bg-red-500';
         default: return 'bg-gray-400';
      }
   };


   return (
      <div className={`bg-white dark:bg-slate-800 border rounded-2xl mb-4 shadow-soft dark:shadow-none transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary border-transparent shadow-lg' : 'border-gray-100 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'}`}>
         {/* Header */}
         <div
            className="p-5 cursor-pointer flex items-center justify-between"
            onClick={() => {
               setIsExpanded(!isExpanded);
               if (isExpanded) setRequestSubmitted(false);
            }}
         >
            <div className="flex items-center gap-4">
               <div
                  className={`h-3 w-3 rounded-full ${subStore.sensors.length > 0 ? 'bg-green-500' : 'bg-gray-400'
                     } ring-4 ring-opacity-20 ${subStore.sensors.some(sensor => sensor.status === 'critical') ? 'ring-red-500' : 'ring-transparent'
                     }`}
               />

               <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-none">{subStore.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 flex items-center font-medium">
                     <Activity className="h-3 w-3 mr-1" />
                     {subStore.sensors.length} Active Sensors
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                  <span className={`text-2xl font-bold font-mono tracking-tight ${getStatusColor(subStore.status)}`}>
                     {subStore.temp}
                  </span>
                  <div className="flex items-center justify-end gap-5 mt-1">
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           setIsEditOpen(true);
                           setEditForm({
                              name: subStore.name || '',
                              location: subStore.location || '',
                              notificationStatus: subStore.notification_status === 'on',
                              phoneNumbersLevel1: subStore.phoneNumbersLevel1 || [],
                              emailRecipientsLevel1: subStore.emailRecipientsLevel1 || [],
                              phoneNumbersLevel2: subStore.phoneNumbersLevel2 || [],
                              emailRecipientsLevel2: subStore.emailRecipientsLevel2 || [],
                              phoneNumbersLevel3: subStore.phoneNumbersLevel3 || [],
                              emailRecipientsLevel3: subStore.emailRecipientsLevel3 || [],
                              coolerSmsSubscribers: subStore.coolerSmsSubscribers || [],
                           });

                        }}
                        className="
      flex items-center gap-2
      px-3 py-1.5
      border border-gray-300 dark:border-gray-600
      rounded-md
      text-sm font-medium
      text-gray-600 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      transition
    "
                     >
                        <Edit className="h-4 w-4" />
                        <span>Edit Sub-Store</span>
                     </button>
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           setIsDeleteOpen(true);
                        }}
                        className='flex items-center gap-2
                                     px-3 py-1.5
                                     border border-red-300 dark:border-red-600
                                     rounded-md
                                     text-sm font-medium
                                     text-red-600 dark:text-red-300
                                     hover:bg-red-100  dark:hover:bg-red-800
                                     transition'>
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                     </button>
                  </div>

                  <Modal
                     isOpen={isDeleteOpen}
                     onClose={() => setIsDeleteOpen(false)}
                     title="Delete Sub-Store"
                  >
                     <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                           Are you sure you want to delete this Sub-Store?
                        </p>

                        <div className="flex justify-end gap-3 pt-4">
                           <Button
                              variant="secondary"
                              onClick={() => setIsDeleteOpen(false)}
                              disabled={isDeleting}
                           >
                              Cancel
                           </Button>

                           <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={handleDeleteSubStore}
                              loading={isDeleting}
                           >
                              Delete
                           </Button>
                        </div>
                     </div>
                  </Modal>

               </div>
               <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
               </div>
            </div>
         </div>

         {/* Expanded Content */}
         {isExpanded && (
            <>

               {!hasSensors && (
                  <>
                     {/* Request message / button */}
                     <div className="p-12 flex flex-col items-center justify-center text-center">
                        <Box className="h-12 w-12 text-blue-500 mb-4" />
                        {!requestSubmitted ? (
                           <>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                 No sensors installed
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                 Please request a new sensor to start monitoring this store.
                              </p>

                              <Button
                                 variant="secondary"
                                 className="text-blue-600 border-blue-200 dark:border-blue-900"
                                 onClick={() => {
                                    onRequestSensor(subStore.name);
                                    setRequestSubmitted(true);
                                 }}
                              >
                                 <Box className="h-4 w-4 mr-2" />
                                 Request New Sensor
                              </Button>
                           </>
                        ) : (
                           <>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                 Your sensor request has been processed
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                                 Our team has received your request. You will be notified once the sensor is approved and installed.
                              </p>
                           </>
                        )}
                     </div>


                  </>
               )}



               {hasSensors && (
                  <div className="border-t border-gray-100 dark:border-slate-700">

                     {/* Dashboard Row */}
                     <div className="p-6 bg-gray-50/50 dark:bg-slate-900/30">
                        <div className=" flex justify-end items-center mb-10  pt-4">
                           {isAdmin ? (
                              <Button size="sm">Save Configuration</Button>
                           ) : (
                              <Button
                                 variant="secondary"
                                 className="text-blue-600 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                 onClick={async () => {
                                    try {
                                       await onRequestSensor(subStore.name);
                                       setRequestSubmitted(true);
                                    } catch {
                                       toast.error("Request failed, try again");
                                    }
                                 }}
                              >
                                 <Box className="h-4 w-4 mr-2" />
                                 Request New Sensor
                              </Button>

                           )}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">



                           {/* Left: Sensor List */}
                           <div className="lg:col-span-1 space-y-3">
                              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                                 Live Sensor Data
                              </h4>

                              {subStore.sensors.map((sensor) => (
                                 <div
                                    key={sensor._id}
                                    onClick={() => setSelectedSensor(sensor)}
                                    className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700 flex items-center justify-between shadow-sm"
                                 >
                                    <div className="flex items-center">
                                       <div
                                          className={`p-2 rounded-lg mr-3 ${sensor.type === 'temp'
                                             ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                             : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                                             }`}
                                       >
                                          {sensor.type === 'temp' ? (
                                             <Thermometer className="h-4 w-4" />
                                          ) : (
                                             <DoorOpen className="h-4 w-4" />
                                          )}
                                       </div>

                                       <div>
                                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                                             {sensor.sensorName}
                                          </p>

                                          {/* Status with color circle */}
                                          <div className="flex items-center gap-2 text-xs">
                                             <span
                                                className={`h-2 w-2 rounded-full ${sensor.status === 'on'
                                                   ? 'bg-green-500'
                                                   : 'bg-gray-400'
                                                   }`}
                                             />
                                             <span className="text-gray-500 dark:text-gray-400">
                                                {sensor.status === 'on' ? 'Online' : 'Offline'}
                                             </span>
                                          </div>
                                       </div>
                                    </div>

                                    <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                                       {sensor.currentTempC !== null && sensor.currentTempC !== undefined
                                          ? sensor.currentTempC.toFixed(1)
                                          : '--'}°C

                                    </span>
                                 </div>
                              ))}
                           </div>



                           {/* Right: Chart */}
                           <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                              {/* Sensor Details Link */}
                              {selectedSensor && (
                                 <div className="mb-3 flex justify-end">
                                    <button
                                       className="flex items-center gap-1 text-blue-600 dark:text-white text-sm font-medium dark:hover:text-blue-600 border border-gray-300 px-2 py-1 rounded hover:border-blue-600"
                                       onClick={() => {
                                          if (!selectedSensor || !selectedSensor._id) return;

                                          navigate(
                                             `/dashboard/sensors/sensor/${selectedSensor._id}`,
                                             {
                                                state: {
                                                   pageTitle: selectedSensor.sensorName,
                                                },
                                             }
                                          );
                                       }}
                                    >
                                       <Eye className="h-4 w-4" />
                                       View Details
                                    </button>



                                 </div>

                              )}
                              <div className="flex items-center justify-between mb-4">
                                 <h4 className="font-bold mb-2 text-green-500 text-xl ">
                                    <Thermometer className="h-5 w-5 mr-2 inline text-green-500" />{selectedSensor.sensorName} - <span className='dark:text-gray-200 text-black'>{selectedSensor.avgTempHours}h Temperature Data</span>
                                 </h4>
                                 <p></p>
                                 <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs rounded font-bold">
                                       Last {selectedSensor.avgTempHours}h
                                    </span>
                                 </div>
                              </div>

                              <div className="h-56">
                                 {selectedSensor && selectedSensor.temperatureRecords && selectedSensor.temperatureRecords.length > 0 ? (
                                    (() => {
                                       const filteredRecords = selectedSensor.temperatureRecords.filter(
                                          r => r.currentTempC !== null && r.currentTempC !== undefined
                                       );

                                       const data = filteredRecords.map(r => r.currentTempC);

                                       const labels = filteredRecords.map(r =>
                                          new Date(r.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                       );
                                       const minTemp =
                                          Number((Math.floor(Math.min(...data)) - 1).toFixed(1));

                                       const maxTemp =
                                          Number((Math.ceil(Math.max(...data)) + 1).toFixed(1));


                                       return (
                                          <TemperatureChart
                                             data={data}
                                             labels={labels}
                                             minTemp={minTemp}
                                             maxTemp={maxTemp}
                                          />
                                       );
                                    })()
                                 ) : (
                                    <p className="text-sm text-gray-400 text-center">
                                       No temperature data available
                                    </p>
                                 )}

                              </div>

                           </div>




                        </div>
                     </div>

                     {/* Configuration Section */}
                     <div className="p-6">
                        <div className="flex items-center">
                           <Settings className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                           <h3 className="text-lg font-bold text-gray-900 dark:text-white">Alert Configuration</h3>
                        </div>

                     </div>
                  </div>
               )}
               {/* Level Notification*/}
               <div className="mt-6 bg-gray-100 dark:bg-gray-900 rounded-xl p-4 m-5">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-semibold">SubStore Level Notification</h3>
                     <Toggle enabled={notificationEnabled} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {/* Level 1 */}
                     <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow-soft dark:shadow-none border border-red-300 dark:border-red-700 bg-gradient-to-b from-red-100 dark:from-red-900/40 to-white dark:to-gray-800">
                        <p className="text-red-400 font-semibold mb-2">Level 1: Critical</p>
                        <div className="text-sm text-gray-300 space-y-2">
                           <div className="bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 text-gray-700 dark:text-gray-300">
                              Quick Alert – 15 min
                           </div>
                           <div className="flex flex-col gap-2">
                              {subStore.phoneNumbersLevel1.map((phone, index) => (
                                 <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                                    <FiPhone className="text-red-400 text-sm" />
                                    <span>{phone}</span>
                                 </div>
                              ))}
                           </div>
                           <div className="flex flex-col gap-2">
                              {subStore.emailRecipientsLevel1.map((email, index) => (
                                 <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                                    <FiMail className="text-red-400 text-sm" />
                                    <span>{email}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Level 2 */}
                     <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow-soft dark:shadow-none border border-yellow-300 dark:border-yellow-600 bg-gradient-to-b from-yellow-100 dark:from-yellow-900/40 to-white dark:to-gray-800">
                        <p className="text-yellow-400 font-semibold mb-2">Level 2: Warning</p>
                        <div className="text-sm text-gray-300 space-y-2">
                           <div className="bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 text-gray-700 dark:text-gray-300">
                              Take Action – 20 min
                           </div>
                           <div className="flex flex-col gap-2">
                              {subStore.phoneNumbersLevel2.map((phone, index) => (
                                 <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                                    <FiPhone className="text-red-400 text-sm" />
                                    <span>{phone}</span>
                                 </div>
                              ))}
                           </div>
                           <div className="flex flex-col gap-2">
                              {subStore.emailRecipientsLevel2.map((email, index) => (
                                 <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                                    <FiMail className="text-red-400 text-sm" />
                                    <span>{email}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Level 3 */}
                     <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow-soft dark:shadow-none border border-blue-300 dark:border-blue-600 bg-gradient-to-b from-blue-100 dark:from-blue-900/40 to-white dark:to-gray-800">
                        <p className="text-blue-400 font-semibold mb-2">Level 3: Info</p>
                        <div className="text-sm text-gray-300 space-y-2">
                           <div className="bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 text-gray-700 dark:text-gray-300">
                              Daily / Weekly Reports
                           </div>
                           <div className="flex flex-col gap-2">
                              {subStore.phoneNumbersLevel3.map((phone, index) => (
                                 <div key={index} className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                                    <FiPhone className="text-red-400 text-sm" />
                                    <span>{phone}</span>
                                 </div>
                              ))}
                           </div>
                           <div className="flex flex-col gap-2">
                              {subStore.emailRecipientsLevel3.map((email, index) => (
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
            </>
         )}
         <AddSubStoreModal
            isOpen={isEditOpen}
            isEdit={true}
            onClose={() => setIsEditOpen(false)}
            form={editForm}
            onChange={(e) => {
               const { name, value, type, checked } = e.target;
               setEditForm(prev => ({
                  ...prev,
                  [name]: type === 'checkbox' ? checked : value
               }));
            }}

            onSubmit={async () => {
               try {
                  const payload = {
                     ...editForm,
                     notification_status: editForm.notificationStatus ? 'on' : 'off',
                  };
                  delete payload.notificationStatus;

                  const res = await updateSubStore(subStore.storeId, subStore._id, payload);


                  if (res?.data?._id) {
                     onUpdate(res.data);
                  } else {

                     onUpdate({
                        ...subStore,
                        ...payload,
                        notification_status: payload.notification_status,
                     });
                  }

                  setIsEditOpen(false);
                  toast.success("Sub-store updated successfully");
               } catch (err) {
                  console.error(err);
                  toast.error('Update failed');
               }
            }}

         />
      </div>
   );
};

export default SubStoreAccordion;