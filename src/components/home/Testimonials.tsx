import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import Avatar from '../ui/Avatar';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Márcia Oliveira',
    role: 'Cabeleireira, São Paulo',
    avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'A plataforma De Sírius revolucionou meu salão! O Colorista Virtual me ajuda a criar fórmulas precisas economizando tempo e produto. Meus clientes ficam impressionados com os resultados perfeitos.',
  },
  {
    id: '2',
    name: 'Roberto Santos',
    role: 'Proprietário de Salão, Rio de Janeiro',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Desde que implementei as ferramentas De Sírius no meu salão, a produtividade da equipe aumentou e os erros de coloração diminuíram drasticamente. O investimento valeu cada centavo.',
  },
  {
    id: '3',
    name: 'Camila Ferreira',
    role: 'Colorista, Belo Horizonte',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Como especialista em coloração, o sistema de diagnóstico capilar me ajuda a identificar problemas que antes passavam despercebidos. Consigo oferecer soluções mais personalizadas e eficazes.',
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Avatar src={testimonial.avatarUrl} name={testimonial.name} size="md" className="mr-3" />
            <div>
              <h4 className="font-medium text-blue-900">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-700">{testimonial.content}</p>
        </div>
      </Card>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            O Que Dizem Nossos Profissionais
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Histórias de sucesso de profissionais que transformaram seus negócios com De Sírius.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;