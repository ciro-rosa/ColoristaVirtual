import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, FlaskConical, Image, Award, Layers, Users } from 'lucide-react';
import Button from '../ui/Button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  path: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  path,
  delay = 0 
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ferramentas Exclusivas para Profissionais
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Transforme seu salão com tecnologia de ponta e crie resultados perfeitos para seus clientes.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Palette size={24} />}
            title="Colorista Virtual"
            description="Crie fórmulas de coloração precisas através de IA. 
                        Informe a cor atual e desejada, e receba a fórmula exata para um resultado perfeito."
            buttonText="Consultar Colorista"
            path="/colorista"
            delay={0.1}
          />
          
          <FeatureCard 
            icon={<FlaskConical size={24} />}
            title="Diagnóstico Capilar"
            description="Analise condições capilares e obtenha recomendações personalizadas 
                        de tratamentos com produtos De Sírius."
            buttonText="Fazer Diagnóstico"
            path="/diagnostico"
            delay={0.2}
          />
          
          <FeatureCard 
            icon={<Image size={24} />}
            title="Galeria de Transformações"
            description="Compartilhe seus melhores trabalhos, inspire-se com transformações 
                        de outros profissionais e receba feedback da comunidade."
            buttonText="Explorar Galeria"
            path="/galeria"
            delay={0.3}
          />
          
          <FeatureCard 
            icon={<Layers size={24} />}
            title="Correção de Tons"
            description="Identifique tons de fundo e neutralize reflexos indesejados 
                        com orientação especializada de IA."
            buttonText="Corrigir Tons"
            path="/colorista"
            delay={0.4}
          />
          
          <FeatureCard 
            icon={<Award size={24} />}
            title="Conquiste Medalhas"
            description="Acumule pontos, ganhe medalhas e destaque-se entre os melhores 
                        profissionais da plataforma com seu trabalho."
            buttonText="Ver Ranking"
            path="/ranking"
            delay={0.5}
          />
          
          <FeatureCard 
            icon={<Users size={24} />}
            title="Comunidade Profissional"
            description="Conecte-se com profissionais, troque experiências e 
                        aprimore suas técnicas com a comunidade De Sírius."
            buttonText="Acessar Dashboard"
            path="/dashboard"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;