// src/components/common/ToastProvider.jsx
import { createContext, useContext, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './Toast.module.scss'

const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = uuidv4()
    setToasts(prev => [...prev, { id, message, type, duration }])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={styles.container}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const ICONS = {
  success: 'bx-check-circle',
  error: 'bx-x-circle',
  warning: 'bx-error',
  info: 'bx-info-circle',
}

const ToastItem = ({ toast, onRemove }) => {
  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <i className={`bx ${ICONS[toast.type]} ${styles.icon}`}></i>
      <p className={styles.message}>{toast.message}</p>
      <button
        className={styles.close}
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
      >
        <i className='bx bx-x'></i>
      </button>
    </div>
  )
}