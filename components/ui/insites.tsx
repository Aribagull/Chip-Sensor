<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

  {/* Smart Insights */}
  <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg space-y-4">
    <div className="flex items-center gap-2 mb-3">
      <FiActivity className="text-xl text-blue-600 dark:text-blue-400" />
      <h3 className="text-lg font-semibold">Smart Insights</h3>
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
        <span className="text-red-600">❗</span>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          1 sensor exceeded maximum temperature threshold.
        </p>
      </div>
      <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
        <span className="text-yellow-600">⚠️</span>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          1 sensor is currently offline.
        </p>
      </div>
    </div>
  </div>

  {/* Recent Alerts */}
  <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
    <div className="flex items-center gap-2 mb-3">
      <FiAlertCircle className="text-xl text-red-600 dark:text-red-400" />
      <h3 className="text-lg font-semibold">Recent Alerts</h3>
    </div>
    <div className="flex items-center justify-between bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Lab Refrigerator</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">22.1°C • High temp</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500">Dec 31, 16:07</span>
    </div>
  </div>

  {/* Temperature Summary */}
  <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-3">Temperature Summary (Last 7 Days)</h3>
  
  <div className="lg:col-span-1 grid grid-cols-3 gap-4">
    
    {/* Lowest */}
    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl text-center">
      <FiThermometer className="mx-auto text-blue-600 dark:text-blue-400 text-2xl mb-1" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Lowest Recorded</p>
      <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-1">17.4°C</p>
    </div>


    {/* Average */}
    <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl text-center">
      <FiThermometer className="mx-auto text-gray-600 dark:text-gray-300 text-2xl mb-1" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Average Temperature</p>
      <p className="text-xl font-semibold mt-1">21.8°C</p>
    </div>

    {/* Highest */}
    <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-xl text-center">
      <FiThermometer className="mx-auto text-orange-600 dark:text-orange-400 text-2xl mb-1" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Highest Recorded</p>
      <p className="text-xl font-semibold text-orange-600 dark:text-orange-400 mt-1">27.0°C</p>
    </div>
  </div>
</div>
</div>