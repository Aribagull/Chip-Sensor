import React, { useEffect, useState } from 'react';
import { Plus, Search, Store,
  Layers,
  Thermometer,
  Activity } from 'lucide-react';
import Button from '../../components/ui/Button';
import LocationCard from '../../components/dashboard/LocationCard';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { createStore, getMyStores, getStoreById } from '../../Api/Stores/store';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";


const Locations: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Store type state
  const [storeType, setStoreType] = useState("");
  const [otherStoreType, setOtherStoreType] = useState("");
  const [storeName, setStoreName] = useState('');
  const [storeShortCode, setStoreShortCode] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [stores, setStores] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingStores, setLoadingStores] = useState(false);
  const [searchId, setSearchId] = useState('');

  // 🔹 GET MY STORES
  const fetchStores = async (pageNumber = 1) => {
    try {
      setLoadingStores(true);
      const res = await getMyStores(pageNumber);

      setStores(res.stores || []);
      setPage(res.pagination?.page || 1);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching stores', error);
    } finally {
      setLoadingStores(false);
    }
  };

  useEffect(() => {
    fetchStores(1);
  }, []);

  // 🔹 Search store by ID
  const handleSearch = async () => {
  if (!searchId.trim()) {
    fetchStores(); 
    return;
  }
  setLoadingStores(true);
  try {
    const res = await getMyStores(1); 
    const filtered = res.stores.filter((store: any) => store._id === searchId.trim());
    setStores(filtered);
  } catch (error) {
    console.error("Error fetching store by ID", error);
toast.error("Failed to fetch store");
setStores([]);
  } finally {
    setLoadingStores(false);
  }
};



const handleStoreUpdate = (updatedStore: any) => {
  setStores((prevStores) =>
    prevStores.map((store) =>
      store._id === updatedStore._id ? updatedStore : store
    )
  );
};

const handleStoreDelete = (id: string) => {
  setStores((prevStores) =>
    prevStores.filter((store) => store._id !== id)
  );
};




  // 🔹 CREATE STORE HANDLER
 const handleCreateStore = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      storeName,
      storeShortCode: storeShortCode.toUpperCase(),
      storeType: storeType === 'other' ? 'other' : storeType, 
      address,
    };

    const data = await createStore(payload);

    toast.success(data.message || "Store created successfully");

 
    setStoreName('');
    setStoreShortCode('');
    setStoreType('');
    setOtherStoreType(''); 
    setAddress('');
    setIsAddModalOpen(false);

    fetchStores(1); 
  } catch (error: any) {
    console.error('Error creating store:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to create store");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="space-y-6">
      {/* Header */}
<div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-sm">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    {/* Left Content */}
    <div>
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
          <svg
            className="w-6 h-6 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 21h18M5 21V7l7-4 7 4v14" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Locations Management
        </h1>
      </div>

      <p className="mt-2 ml-14 text-base text-gray-600 dark:text-gray-400 max-w-xl">
        Manage your stores, sub-stores, and monitor sensor performance across all locations
      </p>
    </div>

    {/* Right Actions */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Store ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-9 pr-4 py-2.5 w-full sm:w-64 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Add Substore / Location */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl"
      >
        <Plus className="h-5 w-5" />
        Add Substore
      </Button>
    </div>
  </div>
  {/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

  {/* Total Stores */}
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
      <Store className="w-6 h-6 text-slate-700 dark:text-slate-300" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {stores.length}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Stores
      </p>
    </div>
  </div>

  {/* Substores */}
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
      <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {stores.reduce((acc, s) => acc + (s.subStores?.length || 0), 0)}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Sub-stores
      </p>
    </div>
  </div>

  {/* Total Sensors */}
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
      <Thermometer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {stores.reduce(
          (acc, s) =>
            acc +
            (s.subStores?.reduce(
              (a: number, sub: any) => a + (sub.sensors?.length || 0),
              0
            ) || 0),
          0
        )}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Sensors
      </p>
    </div>
  </div>

  {/* Active Sensors (status === "on") */}
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
      <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
    </div>

    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {stores.reduce(
          (acc, store) =>
            acc +
            (store.subStores?.reduce(
              (subAcc: number, sub: any) =>
                subAcc +
                (sub.sensors?.filter(
                  (sensor: any) => sensor.status === "on"
                ).length || 0),
              0
            ) || 0),
          0
        )}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Active Sensors
      </p>
    </div>
  </div>

</div>


</div>


      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 min-h-[200px] relative">
  {loadingStores ? (
    <div className="absolute inset-0 flex justify-center items-center  z-10">
      <ClipLoader color="#0f41ccff" loading={loadingStores} size={50} />
    </div>
  ) : stores.length === 0 ? (
    <p className="text-center col-span-full text-gray-500">No stores found</p>
  ) : (
    stores.map((store) => (
     <LocationCard
  key={store._id}
  location={store}
  onUpdate={handleStoreUpdate}
  onDelete={handleStoreDelete}
/>

    ))
  )}
</div>


      {/* Add Store Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Location"
      >
        <form className="space-y-4" onSubmit={handleCreateStore}>
          <Input
            label="Location Name"
            placeholder="e.g. Westside Branch"
            required
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />

          <Input
            label="Address"
            placeholder="123 Street Name, City"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* <Input
            label="Store Short Code"
            placeholder="e.g. WS-01"
            required
            value={storeShortCode}
            onChange={(e) => setStoreShortCode(e.target.value)}
          /> */}

          {/* Store Type */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Store Type
            </label>
            <select
              value={storeType}
              onChange={(e) => setStoreType(e.target.value)}
              className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
            >
              <option value="">Select store type</option>
              <option value="hospital">Hospital</option>
              <option value="clinic">Clinic</option>
              <option value="restaurant">Restaurant</option>
              <option value="warehouse">Warehouse</option>
              <option value="other">Other</option>
            </select>
          </div>

         {storeType === "other" && false && ( 
  <Input
    label="Other Store Type"
    placeholder="Enter custom store type"
    value={otherStoreType}
    onChange={(e) => setOtherStoreType(e.target.value)}
  />
)}

          {/* Notes */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (Optional)
            </label>
            <textarea
              className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm transition-all"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Location</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Locations;
