import { useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import {
  getStatusCounts,
  getSuccessRate,
  getAverageWaitingDays,
  getByUniversity,
  getByCourse,
} from '@utils/analytics'
import UniversityStats from './sections/UniversityStats'
import CourseStats from './sections/CourseStats'
import { SkeletonTable } from '@components/loaders/SkeletonLoader'
import styles from './Statistics.module.scss'

const Statistics = () => {
  const { applicants, universities, loading } = useApplicants()

  const counts = useMemo(() => getStatusCounts(applicants), [applicants])
  const successRate = useMemo(() => getSuccessRate(applicants), [applicants])
  const avgWait = useMemo(() => getAverageWaitingDays(applicants), [applicants])
  const uniCount = useMemo(() => getByUniversity(applicants).length, [applicants])
  const courseCount = useMemo(() => getByCourse(applicants).length, [applicants])

  const summaryCards = [
    { label: 'Universities', value: uniCount, icon: 'bx-buildings', color: 'blue' },
    { label: 'Course Categories', value: courseCount, icon: 'bx-book-open', color: 'purple' },
    { label: 'Overall Success Rate', value: `${successRate}%`, icon: 'bx-trending-up', color: 'green' },
    { label: 'Avg. Waiting Days', value: avgWait, icon: 'bx-timer', color: 'gold' },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.pageIcon}>
              <i className='bx bx-stats'></i>
            </div>
            <div>
              <h1 className={styles.pageTitle}>Statistics</h1>
              <p className={styles.pageSub}>
                Detailed analytics by university and course category
              </p>
            </div>
          </div>
        </div>

        {/* Summary Mini Cards */}
        <div className={styles.summaryGrid}>
          {summaryCards.map((card, i) => (
            <div
              key={card.label}
              className={`${styles.summaryCard} ${styles[card.color]}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={styles.summaryIcon}>
                <i className={`bx ${card.icon}`}></i>
              </div>
              <div>
                <div className={styles.summaryValue}>{card.value}</div>
                <div className={styles.summaryLabel}>{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* University Stats */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                <i className='bx bx-buildings'></i>
                University-wise Statistics
              </h2>
              <p className={styles.sectionSub}>
                Application outcomes broken down by university · sortable columns
              </p>
            </div>
            <div className={styles.tableInfo}>
              <i className='bx bx-info-circle'></i>
              Success rate calculated from finalized cases only
            </div>
          </div>

          {loading ? <SkeletonTable rows={8} cols={8} /> : (
            <UniversityStats applicants={applicants} universities={universities} />
          )}
        </section>

        {/* Course Stats */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                <i className='bx bx-book-open'></i>
                Course Category Statistics
              </h2>
              <p className={styles.sectionSub}>
                Application outcomes broken down by course category
              </p>
            </div>
          </div>

          {loading ? <SkeletonTable rows={6} cols={8} /> : (
            <CourseStats applicants={applicants} />
          )}
        </section>

      </div>
    </div>
  )
}

export default Statistics