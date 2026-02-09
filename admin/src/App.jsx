import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./components/layout/AdminLayout";
import AdminOverview from "./components/modules/AdminOverview";
import AdminMenu from "./components/modules/AdminMenu";
import AdminOrders from "./components/modules/AdminOrders";
import AdminReservations from "./components/modules/AdminReservations";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-[0.4em] animate-pulse font-display text-center">
          INITIALIZING...
        </span>
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/login" replace />;
};

// Public Route - Redirect to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-[0.4em] animate-pulse font-display text-center">
          INITIALIZING...
        </span>
      </div>
    );
  }

  return isAdmin ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a]">
          <Routes>
            {/* Public Route */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <AdminLogin />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<AdminOverview />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="reservations" element={<AdminReservations />} />
            </Route>

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
