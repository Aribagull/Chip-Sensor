import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Calendar, Truck, AlertCircle, Trash2, Store, Thermometer, Layers } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Checkbox from '../../../components/ui/Checkbox';
import { ServiceRequest, RequestStatus, ServiceRequestData } from '../../../types';
import { getAllRequests, deleteAdminSensorRequest, updateAdminSensorRequestStatus } from '../../../Api/Sensors/sensorrequests';
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';



const requestStatuses: { status: RequestStatus; label: string; icon: any }[] = [
  { status: "pending", label: "Pending", icon: Clock },
  { status: "under_review", label: "Under Review", icon: Calendar },
  { status: "approved", label: "Approved", icon: CheckCircle },
  { status: "rejected", label: "Rejected", icon: AlertCircle },
  { status: "payment_pending", label: "Payment Pending", icon: Clock },
  { status: "active", label: "Active", icon: Truck },
  { status: "completed", label: "Completed", icon: CheckCircle },
  { status: "cancelled", label: "Cancelled", icon: Trash2 },
];

const SensorRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RequestStatus>("pending");
  const [requests, setRequests] = useState<ServiceRequestData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<ServiceRequest | null>(null);


  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getAllRequests();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(r => r.status === activeTab);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await deleteAdminSensorRequest(id);
      setRequests(prev => prev.filter(r => r._id !== id));
      toast.success("Request deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete request. Try again.");
    }
  };

  const handleStatusUpdate = async (reqId: string, newStatus: RequestStatus) => {
    try {
      await updateAdminSensorRequestStatus(reqId, newStatus);
      setRequests(prev =>
        prev.map(r => (r._id === reqId ? { ...r, status: newStatus } : r))
      );
      toast.success(`Request status updated to ${newStatus}!`);
      setActiveTab(newStatus);
    } catch (err) {
      toast.error("Failed to update request status. Try again.");
    }
  };

  const handleApproveClick = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setIsApproveModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sensor Requests</h1>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-soft dark:shadow-none rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="border-b border-gray-200 dark:border-slate-700">
          <nav className="-mb-px flex flex-wrap">
            {requestStatuses.map(({ status, label, icon: Icon }) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`py-4 px-3 text-center border-b-2 font-medium text-sm flex items-center justify-center space-x-2 transition-colors ${activeTab === status
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-slate-600"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                <span
                  className={`ml-2 py-0.5 px-2.5 rounded-full text-xs ${activeTab === status
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-200"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                    }`}
                >
                  {requests.filter(r => r.status === status).length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-[500px] space-y-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <PulseLoader color="#3b82f6" size={15} />
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No requests in this category.
            </div>
          ) : (

            filteredRequests.map(req => (
              <Card
                key={req._id}
                className={`border-l-4 ${req.urgency === "urgent" ? "border-l-red-500" : "border-l-blue-500"}`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Left Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between md:justify-start md:space-x-4">
                      {req.urgency === 'urgent' && (
                        <span className="flex items-center text-red-600 dark:text-red-400 font-bold text-sm uppercase">
                          <AlertCircle className="h-4 w-4 mr-1" /> Urgent
                        </span>
                      )}
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 dark:text-blue-100  font-bold text-base">
                          {req.customerId?.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {req.customerId?.name || "N/A"}
                        </h3>
                      </div>

                      <div className="flex-col my-2  items-center gap-5">
                        <h3 className="text-base text-gray-700 dark:text-gray-300">Email: {req.customerId?.email || "N/A"}</h3>
                        <h3 className="text-base text-gray-700 dark:text-gray-300">Phone: {req.customerId?.phone || "N/A"}</h3>
                      </div>
                      <div className="flex items-center text-gray-900 dark:text-white font-bold text-lg mb-1">
                    <Store className="h-6 w-6 mr-2 text-yellow-600" />
                    {req.storeId?.storeName || 'N/A'} <span className="text-gray-400 mx-2 flex gap-2">→ <Layers className="h-6 w-6 mr-2 text-yellow-600" /></span>{req.subStoreId?.name || 'N/A'}
                  </div>

                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                      <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-1">Requested Items</p>
                      <ul className="list-disc list-inside text-sm text-blue-900 dark:text-blue-100">
                        <li className='flex items-center'><Thermometer className="h-5 w-5 mr-2 text-green-600" />{req.sensorType} Sensor</li>
                        <li>Quantity: {req.requestedSensors}</li>
                        <li>Description: {req.description}</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-col justify-between items-end min-w-[200px] h-full">
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-end mb-1">
                        <Clock className="h-3 w-3 mr-1" /> Submitted: {new Date(req.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setRequestToDelete(req);
                        setIsDeleteModalOpen(true);
                      }}
                      className="flex items-center text-red-600 dark:text-red-400 text-sm mt-2 hover:underline"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </button>

                    <div className="mt-6 w-full">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusUpdate(req._id, e.target.value as RequestStatus)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      >
                        {requestStatuses.map(({ status, label }) => (
                          <option key={status} value={status}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

            ))
          )}
        </div>
      </div>

      {/* APPROVE MODAL */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title={`Approve Request ${selectedRequest?._id}`}
        size="lg"
      >
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (selectedRequest) {
              handleStatusUpdate(selectedRequest._id, "approved");
            }
            setIsApproveModalOpen(false);
          }}
        >
          <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-3">
              Assign Sensor Serial Numbers
            </h4>
            <div className="space-y-3">
              <Input label="Temp Probe 1 Serial" placeholder="SN-TEMP-________" />
              <Input label="Temp Probe 2 Serial" placeholder="SN-TEMP-________" />
              <Input label="Door Sensor Serial" placeholder="SN-DOOR-________" />
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-slate-700 pt-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Message to Customer
            </label>
            <textarea
              className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm mb-3"
              rows={2}
              defaultValue="Your request has been approved! Our technician will arrive on the scheduled date."
            />
            <div className="flex space-x-4">
              <Checkbox label="Notify via WhatsApp" id="wa-notify" defaultChecked />
              <Checkbox label="Notify via Email" id="email-notify" defaultChecked />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setIsApproveModalOpen(false)}>Cancel</Button>
            <Button type="submit">Approve & Notify</Button>
          </div>
        </form>
      </Modal>
      {/* DELETE CONFIRM MODAL */}
<Modal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  title="Confirm Delete"
  size="sm"
>
  <p className="text-gray-700 dark:text-gray-300 mb-4">
    Are you sure you want to delete this request?
  </p>
  <div className="flex justify-end space-x-3">
    <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
      Cancel
    </Button>
   <Button
  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition"
  onClick={async () => {
    if (!requestToDelete) return;
    try {
      await deleteAdminSensorRequest(requestToDelete._id);
      setRequests(prev => prev.filter(r => r._id !== requestToDelete._id));
      setIsDeleteModalOpen(false);
      alert("Request deleted successfully!");
    } catch (err) {
      alert("Failed to delete request. Try again.");
    }
  }}
>
  Delete
</Button>

  </div>
</Modal>

    </div>
  );
};

export default SensorRequests;
