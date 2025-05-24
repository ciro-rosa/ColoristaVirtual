import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Award, Home, Palette, FlaskConical, Image, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  // ✅ CORREÇÃO: Usar APENAS o useAuthStore (removi useSession)
  const { user, isAuthenticated, logout, isLoading } = useAuthStore();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // ✅ CORREÇÃO: Função de logout melhorada com logs
  const handleLogout = async () => {
    console.log('🔴 Header: Botão de logout clicado!');
    
    try {
      console.log('🔄 Header: Iniciando logout...');
      await logout();
      console.log('✅ Header: Logout realizado com sucesso');
      
      navigate('/');
      closeMenu();
      
    } catch (error) {
      console.error('❌ Header: Erro no logout:', error);
      
      // Fallback: força logout manual
      console.log('🚨 Header: Tentando logout forçado...');
      try {
        // Limpa estado manualmente
        useAuthStore.setState({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false,
          error: null 
        });
        
        // Limpa localStorage
        localStorage.clear();
        
        // Navega para home
        navigate('/');
        closeMenu();
        
        // Recarrega página
        setTimeout(() => window.location.reload(), 500);
        
      } catch (fallbackError) {
        console.error('❌ Header: Erro no logout forçado:', fallbackError);
        alert('Erro ao fazer logout. Recarregando página...');
        window.location.reload();
      }
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: '/', label: 'Início', icon: <Home size={18} /> },
    { path: '/colorista', label: 'Colorista Virtual', icon: <Palette size={18} /> },
    { path: '/diagnostico', label: 'Diagnóstico Capilar', icon: <FlaskConical size={18} /> },
    { path: '/galeria', label: 'Galeria', icon: <Image size={18} /> },
    { path: '/ranking', label: 'Ranking', icon: <BarChart3 size={18} /> },
  ];
  
  // ✅ CORREÇÃO: Criar objeto session compatível a partir do user do store
  const sessionUser = user ? {
    id: user.id,
    email: user.email,
    user_metadata: {
      full_name: user.name,
      avatar_url: user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=22c55e&color=fff`
    }
  } : null;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-primary-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 16.5v-9l6 4.5-6 4.5z"></path>
                <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"></rect>
              </svg>
            </div>
            <span className="font-bold text-xl text-primary-900">De Sírius</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* User Menu or Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* ✅ CORREÇÃO: Usar isAuthenticated ao invés de session */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <Link to="/perfil" className="flex items-center">
                  <Avatar
                    src={sessionUser?.user_metadata?.avatar_url}
                    name={sessionUser?.user_metadata?.full_name || user.email}
                    size="sm"
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name?.split(' ')[0] || 'Perfil'}
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saindo...' : 'Sair'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Entrar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/registro')}
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:bg-primary-50 hover:text-primary-700"
              onClick={toggleMenu}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                  onClick={closeMenu}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              
              {/* ✅ CORREÇÃO: Usar isAuthenticated ao invés de session */}
              {isAuthenticated && user ? (
                <>
                  <Link
                    to="/perfil"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={closeMenu}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Meu Perfil
                  </Link>
                  <Link
                    to="/minhas-medalhas"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={closeMenu}
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Minhas Medalhas
                  </Link>
                  <button
                    type="button"
                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                      isLoading 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    {isLoading ? 'Saindo...' : 'Sair'}
                  </button>
                </>
              ) : (
                <div className="px-3 py-3 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/login');
                      closeMenu();
                    }}
                    fullWidth
                  >
                    Entrar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate('/registro');
                      closeMenu();
                    }}
                    fullWidth
                  >
                    Cadastrar
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;