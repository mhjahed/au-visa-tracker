import { format, parseISO, isValid } from 'date-fns'
import styles from './UpdateCards.module.scss'

const UpdateCards = ({ updates }) => {
  const last = updates?.lastUpdate || {}
  const next = updates?.nextUpdate || {}

  const formatDate = (dateStr) => {
    try {
      const d = parseISO(dateStr)
      return isValid(d) ? format(d, 'dd MMM yyyy') : dateStr
    } catch {
      return dateStr || 'N/A'
    }
  }

  return (
    <div className={styles.grid}>
      {/* Last Update Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={`${styles.indicator} ${styles.green}`}>
            <span className={styles.blink}></span>
            Last Updated
          </div>
          <div className={styles.time}>
            {formatDate(last.date)} · {last.time || '--:--'}
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <i className='bx bx-file-blank'></i>
            <div>
              <span className={styles.statVal}>{last.totalApplications || 0}</span>
              <span className={styles.statKey}>Total</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <i className={`bx bx-check-shield ${styles.green}`}></i>
            <div>
              <span className={styles.statVal}>{last.granted || 0}</span>
              <span className={styles.statKey}>Granted</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <i className={`bx bx-shield-x ${styles.red}`}></i>
            <div>
              <span className={styles.statVal}>{last.refused || 0}</span>
              <span className={styles.statKey}>Refused</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <i className={`bx bx-time ${styles.yellow}`}></i>
            <div>
              <span className={styles.statVal}>{last.underProcess || 0}</span>
              <span className={styles.statKey}>Processing</span>
            </div>
          </div>
        </div>

        {last.note && (
          <div className={styles.note}>
            <i className='bx bx-message-square-detail'></i>
            <span>{last.note}</span>
          </div>
        )}

        <div className={styles.updatedBy}>
          <i className='bx bx-user-check'></i>
          Updated by: {last.updatedBy || 'Admin'}
        </div>
      </div>

      {/* Next Update Card */}
      <div className={`${styles.card} ${styles.nextCard}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.indicator} ${styles.blue}`}>
            <span className={`${styles.blink} ${styles.blinkBlue}`}></span>
            Next Update
          </div>
          <div className={styles.time}>
            {formatDate(next.date)} · {next.time || '--:--'}
          </div>
        </div>

        <div className={styles.nextContent}>
          <div className={styles.nextIconWrap}>
            <i className='bx bx-calendar-event'></i>
          </div>
          <div>
            <div className={styles.nextDate}>
              {formatDate(next.date)}
            </div>
            <div className={styles.nextTime}>
              Scheduled at {next.time || 'TBD'}
            </div>
          </div>
        </div>

        {next.note && (
          <div className={`${styles.note} ${styles.noteBlue}`}>
            <i className='bx bx-info-circle'></i>
            <span>{next.note}</span>
          </div>
        )}

        <div className={styles.scheduledBy}>
          <i className='bx bx-calendar-check'></i>
          Scheduled by: {next.scheduledBy || 'Admin'}
        </div>
      </div>
    </div>
  )
}

export default UpdateCards