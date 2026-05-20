import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { family: 'Poppins', size: 12 },
        usePointStyle: true,
        pointStyleWidth: 8,
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: '#0A2647',
      titleFont: { family: 'Poppins', size: 12, weight: '600' },
      bodyFont: { family: 'Poppins', size: 11 },
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { family: 'Poppins', size: 11 },
        color: '#6B7280',
      },
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: {
        font: { family: 'Poppins', size: 11 },
        color: '#6B7280',
        stepSize: 1,
      },
      beginAtZero: true,
    },
  },
}

const BarChart = ({ data, options = {}, height = 300 }) => {
  const merged = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...(options.plugins || {}),
    },
  }

  return (
    <div style={{ height }}>
      <Bar data={data} options={merged} />
    </div>
  )
}

export default BarChart