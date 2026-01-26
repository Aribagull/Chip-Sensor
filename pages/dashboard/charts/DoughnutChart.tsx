import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  totalAlerts: number;
  totalSmsAlerts: number;
  totalEmailAlerts: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ totalAlerts, totalSmsAlerts, totalEmailAlerts }) => {
  const data = {
    labels: ["Total Alerts", "SMS Alerts", "Email Alerts"],
    datasets: [
      {
        data: [totalAlerts, totalSmsAlerts, totalEmailAlerts],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa"], // red, green, blue
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
    },
  };

  return <Doughnut data={data} options={options} />;
};


export default DoughnutChart;
