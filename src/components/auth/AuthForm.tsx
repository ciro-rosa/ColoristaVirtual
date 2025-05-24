import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useSession } from './SessionProvider';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [session, navigate, location]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/dashboard', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900">
            {location.pathname === '/login' ? 'Bem-vindo(a) de volta!' : 'Crie sua conta'}
          </h2>
          <p className="text-gray-600 mt-2">
            {location.pathname === '/login' 
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
                space: {
                  buttonPadding: '10px 18px',
                  inputPadding: '10px 14px',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '8px',
                  buttonBorderRadius: '8px',
                  inputBorderRadius: '8px',
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
          view={location.pathname === '/login' ? 'sign_in' : 'sign_up'}
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

export default AuthForm;