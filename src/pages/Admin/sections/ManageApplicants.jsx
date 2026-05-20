import { useState, useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { useToast } from '@components/common/ToastProvider'
import StatusBadge from '@components/common/StatusBadge'
import styles from './ManageApplicants.module.scss'

const ManageApplicants = () => {
  const { applicants, deleteApplicant, updateApplicant } = useApplicants()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [editItem, setEditItem] = useState(null)
  const [editStatus, setEditStatus] = useState('')

  const filtered = useMemo(() => {
    let result = [...applicants]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(a =>
        a.name?.toLowerCase().includes(q) ||
        a.passportNo?.toLowerCase().includes(q) ||
        a.university?.toLowerCase().includes(q)
      )
    }

    if (filterStatus !== 'All') {
      result = result.filter(a => a.status === filterStatus)
    }

    return result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }, [applicants, search, filterStatus])

  const handleDelete = (id, name) => {
    deleteApplicant(id)
    toast.success(`"${name}" deleted successfully`)
    setDeleteConfirm(null)
  }

  const handleStatusChange = (id, newStatus) => {
    const updates = { status: newStatus }
    const today = new Date().toISOString().split('T')[0]

    if (newStatus === 'Granted') {
      updates.grantDate = today
      updates.refusalDate = null
    } else if (newStatus === 'Refused') {
      updates.refusalDate = today
      updates.grantDate = null
    } else {
      updates.grantDate = null
      updates.refusalDate = null
    }

    updateApplicant(id, updates)
    toast.success('Status updated successfully')
    setEditItem(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className='bx bx-user'></i>
        </div>
        <div>
          <h2 className={styles.headerTitle}>Manage Applicants</h2>
          <p className={styles.headerSub}>
            Edit status, delete, or search through all applications
          </p>
        </div>
        <div className={styles.headerCount}>
          {filtered.length} shown
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <i className='bx bx-search'></i>
          <input
            type="text"
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, passport, or university..."
          />
        </div>
        <div className={styles.chipGroup}>
          {['All', 'Under Process', 'Granted', 'Refused'].map(s => (
            <button
              key={s}
              className={`${styles.chip} ${filterStatus === s ? styles.chipActive : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Applicant</th>
                <th>University</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} className={styles.row}>
                  <td className={styles.tdNum}>{i + 1}</td>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.avatar}>{a.name?.charAt(0)}</div>
                      <div>
                        <div className={styles.name}>{a.name}</div>
                        <div className={styles.passport}>{a.passportNo}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.uniCell}>
                      <span className={styles.uniCode}>{a.universityCode}</span>
                      <span className={styles.uniName}>{a.university}</span>
                    </div>
                  </td>
                  <td>
                    {editItem === a.id ? (
                      <select
                        className={styles.statusSelect}
                        value={editStatus}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        onBlur={() => setEditItem(null)}
                        autoFocus
                      >
                        <option value="Under Process">Under Process</option>
                        <option value="Granted">Granted</option>
                        <option value="Refused">Refused</option>
                      </select>
                    ) : (
                      <StatusBadge status={a.status} />
                    )}
                  </td>
                  <td className={styles.dateCell}>{a.applicationDate}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        title="Change status"
                        onClick={() => { setEditItem(a.id); setEditStatus(a.status) }}
                      >
                        <i className='bx bx-edit'></i>
                      </button>
                      <button
                        className={styles.deleteBtn}
                        title="Delete"
                        onClick={() => setDeleteConfirm(a)}
                      >
                        <i className='bx bx-trash'></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <i className='bx bx-search-alt'></i>
            <p>No applicants found</p>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className={styles.overlay} onClick={() => setDeleteConfirm(null)}>
          <div className={styles.confirmModal} onClick={e => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <i className='bx bx-trash'></i>
            </div>
            <h3>Delete Applicant?</h3>
            <p>Remove <strong>{deleteConfirm.name}</strong> from the system?</p>
            <div className={styles.confirmActions}>
              <button className={styles.confirmCancel} onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button
                className={styles.confirmDelete}
                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.name)}
              >
                <i className='bx bx-trash'></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageApplicants