// src/components/common/ScrollToTop.jsx
import { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.scss'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
    >
      <i className='bx bx-chevron-up'></i>
    </button>
  )
}

export default ScrollToTop