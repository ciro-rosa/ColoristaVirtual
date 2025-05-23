import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface ProductLineProps {
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  index: number;
}

const productLines = [
  {
    title: 'Linha Platinum',
    description: 'Produtos especializados para cabelos descoloridos e loiros, com foco em matização e reconstrução.',
    imageUrl: 'https://images.pexels.com/photos/3993442/pexels-photo-3993442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'bg-blue-500',
  },
  {
    title: 'Linha Colors',
    description: 'Coloração profissional com tecnologia de proteção da fibra capilar durante o processo químico.',
    imageUrl: 'https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'bg-purple-500',
  },
  {
    title: 'Linha Reconstrução',
    description: 'Tratamento intensivo para cabelos danificados, com fórmula rica em queratina e proteínas.',
    imageUrl: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'bg-green-500',
  },
  {
    title: 'Linha Finalizadores',
    description: 'Produtos para finalização que garantem definição, brilho e proteção térmica para os fios.',
    imageUrl: 'https://images.pexels.com/photos/3997988/pexels-photo-3997988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'bg-amber-500',
  },
];

const ProductLineCard: React.FC<ProductLineProps> = ({ title, description, imageUrl, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-0 left-0 ${color} text-white py-1 px-3 text-sm font-medium`}>
            De Sírius
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button 
            variant="ghost" 
            rightIcon={<ArrowRight size={16} />} 
            className="text-blue-700 hover:text-blue-800 p-0"
          >
            Saiba mais
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProductLines: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Linhas de Produtos Profissionais
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Conheça nossa linha completa de produtos desenvolvidos especialmente para profissionais.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productLines.map((product, index) => (
            <ProductLineCard 
              key={product.title}
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              color={product.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductLines;