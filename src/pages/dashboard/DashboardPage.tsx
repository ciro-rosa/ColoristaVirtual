import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, FlaskConical, Image, Award, User, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { formatDate } from '../../lib/utils';

const ToolCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  delay?: number;
}> = ({ icon, title, description, path, delay = 0 }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card hoverable className="h-full cursor-pointer" onClick={() => navigate(path)}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
              {icon}
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getBadges } = useUserStore();
  
  const badges = getBadges();
  const recentBadges = user?.badges.slice(0, 3) || [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Olá, {user?.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-600">
          Bem-vindo(a) ao seu dashboard. Acesse as ferramentas e acompanhe seu progresso.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seus Pontos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-500 mr-3" />
                <span className="text-3xl font-bold text-blue-900">{user?.points || 0}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ganhe pontos usando ferramentas e compartilhando transformações.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suas Medalhas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {recentBadges.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {recentBadges.map((badge) => (
                    <Badge 
                      key={badge.id} 
                      variant="primary"
                      className="px-3 py-1 text-xs font-medium"
                    >
                      {badge.name} • {formatDate(badge.earnedAt)}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  Você ainda não possui medalhas. Use as ferramentas para ganhar.
                </div>
              )}
              {user?.badges.length > 0 && (
                <Button
                  variant="link"
                  className="mt-2 h-auto p-0"
                  onClick={() => navigate('/perfil')}
                >
                  Ver todas suas medalhas
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <h2 className="text-xl font-semibold text-blue-900 mb-4">
        Ferramentas Exclusivas
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ToolCard
          icon={<Palette size={24} />}
          title="Colorista Virtual"
          description="Crie fórmulas precisas de coloração e resolva desafios de correção de cor com IA."
          path="/colorista"
          delay={0.1}
        />
        
        <ToolCard
          icon={<FlaskConical size={24} />}
          title="Diagnóstico Capilar"
          description="Analise condições capilares e obtenha recomendações personalizadas de tratamento."
          path="/diagnostico"
          delay={0.2}
        />
        
        <ToolCard
          icon={<Image size={24} />}
          title="Galeria de Transformações"
          description="Compartilhe seus melhores trabalhos e inspire-se com transformações de outros profissionais."
          path="/galeria"
          delay={0.3}
        />
        
        <ToolCard
          icon={<BarChart3 size={24} />}
          title="Ranking de Profissionais"
          description="Confira o ranking dos profissionais com mais pontos e conquistas na plataforma."
          path="/ranking"
          delay={0.4}
        />
        
        <ToolCard
          icon={<User size={24} />}
          title="Perfil Profissional"
          description="Gerencie seu perfil, acompanhe seus pontos, medalhas e histórico de transformações."
          path="/perfil"
          delay={0.5}
        />
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Dica do Dia</h3>
        <p className="text-gray-700 mb-4">
          Sabia que cabelos com tons amarelados podem ser neutralizados com pigmentos violeta? 
          Experimente a linha Platinum De Sírius para matização perfeita.
        </p>
        <Button 
          variant="outline"
          onClick={() => navigate('/colorista')}
        >
          Consultar Colorista Virtual
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;