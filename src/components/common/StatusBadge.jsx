import styles from './StatusBadge.module.scss'

const STATUS_CONFIG = {
  'Granted': {
    className: styles.granted,
    icon: 'bx-check-circle',
    label: 'Granted',
  },
  'Refused': {
    className: styles.refused,
    icon: 'bx-x-circle',
    label: 'Refused',
  },
  'Under Process': {
    className: styles.process,
    icon: 'bx-time-five',
    label: 'Under Process',
  },
}

const StatusBadge = ({ status, showIcon = true, size = 'md' }) => {
  const config = STATUS_CONFIG[status] || {
    className: styles.process,
    icon: 'bx-help-circle',
    label: status || 'Unknown',
  }

  return (
    <span className={`${styles.badge} ${config.className} ${styles[size]}`}>
      {showIcon && <i className={`bx ${config.icon}`}></i>}
      {config.label}
    </span>
  )
}

export default StatusBadge