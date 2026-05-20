import { useState } from 'react'
import { format, parseISO, isValid } from 'date-fns'
import StatusBadge from '@components/common/StatusBadge'
import ApplicationsModal from './ApplicationsModal'
import styles from './ApplicationsTable.module.scss'

const COLUMNS = [
  { key: 'index', label: '#', sortable: false, width: '48px' },
  { key: 'name', label: 'Applicant', sortable: true, width: '200px' },
  { key: 'university', label: 'University', sortable: true, width: '180px' },
  { key: 'course', label: 'Course', sortable: true, width: '200px' },
  { key: 'applicationDate', label: 'Applied On', sortable: true, width: '120px' },
  { key: 'status', label: 'Status', sortable: true, width: '140px' },
  { key: 'waitingDays', label: 'Waiting', sortable: true, width: '90px' },
  { key: 'grantDate', label: 'Decision Date', sortable: true, width: '120px' },
  { key: 'actions', label: '', sortable: false, width: '60px' },
]

const ApplicationsTable = ({
  applicants,
  sortBy,
  sortDir,
  onSort,
  currentPage,
  perPage,
}) => {
  const [selected, setSelected] = useState(null)

  const formatDate = (dateStr) => {
    try {
      const d = parseISO(dateStr)
      return isValid(d) ? format(d, 'dd MMM yyyy') : '—'
    } catch { return '—' }
  }

  const getDecisionDate = (a) => {
    if (a.status === 'Granted' && a.grantDate) return formatDate(a.grantDate)
    if (a.status === 'Refused' && a.refusalDate) return formatDate(a.refusalDate)
    return '—'
  }

  const getRowClass = (status) => {
    if (status === 'Granted') return styles.rowGranted
    if (status === 'Refused') return styles.rowRefused
    if (status === 'Under Process') return styles.rowProcess
    return ''
  }

  const startIndex = (currentPage - 1) * perPage

  if (applicants.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.empty}>
          <i className='bx bx-search-alt'></i>
          <h3>No applications found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {COLUMNS.map(col => (
                  <th
                    key={col.key}
                    style={{ minWidth: col.width }}
                    className={`
                      ${col.sortable ? styles.sortable : ''}
                      ${sortBy === col.key ? styles.sorted : ''}
                    `}
                    onClick={() => col.sortable && onSort(col.key)}
                  >
                    <div className={styles.thInner}>
                      {col.label}
                      {col.sortable && (
                        <span className={styles.sortIcon}>
                          {sortBy === col.key ? (
                            <i className={`bx ${sortDir === 'asc' ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                          ) : (
                            <i className='bx bx-sort'></i>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {applicants.map((a, i) => (
                <tr
                  key={a.id}
                  className={`${styles.row} ${getRowClass(a.status)}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                  onClick={() => setSelected(a)}
                >
                  {/* # */}
                  <td className={styles.tdNum}>
                    {startIndex + i + 1}
                  </td>

                  {/* Applicant */}
                  <td>
                    <div className={styles.applicantCell}>
                      <div className={`${styles.avatar} ${styles[`avatar${a.status?.replace(' ', '')}`]}`}>
                        {a.name?.charAt(0) || '?'}
                      </div>
                      <div className={styles.applicantInfo}>
                        <div className={styles.applicantName}>{a.name}</div>
                        <div className={styles.applicantMeta}>
                          <i className='bx bx-id-card'></i>
                          {a.passportNo}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* University */}
                  <td>
                    <div className={styles.uniCell}>
                      <span className={styles.uniCode}>{a.universityCode}</span>
                      <span className={styles.uniName}>{a.university}</span>
                    </div>
                  </td>

                  {/* Course */}
                  <td>
                    <div className={styles.courseCell}>
                      <span className={styles.courseCat}>{a.courseCategory}</span>
                      <span className={styles.courseName}>{a.course}</span>
                    </div>
                  </td>

                  {/* Applied On */}
                  <td>
                    <span className={styles.dateText}>
                      {formatDate(a.applicationDate)}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={a.status} />
                  </td>

                  {/* Waiting Days */}
                  <td>
                    <div className={styles.waitCell}>
                      <span className={styles.waitNum}>{a.waitingDays ?? 0}</span>
                      <span className={styles.waitLabel}>days</span>
                    </div>
                  </td>

                  {/* Decision Date */}
                  <td>
                    <span className={`${styles.dateText} ${a.status === 'Granted' ? styles.dateGranted : a.status === 'Refused' ? styles.dateRefused : ''}`}>
                      {getDecisionDate(a)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => setSelected(a)}
                      title="View details"
                    >
                      <i className='bx bx-show'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {selected && (
        <ApplicationsModal
          applicant={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}

export default ApplicationsTable