import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Shield, Users } from 'lucide-react';

const CompanyStory: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary-900">
              Nossa História de Inovação Natural
            </h2>
            <p className="text-lg text-gray-700">
              Desde 2010, a De Sírius tem revolucionado o mercado de cosméticos capilares 
              no Brasil, combinando ingredientes naturais com tecnologia de ponta para 
              oferecer os melhores resultados aos profissionais da beleza.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Leaf className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">
                    Compromisso com a Natureza
                  </h3>
                  <p className="text-gray-600">
                    Produtos desenvolvidos com ingredientes naturais e processos sustentáveis
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">
                    Qualidade Certificada
                  </h3>
                  <p className="text-gray-600">
                    Certificações internacionais de qualidade e segurança
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">
                    Comunidade Profissional
                  </h3>
                  <p className="text-gray-600">
                    Mais de 2.500 profissionais confiam em nossos produtos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <img 
                src="https://images.pexels.com/photos/3993442/pexels-photo-3993442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Produtos naturais"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img 
                src="https://images.pexels.com/photos/3993988/pexels-photo-3993988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Resultado profissional"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6 mt-12">
              <img 
                src="https://images.pexels.com/photos/3993989/pexels-photo-3993989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Tratamento capilar"
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="https://images.pexels.com/photos/3993443/pexels-photo-3993443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Produtos profissionais"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">2.5K+</div>
            <p className="text-gray-600">Profissionais Ativos</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
            <p className="text-gray-600">Transformações Realizadas</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
            <p className="text-gray-600">Clientes Satisfeitos</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">13</div>
            <p className="text-gray-600">Anos no Mercado</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;