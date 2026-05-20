import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Boxicons
import 'boxicons/css/boxicons.min.css'

// Global styles (this imports everything through SCSS)
import './styles/_global.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)