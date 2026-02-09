
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminLogin from './components/AdminLogin';
// New Layouts
import AdminLayout from './components/layout/AdminLayout';
// New Modules
import AdminOverview from './components/modules/AdminOverview';
import AdminMenu from './components/modules/AdminMenu';
import AdminOrders from './components/modules/AdminOrders';

const ProtectedRoute = ({ children }) => {
    const { isAdmin } = useAuth();
    return isAdmin ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a]">
                    <Routes>
                        <Route path="/login" element={<AdminLogin />} />
                        
                        <Route path="/" element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="/dashboard" replace />} />
                            <Route path="dashboard" element={<AdminOverview />} />
                            <Route path="menu" element={<AdminMenu />} />
                            <Route path="orders" element={<AdminOrders />} />
                            {/* Add other routes as needed */}
                        </Route>

                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
