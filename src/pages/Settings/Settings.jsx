import { useState, useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { useToast } from '@components/common/ToastProvider'
import { exportJSON, exportCSV, parseImportFile } from '@utils/exportHelpers'
import { storage } from '@hooks/useLocalStorage'
import { getStatusCounts, getSuccessRate, getAverageWaitingDays } from '@utils/analytics'
import styles from './Settings.module.scss'

const APP_VERSION = '1.0.0'

const Settings = () => {
  const { applicants, universities, courses, updates, resetToDefault, importApplicants } = useApplicants()
  const toast = useToast()
  const [importing, setImporting] = useState(false)

  const counts = useMemo(() => getStatusCounts(applicants), [applicants])
  const successRate = useMemo(() => getSuccessRate(applicants), [applicants])
  const avgWait = useMemo(() => getAverageWaitingDays(applicants), [applicants])
  const storageSize = storage.getStorageSize()

  const handleExportJSON = () => {
    const data = { applicants, universities, courses, updates, exportDate: new Date().toISOString() }
    exportJSON(data, 'visa-tracker-full-backup')
    toast.success('Full backup exported as JSON')
  }

  const handleExportApplicantsJSON = () => {
    exportJSON(applicants, 'applicants')
    toast.success('Applicants exported as JSON')
  }

  const handleExportCSV = () => {
    exportCSV(applicants, 'applicants')
    toast.success('Applicants exported as CSV')
  }

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setImporting(true)
      const data = await parseImportFile(file)
      const result = importApplicants(data)
      if (result.success) {
        toast.success(`Imported ${result.count} applicants successfully`)
      } else {
        toast.error(`Import failed: ${result.error}`)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setImporting(false)
      e.target.value = ''
    }
  }

  const handleReset = () => {
    if (window.confirm('This will reset all data to default sample data. Are you sure?')) {
      resetToDefault()
      toast.success('Data reset to defaults')
    }
  }

  const handleClearStorage = () => {
    if (window.confirm('This will clear all locally stored data. Are you sure?')) {
      storage.clear()
      toast.success('Local storage cleared')
      setTimeout(() => window.location.reload(), 500)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.pageIcon}>
              <i className='bx bx-cog'></i>
            </div>
            <div>
              <h1 className={styles.pageTitle}>Settings</h1>
              <p className={styles.pageSub}>Export, import, and manage system data</p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className='bx bx-info-circle'></i>
            System Information
          </h2>
          <div className={styles.infoGrid}>
            <InfoCard icon="bx-package" label="Version" value={APP_VERSION} />
            <InfoCard icon="bx-file-blank" label="Total Applications" value={counts.total} />
            <InfoCard icon="bx-check-shield" label="Success Rate" value={`${successRate}%`} />
            <InfoCard icon="bx-timer" label="Avg Wait" value={`${avgWait} days`} />
            <InfoCard icon="bx-buildings" label="Universities" value={universities.length} />
            <InfoCard icon="bx-book-open" label="Courses" value={courses.length} />
            <InfoCard icon="bx-hdd" label="Storage Used" value={storageSize} />
            <InfoCard icon="bx-shield" label="Admin Panel" value="Enabled" />
          </div>
        </section>

        {/* App Description */}
        <section className={styles.section}>
          <div className={styles.aboutCard}>
            <div className={styles.aboutIcon}>🇦🇺</div>
            <div>
              <h2 className={styles.aboutTitle}>Australia Student Visa Tracker</h2>
              <p className={styles.aboutDesc}>
                A professional visa tracking and analytics platform for Bangladeshi students
                applying for the Australian Subclass 500 Student Visa. Built with React + Vite,
                fully frontend-based with localStorage persistence and JSON data management.
                Features include real-time analytics, interactive charts, admin management,
                and comprehensive data export/import capabilities.
              </p>
              <div className={styles.techBadges}>
                <span className={styles.techBadge}>React 18</span>
                <span className={styles.techBadge}>Vite</span>
                <span className={styles.techBadge}>Chart.js</span>
                <span className={styles.techBadge}>Bootstrap 5</span>
                <span className={styles.techBadge}>SCSS</span>
                <span className={styles.techBadge}>LocalStorage</span>
              </div>
            </div>
          </div>
        </section>

        {/* Export */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className='bx bx-export'></i>
            Export Data
          </h2>
          <div className={styles.exportGrid}>
            <ExportCard
              icon="bx-data"
              title="Full Backup (JSON)"
              desc="Complete backup of all data — applicants, universities, courses, and updates"
              count={`${counts.total} applicants, ${universities.length} universities`}
              onClick={handleExportJSON}
            />
            <ExportCard
              icon="bx-file"
              title="Applicants (JSON)"
              desc="Export only applicant data as formatted JSON file"
              count={`${counts.total} applicants`}
              onClick={handleExportApplicantsJSON}
            />
            <ExportCard
              icon="bx-table"
              title="Applicants (CSV)"
              desc="Export applicant data as spreadsheet-compatible CSV file"
              count={`${counts.total} records`}
              onClick={handleExportCSV}
            />
          </div>
        </section>

        {/* Import */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className='bx bx-import'></i>
            Import Data
          </h2>
          <div className={styles.importCard}>
            <div className={styles.importInfo}>
              <i className='bx bx-upload'></i>
              <div>
                <h3 className={styles.importTitle}>Import Applicants from JSON</h3>
                <p className={styles.importDesc}>
                  Upload a JSON file containing applicant data. This will replace the current applicant list.
                </p>
              </div>
            </div>
            <label className={styles.importBtn}>
              <i className='bx bx-folder-open'></i>
              {importing ? 'Importing...' : 'Choose File'}
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
                disabled={importing}
              />
            </label>
          </div>
        </section>

        {/* Danger Zone */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>
            <i className='bx bx-error'></i>
            Danger Zone
          </h2>
          <div className={styles.dangerGrid}>
            <div className={styles.dangerCard}>
              <div className={styles.dangerContent}>
                <i className='bx bx-refresh'></i>
                <div>
                  <h3>Reset to Default Data</h3>
                  <p>Replace all current data with the original sample data</p>
                </div>
              </div>
              <button className={styles.dangerBtn} onClick={handleReset}>
                Reset Data
              </button>
            </div>
            <div className={styles.dangerCard}>
              <div className={styles.dangerContent}>
                <i className='bx bx-trash'></i>
                <div>
                  <h3>Clear Local Storage</h3>
                  <p>Remove all stored data and start fresh (page will reload)</p>
                </div>
              </div>
              <button className={styles.dangerBtnDelete} onClick={handleClearStorage}>
                Clear Storage
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

const InfoCard = ({ icon, label, value }) => (
  <div className={styles.infoCard}>
    <div className={styles.infoIcon}><i className={`bx ${icon}`}></i></div>
    <div className={styles.infoLabel}>{label}</div>
    <div className={styles.infoValue}>{value}</div>
  </div>
)

const ExportCard = ({ icon, title, desc, count, onClick }) => (
  <div className={styles.exportCard}>
    <div className={styles.exportIcon}><i className={`bx ${icon}`}></i></div>
    <h3 className={styles.exportTitle}>{title}</h3>
    <p className={styles.exportDesc}>{desc}</p>
    <div className={styles.exportCount}>{count}</div>
    <button className={styles.exportBtn} onClick={onClick}>
      <i className='bx bx-download'></i> Export
    </button>
  </div>
)

export default Settings