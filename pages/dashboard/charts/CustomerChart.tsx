import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface CustomerChartProps {
  data: { date: string; count: number }[];
  title: string;
}

const CustomerChart: React.FC<CustomerChartProps> = ({ data, title }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Customers',
        data: data.map(d => d.count),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Tailwind blue-500 with transparency
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.4, // smooth curve
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverRadius: 6,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CustomerChart;
