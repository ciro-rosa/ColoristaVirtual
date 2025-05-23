import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import ColoristPage from './pages/tools/ColoristPage';
import DiagnosisPage from './pages/tools/DiagnosisPage';
import GalleryPage from './pages/gallery/GalleryPage';
import PostDetailPage from './pages/gallery/PostDetailPage';
import CreatePostPage from './pages/gallery/CreatePostPage';
import RankingPage from './pages/ranking/RankingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Páginas públicas */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegisterPage />} />
          <Route path="esqueci-senha" element={<ForgotPasswordPage />} />
          <Route path="redefinir-senha" element={<ResetPasswordPage />} />
          <Route path="galeria" element={<GalleryPage />} />
          <Route path="galeria/:id" element={<PostDetailPage />} />
          <Route path="ranking" element={<RankingPage />} />
          
          {/* Rotas protegidas */}
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="perfil" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="colorista" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ColoristPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="diagnostico" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DiagnosisPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="galeria/nova" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CreatePostPage />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;