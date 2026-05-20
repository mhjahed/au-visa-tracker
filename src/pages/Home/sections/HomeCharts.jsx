import { useMemo } from 'react'
import BarChart from '@components/charts/BarChart'
import PieChart from '@components/charts/PieChart'
import LineChart from '@components/charts/LineChart'
import {
  getBarChartData,
  getPieChartData,
  getLineChartData,
  getStatusCounts,
  getSuccessRate,
} from '@utils/analytics'
import styles from './HomeCharts.module.scss'

const HomeCharts = ({ applicants }) => {
  const barData = useMemo(() => getBarChartData(applicants), [applicants])
  const pieData = useMemo(() => getPieChartData(applicants), [applicants])
  const lineData = useMemo(() => getLineChartData(applicants, 7), [applicants])
  const counts = useMemo(() => getStatusCounts(applicants), [applicants])
  const successRate = useMemo(() => getSuccessRate(applicants), [applicants])

  return (
    <div className={styles.grid}>
      {/* Bar Chart */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h3 className={styles.chartTitle}>
              <i className='bx bx-bar-chart-alt-2'></i>
              University Overview
            </h3>
            <p className={styles.chartSub}>Applications by university</p>
          </div>
        </div>
        <BarChart data={barData} height={280} />
      </div>

      {/* Pie / Doughnut Chart */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h3 className={styles.chartTitle}>
              <i className='bx bx-pie-chart-alt-2'></i>
              Status Distribution
            </h3>
            <p className={styles.chartSub}>Overall breakdown</p>
          </div>
          <div className={styles.successBadge}>
            {successRate}% Success
          </div>
        </div>

        <PieChart data={pieData} height={220} />

        <div className={styles.pieLegend}>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotGreen}`}></span>
            <span>Granted</span>
            <strong>{counts.granted}</strong>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotRed}`}></span>
            <span>Refused</span>
            <strong>{counts.refused}</strong>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotYellow}`}></span>
            <span>In Process</span>
            <strong>{counts.underProcess}</strong>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className={`${styles.chartCard} ${styles.fullWidth}`}>
        <div className={styles.chartHeader}>
          <div>
            <h3 className={styles.chartTitle}>
              <i className='bx bx-trending-up'></i>
              7-Day Trend
            </h3>
            <p className={styles.chartSub}>Daily grants and refusals over the last 7 days</p>
          </div>
        </div>
        <LineChart data={lineData} height={240} />
      </div>
    </div>
  )
}

export default HomeCharts