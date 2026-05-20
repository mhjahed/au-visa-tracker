import { useMemo } from 'react'
import { getByCourse } from '@utils/analytics'
import styles from './TopCourses.module.scss'

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

const TopCourses = ({ applicants }) => {
  const ranked = useMemo(() => {
    return getByCourse(applicants)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8)
  }, [applicants])

  const maxTotal = ranked[0]?.total || 1

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>
            <i className='bx bx-book-open'></i>
            Top Course Categories
          </h3>
          <p className={styles.cardSub}>Ranked by total applications</p>
        </div>
        <span className={styles.countBadge}>{ranked.length} categories</span>
      </div>

      <div className={styles.list}>
        {ranked.map((cat, i) => {
          const icon = CATEGORY_ICONS[cat.category] || 'bx-layer'
          const color = CATEGORY_COLORS[cat.category] || '#9CA3AF'
          const pct = Math.round((cat.total / maxTotal) * 100)
          const grantPct = cat.total > 0
            ? Math.round((cat.granted / Math.max(cat.granted + cat.refused, 1)) * 100)
            : 0

          return (
            <div key={cat.category} className={styles.catRow}>
              {/* Icon */}
              <div
                className={styles.catIcon}
                style={{
                  background: `${color}18`,
                  color: color,
                }}
              >
                <i className={`bx ${icon}`}></i>
              </div>

              {/* Info */}
              <div className={styles.catInfo}>
                <div className={styles.catTop}>
                  <span className={styles.catName}>{cat.category}</span>
                  <div className={styles.catBadges}>
                    <span className={styles.grantedTag}>{cat.granted}✓</span>
                    {cat.refused > 0 && (
                      <span className={styles.refusedTag}>{cat.refused}✗</span>
                    )}
                    {cat.underProcess > 0 && (
                      <span className={styles.processTag}>{cat.underProcess}⏳</span>
                    )}
                  </div>
                </div>

                <div className={styles.catBarRow}>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${pct}%`,
                        background: color,
                      }}
                    ></div>
                  </div>
                  <span className={styles.barLabel}>{cat.total} apps</span>
                  <span
                    className={`${styles.rateLabel} ${grantPct >= 70 ? styles.rateHigh : grantPct >= 40 ? styles.rateMid : styles.rateLow}`}
                  >
                    {grantPct}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {ranked.length === 0 && (
        <div className={styles.empty}>
          <i className='bx bx-book-open'></i>
          <p>No course data available</p>
        </div>
      )}
    </div>
  )
}

export default TopCourses