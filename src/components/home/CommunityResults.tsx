import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useGalleryStore } from '../../store/galleryStore';
import { formatDate } from '../../lib/utils';

const CommunityResults: React.FC = () => {
  const navigate = useNavigate();
  const { getPosts } = useGalleryStore();
  const recentPosts = getPosts().slice(0, 6);

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-primary-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Resultados da Nossa Comunidade
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Inspire-se com transformações reais feitas por profissionais usando produtos De Sírius
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => navigate(`/galeria/${post.id}`)}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Avatar 
                    src={post.userPhotoUrl} 
                    name={post.userName}
                    size="sm"
                    className="mr-2"
                  />
                  <div>
                    <p className="font-medium text-primary-900 text-sm">{post.userName}</p>
                    <p className="text-gray-500 text-xs">{formatDate(post.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1">
                <div className="relative">
                  <img 
                    src={post.beforeImageUrl} 
                    alt="Antes"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Antes
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={post.afterImageUrl} 
                    alt="Depois"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Depois
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 line-clamp-2 mb-3">{post.description}</p>
                <div className="flex items-center space-x-4 text-gray-500">
                  <div className="flex items-center">
                    <Heart size={16} className="mr-1" />
                    <span className="text-xs">{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={16} className="mr-1" />
                    <span className="text-xs">{post.comments.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/galeria')}
          >
            Ver Todas as Transformações
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityResults;