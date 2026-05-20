import { Link } from 'react-router-dom'
import styles from './HeroSection.module.scss'

const HeroSection = ({ stats }) => {
  const { total = 0, granted = 0, refused = 0, underProcess = 0 } = stats || {}
  const successRate = (granted + refused) > 0
    ? Math.round((granted / (granted + refused)) * 100)
    : 0

  return (
    <section className={styles.hero}>
      {/* Background decoration */}
      <div className={styles.bgDecor}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      <div className={styles.inner}>
        {/* Left Content */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.dot}></span>
            Live Tracking System · Subclass 500
          </div>

          <h1 className={styles.title}>
            <span className={styles.flag}>🇦🇺</span>
            Australia Student
            <span className={styles.highlight}> Visa Tracker</span>
          </h1>

          <p className={styles.subtitle}>
            Real-time analytics and tracking for Bangladeshi students
            applying for the Australian Subclass 500 Student Visa.
            Monitor applications, trends, and success rates.
          </p>

          {/* Quick stats */}
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{total}</span>
              <span className={styles.heroStatLabel}>Total Applications</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.heroStat}>
              <span className={`${styles.heroStatNum} ${styles.green}`}>{granted}</span>
              <span className={styles.heroStatLabel}>Visa Granted</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.heroStat}>
              <span className={`${styles.heroStatNum} ${styles.gold}`}>{successRate}%</span>
              <span className={styles.heroStatLabel}>Success Rate</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaRow}>
            <Link to="/applications" className={styles.btnPrimary}>
              <i className='bx bx-file'></i>
              View Applications
            </Link>
            <Link to="/dashboard" className={styles.btnSecondary}>
              <i className='bx bx-bar-chart-alt-2'></i>
              Dashboard
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className={styles.visual}>
          <div className={styles.visualCard}>
            <div className={styles.visualHeader}>
              <div className={styles.visualDots}>
                <span></span><span></span><span></span>
              </div>
              <span className={styles.visualTitle}>Application Overview</span>
            </div>

            <div className={styles.visualStats}>
              <div className={styles.visualStat}>
                <div className={`${styles.visualIcon} ${styles.iconGreen}`}>
                  <i className='bx bx-check-shield'></i>
                </div>
                <div>
                  <div className={styles.visualNum}>{granted}</div>
                  <div className={styles.visualLabel}>Granted</div>
                </div>
                <div className={`${styles.visualPill} ${styles.pillGreen}`}>
                  {successRate}%
                </div>
              </div>

              <div className={styles.visualStat}>
                <div className={`${styles.visualIcon} ${styles.iconYellow}`}>
                  <i className='bx bx-time'></i>
                </div>
                <div>
                  <div className={styles.visualNum}>{underProcess}</div>
                  <div className={styles.visualLabel}>In Process</div>
                </div>
                <div className={`${styles.visualPill} ${styles.pillYellow}`}>
                  Active
                </div>
              </div>

              <div className={styles.visualStat}>
                <div className={`${styles.visualIcon} ${styles.iconRed}`}>
                  <i className='bx bx-x-circle'></i>
                </div>
                <div>
                  <div className={styles.visualNum}>{refused}</div>
                  <div className={styles.visualLabel}>Refused</div>
                </div>
                <div className={`${styles.visualPill} ${styles.pillRed}`}>
                  {total > 0 ? Math.round((refused / total) * 100) : 0}%
                </div>
              </div>
            </div>

            <div className={styles.progressBar}>
              <div
                className={`${styles.progressFill} ${styles.fillGreen}`}
                style={{ width: `${total > 0 ? (granted / total) * 100 : 0}%` }}
              ></div>
              <div
                className={`${styles.progressFill} ${styles.fillYellow}`}
                style={{ width: `${total > 0 ? (underProcess / total) * 100 : 0}%` }}
              ></div>
              <div
                className={`${styles.progressFill} ${styles.fillRed}`}
                style={{ width: `${total > 0 ? (refused / total) * 100 : 0}%` }}
              ></div>
            </div>

            <div className={styles.visualFooter}>
              <i className='bx bx-refresh'></i>
              <span>Live data · Updated regularly</span>
            </div>
          </div>

          {/* Floating tags */}
          <div className={`${styles.floatTag} ${styles.tag1}`}>
            <i className='bx bx-globe'></i> Australia
          </div>
          <div className={`${styles.floatTag} ${styles.tag2}`}>
            <i className='bx bx-certification'></i> Subclass 500
          </div>
          <div className={`${styles.floatTag} ${styles.tag3}`}>
            🇧🇩 Bangladesh
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection