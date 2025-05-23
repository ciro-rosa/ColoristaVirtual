import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ❌ REMOVIDO: import { SessionProvider } from './components/auth/SessionProvider';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/AuthPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import ColoristPage from './pages/tools/ColoristPage';
import DiagnosisPage from './pages/tools/DiagnosisPage';
import GalleryPage from './pages/gallery/GalleryPage';
import PostDetailPage from './pages/gallery/PostDetailPage';
import CreatePostPage from './pages/gallery/CreatePostPage';
import RankingPage from './pages/ranking/RankingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    // ✅ CORREÇÃO: Removido SessionProvider - agora usa apenas useAuthStore
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<AuthPage mode="login" />} />
          <Route path="registro" element={<AuthPage mode="signup" />} />
          <Route path="galeria" element={<GalleryPage />} />
          <Route path="galeria/:id" element={<PostDetailPage />} />
          <Route path="ranking" element={<RankingPage />} />
          
          {/* Protected routes */}
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="perfil" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="colorista" 
            element={
              <ProtectedRoute>
                <ColoristPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="diagnostico" 
            element={
              <ProtectedRoute>
                <DiagnosisPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="galeria/nova" 
            element={
              <ProtectedRoute>
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