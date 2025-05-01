import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import PropertyFormPage from './pages/PropertyFormPage';

import ProtectedRoute from './components/ProtectedRoute';
import AIChatPage from './pages/AIChatPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/properties" element={<PropertyListPage />} />
              <Route path="/properties/:id" element={<PropertyDetailPage />} />
              <Route path="/Chat-Page" element={<AIChatPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/properties/new" 
                element={
                  <ProtectedRoute>
                    <PropertyFormPage />
                  </ProtectedRoute>
                } 
              />


              
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;