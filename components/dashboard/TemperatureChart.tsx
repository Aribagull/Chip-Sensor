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

interface Props {
  data: number[];
  labels: string[];
  minTemp?: number;
  maxTemp?: number;
}

const TemperatureChart: React.FC<Props> = ({ data, labels, minTemp, maxTemp }) => {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));

  // Observe dark mode toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data,
        borderColor: '#3b82f6', 
        backgroundColor: 'rgba(59,130,246,0.2)', 
        tension: 0.4, 
        pointRadius: 3,
        pointBackgroundColor: '#3b82f6',
        fill: true,
      },
    ],
  };

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
        grid: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          lineWidth: 1,
        },
      },
      y: {
        min: minTemp,
        max: maxTemp,
        ticks: { color: isDark ? '#fff' : '#4b5563', callback: (v: any) => `${v}°C` },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div className="h-56 w-full rounded-xl bg-white dark:bg-slate-800 p-3 shadow-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TemperatureChart;
