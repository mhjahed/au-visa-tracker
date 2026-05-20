import { useMemo } from 'react'
import { getStatusCounts, getSuccessRate, getAverageWaitingDays } from '@utils/analytics'
import styles from './SummaryCards.module.scss'

const SummaryCards = ({ applicants }) => {
  const counts = useMemo(() => getStatusCounts(applicants), [applicants])
  const successRate = useMemo(() => getSuccessRate(applicants), [applicants])
  const avgWait = useMemo(() => getAverageWaitingDays(applicants), [applicants])

  const cards = [
    {
      id: 'total',
      label: 'Total Applications',
      value: counts.total,
      icon: 'bx-file-blank',
      color: 'blue',
      sub: 'All recorded applications',
      subIcon: 'bx-info-circle',
    },
    {
      id: 'process',
      label: 'Under Process',
      value: counts.underProcess,
      icon: 'bx-time-five',
      color: 'yellow',
      sub: `${counts.total > 0 ? Math.round((counts.underProcess / counts.total) * 100) : 0}% of total`,
      subIcon: 'bx-loader-circle',
    },
    {
      id: 'granted',
      label: 'Visa Granted',
      value: counts.granted,
      icon: 'bx-check-shield',
      color: 'green',
      sub: `${successRate}% success rate`,
      subIcon: 'bx-trending-up',
    },
    {
      id: 'refused',
      label: 'Visa Refused',
      value: counts.refused,
      icon: 'bx-shield-x',
      color: 'red',
      sub: `${counts.total > 0 ? Math.round((counts.refused / counts.total) * 100) : 0}% of total`,
      subIcon: 'bx-trending-down',
    },
    {
      id: 'avgwait',
      label: 'Avg. Waiting Days',
      value: avgWait,
      icon: 'bx-calendar-check',
      color: 'purple',
      sub: 'Finalized applications',
      subIcon: 'bx-calendar',
    },
    {
      id: 'rate',
      label: 'Grant Rate',
      value: `${successRate}%`,
      icon: 'bx-bar-chart-alt-2',
      color: 'teal',
      sub: 'Among finalized cases',
      subIcon: 'bx-stats',
    },
  ]

  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`${styles.card} ${styles[card.color]}`}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div className={styles.cardTop}>
            <div className={styles.iconWrap}>
              <i className={`bx ${card.icon}`}></i>
            </div>
            <div className={styles.cardLabel}>{card.label}</div>
          </div>

          <div className={styles.cardValue}>{card.value}</div>

          <div className={styles.cardSub}>
            <i className={`bx ${card.subIcon}`}></i>
            <span>{card.sub}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards