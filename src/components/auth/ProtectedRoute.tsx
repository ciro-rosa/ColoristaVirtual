import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

// Componente de Loading
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Verificando autenticação...</p>
    </div>
  </div>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, checkSession } = useAuthStore();
  const location = useLocation();

  // Verifica sessão quando o componente monta
  useEffect(() => {
    if (!user && !isLoading) {
      console.log('🔍 ProtectedRoute: Verificando sessão...');
      checkSession();
    }
  }, [user, isLoading, checkSession]);

  // Ainda está carregando
  if (isLoading) {
    console.log('⏳ ProtectedRoute: Carregando...');
    return <LoadingSpinner />;
  }

  // Não autenticado - redireciona para login
  if (!isAuthenticated || !user) {
    console.log('🚫 ProtectedRoute: Usuário não autenticado, redirecionando...');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Autenticado - mostra conteúdo protegido
  console.log('✅ ProtectedRoute: Usuário autenticado:', user.email);
  return <>{children}</>;
};

export default ProtectedRoute;