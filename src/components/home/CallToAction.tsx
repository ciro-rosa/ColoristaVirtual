import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Award, PenTool as Tool, Users } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const handleCTAClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/registro');
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Potencialize seus resultados com tecnologia de ponta
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Junte-se a milhares de profissionais que estão transformando a maneira 
              como trabalham com as ferramentas digitais exclusivas da De Sírius.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Tool className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Ferramentas exclusivas</h4>
                  <p className="text-blue-100 text-sm">Tecnologia de IA para coloração perfeita</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Comunidade ativa</h4>
                  <p className="text-blue-100 text-sm">Compartilhe e aprenda com outros profissionais</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Reconhecimento</h4>
                  <p className="text-blue-100 text-sm">Ganhe pontos e destaque-se no ranking</p>
                </div>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCTAClick}
            >
              {isAuthenticated ? 'Acessar Dashboard' : 'Cadastre-se Gratuitamente'}
            </Button>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Profissional usando produtos De Sírius"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;