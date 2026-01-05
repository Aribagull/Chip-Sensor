import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { MapPin, Box, Thermometer, Edit, Trash2, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { Location } from '../../types';
import { updateStore, deleteStore } from '../../Api/Stores/store';

interface LocationCardProps {
  location: {
    _id: string;
    storeName: string;
    address: string;
  };
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
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

      alert(res.message || 'Store updated successfully');
      setIsEditOpen(false);
    } catch (error: any) {
      console.error('Error updating store:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to update store');
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this store? This will delete all its substores and sensors.'
    );
    if (!confirmDelete) return;

    setLoadingDelete(true);
    try {
      const res = await deleteStore(location._id);

      alert(res.message || 'Store deleted successfully');
    } catch (error: any) {
      console.error('Error deleting store:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to delete store');
    } finally {
      setLoadingDelete(false);
    }
  };


  return (
    <>

      <Card className="h-full rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition">
        {/* Header */}
        <Link
          to={`/dashboard/locations/${location._id}`}
          state={{ storeName: location.storeName }}
          className="block h-full"
        >
          <div className="flex justify-between items-start p-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {location.storeName}
              </h3>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {location.address}
              </div>
            </div>


            {/* Actions */}
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.preventDefault()}
            >
              <button
                onClick={openEditModal}
                className="
    flex items-center gap-1.5
    px-2 py-1
    text-xs font-medium
    border border-gray-300 dark:border-slate-600
    rounded-md
    text-gray-600 dark:text-gray-300
    hover:border-blue-500
    hover:text-blue-600
    hover:bg-blue-50
    dark:hover:bg-blue-500/10
    transition
  "
              >
                <Edit className="h-4 w-4" />
                Edit Store
              </button>

              <button
                onClick={handleDelete}
                className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 flex  text-red-500 text-xs px-1 rounded-md items-center gap-1.5 border border-gray-300 dark:border-slate-600"
                disabled={loadingDelete}
              >
                <Trash2 className="h-4 w-4 text-red-500" /> Delete Store
              </button>
            </div>
          </div>
        </Link>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-700" />

        {/* Sub-stores Section */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sub-stores ({location.subStores.length})
          </p>

          {location.subStores.map((subStore) => (
            <div
              key={subStore._id}

              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(
                  `/dashboard/locations/${location._id}/substores/${subStore._id}`,
                  {
                    state: {
                      storeName: location.storeName,
                      subStoreName: subStore.name
                    }
                  }
                );
              }}

              className="flex items-center justify-between
          bg-gray-50 dark:bg-slate-700/50
          px-3 py-2 rounded-lg
          cursor-pointer
          hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">{subStore.name}</span>
              <div className="flex items-center text-sm text-gray-500 gap-1">
                {subStore.sensors?.length || 0} sensors
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          ))}
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
