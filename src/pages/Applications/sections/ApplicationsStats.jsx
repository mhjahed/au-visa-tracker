import { useMemo } from 'react'
import {
  getStatusCounts,
  getSuccessRate,
  getAverageWaitingDays,
  getProcessingRatio,
} from '@utils/analytics'
import styles from './ApplicationsStats.module.scss'

const ApplicationsStats = ({ applicants }) => {
  const counts = useMemo(() => getStatusCounts(applicants), [applicants])
  const successRate = useMemo(() => getSuccessRate(applicants), [applicants])
  const avgWait = useMemo(() => getAverageWaitingDays(applicants), [applicants])
  const processingRatio = useMemo(() => getProcessingRatio(applicants), [applicants])

  const cards = [
    {
      id: 'total',
      label: 'Total',
      value: counts.total,
      icon: 'bx-file-blank',
      color: 'blue',
      trend: 'All applications',
    },
    {
      id: 'process',
      label: 'In Process',
      value: counts.underProcess,
      icon: 'bx-time-five',
      color: 'yellow',
      trend: `${processingRatio}% of total`,
    },
    {
      id: 'granted',
      label: 'Granted',
      value: counts.granted,
      icon: 'bx-check-shield',
      color: 'green',
      trend: `${successRate}% success rate`,
    },
    {
      id: 'refused',
      label: 'Refused',
      value: counts.refused,
      icon: 'bx-shield-x',
      color: 'red',
      trend: `${counts.total > 0 ? Math.round((counts.refused / counts.total) * 100) : 0}% refusal rate`,
    },
    {
      id: 'avgwait',
      label: 'Avg Wait',
      value: `${avgWait}d`,
      icon: 'bx-calendar-check',
      color: 'purple',
      trend: 'Finalized cases',
    },
    {
      id: 'rate',
      label: 'Grant Rate',
      value: `${successRate}%`,
      icon: 'bx-trending-up',
      color: 'teal',
      trend: 'Among finalized',
    },
  ]

  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`${styles.card} ${styles[card.color]}`}
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          <div className={styles.top}>
            <div className={styles.iconWrap}>
              <i className={`bx ${card.icon}`}></i>
            </div>
            <span className={styles.label}>{card.label}</span>
          </div>
          <div className={styles.value}>{card.value}</div>
          <div className={styles.trend}>
            <i className='bx bx-right-arrow-alt'></i>
            {card.trend}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ApplicationsStats