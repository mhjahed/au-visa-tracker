import { useState } from 'react'
import styles from './AdminLayout.module.scss'
import AddApplicant from './sections/AddApplicant'
import ManageApplicants from './sections/ManageApplicants'
import ManageUniversities from './sections/ManageUniversities'
import ManageCourses from './sections/ManageCourses'
import ManageUpdates from './sections/ManageUpdates'

const TABS = [
  { id: 'applicants', label: 'Manage Applicants', icon: 'bx-user', badge: null },
  { id: 'add', label: 'Add Applicant', icon: 'bx-plus-circle', badge: null },
  { id: 'universities', label: 'Universities', icon: 'bx-buildings', badge: null },
  { id: 'courses', label: 'Courses', icon: 'bx-book-open', badge: null },
  { id: 'updates', label: 'Updates', icon: 'bx-calendar-event', badge: null },
]

const AdminLayout = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('applicants')

  const renderTab = () => {
    switch (activeTab) {
      case 'add': return <AddApplicant onSwitchTab={setActiveTab} />
      case 'applicants': return <ManageApplicants />
      case 'universities': return <ManageUniversities />
      case 'courses': return <ManageCourses />
      case 'updates': return <ManageUpdates />
      default: return <ManageApplicants />
    }
  }

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.adminAvatar}>
            <i className='bx bx-shield-quarter'></i>
          </div>
          <div>
            <div className={styles.adminTitle}>Admin Panel</div>
            <div className={styles.adminSub}>Management Tools</div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.navActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`bx ${tab.icon}`}></i>
              <span>{tab.label}</span>
              {activeTab === tab.id && <div className={styles.activeIndicator}></div>}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <i className='bx bx-log-out'></i>
            <span>Logout</span>
          </button>
          <button
            className={styles.homeBtn}
            onClick={() => window.location.href = '/'}
          >
            <i className='bx bx-home'></i>
            <span>Back to Home</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className={styles.content}>
        <div className={styles.contentInner}>
          {renderTab()}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout