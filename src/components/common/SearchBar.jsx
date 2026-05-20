import { useState, useRef, useEffect } from 'react'
import styles from './SearchBar.module.scss'

const SearchBar = ({
  value,
  onChange,
  suggestions = [],
  onSuggestionClick,
  placeholder = 'Search applicants...',
  className = '',
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focused, setFocused] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (e) => {
    onChange(e.target.value)
    setShowSuggestions(true)
  }

  const handleSelect = (suggestion) => {
    if (onSuggestionClick) onSuggestionClick(suggestion)
    else onChange(suggestion)
    setShowSuggestions(false)
  }

  const handleClear = () => {
    onChange('')
    setShowSuggestions(false)
  }

  const activeSuggestions = suggestions.filter(s =>
    value && s.toLowerCase().includes(value.toLowerCase()) && s !== value
  )

  return (
    <div
      className={`${styles.wrapper} ${focused ? styles.focused : ''} ${className}`}
      ref={wrapperRef}
    >
      <div className={styles.inputRow}>
        <i className={`bx bx-search ${styles.searchIcon}`}></i>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={handleChange}
          onFocus={() => { setFocused(true); setShowSuggestions(true) }}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {value && (
          <button className={styles.clearBtn} onClick={handleClear} type="button">
            <i className='bx bx-x'></i>
          </button>
        )}
      </div>

      {showSuggestions && activeSuggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {activeSuggestions.map((s, i) => (
            <li
              key={i}
              className={styles.suggestion}
              onMouseDown={() => handleSelect(s)}
            >
              <i className='bx bx-search-alt'></i>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar