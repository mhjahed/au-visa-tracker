import { useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { getStatusCounts } from '@utils/analytics'
import { getSearchSuggestions } from '@utils/filtering'
import { useState } from 'react'

import HeroSection from './sections/HeroSection'
import SummaryCards from './sections/SummaryCards'
import UpdateCards from './sections/UpdateCards'
import UniversityGrid from './sections/UniversityGrid'
import RecentTable from './sections/RecentTable'
import Announcements from './sections/Announcements'
import HomeCharts from './sections/HomeCharts'
import SearchBar from '@components/common/SearchBar'
import { SkeletonCard, SkeletonTable, SkeletonChart } from '@components/loaders/SkeletonLoader'

import styles from './Home.module.scss'

const Home = () => {
  const { applicants, universities, updates, loading } = useApplicants()
  const [search, setSearch] = useState('')

  const counts = useMemo(() => getStatusCounts(applicants), [applicants])

  const suggestions = useMemo(
    () => getSearchSuggestions(applicants, search),
    [applicants, search]
  )

  const filteredApplicants = useMemo(() => {
    if (!search.trim()) return applicants
    const q = search.toLowerCase()
    return applicants.filter(a =>
      a.name?.toLowerCase().includes(q) ||
      a.university?.toLowerCase().includes(q) ||
      a.course?.toLowerCase().includes(q) ||
      a.passportNo?.toLowerCase().includes(q) ||
      a.status?.toLowerCase().includes(q)
    )
  }, [applicants, search])

  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroSection stats={counts} />

      <div className={styles.container}>

        {/* Summary Cards */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                <i className='bx bx-stats'></i>
                Overview Statistics
              </h2>
              <p className={styles.sectionSub}>
                Real-time summary of all visa applications
              </p>
            </div>
          </div>
          {loading ? (
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <SummaryCards applicants={applicants} />
          )}
        </section>

        {/* Update Cards */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                <i className='bx bx-calendar-event'></i>
                Update Schedule
              </h2>
              <p className={styles.sectionSub}>
                Last update info and next scheduled update
              </p>
            </div>
          </div>
          <UpdateCards updates={updates} />
        </section>
        {/* Announcements */}
        {updates?.announcements?.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  <i className='bx bx-bell'></i>
                  Announcements
                </h2>
                <p className={styles.sectionSub}>
                  Important notices and updates
                </p>
              </div>
            </div>
            <Announcements updates={updates} />
          </section>
        )}

        {/* Universities */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                <i className='bx bx-buildings'></i>
                Partner Universities
              </h2>
              <p className={styles.sectionSub}>
                {universities.length} universities tracked in our system
              </p>
            </div>
          </div>
          <UniversityGrid universities={universities} applicants={applicants} />
        </section>

        {/* Charts */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                <i className='bx bx-bar-chart-alt-2'></i>
                Analytics Overview
              </h2>
              <p className={styles.sectionSub}>
                Visual breakdown of visa application data
              </p>
            </div>
          </div>
          {loading ? (
            <SkeletonChart />
          ) : (
            <HomeCharts applicants={applicants} />
          )}
        </section>

        {/* Recent Applications with Search */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                <i className='bx bx-list-ul'></i>
                Recent Applications
              </h2>
              <p className={styles.sectionSub}>
                Latest activity · {filteredApplicants.length} result{filteredApplicants.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className={styles.searchWrap}>
              <SearchBar
                value={search}
                onChange={setSearch}
                suggestions={suggestions}
                placeholder="Search by name, university, course..."
              />
            </div>
          </div>

          {loading ? (
            <SkeletonTable rows={6} cols={7} />
          ) : (
            <RecentTable applicants={filteredApplicants} />
          )}
        </section>

      </div>
    </div>
  )
}

export default Home