import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Edit2, Plus, ArrowLeft, Thermometer, DoorOpen, Wifi, CheckCircle2, Store } from 'lucide-react';
import Button from '../../components/ui/Button';
import SubStoreAccordion from '../../components/dashboard/SubStoreAccordion';
import Modal from '../../components/ui/Modal';
import { UrgencyLevel } from '../../types';
import { getStoreById, getMyStores } from '../../Api/Stores/store';
import AddSubStoreModal from '../../components/dashboard/AddSubStoreModal';
import { createSubStore } from '../../Api/Stores/subStore';
import { createRequest } from '../../Api/Sensors/sensorrequests';
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

interface SubStore {
  _id: string;
  name: string;
  location?: string;
  notification_status?: string;
  phoneNumbersLevel1?: string;
  phoneNumbersLevel2?: string;
  phoneNumbersLevel3?: string;
  emailRecipientsLevel1?: string;
  emailRecipientsLevel2?: string;
  emailRecipientsLevel3?: string;
  coolerSmsSubscribers?: string;
}

interface LocationType {
  _id: string;
  name: string;
  storeName: string;
  address?: string;
  subStores: SubStore[];
}

const LocationDetail: React.FC = () => {
  const navigate = useNavigate();
  const locationPath = useLocation();
  const { state } = locationPath;
  const passedStore = state?.store;

  const isAdmin = locationPath.pathname.includes('/admin');

  const { id: storeId, subStoreId } = useParams<{ id: string; subStoreId?: string }>();

  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [installationNotes, setInstallationNotes] = useState("");

  const [subStoreForm, setSubStoreForm] = useState({
    name: '',
    location: '',
    notificationStatus: false,
    phoneNumbersLevel1: '',
    phoneNumbersLevel2: '',
    phoneNumbersLevel3: '',
    emailRecipientsLevel1: '',
    emailRecipientsLevel2: '',
    emailRecipientsLevel3: '',
    coolerSmsSubscribers: '',
  });

  const [isAddSubStoreOpen, setIsAddSubStoreOpen] = useState(false);
  const [isRequestSensorOpen, setIsRequestSensorOpen] = useState(false);
  const [selectedSubStoreForRequest, setSelectedSubStoreForRequest] = useState<SubStore | null>(null);

  const [requestUrgency, setRequestUrgency] = useState<UrgencyLevel>('normal');
  const [selectedTypes, setSelectedTypes] = useState<{ temp: number, door: number, gateway: number, other: number }>({ temp: 0, door: 0, gateway: 0, other: 0 });
  const [otherSensorName, setOtherSensorName] = useState("");


  const [selectedSubStore, setSelectedSubStore] = useState<SubStore | null>(null);


  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      try {
        let storeData: LocationType | null = passedStore || null;

        if (!passedStore && storeId) {
          const response = await getMyStores();
          const allStores = response.stores || [];
          storeData = allStores.find(store => store._id === storeId) || null;
        }

        setLocation(storeData);

        if (storeData && subStoreId) {
          const sub = storeData.subStores?.find(s => s._id === subStoreId) || null;
          setSelectedSubStore(sub);
        }
      } catch (err) {
        console.error(err);
        setLocation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [storeId, subStoreId, passedStore]);







  const handleDeleteSubStoreUI = (deletedId) => {
    setLocation(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        subStores: prev.subStores.filter(
          sub => sub._id !== deletedId
        ),
      };
    });
  };




  useEffect(() => {
    if (location?.name) sessionStorage.setItem('pageTitle', location.name);
    return () => sessionStorage.removeItem('pageTitle');
  }, [location]);




  const handleSubStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target;
    setSubStoreForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };




  const handleTypeSelect = (type: keyof typeof selectedTypes) => {
    setSelectedTypes({
      temp: 0,
      door: 0,
      gateway: 0,
      other: 0,
      [type]: 1,
    });
  };

  const incrementType = (type: keyof typeof selectedTypes) => {
    setSelectedTypes({
      temp: 0,
      door: 0,
      gateway: 0,
      other: 0,
      [type]: selectedTypes[type] + 1,
    });
  };

  const decrementType = (type: keyof typeof selectedTypes) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, 0),
    }));
  };

  const handleRequestSensor = (subStore: SubStore) => {
    setSelectedSubStoreForRequest(subStore);
    setSelectedTypes({ temp: 0, door: 0, gateway: 0, other: 0 });
    setOtherSensorName('');
    setIsRequestSensorOpen(true);
  };

  const handleEditSubStore = (subStore: SubStore) => {
    setSubStoreForm({
      name: subStore.name,
      location: subStore.location || '',
      notificationStatus: subStore.notification_status === 'on',
      phoneNumbersLevel1: subStore.phoneNumbersLevel1 || '',
      phoneNumbersLevel2: subStore.phoneNumbersLevel2 || '',
      phoneNumbersLevel3: subStore.phoneNumbersLevel3 || '',
      emailRecipientsLevel1: subStore.emailRecipientsLevel1 || '',
      emailRecipientsLevel2: subStore.emailRecipientsLevel2 || '',
      emailRecipientsLevel3: subStore.emailRecipientsLevel3 || '',
      coolerSmsSubscribers: subStore.coolerSmsSubscribers || '',
    });
    setIsAddSubStoreOpen(true);
  };

  const handleSubStoreUpdated = (updatedSubStore: SubStore) => {
    if (!location || !updatedSubStore || !updatedSubStore._id) return;

    setLocation(prev => {
      if (!prev || !Array.isArray(prev.subStores)) return prev;

      return {
        ...prev,
        subStores: prev.subStores.map(s => {
          if (!s || !s._id) return s;
          return s._id === updatedSubStore._id ? updatedSubStore : s;
        }),
      };
    });

    setSelectedSubStore(prev =>
      prev && prev._id === updatedSubStore._id ? updatedSubStore : prev
    );
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSubStoreForRequest) {
      alert("Please select a sub-store");
      return;
    }

    const sensors: { sensorType: string, requestedSensors: number }[] = [];
    if (selectedTypes.temp > 0) sensors.push({ sensorType: "temperature", requestedSensors: selectedTypes.temp });
    if (selectedTypes.door > 0) sensors.push({ sensorType: "door", requestedSensors: selectedTypes.door });
    if (selectedTypes.gateway > 0) sensors.push({ sensorType: "multi", requestedSensors: selectedTypes.gateway });
    if (selectedTypes.other > 0 && otherSensorName.trim() !== "")
      sensors.push({ sensorType: otherSensorName.trim(), requestedSensors: 1 });

    if (sensors.length === 0) {
      toast.warning("Please select at least one sensor");
      return;
    }

    try {
      for (const sensor of sensors) {
        await createRequest({
          storeId: location!._id,
          subStoreId: selectedSubStoreForRequest!._id,
          description: installationNotes,
          sensorType: sensor.sensorType as any,
          requestedSensors: sensor.requestedSensors,
        });
      }
      setIsRequestSensorOpen(false);
      toast.success("Request submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  const subStoresToShow = subStoreId
    ? location?.subStores.filter(s => s._id === subStoreId) || []
    : location?.subStores || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <PulseLoader color="#3b82f6" loading={loading} size={15} />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Location not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Link to={isAdmin ? "/admin/locations" : "/dashboard/locations"} className="hover:text-primary dark:hover:text-primary flex items-center border rounded-lg p-2 border-gray-500 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> {isAdmin ? "Back to All Locations" : "Back to My Stores"}
        </Link>
      </div>

      {/* Location Info Header */}
      <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">

        {/* Left: Store Name & Address */}
        <div className="flex flex-col">
          {/* Store name with icon */}
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="
           h-14 w-14 rounded-2xl
           bg-gray-100 dark:bg-slate-800
           flex items-center justify-center
         ">
              <Store className="h-7 w-7 text-slate-700 dark:text-yellow-600" />
            </div>
            {location.storeName}
            <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full font-medium">
              {location.subStores.length} Sub-stores
            </span>
          </h1>

          {/* Address line */}
          <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{location.address}</span>
          </div>
        </div>


        {/* Right: Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-2">

          {/* Add Sub-Store Button */}
          <Button
            variant="secondary"
            className="border-dashed flex items-center gap-2"
            onClick={() => setIsAddSubStoreOpen(true)}
          >
            <Plus className="h-5 w-5" />
            Add Sub-Store
          </Button>

          {/* Admin Mode Badge */}
          {isAdmin && (
            <div className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-300 font-medium">
              Admin Mode: Full Access
            </div>
          )}
        </div>
      </div>


      {/* Sub-Stores List */}
      <div className="grid grid-cols-1 gap-4">
        {subStoresToShow.map(subStore => (
          <SubStoreAccordion
            key={subStore._id}
            subStore={subStore}
            onDelete={handleDeleteSubStoreUI}
            onRequestSensor={() => handleRequestSensor(subStore)}
            onEdit={() => handleEditSubStore(subStore)}
            onUpdate={handleSubStoreUpdated}
            isAdmin={isAdmin}
            navigateToSubStore={true}
            onClick={() => navigate(`/dashboard/locations/${storeId}/substores/${subStore._id}`)}
            isSelected={selectedSubStore?._id === subStore._id}
          />

        ))}
      </div>




      {/* Add Sub-Store Modal */}
      <AddSubStoreModal
        isOpen={isAddSubStoreOpen}
        onClose={() => setIsAddSubStoreOpen(false)}
        form={subStoreForm}
        onChange={handleSubStoreChange}
        onSubmit={async () => {
          try {
            const payload = {
              name: subStoreForm.name,
              location: subStoreForm.location,
              notification_status: subStoreForm.notificationStatus ? 'on' : 'off',
              phoneNumbersLevel1: subStoreForm.phoneNumbersLevel1,
              phoneNumbersLevel2: subStoreForm.phoneNumbersLevel2,
              phoneNumbersLevel3: subStoreForm.phoneNumbersLevel3,
              emailRecipientsLevel1: subStoreForm.emailRecipientsLevel1,
              emailRecipientsLevel2: subStoreForm.emailRecipientsLevel2,
              emailRecipientsLevel3: subStoreForm.emailRecipientsLevel3,
              coolerSmsSubscribers: subStoreForm.coolerSmsSubscribers,
            };

            await createSubStore(storeId!, payload);
            const updated = await getStoreById(storeId!);

            setLocation(updated);

            setSubStoreForm({
              name: '',



              location: '',
              notificationStatus: false,
              phoneNumbersLevel1: '',
              phoneNumbersLevel2: '',
              phoneNumbersLevel3: '',
              emailRecipientsLevel1: '',
              emailRecipientsLevel2: '',
              emailRecipientsLevel3: '',
              coolerSmsSubscribers: '',
            });

            setIsAddSubStoreOpen(false);
            toast.success('Substore saved successfully');
          } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to save sub-store');
          }
        }}
      />

      {/* Request Sensor Modal */}
      <Modal isOpen={isRequestSensorOpen} onClose={() => setIsRequestSensorOpen(false)} title="Request New Sensor" size="md">
        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-900/30 mb-4 text-sm text-blue-800 dark:text-blue-100">
            Requesting equipment for: <strong>{location.name}</strong> → <strong>{selectedSubStoreForRequest?.name}</strong>
          </div>


          {/* Sensor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Equipment Needed
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Temp Probe Card */}
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTypes.temp > 0
                    ? 'ring-2 ring-primary border-primary bg-blue-50 dark:bg-blue-900/20 dark:border-primary'
                    : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 bg-white dark:bg-slate-800'
                  }`}
                onClick={() => handleTypeSelect('temp')}
              >
                <div className="flex justify-between items-start mb-2">
                  <Thermometer
                    className={`h-6 w-6 ${selectedTypes.temp > 0 ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                      }`}
                  />
                  {selectedTypes.temp > 0 && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </div>
                <p className="font-bold text-gray-900 dark:text-white">Temp Probe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Standard wireless temperature sensor.</p>

                {selectedTypes.temp > 0 && (
                  <div
                    className="flex items-center justify-between bg-white dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 px-2 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button type="button" onClick={() => decrementType('temp')} className="px-2 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white font-bold">
                      -
                    </button>
                    <span className="font-mono text-gray-900 dark:text-white">{selectedTypes.temp}</span>
                    <button type="button" onClick={() => incrementType('temp')} className="px-2 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white font-bold">
                      +
                    </button>
                  </div>
                )}
              </div>

              {/* Door Sensor Card */}
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTypes.door > 0
                    ? 'ring-2 ring-primary border-primary bg-blue-50 dark:bg-blue-900/20 dark:border-primary'
                    : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 bg-white dark:bg-slate-800'
                  }`}
                onClick={() => handleTypeSelect('door')}
              >
                <div className="flex justify-between items-start mb-2">
                  <DoorOpen
                    className={`h-6 w-6 ${selectedTypes.door > 0 ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                      }`}
                  />
                  {selectedTypes.door > 0 && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </div>
                <p className="font-bold text-gray-900 dark:text-white">Door Sensor</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Detects if door is left open.</p>

                {selectedTypes.door > 0 && (
                  <div
                    className="flex items-center justify-between bg-white dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 px-2 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button type="button" onClick={() => decrementType('door')} className="px-2 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white font-bold">
                      -
                    </button>
                    <span className="font-mono text-gray-900 dark:text-white">{selectedTypes.door}</span>
                    <button type="button" onClick={() => incrementType('door')} className="px-2 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white font-bold">
                      +
                    </button>
                  </div>
                )}
              </div>


            </div>
          </div>


          {/* Installation Notes */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Installation Notes</label>
            <textarea
              value={installationNotes}
              onChange={(e) => setInstallationNotes(e.target.value)}
              className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-all"
              rows={2}
              placeholder="Optional notes for sensor installation"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit">Submit Request</Button>
          </div>

        </form>
      </Modal>
    </div>
  );
};

export default LocationDetail;
