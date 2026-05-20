import { useState } from 'react'
import { useApplicants } from '@hooks/useApplicants'
import { useToast } from '@components/common/ToastProvider'
import styles from './ManageUpdates.module.scss'

const ManageUpdates = () => {
  const { updates, saveUpdates } = useApplicants()
  const toast = useToast()

  const [lastUpdate, setLastUpdate] = useState({
    date: updates?.lastUpdate?.date || '',
    time: updates?.lastUpdate?.time || '',
    note: updates?.lastUpdate?.note || '',
    updatedBy: updates?.lastUpdate?.updatedBy || 'Admin',
    totalApplications: updates?.lastUpdate?.totalApplications || 0,
    granted: updates?.lastUpdate?.granted || 0,
    refused: updates?.lastUpdate?.refused || 0,
    underProcess: updates?.lastUpdate?.underProcess || 0,
    newToday: updates?.lastUpdate?.newToday || 0,
    grantedToday: updates?.lastUpdate?.grantedToday || 0,
    refusedToday: updates?.lastUpdate?.refusedToday || 0,
  })

  const [nextUpdate, setNextUpdate] = useState({
    date: updates?.nextUpdate?.date || '',
    time: updates?.nextUpdate?.time || '',
    note: updates?.nextUpdate?.note || '',
    scheduledBy: updates?.nextUpdate?.scheduledBy || 'Admin',
  })

  const handleSave = () => {
    saveUpdates({ ...updates, lastUpdate, nextUpdate })
    toast.success('Update information saved successfully!')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className='bx bx-calendar-event'></i>
        </div>
        <div>
          <h2 className={styles.headerTitle}>Manage Updates</h2>
          <p className={styles.headerSub}>Update last update info and schedule next update</p>
        </div>
        <button className={styles.saveBtn} onClick={handleSave}>
          <i className='bx bx-save'></i>
          Save Changes
        </button>
      </div>

      <div className={styles.grid}>
        {/* Last Update */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <i className='bx bx-check-circle'></i>
            Last Update Information
          </div>

          <div className={styles.cardBody}>
            <div className={styles.row}>
              <label className={styles.label}>Date</label>
              <input className={styles.input} type="date" value={lastUpdate.date} onChange={e => setLastUpdate(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div className={styles.row}>
              <label className={styles.label}>Time</label>
              <input className={styles.input} type="time" value={lastUpdate.time} onChange={e => setLastUpdate(p => ({ ...p, time: e.target.value }))} />
            </div>
            <div className={styles.row}>
              <label className={styles.label}>Note</label>
              <textarea className={styles.textarea} value={lastUpdate.note} onChange={e => setLastUpdate(p => ({ ...p, note: e.target.value }))} placeholder="What happened in this update..." rows={3} />
            </div>
            <div className={styles.statsRow}>
              <div className={styles.miniField}>
                <label className={styles.label}>Total</label>
                <input className={styles.input} type="number" value={lastUpdate.totalApplications} onChange={e => setLastUpdate(p => ({ ...p, totalApplications: Number(e.target.value) }))} />
              </div>
              <div className={styles.miniField}>
                <label className={styles.label}>Granted</label>
                <input className={styles.input} type="number" value={lastUpdate.granted} onChange={e => setLastUpdate(p => ({ ...p, granted: Number(e.target.value) }))} />
              </div>
              <div className={styles.miniField}>
                <label className={styles.label}>Refused</label>
                <input className={styles.input} type="number" value={lastUpdate.refused} onChange={e => setLastUpdate(p => ({ ...p, refused: Number(e.target.value) }))} />
              </div>
              <div className={styles.miniField}>
                <label className={styles.label}>Processing</label>
                <input className={styles.input} type="number" value={lastUpdate.underProcess} onChange={e => setLastUpdate(p => ({ ...p, underProcess: Number(e.target.value) }))} />
              </div>
            </div>
          </div>
        </div>

        {/* Next Update */}
        <div className={styles.card}>
          <div className={`${styles.cardTitle} ${styles.cardTitleBlue}`}>
            <i className='bx bx-calendar-event'></i>
            Next Scheduled Update
          </div>

          <div className={styles.cardBody}>
            <div className={styles.row}>
              <label className={styles.label}>Scheduled Date</label>
              <input className={styles.input} type="date" value={nextUpdate.date} onChange={e => setNextUpdate(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div className={styles.row}>
              <label className={styles.label}>Scheduled Time</label>
              <input className={styles.input} type="time" value={nextUpdate.time} onChange={e => setNextUpdate(p => ({ ...p, time: e.target.value }))} />
            </div>
            <div className={styles.row}>
              <label className={styles.label}>Note</label>
              <textarea className={styles.textarea} value={nextUpdate.note} onChange={e => setNextUpdate(p => ({ ...p, note: e.target.value }))} placeholder="Notes about the next update..." rows={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick update */}
      <div className={styles.quickCard}>
        <h3 className={styles.quickTitle}>
          <i className='bx bx-bolt'></i>
          Quick Update Today
        </h3>
        <div className={styles.statsRow}>
          <div className={styles.miniField}>
            <label className={styles.label}>New Today</label>
            <input className={styles.input} type="number" value={lastUpdate.newToday} onChange={e => setLastUpdate(p => ({ ...p, newToday: Number(e.target.value) }))} />
          </div>
          <div className={styles.miniField}>
            <label className={styles.label}>Granted Today</label>
            <input className={styles.input} type="number" value={lastUpdate.grantedToday} onChange={e => setLastUpdate(p => ({ ...p, grantedToday: Number(e.target.value) }))} />
          </div>
          <div className={styles.miniField}>
            <label className={styles.label}>Refused Today</label>
            <input className={styles.input} type="number" value={lastUpdate.refusedToday} onChange={e => setLastUpdate(p => ({ ...p, refusedToday: Number(e.target.value) }))} />
          </div>
          <div className={styles.miniField}>
            <label className={styles.label}>Updated By</label>
            <input className={styles.input} value={lastUpdate.updatedBy} onChange={e => setLastUpdate(p => ({ ...p, updatedBy: e.target.value }))} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUpdates