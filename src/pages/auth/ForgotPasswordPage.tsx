import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuthStore } from '../../store/authStore';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: ''
    }
  });
  
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(data.email);
      setSuccess(true);
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
            <CardTitle className="text-2xl font-bold text-blue-900">Recuperar senha</CardTitle>
            <CardDescription>
              Informe seu e-mail para receber instruções de recuperação de senha
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
                title="E-mail enviado"
                description="Verifique sua caixa de entrada e siga as instruções para redefinir sua senha."
              />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="E-mail"
                  type="email"
                  leftIcon={<Mail size={18} />}
                  error={errors.email?.message}
                  fullWidth
                  {...register('email', {
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'E-mail inválido'
                    }
                  })}
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  fullWidth
                >
                  Enviar instruções
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Lembrou sua senha?{' '}
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

export default ForgotPasswordPage;