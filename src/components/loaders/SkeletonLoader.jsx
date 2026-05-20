// src/components/loaders/SkeletonLoader.jsx
import styles from './SkeletonLoader.module.scss'

export const SkeletonBox = ({ width = '100%', height = '20px', radius = '6px', className = '' }) => (
  <div
    className={`${styles.skeleton} ${className}`}
    style={{ width, height, borderRadius: radius }}
  />
)

export const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonCardHeader}>
      <SkeletonBox width="48px" height="48px" radius="12px" />
      <div className={styles.skeletonCardText}>
        <SkeletonBox width="60%" height="14px" />
        <SkeletonBox width="40%" height="10px" />
      </div>
    </div>
    <SkeletonBox width="50%" height="36px" radius="8px" />
    <SkeletonBox width="80%" height="10px" />
  </div>
)

export const SkeletonTable = ({ rows = 5, cols = 6 }) => (
  <div className={styles.skeletonTable}>
    <div className={styles.skeletonTableHeader}>
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonBox key={i} height="14px" width={i === 0 ? '30%' : '15%'} />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className={styles.skeletonTableRow}>
        {Array.from({ length: cols }).map((_, c) => (
          <SkeletonBox key={c} height="14px" width={c === 0 ? '30%' : '15%'} />
        ))}
      </div>
    ))}
  </div>
)

export const SkeletonChart = () => (
  <div className={styles.skeletonChart}>
    <SkeletonBox width="40%" height="20px" />
    <div className={styles.skeletonChartBars}>
      {Array.from({ length: 7 }).map((_, i) => (
        <SkeletonBox
          key={i}
          width="100%"
          height={`${40 + Math.random() * 100}px`}
          radius="4px"
        />
      ))}
    </div>
  </div>
)