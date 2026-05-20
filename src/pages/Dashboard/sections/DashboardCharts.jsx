import { useMemo, useState } from 'react'
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
import styles from './DashboardCharts.module.scss'

const DashboardCharts = ({ applicants }) => {
  const [trendDays, setTrendDays] = useState(7)

  const barData = useMemo(() => getBarChartData(applicants), [applicants])
  const pieData = useMemo(() => getPieChartData(applicants), [applicants])
  const lineData = useMemo(
    () => getLineChartData(applicants, trendDays),
    [applicants, trendDays]
  )
  const counts = useMemo(() => getStatusCounts(applicants), [applicants])
  const successRate = useMemo(() => getSuccessRate(applicants), [applicants])

  const finalized = counts.granted + counts.refused

  return (
    <div className={styles.grid}>

      {/* Donut / Status Distribution */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h3 className={styles.chartTitle}>
              <i className='bx bx-pie-chart-alt-2'></i>
              Status Distribution
            </h3>
            <p className={styles.chartSub}>Overall visa outcome breakdown</p>
          </div>
          <div className={styles.rateBadge}>
            {successRate}% Granted
          </div>
        </div>

        <PieChart data={pieData} height={220} />

        <div className={styles.donutLegend}>
          {[
            { label: 'Granted', val: counts.granted, cls: styles.dotGreen },
            { label: 'Refused', val: counts.refused, cls: styles.dotRed },
            { label: 'In Process', val: counts.underProcess, cls: styles.dotYellow },
          ].map(item => (
            <div key={item.label} className={styles.legendRow}>
              <div className={styles.legendLeft}>
                <span className={`${styles.legendDot} ${item.cls}`}></span>
                <span className={styles.legendLabel}>{item.label}</span>
              </div>
              <div className={styles.legendRight}>
                <strong>{item.val}</strong>
                <span className={styles.legendPct}>
                  {counts.total > 0
                    ? `${Math.round((item.val / counts.total) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
          ))}
          <div className={styles.legendDivider}></div>
          <div className={styles.legendRow}>
            <span className={styles.legendLabel} style={{ fontWeight: 700 }}>Finalized</span>
            <strong>{finalized}</strong>
          </div>
        </div>
      </div>

      {/* Bar Chart — University */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h3 className={styles.chartTitle}>
              <i className='bx bx-bar-chart-alt-2'></i>
              University Breakdown
            </h3>
            <p className={styles.chartSub}>Applications per university</p>
          </div>
        </div>
        <BarChart data={barData} height={300} />
      </div>

      {/* Line Chart — Trend */}
      <div className={`${styles.chartCard} ${styles.fullWidth}`}>
        <div className={styles.chartHeader}>
          <div>
            <h3 className={styles.chartTitle}>
              <i className='bx bx-trending-up'></i>
              Application Trend
            </h3>
            <p className={styles.chartSub}>
              Daily grants & refusals over the last {trendDays} days
            </p>
          </div>
          <div className={styles.trendToggle}>
            {[7, 14, 30].map(d => (
              <button
                key={d}
                className={`${styles.toggleBtn} ${trendDays === d ? styles.toggleActive : ''}`}
                onClick={() => setTrendDays(d)}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
        <LineChart data={lineData} height={260} />
      </div>

    </div>
  )
}

export default DashboardCharts