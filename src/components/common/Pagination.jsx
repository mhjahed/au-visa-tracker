import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, totalPages, onPageChange, perPage, onPerPageChange, totalItems }) => {
  if (totalPages <= 0) return null

  const getPages = () => {
    const pages = []
    const delta = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (
        i === currentPage - delta - 1 ||
        i === currentPage + delta + 1
      ) {
        pages.push('...')
      }
    }

    // Remove duplicate '...'
    return pages.filter((p, idx) => p !== '...' || pages[idx - 1] !== '...')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          {' '}· {totalItems} total
        </span>
        <select
          className={styles.perPageSelect}
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
        >
          {[10, 20, 50, 100].map(n => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
      </div>

      <div className={styles.pages}>
        {/* Prev */}
        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous"
        >
          <i className='bx bx-chevron-left'></i>
        </button>

        {/* Pages */}
        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className={styles.dots}>···</span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next"
        >
          <i className='bx bx-chevron-right'></i>
        </button>
      </div>
    </div>
  )
}

export default Pagination