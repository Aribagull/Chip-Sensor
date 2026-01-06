import React, { useState, useEffect } from 'react';
import { Plus, Search, Mail, Phone, Layers, Building, Briefcase, User, Trash2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import { getAllUsers, getUserById, deleteUserById } from '../../../Api/admin/customers';
import ClipLoader from "react-spinners/ClipLoader";


const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any | null>(null);


  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setCustomers(data.users.filter((u: any) => u.role === 'customer'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" /> Add Customer
        </Button>
      </div>

    
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
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Services</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Organization Name</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Massage</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

                 <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
      {loading ? (
        <tr>
          <td colSpan={7} className="py-10 text-center">
            <ClipLoader color="#0f41ccff" size={35} />
          </td>
        </tr>
      ) : filteredCustomers.length > 0 ? (
        filteredCustomers.map((customer) => (
          <tr key={customer._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
            <td className="px-6 py-4 flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 dark:text-blue-100 font-bold text-base">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm font-bold">{customer.name}</div>
            </td>

            <td className="px-6 py-4 space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 dark:text-blue-100" />
                <span className='dark:text-blue-100'>{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-500">
                <Phone className="w-4 h-4 text-green-400" />
                <span>{customer.phone}</span>
              </div>
            </td>

            <td className="px-6 py-4 text-center">
              <span className="font-semibold bg-gray-100 dark:bg-slate-700 p-3 rounded-full">{customer.role}</span>
            </td>

            <td className="px-6 py-4 text-center font-mono">{customer.services || 'other'}</td>
            <td className="px-6 py-4 text-center flex items-center justify-center space-x-1">
              <Building className="w-4 h-4 text-blue-400" />
              <span className="font-mono">{customer.organizationName}</span>
            </td>
            <td className="px-6 py-4 text-center font-mono">{customer.message}</td>

            <td className="px-6 py-4 text-right space-x-2">
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
          <td colSpan={7} className="py-6 text-center text-gray-500 dark:text-gray-400">
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

          </div>
        </Card>

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
