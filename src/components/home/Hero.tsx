import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/colorista');
    } else {
      navigate('/registro');
    }
  };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary-600 p-2 rounded-lg mr-3">
                <Wand2 size={24} />
              </div>
              <span className="text-primary-600 font-medium">Tecnologia Exclusiva</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Colorista Virtual com IA para Profissionais
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Crie fórmulas precisas de coloração, faça diagnósticos capilares e 
              transforme seus resultados com a inteligência artificial da De Sírius.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleGetStarted}
                leftIcon={<Sparkles size={20} />}
              >
                Começar Agora
              </Button>

              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/galeria')}
              >
                Ver Transformações
              </Button>
            </div>

            <div className="mt-8 flex items-center space-x-8">
              <div>
                <div className="text-2xl font-bold text-primary-600">2.5K+</div>
                <div className="text-sm text-gray-600">Profissionais</div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-primary-600">50K+</div>
                <div className="text-sm text-gray-600">Transformações</div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-primary-600">98%</div>
                <div className="text-sm text-gray-600">Satisfação</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Profissional usando Colorista Virtual"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <img 
                      src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Profissional 1"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img 
                      src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Profissional 2"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img 
                      src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Profissional 3"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </div>
                  <span className="text-sm text-gray-600">+2.5k profissionais</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;