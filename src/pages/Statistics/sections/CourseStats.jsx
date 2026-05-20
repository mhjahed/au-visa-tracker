import { useMemo, useState } from 'react'
import { getByCourse } from '@utils/analytics'
import styles from './CourseStats.module.scss'

const CATEGORY_ICONS = {
  'IT & Computing': 'bx-code-alt',
  'Business & Commerce': 'bx-briefcase',
  'Engineering': 'bx-cog',
  'Health & Medicine': 'bx-plus-medical',
  'Science': 'bx-atom',
  'Education': 'bx-book',
  'Social Sciences': 'bx-brain',
  'Other': 'bx-layer',
}

const CATEGORY_COLORS = {
  'IT & Computing': '#3B82F6',
  'Business & Commerce': '#F59E0B',
  'Engineering': '#6B7280',
  'Health & Medicine': '#EF4444',
  'Science': '#10B981',
  'Education': '#8B5CF6',
  'Social Sciences': '#EC4899',
  'Other': '#9CA3AF',
}

const COLS = [
  { key: 'index', label: '#', sortable: false },
  { key: 'category', label: 'Course Category', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'granted', label: 'Granted', sortable: true },
  { key: 'refused', label: 'Refused', sortable: true },
  { key: 'underProcess', label: 'In Process', sortable: true },
  { key: 'successRate', label: 'Success Rate', sortable: true },
  { key: 'distribution', label: 'Distribution', sortable: false },
]

const CourseStats = ({ applicants }) => {
  const [sortKey, setSortKey] = useState('total')
  const [sortDir, setSortDir] = useState('desc')

  const data = useMemo(() => getByCourse(applicants), [applicants])

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      let va = a[sortKey]
      let vb = b[sortKey]
      if (typeof va === 'string') va = va.toLowerCase()
      if (typeof vb === 'string') vb = vb.toLowerCase()
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortKey, sortDir])

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  if (sorted.length === 0) {
    return (
      <div className={styles.empty}>
        <i className='bx bx-book-open'></i>
        <p>No course data available</p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLS.map(col => (
                <th
                  key={col.key}
                  className={`${col.sortable ? styles.sortable : ''} ${sortKey === col.key ? styles.sorted : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className={styles.thInner}>
                    {col.label}
                    {col.sortable && (
                      <i className={`bx ${sortKey === col.key
                        ? sortDir === 'asc' ? 'bx-chevron-up' : 'bx-chevron-down'
                        : 'bx-sort'}`}
                      ></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const icon = CATEGORY_ICONS[row.category] || 'bx-layer'
              const color = CATEGORY_COLORS[row.category] || '#9CA3AF'
              const finalized = row.granted + row.refused
              const grantedPct = finalized > 0
                ? Math.round((row.granted / finalized) * 100)
                : 0
              const refusedPct = finalized > 0
                ? Math.round((row.refused / finalized) * 100)
                : 0
              const processPct = row.total > 0
                ? Math.round((row.underProcess / row.total) * 100)
                : 0

              return (
                <tr
                  key={row.category}
                  className={styles.row}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <td className={styles.tdNum}>{i + 1}</td>

                  <td>
                    <div className={styles.catCell}>
                      <div
                        className={styles.catIcon}
                        style={{ background: `${color}18`, color }}
                      >
                        <i className={`bx ${icon}`}></i>
                      </div>
                      <span className={styles.catName}>{row.category}</span>
                    </div>
                  </td>

                  <td>
                    <span className={styles.totalBadge}>{row.total}</span>
                  </td>

                  <td>
                    <span className={styles.grantedVal}>{row.granted}</span>
                  </td>

                  <td>
                    <span className={styles.refusedVal}>{row.refused}</span>
                  </td>

                  <td>
                    <span className={styles.processVal}>{row.underProcess}</span>
                  </td>

                  <td>
                    <div className={styles.rateCell}>
                      <span
                        className={`${styles.rateVal}
                          ${row.successRate >= 70 ? styles.rateHigh
                            : row.successRate >= 40 ? styles.rateMid
                            : styles.rateLow}`}
                      >
                        {row.successRate}%
                      </span>
                      <div className={styles.rateBarMini}>
                        <div
                          className={styles.rateBarFill}
                          style={{
                            width: `${row.successRate}%`,
                            background: color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className={styles.distBar}>
                      {row.granted > 0 && (
                        <div
                          className={styles.distGranted}
                          style={{ width: `${grantedPct}%` }}
                          title={`Granted ${grantedPct}%`}
                        ></div>
                      )}
                      {row.underProcess > 0 && (
                        <div
                          className={styles.distProcess}
                          style={{ width: `${processPct}%` }}
                          title={`In Process ${processPct}%`}
                        ></div>
                      )}
                      {row.refused > 0 && (
                        <div
                          className={styles.distRefused}
                          style={{ width: `${refusedPct}%` }}
                          title={`Refused ${refusedPct}%`}
                        ></div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseStats