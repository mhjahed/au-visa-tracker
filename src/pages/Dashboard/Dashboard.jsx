import { useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { format } from 'date-fns'
import DashboardMetrics from './sections/DashboardMetrics'
import DashboardCharts from './sections/DashboardCharts'
import TopUniversities from './sections/TopUniversities'
import TopCourses from './sections/TopCourses'
import { SkeletonCard, SkeletonChart } from '@components/loaders/SkeletonLoader'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  const { applicants, universities, loading } = useApplicants()
  const now = format(new Date(), 'EEEE, dd MMMM yyyy · HH:mm')

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.pageIcon}>
              <i className='bx bx-bar-chart-alt-2'></i>
            </div>
            <div>
              <h1 className={styles.pageTitle}>Analytics Dashboard</h1>
              <p className={styles.pageSub}>
                <i className='bx bx-time'></i>
                {now}
              </p>
            </div>
          </div>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot}></span>
            Live Data
          </div>
        </div>

        {/* Metrics */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>
            <i className='bx bx-stats'></i>
            Key Metrics
          </div>
          {loading ? (
            <div className={styles.metricsSkeletonGrid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.metricSkeleton} />
              ))}
            </div>
          ) : (
            <DashboardMetrics applicants={applicants} />
          )}
        </section>

        {/* Charts */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>
            <i className='bx bx-bar-chart-alt-2'></i>
            Visual Analytics
          </div>
          {loading ? (
            <SkeletonChart />
          ) : (
            <DashboardCharts applicants={applicants} />
          )}
        </section>

        {/* Rankings Side by Side */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>
            <i className='bx bx-trophy'></i>
            Rankings
          </div>
          <div className={styles.rankingGrid}>
            {loading ? (
              <>
                <div className={styles.rankSkeleton} />
                <div className={styles.rankSkeleton} />
              </>
            ) : (
              <>
                <TopUniversities applicants={applicants} universities={universities} />
                <TopCourses applicants={applicants} />
              </>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Dashboard