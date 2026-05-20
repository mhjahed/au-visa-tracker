import { useMemo } from 'react'
import {
  getStatusCounts,
  getSuccessRate,
  getAverageWaitingDays,
  getProcessingRatio,
  getTodayStats,
} from '@utils/analytics'
import styles from './DashboardMetrics.module.scss'

const DashboardMetrics = ({ applicants }) => {
  const counts = useMemo(() => getStatusCounts(applicants), [applicants])
  const successRate = useMemo(() => getSuccessRate(applicants), [applicants])
  const avgWait = useMemo(() => getAverageWaitingDays(applicants), [applicants])
  const processingRatio = useMemo(() => getProcessingRatio(applicants), [applicants])
  const today = useMemo(() => getTodayStats(applicants), [applicants])

  const primaryCards = [
    {
      id: 'total',
      label: 'Total Applications',
      value: counts.total,
      icon: 'bx-file-blank',
      color: 'blue',
      detail: 'All recorded cases',
      detailIcon: 'bx-info-circle',
    },
    {
      id: 'granted',
      label: 'Visa Granted',
      value: counts.granted,
      icon: 'bx-check-shield',
      color: 'green',
      detail: `${successRate}% success rate`,
      detailIcon: 'bx-trending-up',
    },
    {
      id: 'refused',
      label: 'Visa Refused',
      value: counts.refused,
      icon: 'bx-shield-x',
      color: 'red',
      detail: `${counts.total > 0 ? Math.round((counts.refused / counts.total) * 100) : 0}% of total`,
      detailIcon: 'bx-trending-down',
    },
    {
      id: 'process',
      label: 'Under Process',
      value: counts.underProcess,
      icon: 'bx-time-five',
      color: 'yellow',
      detail: `${processingRatio}% of total`,
      detailIcon: 'bx-loader-circle',
    },
  ]

  const secondaryCards = [
    {
      id: 'avgwait',
      label: 'Avg. Wait Time',
      value: avgWait,
      unit: 'days',
      icon: 'bx-calendar-check',
      color: 'purple',
      detail: 'Across finalized cases',
    },
    {
      id: 'rate',
      label: 'Grant Rate',
      value: `${successRate}%`,
      unit: '',
      icon: 'bx-bar-chart-alt-2',
      color: 'teal',
      detail: 'Among finalized only',
    },
    {
      id: 'todaygrant',
      label: "Today's Grants",
      value: today.granted,
      unit: '',
      icon: 'bx-trophy',
      color: 'gold',
      detail: 'Granted today',
    },
    {
      id: 'finalized',
      label: 'Finalized Cases',
      value: counts.granted + counts.refused,
      unit: '',
      icon: 'bx-check-double',
      color: 'navy',
      detail: 'Decided applications',
    },
  ]

  return (
    <div className={styles.wrapper}>
      {/* Primary Cards */}
      <div className={styles.primaryGrid}>
        {primaryCards.map((card, i) => (
          <div
            key={card.id}
            className={`${styles.primaryCard} ${styles[card.color]}`}
            style={{ animationDelay: `${i * 0.09}s` }}
          >
            <div className={styles.primaryTop}>
              <div className={styles.primaryIcon}>
                <i className={`bx ${card.icon}`}></i>
              </div>
              <div className={styles.primaryLabel}>{card.label}</div>
            </div>
            <div className={styles.primaryValue}>{card.value}</div>
            <div className={styles.primaryDetail}>
              <i className={`bx ${card.detailIcon}`}></i>
              {card.detail}
            </div>

            {/* Progress bar relative to total */}
            {card.id !== 'total' && counts.total > 0 && (
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.round((card.value / counts.total) * 100)}%`
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Secondary Cards */}
      <div className={styles.secondaryGrid}>
        {secondaryCards.map((card, i) => (
          <div
            key={card.id}
            className={`${styles.secondaryCard} ${styles[card.color]}`}
            style={{ animationDelay: `${(i + 4) * 0.09}s` }}
          >
            <div className={styles.secondaryIcon}>
              <i className={`bx ${card.icon}`}></i>
            </div>
            <div className={styles.secondaryContent}>
              <div className={styles.secondaryValue}>
                {card.value}
                {card.unit && <span className={styles.secondaryUnit}>{card.unit}</span>}
              </div>
              <div className={styles.secondaryLabel}>{card.label}</div>
              <div className={styles.secondaryDetail}>{card.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardMetrics