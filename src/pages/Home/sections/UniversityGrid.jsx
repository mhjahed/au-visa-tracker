import { useMemo } from 'react'
import styles from './UniversityGrid.module.scss'

const UniversityGrid = ({ universities, applicants }) => {
  const enriched = useMemo(() => {
    return universities.map(uni => {
      const uniApps = applicants.filter(a => a.universityCode === uni.id)
      const granted = uniApps.filter(a => a.status === 'Granted').length
      const total = uniApps.length
      return { ...uni, total, granted }
    }).sort((a, b) => b.total - a.total)
  }, [universities, applicants])

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {enriched.map((uni, i) => (
          <div
            key={uni.id}
            className={styles.card}
            style={{ animationDelay: `${i * 0.05}s` }}
            title={uni.name}
          >
            <div className={styles.logoWrap}>
              <img
                src={`/src/assets/logos/${uni.logo}`}
                alt={uni.name}
                className={styles.logo}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className={styles.logoFallback} style={{ display: 'none' }}>
                <span>{uni.shortName?.slice(0, 3) || uni.id?.slice(0, 3)}</span>
              </div>
            </div>

            <div className={styles.uniInfo}>
              <div className={styles.uniName}>{uni.shortName || uni.name}</div>
              <div className={styles.uniState}>{uni.state}</div>
            </div>

            {uni.total > 0 && (
              <div className={styles.badge}>
                <span className={styles.badgeNum}>{uni.total}</span>
                <span className={styles.badgeLabel}>apps</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UniversityGrid