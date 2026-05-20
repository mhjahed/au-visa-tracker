import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes'
import MainLayout from '@layouts/MainLayout'
import PageLoader from '@components/loaders/PageLoader'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map(({ path, element: Element }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<PageLoader />}>
                  <Element />
                </Suspense>
              }
            />
          ))}
          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter