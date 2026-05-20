// src/utils/filtering.js

/**
 * Filter applicants by multiple criteria
 */
export const filterApplicants = (applicants, filters = {}) => {
  let result = [...applicants]

  const { search, status, university, course, courseCategory, intakeYear } = filters

  if (search && search.trim()) {
    const q = search.toLowerCase().trim()
    result = result.filter(a =>
      a.name?.toLowerCase().includes(q) ||
      a.passportNo?.toLowerCase().includes(q) ||
      a.university?.toLowerCase().includes(q) ||
      a.course?.toLowerCase().includes(q) ||
      a.courseCategory?.toLowerCase().includes(q) ||
      a.status?.toLowerCase().includes(q)
    )
  }

  if (status && status !== 'All') {
    result = result.filter(a => a.status === status)
  }

  if (university && university !== 'All') {
    result = result.filter(a =>
      a.university === university || a.universityCode === university
    )
  }

  if (course && course !== 'All') {
    result = result.filter(a => a.course === course)
  }

  if (courseCategory && courseCategory !== 'All') {
    result = result.filter(a => a.courseCategory === courseCategory)
  }

  if (intakeYear && intakeYear !== 'All') {
    result = result.filter(a => String(a.intakeYear) === String(intakeYear))
  }

  return result
}

/**
 * Get search suggestions from applicants
 */
export const getSearchSuggestions = (applicants, query, limit = 6) => {
  if (!query || query.trim().length < 2) return []

  const q = query.toLowerCase().trim()
  const suggestions = new Set()

  applicants.forEach(a => {
    if (a.name?.toLowerCase().includes(q)) suggestions.add(a.name)
    if (a.university?.toLowerCase().includes(q)) suggestions.add(a.university)
    if (a.course?.toLowerCase().includes(q)) suggestions.add(a.course)
    if (a.passportNo?.toLowerCase().includes(q)) suggestions.add(a.passportNo)
  })

  return Array.from(suggestions).slice(0, limit)
}