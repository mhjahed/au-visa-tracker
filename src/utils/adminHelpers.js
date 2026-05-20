/**
 * Admin authentication helpers
 * Uses localStorage for rate limiting and lockout
 */

const PREFIX = 'au_visa_admin_'

const ADMIN_PASSCODE = '2024au500'
const MAX_ATTEMPTS = 5
const LOCK_DURATION = 10 * 60 * 1000 // 10 minutes

export const AdminAuth = {
  isLocked: () => {
    const lockUntil = localStorage.getItem(`${PREFIX}lock_until`)
    if (!lockUntil) return false
    const unlockTime = parseInt(lockUntil, 10)
    if (Date.now() >= unlockTime) {
      localStorage.removeItem(`${PREFIX}lock_until`)
      localStorage.removeItem(`${PREFIX}attempts`)
      return false
    }
    return true
  },

  getLockRemaining: () => {
    const lockUntil = localStorage.getItem(`${PREFIX}lock_until`)
    if (!lockUntil) return 0
    return Math.max(0, parseInt(lockUntil, 10) - Date.now())
  },

  getAttempts: () => {
    return parseInt(localStorage.getItem(`${PREFIX}attempts`) || '0', 10)
  },

  verify: (passcode) => {
    if (AdminAuth.isLocked()) {
      return {
        success: false,
        locked: true,
        remaining: AdminAuth.getLockRemaining(),
        message: 'Account locked. Try again later.',
      }
    }

    if (passcode === ADMIN_PASSCODE) {
      localStorage.removeItem(`${PREFIX}attempts`)
      localStorage.removeItem(`${PREFIX}lock_until`)
      localStorage.setItem(`${PREFIX}authenticated`, 'true')
      localStorage.setItem(`${PREFIX}auth_time`, Date.now().toString())
      return { success: true, message: 'Access granted.' }
    }

    const attempts = AdminAuth.getAttempts() + 1
    localStorage.setItem(`${PREFIX}attempts`, attempts.toString())

    if (attempts >= MAX_ATTEMPTS) {
      const lockUntil = Date.now() + LOCK_DURATION
      localStorage.setItem(`${PREFIX}lock_until`, lockUntil.toString())
      return {
        success: false,
        locked: true,
        remaining: LOCK_DURATION,
        attempts,
        message: `Too many failed attempts. Locked for 10 minutes.`,
      }
    }

    return {
      success: false,
      locked: false,
      attempts,
      remaining: 0,
      message: `Wrong passcode. ${MAX_ATTEMPTS - attempts} attempts remaining.`,
    }
  },

  isAuthenticated: () => {
    return localStorage.getItem(`${PREFIX}authenticated`) === 'true'
  },

  logout: () => {
    localStorage.removeItem(`${PREFIX}authenticated`)
    localStorage.removeItem(`${PREFIX}auth_time`)
  },

  getRemainingTime: () => {
    const lockUntil = localStorage.getItem(`${PREFIX}lock_until`)
    if (!lockUntil) return 0
    return Math.max(0, parseInt(lockUntil, 10) - Date.now())
  },
}

export default AdminAuth