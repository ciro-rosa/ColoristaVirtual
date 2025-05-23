import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
              Transforme Cabelos e Vidas com Inteligência Artificial
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Eleve seu trabalho com as ferramentas digitais exclusivas da De Sírius. 
              Diagnóstico capilar, colorista virtual e mais, tudo alimentado por IA avançada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleGetStarted}
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
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Transformação capilar profissional"
                className="w-full h-64 md:h-80 object-cover object-center"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">+2,500 profissionais</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  "A fórmula perfeita em segundos!"
                </h3>
                <p className="text-gray-700">
                  O Colorista Virtual me ajudou a acertar na primeira tentativa uma correção complexa. 
                  A cliente ficou maravilhada e eu economizei produto.
                </p>
                <p className="text-primary-600 mt-2 font-medium">— Maria Oliveira, Cabeleireira</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;