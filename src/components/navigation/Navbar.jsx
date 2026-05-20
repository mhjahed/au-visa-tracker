// src/components/navigation/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { routes } from '@routes/routes'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)

  const navRoutes = routes.filter(r => r.showInNav)

  // Handle scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      ref={menuRef}
    >
      <div className={styles.inner}>

        {/* Brand */}
        <Link to="/" className={styles.brand}>
          <div className={styles.brandIcon}>
            <span>🇦🇺</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>AU Visa Tracker</span>
            <span className={styles.brandSub}>Subclass 500 | Bangladesh</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className={styles.navLinks}>
          {navRoutes.map(route => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                <i className={`bx ${route.icon}`}></i>
                <span>{route.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className={styles.navRight}>
          <Link to="/admin" className={styles.adminBtn}>
            <i className='bx bx-shield-quarter'></i>
            <span>Admin</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {navRoutes.map(route => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
              >
                <i className={`bx ${route.icon}`}></i>
                <span>{route.label}</span>
                <i className='bx bx-chevron-right ms-auto'></i>
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/admin" className={`${styles.mobileLink} ${styles.adminMobile}`}>
              <i className='bx bx-shield-quarter'></i>
              <span>Admin Panel</span>
              <i className='bx bx-chevron-right ms-auto'></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar