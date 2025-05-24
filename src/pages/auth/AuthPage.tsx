import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
// ✅ CORREÇÃO: Usar useAuthStore ao invés de useSession
import { useAuthStore } from '../../store/authStore';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  // ✅ CORREÇÃO: Substituído useSession por useAuthStore
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    // ✅ CORREÇÃO: Usar isAuthenticated e user ao invés de session
    if (isAuthenticated && user) {
      console.log('✅ AuthPage: Usuário já logado, redirecionando para dashboard...');
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // ✅ CORREÇÃO: Usar isLoading ao invés de loading
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // ✅ CORREÇÃO: Usar isAuthenticated e user ao invés de session
  if (isAuthenticated && user) {
    return null;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900">
            {mode === 'login' ? 'Bem-vindo(a) de volta!' : 'Crie sua conta'}
          </h2>
          <p className="text-gray-600 mt-2">
            {mode === 'login' 
              ? 'Entre para acessar as ferramentas exclusivas'
              : 'Cadastre-se para acessar todas as ferramentas'}
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#22c55e',
                  brandAccent: '#16a34a',
                  brandButtonText: 'white',
                  defaultButtonBackground: 'white',
                  defaultButtonBackgroundHover: '#f9fafb',
                  defaultButtonBorder: '#e5e7eb',
                  defaultButtonText: '#374151',
                },
              },
            },
            className: {
              container: 'w-full',
              button: 'w-full font-medium shadow-sm transition-colors',
              input: 'w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500',
              label: 'text-sm font-medium text-gray-700',
              loader: 'border-primary-500',
            },
          }}
          providers={['google']}
          view={mode === 'login' ? 'sign_in' : 'sign_up'}
          localization={{
            variables: {
              sign_in: {
                email_label: 'E-mail',
                password_label: 'Senha',
                button_label: 'Entrar',
                loading_button_label: 'Entrando...',
                social_provider_text: 'Entrar com {{provider}}',
                link_text: 'Não tem uma conta? Cadastre-se',
              },
              sign_up: {
                email_label: 'E-mail',
                password_label: 'Senha',
                button_label: 'Cadastrar',
                loading_button_label: 'Cadastrando...',
                social_provider_text: 'Cadastrar com {{provider}}',
                link_text: 'Já tem uma conta? Entre',
              },
            },
          }}
          redirectTo={`${window.location.origin}/dashboard`}
          onlyThirdPartyProviders={false}
          magicLink={false}
        />
      </div>
    </div>
  );
};

export default AuthPage;