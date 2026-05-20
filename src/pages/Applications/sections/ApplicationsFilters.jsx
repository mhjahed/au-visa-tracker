import { useMemo } from 'react'
import SearchBar from '@components/common/SearchBar'
import { getSearchSuggestions } from '@utils/filtering'
import styles from './ApplicationsFilters.module.scss'

const STATUS_OPTIONS = ['All', 'Granted', 'Under Process', 'Refused']

const SORT_OPTIONS = [
  { value: 'applicationDate-desc', label: 'Newest First' },
  { value: 'applicationDate-asc', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'waitingDays-desc', label: 'Most Waiting Days' },
  { value: 'waitingDays-asc', label: 'Least Waiting Days' },
  { value: 'university-asc', label: 'University A–Z' },
  { value: 'status-asc', label: 'Status A–Z' },
]

const ApplicationsFilters = ({
  applicants,
  filters,
  onFilterChange,
  sortValue,
  onSortChange,
  resultCount,
  totalCount,
}) => {
  const suggestions = useMemo(
    () => getSearchSuggestions(applicants, filters.search),
    [applicants, filters.search]
  )

  const universities = useMemo(() => {
    const u = [...new Set(applicants.map(a => a.university))].sort()
    return ['All', ...u]
  }, [applicants])

  const categories = useMemo(() => {
    const c = [...new Set(applicants.map(a => a.courseCategory))].sort()
    return ['All', ...c]
  }, [applicants])

  const intakeYears = useMemo(() => {
    const y = [...new Set(applicants.map(a => String(a.intakeYear)))].sort().reverse()
    return ['All', ...y]
  }, [applicants])

  const hasActiveFilter =
    filters.search ||
    (filters.status && filters.status !== 'All') ||
    (filters.university && filters.university !== 'All') ||
    (filters.courseCategory && filters.courseCategory !== 'All') ||
    (filters.intakeYear && filters.intakeYear !== 'All')

  const handleClearAll = () => {
    onFilterChange('search', '')
    onFilterChange('status', 'All')
    onFilterChange('university', 'All')
    onFilterChange('courseCategory', 'All')
    onFilterChange('intakeYear', 'All')
  }

  return (
    <div className={styles.wrapper}>
      {/* Top row: search + sort */}
      <div className={styles.topRow}>
        <div className={styles.searchWrap}>
          <SearchBar
            value={filters.search}
            onChange={(v) => onFilterChange('search', v)}
            suggestions={suggestions}
            placeholder="Search by name, passport, university, course..."
          />
        </div>

        <div className={styles.sortWrap}>
          <label className={styles.selectLabel}>
            <i className='bx bx-sort'></i>
          </label>
          <select
            className={styles.select}
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter chips row */}
      <div className={styles.filtersRow}>
        {/* Status filter */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Status</span>
          <div className={styles.chipGroup}>
            {STATUS_OPTIONS.map(s => (
              <button
                key={s}
                className={`${styles.chip} ${filters.status === s || (!filters.status && s === 'All') ? styles.chipActive : ''} ${styles[`chip${s.replace(' ', '')}`]}`}
                onClick={() => onFilterChange('status', s)}
              >
                {s === 'Granted' && <i className='bx bx-check-circle'></i>}
                {s === 'Refused' && <i className='bx bx-x-circle'></i>}
                {s === 'Under Process' && <i className='bx bx-time'></i>}
                {s === 'All' && <i className='bx bx-list-ul'></i>}
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* University filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>University</label>
          <select
            className={styles.select}
            value={filters.university || 'All'}
            onChange={(e) => onFilterChange('university', e.target.value)}
          >
            {universities.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Category</label>
          <select
            className={styles.select}
            value={filters.courseCategory || 'All'}
            onChange={(e) => onFilterChange('courseCategory', e.target.value)}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Intake Year filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Intake</label>
          <select
            className={styles.select}
            value={filters.intakeYear || 'All'}
            onChange={(e) => onFilterChange('intakeYear', e.target.value)}
          >
            {intakeYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Clear all */}
        {hasActiveFilter && (
          <button className={styles.clearBtn} onClick={handleClearAll}>
            <i className='bx bx-x'></i>
            Clear All
          </button>
        )}
      </div>

      {/* Result count */}
      <div className={styles.resultRow}>
        <span className={styles.resultCount}>
          <i className='bx bx-list-check'></i>
          Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong> applications
        </span>
        {hasActiveFilter && (
          <span className={styles.filterBadge}>
            Filters active
          </span>
        )}
      </div>
    </div>
  )
}

export default ApplicationsFilters