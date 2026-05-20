import { useState, useMemo, useCallback } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { filterApplicants } from '@utils/filtering'
import { sortApplicants } from '@utils/sorting'
import ApplicationsStats from './sections/ApplicationsStats'
import ApplicationsFilters from './sections/ApplicationsFilters'
import ApplicationsTable from './sections/ApplicationsTable'
import Pagination from '@components/common/Pagination'
import { SkeletonTable } from '@components/loaders/SkeletonLoader'
import styles from './Applications.module.scss'

const DEFAULT_FILTERS = {
  search: '',
  status: 'All',
  university: 'All',
  courseCategory: 'All',
  intakeYear: 'All',
}

const Applications = () => {
  const { applicants, loading } = useApplicants()

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sortValue, setSortValue] = useState('applicationDate-desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  // Parse sort value
  const [sortBy, sortDir] = useMemo(() => {
    const parts = sortValue.split('-')
    const dir = parts.pop()
    return [parts.join('-'), dir]
  }, [sortValue])

  // Handle filter change — reset page on filter
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }, [])

  // Handle sort
  const handleSort = useCallback((key) => {
    setSortValue(prev => {
      const [prevKey, prevDir] = prev.split('-').reduce((acc, part, i, arr) => {
        if (i < arr.length - 1) acc[0] = (acc[0] ? acc[0] + '-' : '') + part
        else acc[1] = part
        return acc
      }, ['', ''])
      if (prevKey === key) {
        return `${key}-${prevDir === 'asc' ? 'desc' : 'asc'}`
      }
      return `${key}-asc`
    })
    setCurrentPage(1)
  }, [])

  // Filter → Sort → Paginate
  const filtered = useMemo(() => filterApplicants(applicants, filters), [applicants, filters])
  const sorted = useMemo(() => sortApplicants(filtered, sortBy, sortDir), [filtered, sortBy, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage))
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return sorted.slice(start, start + perPage)
  }, [sorted, currentPage, perPage])

  const handlePerPageChange = (n) => {
    setPerPage(n)
    setCurrentPage(1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <div className={styles.pageIcon}>
              <i className='bx bx-file'></i>
            </div>
            <div>
              <h1 className={styles.pageTitle}>Applications</h1>
              <p className={styles.pageSub}>
                All Subclass 500 visa applications · Bangladesh
              </p>
            </div>
          </div>
          <div className={styles.pageHeaderRight}>
            <div className={styles.totalPill}>
              <i className='bx bx-file-blank'></i>
              {applicants.length} Total
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className={styles.section}>
          {loading ? (
            <div className={styles.statsSkeletonGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.statsSkeleton} />
              ))}
            </div>
          ) : (
            <ApplicationsStats applicants={applicants} />
          )}
        </section>

        {/* Filters */}
        <section className={styles.section}>
          <ApplicationsFilters
            applicants={applicants}
            filters={filters}
            onFilterChange={handleFilterChange}
            sortValue={sortValue}
            onSortChange={(v) => { setSortValue(v); setCurrentPage(1) }}
            resultCount={filtered.length}
            totalCount={applicants.length}
          />
        </section>

        {/* Table + Pagination */}
        <section className={styles.section}>
          {loading ? (
            <SkeletonTable rows={8} cols={8} />
          ) : (
            <div className={styles.tableContainer}>
              <ApplicationsTable
                applicants={paginated}
                sortBy={sortBy}
                sortDir={sortDir}
                onSort={handleSort}
                currentPage={currentPage}
                perPage={perPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                perPage={perPage}
                onPerPageChange={handlePerPageChange}
                totalItems={sorted.length}
              />
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default Applications