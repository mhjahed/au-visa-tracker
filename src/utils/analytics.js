// src/utils/analytics.js
import { differenceInDays, parseISO, isValid, format, subDays } from 'date-fns'

/**
 * Get total counts by status
 */
export const getStatusCounts = (applicants) => {
  return applicants.reduce(
    (acc, a) => {
      if (a.status === 'Granted') acc.granted++
      else if (a.status === 'Refused') acc.refused++
      else if (a.status === 'Under Process') acc.underProcess++
      acc.total++
      return acc
    },
    { total: 0, granted: 0, refused: 0, underProcess: 0 }
  )
}

/**
 * Calculate success rate (grant rate among finalized)
 */
export const getSuccessRate = (applicants) => {
  const finalized = applicants.filter(
    a => a.status === 'Granted' || a.status === 'Refused'
  )
  if (finalized.length === 0) return 0
  const granted = finalized.filter(a => a.status === 'Granted').length
  return Math.round((granted / finalized.length) * 100)
}

/**
 * Average waiting days for finalized applications
 */
export const getAverageWaitingDays = (applicants) => {
  const finalized = applicants.filter(
    a => (a.status === 'Granted' || a.status === 'Refused') && a.waitingDays > 0
  )
  if (finalized.length === 0) return 0
  const total = finalized.reduce((sum, a) => sum + (a.waitingDays || 0), 0)
  return Math.round(total / finalized.length)
}

/**
 * Get applications grouped by university
 */
export const getByUniversity = (applicants) => {
  const map = {}
  applicants.forEach(a => {
    if (!map[a.university]) {
      map[a.university] = {
        university: a.university,
        universityCode: a.universityCode,
        total: 0,
        granted: 0,
        refused: 0,
        underProcess: 0,
      }
    }
    map[a.university].total++
    if (a.status === 'Granted') map[a.university].granted++
    else if (a.status === 'Refused') map[a.university].refused++
    else if (a.status === 'Under Process') map[a.university].underProcess++
  })

  return Object.values(map)
    .map(u => ({
      ...u,
      successRate: u.total > 0
        ? Math.round(((u.granted) / Math.max(u.granted + u.refused, 1)) * 100)
        : 0,
    }))
    .sort((a, b) => b.total - a.total)
}

/**
 * Get applications grouped by course category
 */
export const getByCourse = (applicants) => {
  const map = {}
  applicants.forEach(a => {
    const cat = a.courseCategory || 'Other'
    if (!map[cat]) {
      map[cat] = {
        category: cat,
        total: 0,
        granted: 0,
        refused: 0,
        underProcess: 0,
      }
    }
    map[cat].total++
    if (a.status === 'Granted') map[cat].granted++
    else if (a.status === 'Refused') map[cat].refused++
    else if (a.status === 'Under Process') map[cat].underProcess++
  })

  return Object.values(map)
    .map(c => ({
      ...c,
      successRate: c.total > 0
        ? Math.round((c.granted / Math.max(c.granted + c.refused, 1)) * 100)
        : 0,
    }))
    .sort((a, b) => b.total - a.total)
}

/**
 * Get daily trend data for last N days
 */
export const getDailyTrend = (applicants, days = 30) => {
  const result = []

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i)
    const dateStr = format(date, 'yyyy-MM-dd')

    const dayGranted = applicants.filter(
      a => a.status === 'Granted' && a.grantDate === dateStr
    ).length

    const dayRefused = applicants.filter(
      a => a.status === 'Refused' && a.refusalDate === dateStr
    ).length

    const dayNew = applicants.filter(
      a => a.applicationDate === dateStr
    ).length

    result.push({
      date: dateStr,
      label: format(date, 'MMM dd'),
      shortLabel: format(date, 'dd'),
      granted: dayGranted,
      refused: dayRefused,
      newApplications: dayNew,
    })
  }

  return result
}

/**
 * Get 7-day summary
 */
export const getSevenDaySummary = (applicants) => {
  return getDailyTrend(applicants, 7)
}

/**
 * Get today's stats
 */
export const getTodayStats = (applicants) => {
  const today = format(new Date(), 'yyyy-MM-dd')

  return {
    granted: applicants.filter(
      a => a.status === 'Granted' && a.grantDate === today
    ).length,
    refused: applicants.filter(
      a => a.status === 'Refused' && a.refusalDate === today
    ).length,
    newApplications: applicants.filter(
      a => a.applicationDate === today
    ).length,
  }
}

/**
 * Get processing ratio
 */
export const getProcessingRatio = (applicants) => {
  const { total, underProcess } = getStatusCounts(applicants)
  if (total === 0) return 0
  return Math.round((underProcess / total) * 100)
}

/**
 * Get top universities by grant count
 */
export const getTopUniversities = (applicants, limit = 5) => {
  return getByUniversity(applicants)
    .sort((a, b) => b.granted - a.granted)
    .slice(0, limit)
}

/**
 * Get top courses by application count
 */
export const getTopCourses = (applicants, limit = 5) => {
  return getByCourse(applicants)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
}

/**
 * Pie chart data
 */
export const getPieChartData = (applicants) => {
  const { granted, refused, underProcess } = getStatusCounts(applicants)
  return {
    labels: ['Granted', 'Refused', 'Under Process'],
    datasets: [
      {
        data: [granted, refused, underProcess],
        backgroundColor: [
          'rgba(6, 95, 70, 0.85)',
          'rgba(153, 27, 27, 0.85)',
          'rgba(146, 64, 14, 0.85)',
        ],
        borderColor: ['#065F46', '#991B1B', '#92400E'],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  }
}

/**
 * Bar chart data (university overview)
 */
export const getBarChartData = (applicants) => {
  const byUni = getByUniversity(applicants).slice(0, 8)

  return {
    labels: byUni.map(u => u.universityCode || u.university),
    datasets: [
      {
        label: 'Granted',
        data: byUni.map(u => u.granted),
        backgroundColor: 'rgba(6, 95, 70, 0.8)',
        borderColor: '#065F46',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Refused',
        data: byUni.map(u => u.refused),
        backgroundColor: 'rgba(153, 27, 27, 0.8)',
        borderColor: '#991B1B',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'In Process',
        data: byUni.map(u => u.underProcess),
        backgroundColor: 'rgba(146, 64, 14, 0.8)',
        borderColor: '#92400E',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }
}

/**
 * Line chart data (daily trend)
 */
export const getLineChartData = (applicants, days = 7) => {
  const trend = getDailyTrend(applicants, days)

  return {
    labels: trend.map(d => d.label),
    datasets: [
      {
        label: 'Granted',
        data: trend.map(d => d.granted),
        borderColor: '#065F46',
        backgroundColor: 'rgba(6, 95, 70, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#065F46',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Refused',
        data: trend.map(d => d.refused),
        borderColor: '#991B1B',
        backgroundColor: 'rgba(153, 27, 27, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#991B1B',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }
}