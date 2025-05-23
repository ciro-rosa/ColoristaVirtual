import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Heart, MessageCircle, Image } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Loading from '../../components/ui/Loading';
import { useGalleryStore } from '../../store/galleryStore';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../lib/utils';

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const { posts, getPosts, likePost, isLoading } = useGalleryStore();
  const { isAuthenticated } = useAuthStore();
  const [allPosts, setAllPosts] = useState(getPosts());
  
  const handleLike = async (postId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      await likePost(postId);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  const handlePostClick = (postId: string) => {
    navigate(`/galeria/${postId}`);
  };
  
  useEffect(() => {
    setAllPosts(getPosts());
  }, [posts]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            Galeria de Transformações
          </h1>
          <p className="text-gray-600">
            Inspire-se com trabalhos incríveis da comunidade De Sírius.
          </p>
        </div>
        
        {isAuthenticated && (
          <Button 
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => navigate('/galeria/nova')}
          >
            Nova Transformação
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <Loading text="Carregando transformações..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.length > 0 ? (
            allPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <Avatar 
                        src={post.userPhotoUrl} 
                        name={post.userName}
                        size="sm"
                        className="mr-2"
                      />
                      <div>
                        <p className="font-medium text-blue-900 text-sm">{post.userName}</p>
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
                    
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <button 
                          className="flex items-center text-gray-500 hover:text-red-500"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart size={16} className="mr-1" />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center text-gray-500 hover:text-blue-500"
                          onClick={() => handlePostClick(post.id)}
                        >
                          <MessageCircle size={16} className="mr-1" />
                          <span className="text-xs">{post.comments.length}</span>
                        </button>
                      </div>
                      
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto"
                        onClick={() => handlePostClick(post.id)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Image size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Nenhuma transformação encontrada
              </h3>
              <p className="text-gray-500 mb-4">
                Seja o primeiro a compartilhar uma transformação incrível!
              </p>
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  leftIcon={<Plus size={16} />}
                  onClick={() => navigate('/galeria/nova')}
                >
                  Nova Transformação
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => navigate('/login')}
                >
                  Entrar para Compartilhar
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;