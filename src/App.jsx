import { useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import { ToastProvider } from './components/common/ToastProvider'

function App() {
  // Remove default body margin Bootstrap might add
  useEffect(() => {
    document.body.classList.add('au-visa-app')
  }, [])

  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  )
}

export default App