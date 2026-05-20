import { useMemo } from 'react'
import { format, parseISO, isValid } from 'date-fns'
import { Link } from 'react-router-dom'
import StatusBadge from '@components/common/StatusBadge'
import styles from './RecentTable.module.scss'

const RecentTable = ({ applicants }) => {
  const recent = useMemo(() => {
    return [...applicants]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 8)
  }, [applicants])

  const formatDate = (dateStr) => {
    try {
      const d = parseISO(dateStr)
      return isValid(d) ? format(d, 'dd MMM yyyy') : '—'
    } catch { return '—' }
  }

  if (recent.length === 0) {
    return (
      <div className={styles.empty}>
        <i className='bx bx-file-blank'></i>
        <p>No applications found</p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thNum}>#</th>
              <th>Applicant</th>
              <th>University</th>
              <th>Course</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Waiting</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((a, i) => (
              <tr key={a.id} className={styles.row}>
                <td className={styles.tdNum}>{i + 1}</td>
                <td>
                  <div className={styles.applicantCell}>
                    <div className={styles.avatar}>
                      {a.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <div className={styles.applicantName}>{a.name}</div>
                      <div className={styles.applicantPassport}>{a.passportNo}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.uniCell}>
                    <span className={styles.uniCode}>{a.universityCode}</span>
                    <span className={styles.uniName}>{a.university}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.courseCell}>
                    <span className={styles.courseCategory}>{a.courseCategory}</span>
                    <span className={styles.courseName}>{a.course}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.dateCell}>
                    {formatDate(a.applicationDate)}
                  </div>
                </td>
                <td>
                  <StatusBadge status={a.status} />
                </td>
                <td>
                  <div className={styles.waitCell}>
                    <span className={styles.waitNum}>{a.waitingDays || 0}</span>
                    <span className={styles.waitLabel}>days</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <span>Showing {recent.length} most recent</span>
        <Link to="/applications" className={styles.viewAll}>
          View All Applications
          <i className='bx bx-right-arrow-alt'></i>
        </Link>
      </div>
    </div>
  )
}

export default RecentTable