import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectRoutes = ({ children, isAllowed, redirectTo = "/" }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  }
  return (
    children ? children : <Outlet />
  )
}
