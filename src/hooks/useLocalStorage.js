// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react'

const STORAGE_PREFIX = 'au_visa_tracker_'

/**
 * useLocalStorage - Persistent state synced to localStorage
 * @param {string} key - Storage key (will be prefixed)
 * @param {*} initialValue - Default value if nothing in storage
 */
export const useLocalStorage = (key, initialValue) => {
  const prefixedKey = `${STORAGE_PREFIX}${key}`

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(prefixedKey)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: Error reading key "${prefixedKey}"`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(prefixedKey, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`useLocalStorage: Error setting key "${prefixedKey}"`, error)
    }
  }, [prefixedKey, storedValue])

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(prefixedKey)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`useLocalStorage: Error removing key "${prefixedKey}"`, error)
    }
  }, [prefixedKey, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Direct localStorage utilities (non-hook)
 */
export const storage = {
  get: (key, fallback = null) => {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
      return item ? JSON.parse(item) : fallback
    } catch {
      return fallback
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
      return true
    } catch {
      return false
    }
  },

  clear: () => {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(STORAGE_PREFIX))
        .forEach(k => localStorage.removeItem(k))
      return true
    } catch {
      return false
    }
  },

  getAllKeys: () => {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(STORAGE_PREFIX))
      .map(k => k.replace(STORAGE_PREFIX, ''))
  },

  getStorageSize: () => {
    let total = 0
    Object.keys(localStorage)
      .filter(k => k.startsWith(STORAGE_PREFIX))
      .forEach(k => {
        total += (localStorage.getItem(k) || '').length
      })
    return (total / 1024).toFixed(2) + ' KB'
  }
}

export default useLocalStorage