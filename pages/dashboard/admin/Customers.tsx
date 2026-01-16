import React, { useState, useEffect } from 'react';
import { Plus, Search, Mail, Phone, Layers, Store, Thermometer, AlertTriangle, Trash2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import { getAllUsers, getUserById, deleteUserById } from '../../../Api/admin/customers';
import PulseLoader from "react-spinners/PulseLoader";
import { ChevronLeft, ChevronRight } from "lucide-react"
import CustomerDetails from './CustomerDetails';


const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

const getTotalRequests = (customer: any) => {
  return customer.requests?.length || 0;
};


  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers(currentPage, itemsPerPage);

        setCustomers(data.customers);
        setTotalPages(data.pagination.totalPages);


      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);



  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = async (id: string) => {
    try {
      setLoading(true);
      const userData = await getUserById(id);
      setSelectedCustomer(userData);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = (id: string) => {
  setViewMode("details");
  setDetailsLoading(true);
  const customer = customers.find(c => c._id === id);

  if (customer) {
    setSelectedCustomer(customer);
  } else {
    console.warn("Customer not found in the list!");
  }

  setDetailsLoading(false);
};


  const getTotalStores = (customer: any) => {
    return customer.stores?.length || 0;
  };

  const getTotalSubStores = (customer: any) => {
    return (
      customer.stores?.reduce(
        (total: number, store: any) =>
          total + (store.subStores?.length || 0),
        0
      ) || 0
    );
  };

  const getTotalSensors = (customer: any) => {
    return (
      customer.stores?.reduce(
        (storeTotal: number, store: any) =>
          storeTotal +
          (store.subStores?.reduce(
            (subTotal: number, sub: any) =>
              subTotal + (sub.sensors?.length || 0),
            0
          ) || 0),
        0
      ) || 0
    );
  };


const getTotalAlerts = (customer: any) => {
  return customer.totalAlerts || 0;
};


const getTotalPendingRequests = (customer: any) => {
  return customer.requests?.filter((req: any) => req.status === "pending").length || 0;
};




  const handleDeleteClick = (customer: any) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;

    try {
      setLoading(true);
      await deleteUserById(customerToDelete._id);
      setCustomers(prev => prev.filter(c => c._id !== customerToDelete._id));
      setCustomerToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className='flex flex-col text-gray-40'>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p>Manage customer accounts, stores, and sensor requests</p>
        </div>
        {/* <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" /> Add Customer
        </Button> */}
      </div>

{viewMode === "details" ? (
  detailsLoading || !selectedCustomer ? (
    <div className="flex justify-center items-center h-[60vh]">
      <PulseLoader color="#3b82f6" size={15} />
    </div>
  ) : (
    <CustomerDetails
      customer={selectedCustomer}
      onBack={() => {
        setViewMode("list");
        setSelectedCustomer(null);
      }}
    />
  )
) : (
      <Card className="p-0 overflow-hidden border-none shadow-soft dark:shadow-none" noPadding>
        {/* Search */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-all"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left  text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Stores</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">SubStores</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Sensors</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Alerts</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Requests</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

           <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
  {loading ? (
    <tr>
      <td colSpan={8} className="py-10 text-center">
        <div className="flex justify-center items-center py-10">
          <PulseLoader color="#3b82f6" size={15} />
        </div>
      </td>
    </tr>
  ) : customers.length > 0 ? (
    customers.map(customer => (
      <tr
        key={customer._id}
        className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        {/* Customer */}
        <td className="px-6 py-4 flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 dark:text-blue-100 font-bold text-base">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm font-bold">{customer.name}</div>
        </td>

        {/* Contact */}
        <td className="px-6 py-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-4 h-4 dark:text-blue-100" />
            <span className="dark:text-blue-100">{customer.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-500">
            <Phone className="w-4 h-4 text-green-400" />
            <span>{customer.phone}</span>
          </div>
        </td>

        {/* Stores */}
        <td className="px-6 py-4 text-center">
  <div className="flex items-center justify-center gap-2">
    <Store className="w-5 h-5 text-yellow-500" />
    <span className="font-semibold">{getTotalStores(customer)}</span>
  </div>
</td>
        {/* SubStores */}
        <td className="px-6 py-4 text-center">
  <div className="flex items-center justify-center gap-2">
    <Layers className="w-5 h-5 text-blue-500" />
    <span className="font-semibold">{getTotalSubStores(customer)}</span>
  </div>
</td>

        {/* Sensors */}
        <td className="px-6 py-4 text-center">
  <div className="flex items-center justify-center gap-2">

    {/* Single Thermometer */}
    <Thermometer
      className={`w-5 h-5 ${
        getTotalSensors(customer) > 0 ? "text-green-500" : "text-gray-400"
      }`}
    />

    {/* Sensors Count */}
    <span className="ml-1 font-semibold">
      {getTotalSensors(customer)}
    </span>
  </div>
</td>



        {/* Alerts (placeholder) */}
 <td className="px-6 py-4 text-center">
  <div className="flex items-center justify-center gap-2 relative group">
    <AlertTriangle
  className={`w-5 h-5 ${
    getTotalAlerts(customer) > 0 ? "text-red-500" : "text-gray-400"
  }`}
/>
<span className="ml-1 font-semibold">
  {getTotalAlerts(customer)}
</span>


    {getTotalAlerts(customer) > 0 && (
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-xs p-2 rounded shadow-md">
        {customer.stores?.map(store => {
          const storeAlerts =
            (store.sensors?.filter(s => s.status !== "on").length || 0) +
            (store.subStores?.reduce(
              (subAcc: number, sub) =>
                subAcc + (sub.sensors?.filter(s => s.status !== "on").length || 0),
              0
            ) || 0);

          return storeAlerts > 0 ? (
            <div key={store._id}>{store.storeName}: {storeAlerts} alerts</div>
          ) : null;
        })}
      </div>
    )}
  </div>
</td>


        {/* Requests (placeholder) */}
    {/* Requests */}
<td className="px-6 py-4 text-center">
  {getTotalPendingRequests(customer) > 0 ? (
    <button
      onClick={() => handleViewCustomer(customer._id)}
      title="View Pending Requests"
      className="
        inline-flex flex-col items-center justify-center
        px-4 py-2
        rounded-xl
        bg-yellow-100/60
        dark:bg-yellow-900/20
        hover:bg-yellow-200/70
        dark:hover:bg-yellow-900/30
        transition
        min-w-[70px]
      "
    >
      <span className="text-lg font-bold text-yellow-800 dark:text-yellow-300">
        {getTotalPendingRequests(customer)}
      </span>
      <span className="text-xs uppercase tracking-wide text-yellow-700 dark:text-yellow-400">
        pending
      </span>
    </button>
  ) : (
    <div
      className="
        inline-flex flex-col items-center justify-center
        px-4 py-2
        rounded-full
        bg-gray-100/70
        dark:bg-slate-800/50
        min-w-[70px]
      "
    >
      <span className="text-lg font-bold text-gray-400">0</span>
      <span className="text-xs uppercase tracking-wide text-gray-400">
        pending
      </span>
    </div>
  )}
</td>







        {/* Actions */}
        <td className="px-6 py-4 text-right space-x-2">
          <button
            onClick={() => handleViewCustomer(customer._id)}
            className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded-md border border-blue-500 text-sm"
          >
            View
          </button>

          <button
            onClick={() => handleDeleteClick(customer)}
            className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors"
            title="Delete Customer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={8} className="py-6 text-center text-gray-500 dark:text-gray-400">
        No customers found.
      </td>
    </tr>
  )}
</tbody>



          </table>
          {/* Delete Customer Modal */}
          {customerToDelete && (
            <Modal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title="Delete Customer"
              size="sm"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                Are you sure you want to delete {customerToDelete.name}?
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={async () => {
                    try {
                      setLoading(true);
                      await deleteUserById(customerToDelete._id);
                      setCustomers(prev => prev.filter(c => c._id !== customerToDelete._id));
                      setCustomerToDelete(null);
                      setIsDeleteModalOpen(false);
                    } catch (err) {
                      console.error("Error deleting user:", err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </Modal>
          )}
          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-b-xl">

            {/* Page Info */}
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="flex items-center gap-1 px-3"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <Button
                variant="secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex items-center gap-1 px-3"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

        </div>
      </Card>
)}

      {/* Add Customer Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Customer">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
          <Input label="Company Name" placeholder="e.g. Acme Corp" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email Address" type="email" placeholder="admin@acme.com" required />
            <Input label="Phone Number" type="tel" placeholder="(555) 123-4567" required />
          </div>
          <Input label="Password" type="password" placeholder="Temporary Password" required />
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Customer</Button>
          </div>
        </form>
      </Modal>






    </div>
  );
};

export default Customers;
