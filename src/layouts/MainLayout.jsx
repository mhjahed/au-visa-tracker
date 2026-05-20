// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '@components/navigation/Navbar'
import Footer from '@components/common/Footer'
import ScrollToTop from '@components/common/ScrollToTop'

const MainLayout = () => {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default MainLayout