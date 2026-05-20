// src/utils/sorting.js

/**
 * Sort applicants by field and direction
 */
export const sortApplicants = (applicants, sortBy = 'applicationDate', direction = 'desc') => {
  const sorted = [...applicants]

  sorted.sort((a, b) => {
    let valA = a[sortBy]
    let valB = b[sortBy]

    // Handle dates
    if (['applicationDate', 'grantDate', 'refusalDate', 'createdAt', 'updatedAt'].includes(sortBy)) {
      valA = valA ? new Date(valA).getTime() : 0
      valB = valB ? new Date(valB).getTime() : 0
    }

    // Handle numbers
    if (['waitingDays', 'intakeYear'].includes(sortBy)) {
      valA = Number(valA) || 0
      valB = Number(valB) || 0
    }

    // Handle strings
    if (typeof valA === 'string') {
      valA = valA.toLowerCase()
      valB = (valB || '').toLowerCase()
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1
    if (valA > valB) return direction === 'asc' ? 1 : -1
    return 0
  })

  return sorted
}

/**
 * Toggle sort direction
 */
export const toggleDirection = (current) => current === 'asc' ? 'desc' : 'asc'