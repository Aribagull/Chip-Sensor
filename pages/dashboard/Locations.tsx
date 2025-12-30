import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Locations</h1>
        <div className="flex items-center space-x-3 md:space-x-5">
          
          {/* Search Input + Button */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter Store ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary w-64 text-gray-900 dark:text-gray-100 transition-all"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {/* Add Location Button */}
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Location
          </Button>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px] relative">
  {loadingStores ? (
    <div className="absolute inset-0 flex justify-center items-center  z-10">
      <ClipLoader color="#0f41ccff" loading={loadingStores} size={50} />
    </div>
  ) : stores.length === 0 ? (
    <p className="text-center col-span-full text-gray-500">No stores found</p>
  ) : (
    stores.map((store) => (
      <LocationCard key={store._id} location={store} linkState={{ storeName: store.storeName }}  />
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
