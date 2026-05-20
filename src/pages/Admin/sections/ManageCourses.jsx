import { useState, useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { useToast } from '@components/common/ToastProvider'
import styles from './ManageCourses.module.scss'

const CATEGORY_ICONS = {
  'IT & Computing': 'bx-code-alt', 'Business & Commerce': 'bx-briefcase',
  'Engineering': 'bx-cog', 'Health & Medicine': 'bx-plus-medical',
  'Science': 'bx-atom', 'Education': 'bx-book',
  'Social Sciences': 'bx-brain', 'Other': 'bx-layer',
}

const ManageCourses = () => {
  const { courses, addCourse, deleteCourse } = useApplicants()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [newCourse, setNewCourse] = useState({ name: '', category: '', level: '', duration: '', icon: '' })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const categories = useMemo(() => [...new Set(courses.map(c => c.category))].sort(), [courses])

  const filtered = useMemo(() => {
    if (!search.trim()) return courses
    const q = search.toLowerCase()
    return courses.filter(c => c.name?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q))
  }, [courses, search])

  const handleAdd = () => {
    if (!newCourse.name.trim()) { toast.error('Course name is required'); return }
    addCourse({
      ...newCourse,
      icon: newCourse.icon || CATEGORY_ICONS[newCourse.category] || 'bx-layer',
      color: '#3B82F6',
    })
    toast.success('Course added')
    setNewCourse({ name: '', category: '', level: '', duration: '', icon: '' })
    setAdding(false)
  }

  const handleDelete = (id, name) => {
    deleteCourse(id)
    toast.success(`"${name}" removed`)
    setDeleteConfirm(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className='bx bx-book-open'></i>
        </div>
        <div>
          <h2 className={styles.headerTitle}>Manage Courses</h2>
          <p className={styles.headerSub}>{courses.length} courses in the system</p>
        </div>
        <button className={styles.addBtn} onClick={() => setAdding(!adding)}>
          <i className={`bx ${adding ? 'bx-x' : 'bx-plus'}`}></i>
          {adding ? 'Cancel' : 'Add Course'}
        </button>
      </div>

      {adding && (
        <div className={styles.addForm}>
          <div className={styles.formRow}>
            <input className={styles.input} placeholder="Course Name" value={newCourse.name} onChange={e => setNewCourse(p => ({ ...p, name: e.target.value }))} />
            <select className={styles.input} value={newCourse.category} onChange={e => setNewCourse(p => ({ ...p, category: e.target.value }))}>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="Other">Other</option>
            </select>
            <input className={styles.input} placeholder="Level (e.g. Postgraduate)" value={newCourse.level} onChange={e => setNewCourse(p => ({ ...p, level: e.target.value }))} />
            <input className={styles.input} placeholder="Duration (e.g. 2 years)" value={newCourse.duration} onChange={e => setNewCourse(p => ({ ...p, duration: e.target.value }))} />
            <button className={styles.confirmAddBtn} onClick={handleAdd}>
              <i className='bx bx-check'></i> Save
            </button>
          </div>
        </div>
      )}

      <div className={styles.searchWrap}>
        <i className='bx bx-search'></i>
        <input className={styles.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." />
      </div>

      <div className={styles.grid}>
        {filtered.map((course, i) => {
          const icon = CATEGORY_ICONS[course.category] || 'bx-layer'
          return (
            <div key={course.id} className={styles.card} style={{ animationDelay: `${i * 0.03}s` }}>
              <div className={styles.cardTop}>
                <div className={styles.cardIcon} style={{ background: `${course.color || '#3B82F6'}18`, color: course.color || '#3B82F6' }}>
                  <i className={`bx ${icon}`}></i>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.courseName}>{course.name}</div>
                  <div className={styles.courseMeta}>{course.category} · {course.level || '—'} · {course.duration || '—'}</div>
                </div>
              </div>
              <button className={styles.cardDelete} onClick={() => setDeleteConfirm(course)}>
                <i className='bx bx-trash'></i>
              </button>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <i className='bx bx-book-open'></i>
          <p>No courses found</p>
        </div>
      )}

      {deleteConfirm && (
        <div className={styles.overlay} onClick={() => setDeleteConfirm(null)}>
          <div className={styles.confirmModal} onClick={e => e.stopPropagation()}>
            <h3>Remove "{deleteConfirm.name}"?</h3>
            <div className={styles.confirmActions}>
              <button className={styles.confirmCancel} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className={styles.confirmDelete} onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.name)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCourses