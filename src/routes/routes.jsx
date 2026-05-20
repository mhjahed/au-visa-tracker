// src/routes/routes.jsx
import { lazy } from 'react'

const Home = lazy(() => import('@pages/Home/Home'))
const Applications = lazy(() => import('@pages/Applications/Applications'))
const Dashboard = lazy(() => import('@pages/Dashboard/Dashboard'))
const Statistics = lazy(() => import('@pages/Statistics/Statistics'))
const Settings = lazy(() => import('@pages/Settings/Settings'))
const Developer = lazy(() => import('@pages/Developer/Developer'))
const Admin = lazy(() => import('@pages/Admin/Admin'))

export const routes = [
  {
    path: '/',
    element: Home,
    label: 'Home',
    icon: 'bx-home-alt',
    showInNav: true,
  },
  {
    path: '/applications',
    element: Applications,
    label: 'Applications',
    icon: 'bx-file',
    showInNav: true,
  },
  {
    path: '/dashboard',
    element: Dashboard,
    label: 'Dashboard',
    icon: 'bx-bar-chart-alt-2',
    showInNav: true,
  },
  {
    path: '/statistics',
    element: Statistics,
    label: 'Statistics',
    icon: 'bx-stats',
    showInNav: true,
  },
  {
    path: '/settings',
    element: Settings,
    label: 'Settings',
    icon: 'bx-cog',
    showInNav: true,
  },
  {
    path: '/developer',
    element: Developer,
    label: 'Developer',
    icon: 'bx-code-alt',
    showInNav: true,
  },
  {
    path: '/admin',
    element: Admin,
    label: 'Admin',
    icon: 'bx-shield-quarter',
    showInNav: false,
  },
]