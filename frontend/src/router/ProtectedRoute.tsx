import { Navigate, Outlet } from 'react-router-dom';

// TODO: replace with real auth check — e.g. read JWT from localStorage or an auth context
function isAuthenticated(): boolean {
  return true;
}

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
