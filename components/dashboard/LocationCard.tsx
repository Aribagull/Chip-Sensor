import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MapPin, Box, Thermometer, Edit, Trash2, ChevronRight, Store, Layers } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { Location } from '../../types';
import { updateStore, deleteStore } from '../../Api/Stores/store';

interface LocationCardProps {
  location: any;
  onUpdate: (updatedStore: any) => void;
  onDelete: (id: string) => void;
}


const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onUpdate,
  onDelete,
}) => {

  const navigate = useNavigate();
  const sensorCount = location.subStores.reduce(
    (acc, sub) => acc + sub.sensors.length,
    0
  );

  

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeType, setStoreType] = useState('');
  const [address, setAddress] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const openEditModal = () => {

    setStoreName(location.storeName);
    setStoreType(location.storeType);
    setAddress(location.address);
    setIsEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);

    try {
      const payload = {
        storeName,
        storeType,
        address
      };

      const res = await updateStore(location._id, payload);

      toast.success(res.message || 'Store updated successfully');

onUpdate({
  ...location,
  storeName,
  storeType,
  address,
});

setIsEditOpen(false);

    } catch (error: any) {
      console.error('Error updating store:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update store');
    } finally {
      setLoadingUpdate(false);
    }
  };

const openDeleteModal = () => setIsDeleteModalOpen(true);

const handleConfirmDelete = async () => {
  setLoadingDelete(true);
  try {
    const res = await deleteStore(location._id);
    toast.success(res.message || 'Store deleted successfully');
    onDelete(location._id);
    setIsDeleteModalOpen(false);
  } catch (error: any) {
    console.error('Error deleting store:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'Failed to delete store');
  } finally {
    setLoadingDelete(false);
  }
};



  return (
    <>

     <Card className="
  h-full rounded-2xl
  border border-gray-200 dark:border-slate-700
  bg-white dark:bg-slate-900
  shadow-sm hover:shadow-md transition
">
  {/* Header */}
  <div className="p-6 flex justify-between items-start bg-gray-50 dark:bg-slate-800 rounded-t-2xl">
    <Link
      to={`/dashboard/locations/${location._id}`}
      state={{ storeName: location.storeName }}
      className="flex gap-4"
    >
      {/* Icon */}
      <div className="
        h-14 w-14 rounded-2xl
        bg-gray-100 dark:bg-slate-800
        flex items-center justify-center
      ">
        <Store className="h-7 w-7 text-slate-700 dark:text-slate-300" />
      </div>

      {/* Title & Address */}
      <div>
        <h3 className="text-xl uppercase font-semibold text-gray-900 dark:text-white">
          {location.storeName}
        </h3>

        <div className="flex items-center text-sm text-gray-500 dark:text-slate-400 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          {location.address}
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-700 dark:text-slate-300">
            <Layers className="h-4 w-4 text-gray-500 dark:text-slate-400" />
            {location.subStores.length} Sub-stores
          </div>

          <div
  className={`
    flex items-center gap-2 px-3 py-1 rounded-full
    text-sm font-medium
    ${sensorCount > 0 
      ? 'bg-green-100 text-green-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
      : 'bg-gray-100 text-gray-400 dark:bg-slate-700/20 dark:text-slate-400'
    }
  `}
>
  <Thermometer className="h-4 w-4" />
  {sensorCount} Sensors
</div>

        </div>
      </div>
    </Link>

    {/* Actions */}
    <div
      className="flex items-center gap-2"
      onClick={(e) => e.preventDefault()}
    >
      <button
        onClick={openEditModal}
        className="
          p-2 rounded-lg
          border border-gray-200 dark:border-slate-600
          hover:bg-gray-100 dark:hover:bg-slate-800
          transition
        "
      >
        <Edit className="h-4 w-4 text-gray-600 dark:text-slate-300" />
      </button>

      <button
  onClick={openDeleteModal}
  disabled={loadingDelete}
  className="
    p-2 rounded-lg
    border border-gray-200 dark:border-slate-600
    hover:bg-red-50 dark:hover:bg-red-500/10
    transition
  "
>
  <Trash2 className="h-4 w-4 text-red-500" />
</button>

    </div>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-100 dark:border-slate-700" />

  {/* Sub-store Section */}
  <div className="p-6">
    <p className="text-xs tracking-widest text-gray-400 dark:text-slate-500 mb-4">
  SUB-STORES ({location.subStores.length})
</p>
<Modal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  title="Confirm Delete"
>
  <p className="text-gray-700 dark:text-gray-300">
    Are you sure you want to delete this store? This will delete all its substores and sensors.
  </p>

  <div className="flex justify-end mt-4 gap-3">
    <Button
      variant="secondary"
      onClick={() => setIsDeleteModalOpen(false)}
    >
      Cancel
    </Button>
    <Button
  variant="secondary" 
  className="bg-red-600 hover:bg-red-700 text-white"
  onClick={handleConfirmDelete}
  disabled={loadingDelete}
>
  {loadingDelete ? "Deleting..." : "Delete"}
</Button>

  </div>
</Modal>


    <div className="space-y-3">
     {location.subStores.map((subStore) => {
  const activeSensors =
    subStore.sensors?.filter(sensor => sensor.status === "on").length || 0;

  const totalSensors = subStore.sensors?.length || 0;

  return (
    <div
      key={subStore._id}
      onClick={() =>
        navigate(
          `/dashboard/locations/${location._id}/substores/${subStore._id}`,
          {
            state: {
              storeName: location.storeName,
              subStoreName: subStore.name,
            },
          }
        )
      }
      className="
        flex items-center justify-between
        bg-gray-50 hover:bg-gray-100
        dark:bg-slate-800 dark:hover:bg-slate-700
        px-5 py-4
        rounded-xl
        cursor-pointer
        transition
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${
            activeSensors > 0 ? "bg-green-400" : "bg-gray-400"
          }`}
        />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {subStore.name}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400">
        <Thermometer
          className={`h-4 w-4 ${
            activeSensors > 0 ? "text-green-500" : "text-gray-400"
          }`}
        />
        {activeSensors}/{totalSensors}
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
})}

    </div>
  </div>
</Card>





      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Update Location"
      >
        <form className="space-y-4" onSubmit={handleUpdate}>
          <Input
            label="Location Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />

          <Input
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Store Type
            </label>
            <select
              value={storeType}
              onChange={(e) => setStoreType(e.target.value)}
              className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
            >
              <option value="hospital">Hospital</option>
              <option value="clinic">Clinic</option>
              <option value="restaurant">Restaurant</option>
              <option value="warehouse">Warehouse</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loadingUpdate}>
              {loadingUpdate ? 'Updating...' : 'Update Location'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default LocationCard;
