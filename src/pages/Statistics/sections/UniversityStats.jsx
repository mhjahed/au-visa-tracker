import { useMemo, useState } from 'react'
import { getByUniversity } from '@utils/analytics'
import { sortApplicants } from '@utils/sorting'
import styles from './UniversityStats.module.scss'

const COLS = [
  { key: 'index', label: '#', sortable: false },
  { key: 'university', label: 'University', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'granted', label: 'Granted', sortable: true },
  { key: 'refused', label: 'Refused', sortable: true },
  { key: 'underProcess', label: 'In Process', sortable: true },
  { key: 'successRate', label: 'Success Rate', sortable: true },
  { key: 'bar', label: 'Distribution', sortable: false },
]

const UniversityStats = ({ applicants, universities }) => {
  const [sortKey, setSortKey] = useState('total')
  const [sortDir, setSortDir] = useState('desc')

  const data = useMemo(() => getByUniversity(applicants), [applicants])

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
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const getLogoSrc = (code) => {
    const uni = universities?.find(u => u.id === code)
    return uni ? `/src/assets/logos/${uni.logo}` : null
  }

  if (sorted.length === 0) {
    return (
      <div className={styles.empty}>
        <i className='bx bx-buildings'></i>
        <p>No university data available</p>
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
                  className={`
                    ${col.sortable ? styles.sortable : ''}
                    ${sortKey === col.key ? styles.sorted : ''}
                  `}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className={styles.thInner}>
                    {col.label}
                    {col.sortable && (
                      <i className={`bx ${sortKey === col.key
                        ? sortDir === 'asc' ? 'bx-chevron-up' : 'bx-chevron-down'
                        : 'bx-sort'
                      }`}></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const logoSrc = getLogoSrc(row.universityCode)
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
                  key={row.university}
                  className={styles.row}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {/* # */}
                  <td className={styles.tdNum}>{i + 1}</td>

                  {/* University */}
                  <td>
                    <div className={styles.uniCell}>
                      <div className={styles.logoWrap}>
                        {logoSrc ? (
                          <img
                            src={logoSrc}
                            alt={row.university}
                            className={styles.logo}
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div
                          className={styles.logoFallback}
                          style={{ display: logoSrc ? 'none' : 'flex' }}
                        >
                          {row.universityCode?.slice(0, 3)}
                        </div>
                      </div>
                      <div>
                        <div className={styles.uniName}>{row.university}</div>
                        <div className={styles.uniCode}>{row.universityCode}</div>
                      </div>
                    </div>
                  </td>

                  {/* Total */}
                  <td>
                    <span className={styles.totalBadge}>{row.total}</span>
                  </td>

                  {/* Granted */}
                  <td>
                    <span className={styles.grantedVal}>{row.granted}</span>
                  </td>

                  {/* Refused */}
                  <td>
                    <span className={styles.refusedVal}>{row.refused}</span>
                  </td>

                  {/* In Process */}
                  <td>
                    <span className={styles.processVal}>{row.underProcess}</span>
                  </td>

                  {/* Success Rate */}
                  <td>
                    <div className={styles.rateCell}>
                      <span className={`
                        ${styles.rateVal}
                        ${row.successRate >= 70 ? styles.rateHigh
                          : row.successRate >= 40 ? styles.rateMid
                          : styles.rateLow}
                      `}>
                        {row.successRate}%
                      </span>
                      <div className={styles.rateBarMini}>
                        <div
                          className={styles.rateBarFill}
                          style={{ width: `${row.successRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Distribution bar */}
                  <td>
                    <div className={styles.distBar}>
                      {row.granted > 0 && (
                        <div
                          className={styles.distGranted}
                          style={{ width: `${grantedPct}%` }}
                          title={`Granted: ${row.granted} (${grantedPct}%)`}
                        ></div>
                      )}
                      {row.underProcess > 0 && (
                        <div
                          className={styles.distProcess}
                          style={{ width: `${processPct}%` }}
                          title={`In Process: ${row.underProcess}`}
                        ></div>
                      )}
                      {row.refused > 0 && (
                        <div
                          className={styles.distRefused}
                          style={{ width: `${refusedPct}%` }}
                          title={`Refused: ${row.refused} (${refusedPct}%)`}
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

export default UniversityStats