import { useAdmin } from '@hooks/useAdmin'
import AdminAuth from './AdminAuth'
import AdminLayout from './AdminLayout'

const Admin = () => {
  const {
    isAuthenticated,
    isLocked,
    attempts,
    lockRemaining,
    error,
    login,
    logout,
  } = useAdmin()

  if (!isAuthenticated) {
    return (
      <AdminAuth
        onVerify={login}
        isLocked={isLocked}
        lockRemaining={lockRemaining}
        attempts={attempts}
        error={error}
      />
    )
  }

  return <AdminLayout onLogout={logout} />
}

export default Admin