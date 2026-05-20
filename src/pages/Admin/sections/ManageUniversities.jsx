import { useState, useMemo } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { useToast } from '@components/common/ToastProvider'
import styles from './ManageUniversities.module.scss'

const ManageUniversities = () => {
  const { universities, addUniversity, deleteUniversity } = useApplicants()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [newUni, setNewUni] = useState({ id: '', name: '', shortName: '', state: '', city: '', logo: '' })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return universities
    const q = search.toLowerCase()
    return universities.filter(u =>
      u.name?.toLowerCase().includes(q) ||
      u.id?.toLowerCase().includes(q) ||
      u.state?.toLowerCase().includes(q)
    )
  }, [universities, search])

  const handleAdd = () => {
    if (!newUni.name.trim() || !newUni.id.trim()) {
      toast.error('Name and Code are required')
      return
    }
    addUniversity({ ...newUni, logo: newUni.logo || 'default.png', ranking: universities.length + 1, website: '' })
    toast.success(`${newUni.name} added successfully`)
    setNewUni({ id: '', name: '', shortName: '', state: '', city: '', logo: '' })
    setAdding(false)
  }

  const handleDelete = (id, name) => {
    deleteUniversity(id)
    toast.success(`"${name}" removed`)
    setDeleteConfirm(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className='bx bx-buildings'></i>
        </div>
        <div>
          <h2 className={styles.headerTitle}>Manage Universities</h2>
          <p className={styles.headerSub}>{universities.length} universities in the system</p>
        </div>
        <button className={styles.addBtn} onClick={() => setAdding(!adding)}>
          <i className={`bx ${adding ? 'bx-x' : 'bx-plus'}`}></i>
          {adding ? 'Cancel' : 'Add University'}
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className={styles.addForm}>
          <div className={styles.formRow}>
            <input className={styles.input} placeholder="Code (e.g. UOM)" value={newUni.id} onChange={e => setNewUni(p => ({ ...p, id: e.target.value }))} />
            <input className={styles.input} placeholder="Full Name" value={newUni.name} onChange={e => setNewUni(p => ({ ...p, name: e.target.value }))} />
            <input className={styles.input} placeholder="Short Name" value={newUni.shortName} onChange={e => setNewUni(p => ({ ...p, shortName: e.target.value }))} />
            <input className={styles.input} placeholder="State" value={newUni.state} onChange={e => setNewUni(p => ({ ...p, state: e.target.value }))} />
            <input className={styles.input} placeholder="City" value={newUni.city} onChange={e => setNewUni(p => ({ ...p, city: e.target.value }))} />
            <input className={styles.input} placeholder="Logo filename" value={newUni.logo} onChange={e => setNewUni(p => ({ ...p, logo: e.target.value }))} />
            <button className={styles.confirmAddBtn} onClick={handleAdd}>
              <i className='bx bx-check'></i> Save
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className={styles.searchWrap}>
        <i className='bx bx-search'></i>
        <input
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search universities..."
        />
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((uni, i) => (
          <div key={uni.id} className={styles.card} style={{ animationDelay: `${i * 0.03}s` }}>
            <div className={styles.cardTop}>
              <div className={styles.logoWrap}>
                <img
                  src={`/src/assets/logos/${uni.logo}`}
                  alt={uni.name}
                  className={styles.logo}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className={styles.logoFallback} style={{ display: 'none' }}>
                  {uni.shortName?.slice(0, 3)}
                </div>
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.uniName}>{uni.name}</div>
                <div className={styles.uniMeta}>{uni.id} · {uni.state} · {uni.city}</div>
              </div>
            </div>
            <button
              className={styles.cardDelete}
              onClick={() => setDeleteConfirm(uni)}
              title="Remove university"
            >
              <i className='bx bx-trash'></i>
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <i className='bx bx-buildings'></i>
          <p>No universities found</p>
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

export default ManageUniversities