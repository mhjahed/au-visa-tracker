// src/hooks/useApplicants.js
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidv4 } from 'uuid'
import { differenceInDays, parseISO, isValid } from 'date-fns'

// Import default JSON data
import defaultApplicants from '@data/applicants.json'
import defaultUniversities from '@data/universities.json'
import defaultCourses from '@data/courses.json'
import defaultUpdates from '@data/updates.json'

const STORAGE_KEYS = {
  APPLICANTS: 'applicants',
  UNIVERSITIES: 'universities',
  COURSES: 'courses',
  UPDATES: 'updates',
  INITIALIZED: 'data_initialized',
}

/**
 * Calculate waiting days for an applicant
 */
const calcWaitingDays = (applicant) => {
  const start = parseISO(applicant.applicationDate)
  if (!isValid(start)) return 0

  if (applicant.status === 'Granted' && applicant.grantDate) {
    const end = parseISO(applicant.grantDate)
    return isValid(end) ? differenceInDays(end, start) : 0
  }

  if (applicant.status === 'Refused' && applicant.refusalDate) {
    const end = parseISO(applicant.refusalDate)
    return isValid(end) ? differenceInDays(end, start) : 0
  }

  if (applicant.status === 'Under Process') {
    return differenceInDays(new Date(), start)
  }

  return 0
}

/**
 * Enrich applicant data with computed fields
 */
const enrichApplicant = (applicant) => ({
  ...applicant,
  waitingDays: calcWaitingDays(applicant),
})

export const useApplicants = () => {
  const [storedApplicants, setStoredApplicants] = useLocalStorage(
    STORAGE_KEYS.APPLICANTS,
    null
  )
  const [storedUniversities, setStoredUniversities] = useLocalStorage(
    STORAGE_KEYS.UNIVERSITIES,
    null
  )
  const [storedCourses, setStoredCourses] = useLocalStorage(
    STORAGE_KEYS.COURSES,
    null
  )
  const [storedUpdates, setStoredUpdates] = useLocalStorage(
    STORAGE_KEYS.UPDATES,
    null
  )
  const [initialized, setInitialized] = useLocalStorage(
    STORAGE_KEYS.INITIALIZED,
    false
  )

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize data from JSON if not already done
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)

        if (!initialized || !storedApplicants) {
          setStoredApplicants(defaultApplicants)
          setStoredUniversities(defaultUniversities)
          setStoredCourses(defaultCourses)
          setStoredUpdates(defaultUpdates)
          setInitialized(true)
        }
      } catch (err) {
        setError('Failed to initialize data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  // Enriched applicants (with computed fields)
  const applicants = useMemo(() => {
    const data = storedApplicants || defaultApplicants
    return data.map(enrichApplicant)
  }, [storedApplicants])

  const universities = useMemo(() => {
    return storedUniversities || defaultUniversities
  }, [storedUniversities])

  const courses = useMemo(() => {
    return storedCourses || defaultCourses
  }, [storedCourses])

  const updates = useMemo(() => {
    return storedUpdates || defaultUpdates
  }, [storedUpdates])

  // ============================================
  // CRUD: APPLICANTS
  // ============================================

  const addApplicant = useCallback((data) => {
    const newApplicant = {
      ...data,
      id: `applicant-${uuidv4().slice(0, 8)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setStoredApplicants(prev => {
      const current = prev || defaultApplicants
      return [...current, newApplicant]
    })
    return newApplicant
  }, [setStoredApplicants])

  const updateApplicant = useCallback((id, data) => {
    setStoredApplicants(prev => {
      const current = prev || defaultApplicants
      return current.map(a =>
        a.id === id
          ? { ...a, ...data, updatedAt: new Date().toISOString() }
          : a
      )
    })
  }, [setStoredApplicants])

  const deleteApplicant = useCallback((id) => {
    setStoredApplicants(prev => {
      const current = prev || defaultApplicants
      return current.filter(a => a.id !== id)
    })
  }, [setStoredApplicants])

  const getApplicantById = useCallback((id) => {
    return applicants.find(a => a.id === id) || null
  }, [applicants])

  // ============================================
  // CRUD: UNIVERSITIES
  // ============================================

  const addUniversity = useCallback((data) => {
    const newUni = { ...data, id: data.id || data.shortName.toUpperCase() }
    setStoredUniversities(prev => {
      const current = prev || defaultUniversities
      return [...current, newUni]
    })
    return newUni
  }, [setStoredUniversities])

  const updateUniversity = useCallback((id, data) => {
    setStoredUniversities(prev => {
      const current = prev || defaultUniversities
      return current.map(u => u.id === id ? { ...u, ...data } : u)
    })
  }, [setStoredUniversities])

  const deleteUniversity = useCallback((id) => {
    setStoredUniversities(prev => {
      const current = prev || defaultUniversities
      return current.filter(u => u.id !== id)
    })
  }, [setStoredUniversities])

  // ============================================
  // CRUD: COURSES
  // ============================================

  const addCourse = useCallback((data) => {
    const newCourse = {
      ...data,
      id: `course-${uuidv4().slice(0, 8)}`
    }
    setStoredCourses(prev => {
      const current = prev || defaultCourses
      return [...current, newCourse]
    })
    return newCourse
  }, [setStoredCourses])

  const updateCourse = useCallback((id, data) => {
    setStoredCourses(prev => {
      const current = prev || defaultCourses
      return current.map(c => c.id === id ? { ...c, ...data } : c)
    })
  }, [setStoredCourses])

  const deleteCourse = useCallback((id) => {
    setStoredCourses(prev => {
      const current = prev || defaultCourses
      return current.filter(c => c.id !== id)
    })
  }, [setStoredCourses])

  // ============================================
  // UPDATES
  // ============================================

  const saveUpdates = useCallback((data) => {
    setStoredUpdates(data)
  }, [setStoredUpdates])

  // ============================================
  // RESET
  // ============================================

  const resetToDefault = useCallback(() => {
    setStoredApplicants(defaultApplicants)
    setStoredUniversities(defaultUniversities)
    setStoredCourses(defaultCourses)
    setStoredUpdates(defaultUpdates)
  }, [setStoredApplicants, setStoredUniversities, setStoredCourses, setStoredUpdates])

  // ============================================
  // IMPORT
  // ============================================

  const importApplicants = useCallback((data) => {
    try {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data
      if (!Array.isArray(parsed)) throw new Error('Invalid format')
      setStoredApplicants(parsed)
      return { success: true, count: parsed.length }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [setStoredApplicants])

  return {
    // Data
    applicants,
    universities,
    courses,
    updates,
    loading,
    error,

    // Applicant CRUD
    addApplicant,
    updateApplicant,
    deleteApplicant,
    getApplicantById,

    // University CRUD
    addUniversity,
    updateUniversity,
    deleteUniversity,

    // Course CRUD
    addCourse,
    updateCourse,
    deleteCourse,

    // Updates
    saveUpdates,

    // Utility
    resetToDefault,
    importApplicants,
  }
}

export default useApplicants