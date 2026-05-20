import { useState, useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { useToast } from '@components/common/ToastProvider'
import styles from './AddApplicant.module.scss'

const INITIAL = {
  name: '',
  passportNo: '',
  dob: '',
  applicationDate: '',
  university: '',
  universityCode: '',
  course: '',
  courseCategory: '',
  status: 'Under Process',
  grantDate: '',
  refusalDate: '',
  notes: '',
  visaLabel: '500',
  intakeYear: 2025,
  intakeSemester: 'Semester 1',
  caseOfficer: '',
}

const SEMESTERS = ['Semester 1', 'Semester 2', 'Summer School', 'Winter School']

const AddApplicant = ({ onSwitchTab }) => {
  const { addApplicant, universities, courses } = useApplicants()
  const toast = useToast()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [confirming, setConfirming] = useState(false)

  const courseCategories = useMemo(() => {
    return [...new Set(courses.map(c => c.category))].sort()
  }, [courses])

  const availableCourses = useMemo(() => {
    return courses.filter(c => c.category === form.courseCategory)
  }, [courses, form.courseCategory])

  const handleChange = (key, value) => {
    setForm(prev => {
      const updated = { ...prev, [key]: value }

      // Auto-fill university code
      if (key === 'university') {
        const uni = universities.find(u => u.name === value)
        updated.universityCode = uni?.id || ''
      }

      // Reset course when category changes
      if (key === 'courseCategory') {
        updated.course = ''
      }

      // Set dates based on status
      if (key === 'status') {
        const today = new Date().toISOString().split('T')[0]
        if (value === 'Granted' && !updated.grantDate) {
          updated.grantDate = today
        }
        if (value === 'Refused' && !updated.refusalDate) {
          updated.refusalDate = today
        }
      }

      return updated
    })

    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.passportNo.trim()) e.passportNo = 'Passport number is required'
    if (!form.applicationDate) e.applicationDate = 'Application date is required'
    if (!form.university) e.university = 'Select a university'
    if (!form.course) e.course = 'Select a course'

    if (form.status === 'Granted' && !form.grantDate) {
      e.grantDate = 'Grant date is required for Granted status'
    }
    if (form.status === 'Refused' && !form.refusalDate) {
      e.refusalDate = 'Refusal date is required for Refused status'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setConfirming(true)
  }

  const confirmSubmit = () => {
    addApplicant(form)
    toast.success(`Applicant "${form.name}" added successfully!`)
    setForm(INITIAL)
    setErrors({})
    setConfirming(false)
    onSwitchTab('applicants')
  }

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className='bx bx-plus-circle'></i>
        </div>
        <div>
          <h2 className={styles.headerTitle}>Add New Applicant</h2>
          <p className={styles.headerSub}>Fill in the details to register a new visa application</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* Personal Info */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <i className='bx bx-user'></i>
            Personal Information
          </h3>
          <div className={styles.formGrid}>
            <FormField
              label="Full Name" icon="bx-user" required
              value={form.name} onChange={(v) => handleChange('name', v)}
              error={errors.name}
              placeholder="e.g. Md. Rafiqul Islam"
            />
            <FormField
              label="Passport Number" icon="bx-id-card" required
              value={form.passportNo} onChange={(v) => handleChange('passportNo', v)}
              error={errors.passportNo}
              placeholder="e.g. BF0012345"
            />
            <FormField
              label="Date of Birth" icon="bx-cake" type="date"
              value={form.dob} onChange={(v) => handleChange('dob', v)}
            />
          </div>
        </div>

        {/* Application Info */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <i className='bx bx-file'></i>
            Application Details
          </h3>
          <div className={styles.formGrid}>
            <FormField
              label="Application Date" icon="bx-calendar" type="date" required
              value={form.applicationDate} onChange={(v) => handleChange('applicationDate', v)}
              error={errors.applicationDate}
            />
            <FormField
              label="Visa Subclass" icon="bx-certification"
              value={form.visaLabel} onChange={(v) => handleChange('visaLabel', v)}
            />
            <FormSelect
              label="Intake Year" icon="bx-calendar-event"
              value={form.intakeYear}
              onChange={(v) => handleChange('intakeYear', v)}
              options={[2024, 2025, 2026, 2027]}
            />
            <FormSelect
              label="Intake Semester" icon="bx-calendar-check"
              value={form.intakeSemester}
              onChange={(v) => handleChange('intakeSemester', v)}
              options={SEMESTERS}
            />
          </div>
        </div>

        {/* University & Course */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <i className='bx bx-buildings'></i>
            University & Course
          </h3>
          <div className={styles.formGrid}>
            <FormSelect
              label="University" icon="bx-buildings" required
              value={form.university}
              onChange={(v) => handleChange('university', v)}
              options={universities.map(u => u.name)}
              error={errors.university}
            />
            <FormField
              label="University Code" icon="bx-hash"
              value={form.universityCode}
              onChange={() => {}}
              disabled
            />
            <FormSelect
              label="Course Category" icon="bx-category"
              value={form.courseCategory}
              onChange={(v) => handleChange('courseCategory', v)}
              options={courseCategories}
            />
            <FormSelect
              label="Course" icon="bx-book-open" required
              value={form.course}
              onChange={(v) => handleChange('course', v)}
              options={availableCourses.map(c => c.name)}
              error={errors.course}
            />
            <FormField
              label="Processing Office" icon="bx-map"
              value={form.caseOfficer}
              onChange={(v) => handleChange('caseOfficer', v)}
              placeholder="e.g. Sydney Office"
            />
          </div>
        </div>

        {/* Status */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <i className='bx bx-time-five'></i>
            Status
          </h3>
          <div className={styles.formGrid}>
            <FormSelect
              label="Current Status" icon="bx-shield" required
              value={form.status}
              onChange={(v) => handleChange('status', v)}
              options={['Under Process', 'Granted', 'Refused']}
              error={errors.status}
            />
            {form.status === 'Granted' && (
              <FormField
                label="Grant Date" icon="bx-check-shield" type="date" required
                value={form.grantDate} onChange={(v) => handleChange('grantDate', v)}
                error={errors.grantDate}
              />
            )}
            {form.status === 'Refused' && (
              <FormField
                label="Refusal Date" icon="bx-shield-x" type="date" required
                value={form.refusalDate} onChange={(v) => handleChange('refusalDate', v)}
                error={errors.refusalDate}
              />
            )}
          </div>

          <div className={styles.formGrid}>
            <div className={styles.fullWidth}>
              <label className={styles.label}>
                <i className='bx bx-note'></i>
                Notes
              </label>
              <textarea
                className={styles.textarea}
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Optional notes about this application..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn}
            onClick={() => onSwitchTab('applicants')}>
            <i className='bx bx-x'></i> Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            <i className='bx bx-check'></i> Add Applicant
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {confirming && (
        <div className={styles.overlay} onClick={() => setConfirming(false)}>
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <i className='bx bx-check-circle'></i>
            </div>
            <h3>Confirm Addition</h3>
            <p>Add <strong>{form.name}</strong> to {form.university}?</p>
            <div className={styles.confirmActions}>
              <button className={styles.confirmCancel} onClick={() => setConfirming(false)}>
                Cancel
              </button>
              <button className={styles.confirmSubmit} onClick={confirmSubmit}>
                <i className='bx bx-check'></i> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Reusable field components
const FormField = ({ label, icon, type = 'text', value, onChange, error, disabled, placeholder, required }) => (
  <div className={styles.field}>
    <label className={styles.label}>
      <i className={`bx ${icon}`}></i>
      {label} {required && <span className={styles.required}>*</span>}
    </label>
    <input
      type={type}
      className={`${styles.input} ${error ? styles.inputError : ''} ${disabled ? styles.inputDisabled : ''}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
    />
    {error && <span className={styles.fieldError}>{error}</span>}
  </div>
)

const FormSelect = ({ label, icon, value, onChange, options, error, required }) => (
  <div className={styles.field}>
    <label className={styles.label}>
      <i className={`bx ${icon}`}></i>
      {label} {required && <span className={styles.required}>*</span>}
    </label>
    <select
      className={`${styles.select} ${error ? styles.inputError : ''}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select...</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    {error && <span className={styles.fieldError}>{error}</span>}
  </div>
)

export default AddApplicant