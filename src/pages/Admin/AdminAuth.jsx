import { useState, useRef, useEffect } from 'react'
import styles from './AdminAuth.module.scss'

const AdminAuth = ({ onVerify, isLocked, lockRemaining, attempts, error }) => {
  const [passcode, setPasscode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const formatTime = (ms) => {
    const totalSec = Math.ceil(ms / 1000)
    const min = Math.floor(totalSec / 60)
    const sec = totalSec % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLocked || !passcode.trim()) return

    const result = onVerify(passcode)
    if (!result.success) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setPasscode('')
    }
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${shake ? styles.shake : ''}`}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <i className='bx bx-shield-quarter'></i>
          </div>
          <h1 className={styles.title}>Admin Access</h1>
          <p className={styles.subtitle}>
            Enter the admin passcode to access management tools
          </p>
        </div>

        {/* Lock Status */}
        {isLocked && (
          <div className={styles.lockBanner}>
            <i className='bx bx-lock-alt'></i>
            <div>
              <div className={styles.lockTitle}>Account Locked</div>
              <div className={styles.lockTimer}>
                Unlocks in {formatTime(lockRemaining)}
              </div>
              <div className={styles.lockProgress}>
                <div
                  className={styles.lockProgressFill}
                  style={{
                    width: `${(lockRemaining / (10 * 60 * 1000)) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrap}>
            <i className='bx bx-lock'></i>
            <input
              ref={inputRef}
              type={showPass ? 'text' : 'password'}
              className={styles.input}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              disabled={isLocked}
              maxLength={20}
              autoComplete="off"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPass(!showPass)}
              tabIndex={-1}
            >
              <i className={`bx ${showPass ? 'bx-hide' : 'bx-show'}`}></i>
            </button>
          </div>

          {error && (
            <div className={styles.error}>
              <i className='bx bx-error-circle'></i>
              {error}
            </div>
          )}

          {!isLocked && attempts > 0 && (
            <div className={styles.attemptsBar}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.attemptDot} ${i < attempts ? styles.attemptUsed : ''}`}
                ></div>
              ))}
              <span className={styles.attemptsText}>
                {5 - attempts} attempts remaining
              </span>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLocked || !passcode.trim()}
          >
            <i className='bx bx-log-in'></i>
            {isLocked ? 'Locked' : 'Access Admin Panel'}
          </button>
        </form>

        {/* Hint */}
        <div className={styles.hint}>
          <i className='bx bx-info-circle'></i>
          
        </div>
      </div>
    </div>
  )
}

export default AdminAuth