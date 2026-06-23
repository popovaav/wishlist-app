import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { WishlistPage } from '@/pages/WishlistPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { AppHeader } from '@/components/AppHeader';
import { ProtectedRoute } from './ProtectedRoute';
import { isAuthenticated } from '@/lib/auth';

function AppLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

function GuestRoute() {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<WishlistPage />} />
          </Route>
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
