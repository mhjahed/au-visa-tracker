import { format, parseISO, isValid } from 'date-fns'
import styles from './Announcements.module.scss'

const TYPE_CONFIG = {
  info: { icon: 'bx-info-circle', cls: 'info' },
  warning: { icon: 'bx-error', cls: 'warning' },
  success: { icon: 'bx-check-circle', cls: 'success' },
  danger: { icon: 'bx-x-circle', cls: 'danger' },
}

const Announcements = ({ updates }) => {
  const announcements = updates?.announcements || []
  const pinned = announcements.filter(a => a.pinned)
  const rest = announcements.filter(a => !a.pinned)
  const all = [...pinned, ...rest]

  if (all.length === 0) return null

  const formatDate = (dateStr) => {
    try {
      const d = parseISO(dateStr)
      return isValid(d) ? format(d, 'dd MMM yyyy') : dateStr
    } catch { return dateStr }
  }

  return (
    <div className={styles.wrapper}>
      {all.map((ann, i) => {
        const config = TYPE_CONFIG[ann.type] || TYPE_CONFIG.info
        return (
          <div
            key={ann.id}
            className={`${styles.card} ${styles[config.cls]}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className={styles.cardIcon}>
              <i className={`bx ${config.icon}`}></i>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h4 className={styles.cardTitle}>{ann.title}</h4>
                <div className={styles.cardMeta}>
                  {ann.pinned && (
                    <span className={styles.pinnedTag}>
                      <i className='bx bx-pin'></i> Pinned
                    </span>
                  )}
                  <span className={styles.date}>{formatDate(ann.date)}</span>
                </div>
              </div>
              <p className={styles.cardMessage}>{ann.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Announcements