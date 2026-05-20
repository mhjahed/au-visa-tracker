import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom',
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
      callbacks: {
        label: (ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0)
          const pct = total > 0 ? Math.round((ctx.raw / total) * 100) : 0
          return ` ${ctx.label}: ${ctx.raw} (${pct}%)`
        },
      },
    },
  },
}

const PieChart = ({ data, options = {}, height = 280 }) => {
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
      <Doughnut data={data} options={merged} />
    </div>
  )
}

export default PieChart