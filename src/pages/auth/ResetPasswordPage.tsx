import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuthStore } from '../../store/authStore';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword, isLoading, error } = useAuthStore();
  const [success, setSuccess] = useState(false);
  
  // Extrair token da URL (simulação)
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || 'token-simulado';
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });
  
  const password = watch('password');
  
  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword(token, data.password);
      setSuccess(true);
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-blue-900">Redefinir senha</CardTitle>
            <CardDescription>
              Crie uma nova senha para sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert 
                variant="error" 
                icon={<AlertCircle className="h-4 w-4" />}
                title="Erro"
                description={error}
              />
            )}
            
            {success ? (
              <Alert 
                variant="success" 
                icon={<CheckCircle className="h-4 w-4" />}
                title="Senha redefinida com sucesso"
                description="Você será redirecionado para a página de login em instantes."
              />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Nova senha"
                  type="password"
                  leftIcon={<Lock size={18} />}
                  error={errors.password?.message}
                  fullWidth
                  {...register('password', {
                    required: 'Nova senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'A senha deve ter pelo menos 6 caracteres'
                    }
                  })}
                />
                
                <Input
                  label="Confirmar senha"
                  type="password"
                  leftIcon={<Lock size={18} />}
                  error={errors.confirmPassword?.message}
                  fullWidth
                  {...register('confirmPassword', {
                    required: 'Confirmação de senha é obrigatória',
                    validate: value => value === password || 'As senhas não coincidem'
                  })}
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  fullWidth
                >
                  Redefinir senha
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Voltar para login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;