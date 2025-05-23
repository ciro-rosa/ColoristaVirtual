import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Send, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TextArea from '../../components/ui/TextArea';
import Avatar from '../../components/ui/Avatar';
import Alert from '../../components/ui/Alert';
import { useGalleryStore } from '../../store/galleryStore';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../lib/utils';
import { Post } from '../../types';

interface CommentFormValues {
  content: string;
}

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, likePost, addComment, isLoading, error } = useGalleryStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const [post, setPost] = useState<Post | undefined>(undefined);
  
  useEffect(() => {
    if (id) {
      const foundPost = getPost(id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        navigate('/galeria');
      }
    }
  }, [id, getPost, navigate]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
    defaultValues: {
      content: '',
    }
  });
  
  const handleLike = async () => {
    if (!post || !isAuthenticated) {
      !isAuthenticated && navigate('/login');
      return;
    }
    
    try {
      await likePost(post.id);
      setPost(getPost(post.id));
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  const onCommentSubmit = async (data: CommentFormValues) => {
    if (!post || !user) {
      !user && navigate('/login');
      return;
    }
    
    try {
      await addComment(
        post.id,
        user.id,
        user.name,
        user.photoUrl,
        data.content
      );
      
      reset();
      
      // Atualizar post com novo comentário
      setPost(getPost(post.id));
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  if (!post) {
    return null; // Ou um componente de loading
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost"
        leftIcon={<ArrowLeft size={16} />}
        onClick={() => navigate('/galeria')}
        className="mb-4"
      >
        Voltar para galeria
      </Button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Avatar 
                  src={post.userPhotoUrl} 
                  name={post.userName}
                  size="md"
                  className="mr-3"
                />
                <div>
                  <h3 className="font-semibold text-blue-900">{post.userName}</h3>
                  <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{post.description}</p>
              
              <div className="flex items-center space-x-4">
                <button 
                  className="flex items-center text-gray-500 hover:text-red-500"
                  onClick={handleLike}
                >
                  <Heart size={18} className="mr-1" />
                  <span>{post.likes}</span>
                </button>
                
                <div className="flex items-center text-gray-500">
                  <MessageCircle size={18} className="mr-1" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900">Comentários</h3>
            
            {isAuthenticated ? (
              <Card className="mb-4">
                <CardContent className="pt-4">
                  <form id="commentForm" onSubmit={handleSubmit(onCommentSubmit)} className="space-y-4">
                    <TextArea
                      placeholder="Escreva um comentário..."
                      error={errors.content?.message}
                      fullWidth
                      rows={2}
                      {...register('content', {
                        required: 'O comentário não pode estar vazio',
                      })}
                    />
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    form="commentForm"
                    variant="primary"
                    rightIcon={<Send size={16} />}
                    isLoading={isLoading}
                  >
                    Comentar
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Alert 
                variant="info" 
                title="Faça login para comentar"
                description="Entre na sua conta para interagir com as transformações"
                action={
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => navigate('/login')}
                  >
                    Entrar
                  </Button>
                }
              />
            )}
            
            <div className="space-y-4">
              {post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar 
                        src={comment.userPhotoUrl} 
                        name={comment.userName}
                        size="sm"
                      />
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <h4 className="font-medium text-blue-900">{comment.userName}</h4>
                          <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6">
                  <MessageCircle size={36} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">
                    Seja o primeiro a comentar nesta transformação!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-blue-900">Antes e Depois</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Antes</p>
                <img 
                  src={post.beforeImageUrl} 
                  alt="Antes" 
                  className="w-full rounded-lg"
                />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Depois</p>
                <img 
                  src={post.afterImageUrl} 
                  alt="Depois" 
                  className="w-full rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default PostDetailPage;