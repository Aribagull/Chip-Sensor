import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

interface TemperatureRecord {
  currentTempC: number;
  recordedAt: string; // ISO timestamp
}

interface Props {
  records?: TemperatureRecord[]; // optional to avoid undefined
  minTemp?: number;
  maxTemp?: number;
}

type FilterType = 'today' | 'yesterday' | 'custom';

const TemperatureChart: React.FC<Props> = ({ records = [], minTemp, maxTemp }) => {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));
  const [filter, setFilter] = useState<FilterType>('today');
  const [selectedDate, setSelectedDate] = useState('');

  // 🌙 Observe dark mode toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // 🔹 Prepare data and timestamps
  const data = records.map(r => r.currentTempC);
  const labels = records.map(r => new Date(r.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const timestamps = records.map(r => new Date(r.recordedAt));

  // ⏱ Filter logic
  const getFilteredData = () => {
    let filteredData: number[] = [];
    let filteredLabels: string[] = [];

    const now = new Date();

    if (filter === 'today') {
      filteredData = data.filter((_, i) => now.getTime() - timestamps[i].getTime() <= 24 * 60 * 60 * 1000);
      filteredLabels = labels.filter((_, i) => now.getTime() - timestamps[i].getTime() <= 24 * 60 * 60 * 1000);
    } else if (filter === 'yesterday') {
      const yesterdayStart = new Date();
      yesterdayStart.setDate(yesterdayStart.getDate() - 1);
      yesterdayStart.setHours(0, 0, 0, 0);

      const yesterdayEnd = new Date();
      yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
      yesterdayEnd.setHours(23, 59, 59, 999);

      filteredData = data.filter((_, i) => timestamps[i] >= yesterdayStart && timestamps[i] <= yesterdayEnd);
      filteredLabels = labels.filter((_, i) => timestamps[i] >= yesterdayStart && timestamps[i] <= yesterdayEnd);
    } else if (filter === 'custom' && selectedDate) {
      const customStart = new Date(selectedDate);
      customStart.setHours(0, 0, 0, 0);

      const customEnd = new Date(selectedDate);
      customEnd.setHours(23, 59, 59, 999);

      filteredData = data.filter((_, i) => timestamps[i] >= customStart && timestamps[i] <= customEnd);
      filteredLabels = labels.filter((_, i) => timestamps[i] >= customStart && timestamps[i] <= customEnd);
    }

    return { filteredData, filteredLabels };
  };

  const { filteredData, filteredLabels } = getFilteredData();

  // 🔹 Chart data
  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: filteredData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.4,
        pointRadius: 3,
        fill: true,
      },
    ],
  };

  // 🔹 Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.raw} °C`,
        },
        backgroundColor: isDark ? '#1f2937' : '#f9fafb',
        titleColor: isDark ? '#fff' : '#111827',
        bodyColor: isDark ? '#fff' : '#111827',
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? '#fff' : '#4b5563' },
        grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
      },
      y: {
        min: minTemp,
        max: maxTemp,
        ticks: {
          color: isDark ? '#fff' : '#4b5563',
          callback: (v: any) => `${v}°C`,
        },
        grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
      },
    },
  };

  return (
    <div className="w-full rounded-xl bg-white dark:bg-slate-800 p-4 shadow-md">
      {/* 🔹 FILTERS */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Temperature Record{' '}
          {filteredLabels.length > 0 ? (
            <span className="text-sm font-normal text-gray-500 dark:text-gray-300">
              ({filteredLabels.length} {filteredLabels.length === 1 ? 'hour' : 'hours'})
            </span>
          ) : (
            <span className="text-sm font-normal text-red-500 dark:text-red-400">
              (No data)
            </span>
          )}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {/* Today */}
          <button
            onClick={() => setFilter('today')}
            className={`px-4 py-1.5 rounded-md text-sm ${
              filter === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            Today
          </button>

          {/* Yesterday */}
          <button
            onClick={() => setFilter('yesterday')}
            className={`px-4 py-1.5 rounded-md text-sm ${
              filter === 'yesterday'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            Yesterday
          </button>

          {/* Custom Date */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setFilter('custom');
            }}
            className="px-3 py-1.5 rounded-md text-sm border dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="h-56">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TemperatureChart;
