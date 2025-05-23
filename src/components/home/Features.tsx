import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, FlaskConical, Brain, Sparkles, Wand2 } from 'lucide-react';
import Button from '../ui/Button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  buttonText: string;
  path: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  benefits,
  buttonText, 
  path,
  delay = 0 
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-primary-100 text-primary-600 p-3 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-primary-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <Sparkles size={16} className="text-primary-500 mr-2 flex-shrink-0" />
            {benefit}
          </li>
        ))}
      </ul>
      
      <Button 
        variant="outline" 
        onClick={() => navigate(path)}
        fullWidth
      >
        {buttonText}
      </Button>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center bg-primary-100 text-primary-600 px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Brain size={20} className="mr-2" />
            <span className="font-medium">Tecnologia Avançada</span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-primary-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ferramentas Inteligentes para Profissionais
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Transforme seu trabalho com tecnologia de ponta e alcance resultados perfeitos 
            para seus clientes com nossas ferramentas exclusivas.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Palette size={24} />}
            title="Colorista Virtual"
            description="Crie fórmulas precisas de coloração através de IA. Resultados perfeitos em minutos."
            benefits={[
              "Fórmulas personalizadas",
              "Correção de tons",
              "Previsão de resultados",
              "Economia de produtos"
            ]}
            buttonText="Usar Colorista"
            path="/colorista"
            delay={0.1}
          />
          
          <FeatureCard 
            icon={<FlaskConical size={24} />}
            title="Diagnóstico Capilar"
            description="Análise completa das condições do cabelo com recomendações personalizadas."
            benefits={[
              "Avaliação profunda",
              "Recomendações específicas",
              "Acompanhamento de progresso",
              "Protocolos personalizados"
            ]}
            buttonText="Fazer Diagnóstico"
            path="/diagnostico"
            delay={0.2}
          />
          
          <FeatureCard 
            icon={<Wand2 size={24} />}
            title="Correção de Tons"
            description="Neutralize reflexos indesejados e alcance a cor desejada com precisão."
            benefits={[
              "Análise de subtom",
              "Guia de neutralização",
              "Cálculo de proporções",
              "Garantia de resultado"
            ]}
            buttonText="Corrigir Tons"
            path="/colorista"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;