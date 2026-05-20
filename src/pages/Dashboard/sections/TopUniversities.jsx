import { useMemo } from 'react'
import { getByUniversity } from '@utils/analytics'
import styles from './TopUniversities.module.scss'

const TopUniversities = ({ applicants, universities }) => {
  const ranked = useMemo(() => {
    return getByUniversity(applicants)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8)
  }, [applicants])

  const maxTotal = ranked[0]?.total || 1

  const getLogoSrc = (code) => {
    const uni = universities.find(u => u.id === code)
    return uni ? `/src/assets/logos/${uni.logo}` : null
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>
            <i className='bx bx-buildings'></i>
            Top Universities
          </h3>
          <p className={styles.cardSub}>Ranked by total applications</p>
        </div>
        <span className={styles.countBadge}>{ranked.length} universities</span>
      </div>

      <div className={styles.list}>
        {ranked.map((uni, i) => {
          const logoSrc = getLogoSrc(uni.universityCode)
          const pct = Math.round((uni.total / maxTotal) * 100)
          const grantPct = uni.total > 0
            ? Math.round(((uni.granted) / Math.max(uni.granted + uni.refused, 1)) * 100)
            : 0

          return (
            <div key={uni.university} className={styles.uniRow}>
              {/* Rank */}
              <div className={`${styles.rank} ${i < 3 ? styles[`rank${i + 1}`] : ''}`}>
                {i < 3
                  ? <i className='bx bx-medal'></i>
                  : <span>{i + 1}</span>
                }
              </div>

              {/* Logo */}
              <div className={styles.logoWrap}>
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={uni.university}
                    className={styles.logo}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className={styles.logoFallback} style={{ display: logoSrc ? 'none' : 'flex' }}>
                  {uni.universityCode?.slice(0, 3)}
                </div>
              </div>

              {/* Info */}
              <div className={styles.uniInfo}>
                <div className={styles.uniName}>{uni.university}</div>
                <div className={styles.uniBar}>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <span className={styles.barLabel}>{uni.total} apps</span>
                </div>
              </div>

              {/* Stats */}
              <div className={styles.uniStats}>
                <div className={styles.statPill}>
                  <span className={styles.pillGreen}>{uni.granted}✓</span>
                  <span className={styles.pillRed}>{uni.refused}✗</span>
                </div>
                <div className={`${styles.grantRate} ${grantPct >= 70 ? styles.rateHigh : grantPct >= 40 ? styles.rateMid : styles.rateLow}`}>
                  {grantPct}%
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {ranked.length === 0 && (
        <div className={styles.empty}>
          <i className='bx bx-buildings'></i>
          <p>No data available</p>
        </div>
      )}
    </div>
  )
}

export default TopUniversities