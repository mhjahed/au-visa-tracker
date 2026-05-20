// src/utils/exportHelpers.js
import { format } from 'date-fns'

/**
 * Export data as JSON file download
 */
export const exportJSON = (data, filename = 'visa-tracker-export') => {
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm')
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: 'application/json' }
  )
  downloadFile(blob, `${filename}_${timestamp}.json`)
}

/**
 * Export applicants as CSV file download
 */
export const exportCSV = (applicants, filename = 'applicants') => {
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm')

  const headers = [
    'ID',
    'Name',
    'Passport No',
    'Date of Birth',
    'Application Date',
    'University',
    'Course',
    'Course Category',
    'Status',
    'Grant Date',
    'Refusal Date',
    'Waiting Days',
    'Intake Year',
    'Intake Semester',
    'Notes',
  ]

  const rows = applicants.map(a => [
    a.id,
    `"${a.name}"`,
    a.passportNo,
    a.dob,
    a.applicationDate,
    `"${a.university}"`,
    `"${a.course}"`,
    `"${a.courseCategory}"`,
    a.status,
    a.grantDate || '',
    a.refusalDate || '',
    a.waitingDays || 0,
    a.intakeYear,
    `"${a.intakeSemester}"`,
    `"${(a.notes || '').replace(/"/g, "'")}"`,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  downloadFile(blob, `${filename}_${timestamp}.csv`)
}

/**
 * Trigger file download
 */
const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Parse imported JSON file
 */
export const parseImportFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        resolve(data)
      } catch {
        reject(new Error('Invalid JSON file. Please check the file format.'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file.'))
    reader.readAsText(file)
  })
}