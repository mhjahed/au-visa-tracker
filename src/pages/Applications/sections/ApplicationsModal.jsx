import { useEffect, useRef } from 'react'
import { format, parseISO, isValid } from 'date-fns'
import StatusBadge from '@components/common/StatusBadge'
import styles from './ApplicationsModal.module.scss'

const ApplicationsModal = ({ applicant: a, onClose }) => {
  const overlayRef = useRef(null)

  // Close on ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Close on backdrop click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const formatDate = (dateStr) => {
    try {
      const d = parseISO(dateStr)
      return isValid(d) ? format(d, 'dd MMMM yyyy') : '—'
    } catch { return '—' }
  }

  const getDecisionInfo = () => {
    if (a.status === 'Granted' && a.grantDate) {
      return { label: 'Grant Date', date: formatDate(a.grantDate), color: styles.decisionGreen }
    }
    if (a.status === 'Refused' && a.refusalDate) {
      return { label: 'Refusal Date', date: formatDate(a.refusalDate), color: styles.decisionRed }
    }
    return { label: 'Decision Date', date: 'Pending', color: styles.decisionYellow }
  }

  const decision = getDecisionInfo()

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>

        {/* Modal Header */}
        <div className={`${styles.modalHeader} ${styles[`header${a.status?.replace(' ', '')}`]}`}>
          <div className={styles.headerLeft}>
            <div className={styles.headerAvatar}>
              {a.name?.charAt(0) || '?'}
            </div>
            <div>
              <h2 className={styles.headerName}>{a.name}</h2>
              <div className={styles.headerMeta}>
                <span><i className='bx bx-id-card'></i> {a.passportNo}</span>
                <span><i className='bx bx-cake'></i> {formatDate(a.dob)}</span>
              </div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <StatusBadge status={a.status} size="lg" />
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <i className='bx bx-x'></i>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>

          {/* Application Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <i className='bx bx-file-blank'></i>
              Application Details
            </h3>
            <div className={styles.infoGrid}>
              <InfoRow
                icon="bx-buildings"
                label="University"
                value={a.university}
                highlight={a.universityCode}
              />
              <InfoRow
                icon="bx-book-open"
                label="Course"
                value={a.course}
                highlight={a.courseCategory}
              />
              <InfoRow
                icon="bx-calendar"
                label="Application Date"
                value={formatDate(a.applicationDate)}
              />
              <InfoRow
                icon="bx-certification"
                label="Visa Subclass"
                value={`Subclass ${a.visaLabel || '500'} — Student Visa`}
              />
              <InfoRow
                icon="bx-calendar-event"
                label="Intake"
                value={`${a.intakeSemester}, ${a.intakeYear}`}
              />
              <InfoRow
                icon="bx-map"
                label="Processing Office"
                value={a.caseOfficer || '—'}
              />
            </div>
          </div>

          {/* Status & Timeline */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <i className='bx bx-time-five'></i>
              Status & Timeline
            </h3>

            <div className={styles.timeline}>
              <TimelineItem
                icon="bx-send"
                label="Application Lodged"
                date={formatDate(a.applicationDate)}
                status="done"
              />
              <TimelineItem
                icon="bx-search-alt"
                label="Under Assessment"
                date={a.status !== 'Under Process' ? 'Completed' : 'In progress...'}
                status={a.status === 'Under Process' ? 'active' : 'done'}
              />
              <TimelineItem
                icon={a.status === 'Granted' ? 'bx-check-shield' : a.status === 'Refused' ? 'bx-shield-x' : 'bx-hourglass'}
                label={decision.label}
                date={decision.date}
                status={a.status === 'Under Process' ? 'pending' : 'done'}
                colorClass={decision.color}
              />
            </div>

            <div className={styles.waitCard}>
              <i className='bx bx-timer'></i>
              <div>
                <span className={styles.waitNum}>{a.waitingDays ?? 0} days</span>
                <span className={styles.waitLabel}>
                  {a.status === 'Under Process' ? 'waiting so far' : 'total processing time'}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {a.notes && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <i className='bx bx-note'></i>
                Notes
              </h3>
              <div className={styles.notesBox}>
                <i className='bx bx-message-square-detail'></i>
                <p>{a.notes}</p>
              </div>
            </div>
          )}

          {/* Record Info */}
          <div className={styles.recordInfo}>
            <span>
              <i className='bx bx-plus-circle'></i>
              Created: {formatDate(a.createdAt?.split('T')[0])}
            </span>
            <span>
              <i className='bx bx-edit'></i>
              Updated: {formatDate(a.updatedAt?.split('T')[0])}
            </span>
            <span>
              <i className='bx bx-hash'></i>
              ID: {a.id}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.footerClose} onClick={onClose}>
            <i className='bx bx-x'></i>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper sub-components
const InfoRow = ({ icon, label, value, highlight }) => (
  <div className={styles.infoRow}>
    <div className={styles.infoIcon}>
      <i className={`bx ${icon}`}></i>
    </div>
    <div className={styles.infoContent}>
      <span className={styles.infoLabel}>{label}</span>
      <div className={styles.infoValueRow}>
        {highlight && <span className={styles.infoHighlight}>{highlight}</span>}
        <span className={styles.infoValue}>{value}</span>
      </div>
    </div>
  </div>
)

const TimelineItem = ({ icon, label, date, status, colorClass }) => (
  <div className={`${styles.timelineItem} ${styles[`timeline_${status}`]}`}>
    <div className={`${styles.timelineDot} ${colorClass || ''}`}>
      <i className={`bx ${icon}`}></i>
    </div>
    <div className={styles.timelineContent}>
      <span className={styles.timelineLabel}>{label}</span>
      <span className={styles.timelineDate}>{date}</span>
    </div>
    {status !== 'pending' && <div className={styles.timelineLine}></div>}
  </div>
)

export default ApplicationsModal