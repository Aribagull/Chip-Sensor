import React, { useState, useEffect } from 'react';
import { Store, MapPin, User, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { getAllStores } from '../../../Api/Stores/store';
import ClipLoader from "react-spinners/ClipLoader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'react-toastify';


// Type definitions
interface SubStore {
  sensors?: any[];
}

interface Owner {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface Store {
  _id: string;
  storeName: string;
  address: string;
  ownerUserId?: Owner | null;
  subStores: SubStore[];
}

const AdminLocations: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);
const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
  const fetchStores = async () => {
    try {
      setLoading(true);

      const data = await getAllStores(currentPage, itemsPerPage);

      setStores(data.stores || []);
      setTotalPages(data.pagination.totalPages);

    } catch (error) {
      console.error('Error fetching all stores:', error);
      toast.error("Failed to load stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchStores();
}, [currentPage]);


  const filteredStores = selectedCustomer === 'all'
    ? stores
    : stores.filter(store => store.ownerUserId?._id === selectedCustomer);


  const uniqueOwners = Array.from(
    new Map(stores.map(store => [store.ownerUserId?._id, store.ownerUserId])).values()
  ).filter(Boolean) as Owner[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Stores</h1>
        <div className="w-full sm:w-64">
          <select
            className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl shadow-sm"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="all">All Customers</option>
            {uniqueOwners.map(owner => (
              <option key={owner._id} value={owner._id}>
                {owner?.name || 'Unknown'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-soft dark:shadow-none" noPadding>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Store Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sub-Stores</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sensors</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8}> <div className="flex justify-center items-center h-40">
        <ClipLoader
          color="#0f41ccff"
          loading={loading}
          size={50}
        />
      </div></td>
                </tr>
              ) : filteredStores.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">No stores found.</td>
                </tr>
              ) : (
                filteredStores.map(store => {
                  const sensorCount = store.subStores?.reduce((acc, s) => acc + (s.sensors?.length || 0), 0) || 0;
                  return (
                    <tr key={store._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {store.storeName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-600" />
                          {store.ownerUserId?.name || 'Unknown'}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {store.ownerUserId?.email || 'N/A'}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {store.ownerUserId?.phone || 'N/A'}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1 text-yellow-600" /> {store.address}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-mono">{store.subStores?.length || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-mono">{sensorCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link to={`/admin/locations/${store._id}`}
                          state={{ storeName: store.storeName }}
                        >
                          <Button size="sm" variant="outline" className="dark:text-white dark:border-slate-600 dark:hover:bg-slate-700">View</Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-4 border-t dark:border-slate-700">
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Page <span className="font-semibold">{currentPage}</span> of{" "}
    <span className="font-semibold">{totalPages}</span>
  </p>

  <div className="flex gap-2">
    <Button
      variant="secondary"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
      className="flex items-center gap-1"
    >
      <ChevronLeft size={16} />
      Previous
    </Button>

    <Button
      variant="secondary"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(prev => prev + 1)}
      className="flex items-center gap-1"
    >
      Next
      <ChevronRight size={16} />
    </Button>
  </div>
</div>
        </div>

      </Card>
    </div>
  );
};

export default AdminLocations;
