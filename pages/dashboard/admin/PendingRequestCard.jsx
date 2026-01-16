import {
  Clock,
  Thermometer,
  AlertCircle,
  Store,
  Layers,
} from "lucide-react";
import Card from "../../../components/ui/Card";

const PendingRequestCard = ({ request }) => {
  return (
    <Card className="border-l-4 border-l-yellow-500">
      <div className="flex flex-col md:flex-row justify-between gap-6">

        {/* LEFT INFO */}
        <div className="flex-1 space-y-3">

          {/* Urgent */}
          {request.urgency === "urgent" && (
            <span className="flex items-center text-red-600 dark:text-red-400 font-bold text-sm uppercase">
              <AlertCircle className="h-4 w-4 mr-1" />
              Urgent
            </span>
          )}

          {/* Customer */}
         {/* Customer */}
<div className="flex items-center gap-3">
  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 font-bold">
    {request.customer?.name?.charAt(0)?.toUpperCase() || "U"}
  </div>

  <div>
    <h3 className="text-2xl font-bold">
      {request.customer?.name || "N/A"}
    </h3>
    <p className="text-sm">{request.customer?.email || "N/A"}</p>
    <p className="text-sm">{request.customer?.phone || "N/A"}</p>
  </div>
</div>

{/* Store → SubStore */}
<div className="flex items-center font-semibold text-lg">
  <Store className="h-5 w-5 mr-2 text-yellow-600" />
  {request.store?.storeName || "N/A"}
  <span className="mx-2">→</span>
  {request.subStore?.name || "N/A"}
</div>

          {/* Requested Items */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-1">
              Requested Items
            </p>
            <ul className="list-disc list-inside text-sm text-blue-900 dark:text-blue-100 space-y-1">
              <li className="flex items-center">
                <Thermometer className="h-5 w-5 mr-2 text-green-600" />
                {request.sensorType} Sensor
              </li>
              <li>Quantity: {request.requestedSensors}</li>
              <li>Description: {request.description}</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-between items-end min-w-[200px]">
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {new Date(request.createdAt).toLocaleString()}
          </div>

          <span className="mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300">
            Pending
          </span>
        </div>

      </div>
    </Card>
  );
};

export default PendingRequestCard;
