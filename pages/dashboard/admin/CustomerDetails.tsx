import React from "react";
import {
    ArrowLeft,
    Mail,
    Phone,
    Store,
    Thermometer,
    AlertTriangle,
    FileText, Layers, ChevronRight
} from "lucide-react";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";


interface Props {
    customer: any;
    onBack: () => void;
}

const CustomerDetails: React.FC<Props> = ({ customer, onBack }) => {
    const navigate = useNavigate();

    // Helper functions
    const getTotalStores = () => customer.stores?.length || 0;

    const getTotalSensors = () =>
        customer.stores?.reduce(
            (storeAcc: number, store: any) =>
                storeAcc +
                store.subStores?.reduce(
                    (subAcc: number, sub: any) => subAcc + (sub.sensors?.length || 0),
                    0
                ),
            0
        ) || 0;



    const getTotalAlerts = () => customer.totalAlerts || 0;
    const getTotalPendingRequests = () => 
  customer.requests?.filter((r: any) => r.status === "pending").length || 0;




    return (
        <div className="space-y-8 px-4 sm:px-6 lg:px-8">

            {/* Back Button */}
            <div>
                <Button variant="secondary" onClick={onBack} className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Customers
                </Button>
            </div>

            {/* Customer Header */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-xl text-blue-600 dark:text-blue-400">
                        {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:gap-6 mt-1 text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" /> {customer.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" /> {customer.phone}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                    {/* Total Stores */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                            <Store className="w-6 h-6 text-slate-700 dark:text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {getTotalStores()}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total Stores
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
                                {getTotalSensors()}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total Sensors
                            </p>
                        </div>
                    </div>

                    {/* Total Alerts */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                        <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {getTotalAlerts()}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total Alerts
                            </p>
                        </div>
                    </div>

                    {/* Requests */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                            <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
  <p className="text-2xl font-bold text-gray-900 dark:text-white">
    {getTotalPendingRequests()}
  </p>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Pending Requests
  </p>
</div>

                    </div>



                </div>

            </div>

            {/* Stores Section */}
            <div className="space-y-4 pt-4">
                <h4 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2 text-2xl">
                    <Store className="w-6 h-6" /> Stores
                </h4>

                <div className="grid grid-cols-2 gap-4">
                    {customer.stores?.map((store: any) => {
                        const storeAlerts =
                            (store.sensors?.filter(
                                (s: any) => s.status === "on" && s.notificationStatus === "on"
                            ).length || 0) +
                            (store.subStores?.reduce((acc: number, sub: any) => {
                                const alerts =
                                    sub.sensors?.filter(
                                        (s: any) => s.status === "on" && s.notificationStatus === "on"
                                    ).length || 0;
                                return acc + alerts;
                            }, 0) || 0);


                        const totalSensors = store.subStores?.reduce(
                            (acc: number, sub: any) => acc + (sub.sensors?.length || 0),
                            0
                        );
                        const activeSensors = store.subStores?.reduce(
                            (acc: number, sub: any) =>
                                acc + (sub.sensors?.filter((s: any) => s.status === "on").length || 0),
                            0
                        );

                        return (
                            <div
                                key={store._id}
                                className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-5 hover:shadow-md transition cursor-pointer flex flex-col justify-between border border-gray-200 dark:border-slate-700"
                            >
                                {/* Header */}
                                <div className="flex-col justify-between items-start mb-4 m-4 pt-5  bg-gray-50 dark:bg-slate-700 rounded-t-2xl ">
                                    <div className="flex items-center gap-4 ">
                                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-600 ml-6">
                                            <Store className="w-7 h-7 text-blue-500 dark:text-yellow-500" />
                                        </div>
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {store.storeName}
                                            </h5>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">{store.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3  mt-6 ml-4  ">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-300">
                                            <Layers className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                            {store.subStores?.length} Sub-stores
                                        </div>

                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${totalSensors > 0 ? 'bg-green-100 text-green-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-gray-100 text-gray-400 dark:bg-slate-700/20 dark:text-slate-400'}`}>
                                            <Thermometer className="w-4 h-4" />
                                            {totalSensors} Sensors
                                        </div>

                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${storeAlerts > 0
                                            ? 'bg-red-100 text-red-500 dark:bg-red-900/20 dark:text-red-400'
                                            : 'bg-gray-100 text-gray-400 dark:bg-slate-700/20 dark:text-slate-400'
                                            }`}>
                                            <AlertTriangle className="w-4 h-4" />
                                            {getTotalAlerts()} Alerts
                                        </div>


                                    </div>
                                    <div className="border-t border-gray-100 dark:border-slate-500 mt-6" />
                                </div>

                                <p className="px-6 text-xs tracking-widest text-gray-400 dark:text-slate-500 mb-3">
                                    SUB-STORES ({store.subStores.length})
                                </p>




                                {/* Requests */}
                                {store.requests > 0 && (
                                    <p className="text-xs text-yellow-500 mt-3">{store.requests} request(s)</p>
                                )}

                                {/* Sub-stores */}
                                <div className="mt-3 space-y-2 mx-6 mb-6 ">
                                    {store.subStores?.map((subStore: any) => {
    const subActive = subStore.sensors?.filter((s: any) => s.status === "on").length || 0;
    const subTotal = subStore.sensors?.length || 0;

    const subPendingRequests = customer.requests.filter(
        (r: any) => r.subStoreId === subStore._id && r.status === "pending"
    ).length;

                                        return (
                                            <div
                                                key={subStore._id}
                                                className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-4 rounded-xl transition cursor-pointer"
                                                onClick={() =>
                                                    navigate(`/admin/locations/${store._id}`, {
                                                        state: { pageTitle: subStore.name },
                                                    })
                                                }

                                            >
                                                <div className="flex flex-col">
        <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${subActive > 0 ? 'bg-green-400' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{subStore.name}</span>
        </div>

        {/* Request below name */}
       {subPendingRequests > 0 && (
                    <p className="text-xs text-yellow-500 mt-1">
                        {subPendingRequests} request(s) pending
                    </p>
                )}
    </div>

    {/* Right side: Sensors */}
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-300">
        <Thermometer className={`w-4 h-4 ${subActive > 0 ? 'text-green-500' : 'text-gray-400'}`} />
        {subActive}/{subTotal}
        <ChevronRight className="w-4 h-4" />
    </div>
</div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>



        </div>
    );
};

export default CustomerDetails;
