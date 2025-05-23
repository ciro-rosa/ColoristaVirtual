import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Crown, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { useUserStore } from '../../store/userStore';
import { formatDate } from '../../lib/utils';
import { User } from '../../types';

const RankingCard: React.FC<{
  user: User;
  position: number;
  index: number;
}> = ({ user, position, index }) => {
  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-700 to-amber-500';
      default:
        return 'bg-gray-100';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className={`relative overflow-hidden ${position <= 3 ? 'border-0' : ''}`}>
        {position <= 3 && (
          <div className={`absolute top-0 left-0 w-2 h-full ${getPositionStyle(position)}`}></div>
        )}
        
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getPositionStyle(position)} text-white mr-4`}>
              {position <= 3 ? (
                <Crown size={position === 1 ? 20 : 16} />
              ) : (
                <span className="font-bold">{position}</span>
              )}
            </div>
            
            <Avatar 
              src={user.photoUrl} 
              name={user.name}
              size="md"
              className="mr-4"
            />
            
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{user.name}</h3>
                <div className="flex items-center">
                  <TrendingUp size={16} className="text-blue-500 mr-1" />
                  <span className="font-bold text-blue-700">{user.points} pts</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-1">
                {user.badges.slice(0, 3).map((badge) => (
                  <Badge 
                    key={badge.id} 
                    variant="primary"
                    className="text-xs"
                  >
                    {badge.name}
                  </Badge>
                ))}
                
                {user.badges.length > 3 && (
                  <Badge 
                    variant="outline"
                    className="text-xs"
                  >
                    +{user.badges.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RankingPage: React.FC = () => {
  const { getLeaderboard, leaderboard, isLoading } = useUserStore();
  
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Ranking de Profissionais
        </h1>
        <p className="text-gray-600">
          Os profissionais mais ativos e premiados da comunidade De Sírius.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="flex justify-center items-center py-12">
                <div className="text-center">
                  <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">Carregando ranking...</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            leaderboard.map((user, index) => (
              <RankingCard 
                key={user.id} 
                user={user} 
                position={index + 1}
                index={index}
              />
            ))
          )}
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="text-blue-700 mr-2" size={20} />
                Como Ganhar Pontos
              </CardTitle>
              <CardDescription>
                Acumule pontos e suba no ranking realizando atividades na plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-md">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Palette className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 text-sm">Usar o Colorista Virtual</h4>
                  <p className="text-xs text-gray-600">+10 pontos por consulta</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-md">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FlaskConical className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 text-sm">Realizar Diagnóstico</h4>
                  <p className="text-xs text-gray-600">+15 pontos por diagnóstico</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-md">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Image className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 text-sm">Compartilhar Transformação</h4>
                  <p className="text-xs text-gray-600">+25 pontos por publicação</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-md">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <MessageCircle className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 text-sm">Comentar em Transformações</h4>
                  <p className="text-xs text-gray-600">+5 pontos por comentário</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-blue-900 mb-2">Medalhas Disponíveis</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm">Colorista Mestre - 50 consultas</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">Especialista em Diagnóstico - 20 diagnósticos</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-sm">Transformador Visual - 10 transformações</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">Engajamento Social - 30 comentários</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;