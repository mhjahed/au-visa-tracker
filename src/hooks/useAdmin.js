import { useState, useCallback, useEffect } from 'react'
import AdminAuth from '@utils/adminHelpers'

export const useAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => AdminAuth.isAuthenticated()
  )
  const [isLocked, setIsLocked] = useState(() => AdminAuth.isLocked())
  const [attempts, setAttempts] = useState(() => AdminAuth.getAttempts())
  const [lockRemaining, setLockRemaining] = useState(0)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('applicants')

  // Update lock countdown
  useEffect(() => {
    if (!isLocked) return
    const interval = setInterval(() => {
      const remaining = AdminAuth.getRemainingTime()
      setLockRemaining(remaining)
      if (remaining <= 0) {
        setIsLocked(false)
        setAttempts(0)
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isLocked])

  const login = useCallback((passcode) => {
    const result = AdminAuth.verify(passcode)
    if (result.success) {
      setIsAuthenticated(true)
      setIsLocked(false)
      setAttempts(0)
      setError('')
    } else {
      setIsAuthenticated(false)
      setError(result.message)
      if (result.locked) {
        setIsLocked(true)
        setLockRemaining(result.remaining)
      }
      setAttempts(result.attempts || 0)
    }
    return result
  }, [])

  const logout = useCallback(() => {
    AdminAuth.logout()
    setIsAuthenticated(false)
    setAttempts(0)
    setError('')
    setActiveTab('applicants')
  }, [])

  return {
    isAuthenticated,
    isLocked,
    attempts,
    lockRemaining,
    error,
    activeTab,
    setActiveTab,
    login,
    logout,
    setError,
  }
}

export default useAdmin