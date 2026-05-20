// src/components/common/Footer.jsx
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>

          <div className={styles.brand}>
            <div className={styles.brandIcon}>🇦🇺</div>
            <div>
              <h3 className={styles.brandTitle}>AU Visa Tracker</h3>
              <p className={styles.brandSub}>
                Subclass 500 Student Visa Analytics
              </p>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/applications">Applications</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/statistics">Statistics</Link></li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h4>More</h4>
              <ul>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/developer">Developer</Link></li>
                <li><Link to="/admin">Admin Panel</Link></li>
              </ul>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoCard}>
              <i className='bx bx-info-circle'></i>
              <p>
                This tracker is for Bangladeshi students applying for the
                Australian Subclass 500 Student Visa. Data is managed locally.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} AU Visa Tracker · All rights reserved
          </p>
          <p className={styles.disclaimer}>
            Not affiliated with the Australian Department of Home Affairs
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer