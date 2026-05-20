// src/components/loaders/PageLoader.jsx
import styles from './PageLoader.module.scss'

const PageLoader = () => {
  return (
    <div className={styles.pageLoader}>
      <div className={styles.loaderContent}>
        <div className={styles.flag}>🇦🇺</div>
        <div className={styles.spinner}>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
        </div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  )
}

export default PageLoader