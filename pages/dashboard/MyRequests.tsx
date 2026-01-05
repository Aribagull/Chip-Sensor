import React, { useState, useEffect } from 'react';
import { Filter, Calendar, MapPin, Package, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { getMyRequests, deleteRequest, RequestData } from '../../Api/Sensors/sensorrequests';
import ClipLoader from "react-spinners/ClipLoader";



const MyRequests: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async (status?: string) => {
    try {
      setLoading(true);
      const data = await getMyRequests(status);
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

    try {
      await deleteRequest(id);
      alert("Request deleted successfully!");
      fetchRequests(filter);
    } catch (error) {
      console.error("Failed to delete request:", error);
      alert("Failed to delete request. Please try again.");
    }
  };

  useEffect(() => {
    fetchRequests(filter);
  }, [filter]);

  const getStatusBadge = (status: RequestData['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;

      case 'under_review':
        return <Badge variant="neutral">Under Review</Badge>;

      case 'approved':
        return <Badge variant="success">Approved</Badge>;

      case 'payment_pending':
        return <Badge variant="warning">Payment Pending</Badge>;

      case 'active':
        return <Badge variant="success">Active</Badge>;

      case 'completed':
        return <Badge variant="success">Completed</Badge>;

      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;

      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;

      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };


  return (
    <div className="space-y-6">
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Sensor Requests</h1>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            className="border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl text-sm focus:ring-primary focus:border-primary p-2.5 outline-none transition-colors"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="payment_pending">Payment Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

        </div>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ClipLoader color="#0f41ccff" loading={loading} size={50} />
        </div>
      ) : requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <Card key={req._id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-gray-500 dark:text-gray-400 text-sm">Organization:{req.customerId.organizationName}</span>

                    <div className="md:hidden">{getStatusBadge(req.status)}</div>
                  </div>

                  <div className="flex items-center text-gray-900 dark:text-white font-bold text-lg mb-1">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {req.storeId?.storeName || 'N/A'} <span className="text-gray-400 mx-2">→</span> {req.subStoreId?.name || 'N/A'}
                  </div>


                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4 font-medium">
                    <Package className="h-4 w-4 mr-2 text-gray-400" />
                    Requested Sensors: {req.requestedSensors} ({req.sensorType})
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> Submitted: {new Date(req.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

               <div className="flex flex-col items-end space-y-3 min-w-[200px]">
  {/* Delete icon sirf pending requests ke liye */}
  {req.status === 'pending' && (
    <Trash2 
      className="h-4 w-4 text-red-500 cursor-pointer" 
      onClick={() => handleDelete(req._id)} 
    />
  )}

  <div className="hidden md:block">{getStatusBadge(req.status)}</div>

  {req.description && (
    <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-900/50 text-xs p-3 rounded-lg w-full">
      <strong className="block mb-1">Description:</strong>
      {req.description}
    </div>
  )}
</div>

              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
