// components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  data: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: data,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'グラフタイトル',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
