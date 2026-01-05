import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Alert {
  level: 1 | 2 | 3;
}

interface Props {
  alerts: Alert[];
}

const DoughnutChart: React.FC<Props> = ({ alerts }) => {
  // Count alerts by level
  const levelCounts = [0, 0, 0]; // 0: Critical, 1: Warning, 2: Notice
  alerts.forEach((a) => levelCounts[a.level - 1]++);

  const data = {
    labels: ["Critical", "Warning", "Notice"],
    datasets: [
      {
        data: levelCounts,
        backgroundColor: ["#f87171", "#fbbf24", "#60a5fa"], // red, yellow, blue
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
