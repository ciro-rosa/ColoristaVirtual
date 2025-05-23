import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TextArea from '../../components/ui/TextArea';
import ImageUpload from '../../components/ui/ImageUpload';
import Alert from '../../components/ui/Alert';
import { useGalleryStore } from '../../store/galleryStore';
import { useAuthStore } from '../../store/authStore';

interface PostFormValues {
  description: string;
}

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPost, isLoading, error } = useGalleryStore();
  const { user } = useAuthStore();
  
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormValues>({
    defaultValues: {
      description: '',
    }
  });
  
  const onSubmit = async (data: PostFormValues) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!beforePreview || !afterPreview) {
      return; // Validação no front-end
    }
    
    try {
      await addPost(
        user.id,
        user.name,
        user.photoUrl,
        beforePreview,
        afterPreview,
        data.description
      );
      
      navigate('/galeria');
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
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
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Compartilhar Transformação
        </h1>
        <p className="text-gray-600">
          Compartilhe o antes e depois do seu trabalho com a comunidade.
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Nova Transformação</CardTitle>
            <CardDescription>
              Adicione fotos do antes e depois e uma descrição da transformação.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert 
                variant="error" 
                icon={<AlertCircle className="h-4 w-4" />}
                title="Erro ao compartilhar"
                description={error}
                className="mb-4"
              />
            )}
            
            <form id="postForm" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  label="Foto Antes"
                  preview={beforePreview}
                  onChange={setBeforeImage}
                  onPreviewChange={setBeforePreview}
                  error={!beforePreview ? "A foto 'antes' é obrigatória" : undefined}
                />
                
                <ImageUpload
                  label="Foto Depois"
                  preview={afterPreview}
                  onChange={setAfterImage}
                  onPreviewChange={setAfterPreview}
                  error={!afterPreview ? "A foto 'depois' é obrigatória" : undefined}
                />
              </div>
              
              <TextArea
                label="Descrição da Transformação"
                placeholder="Descreva os produtos usados, técnicas aplicadas e resultados obtidos..."
                error={errors.description?.message}
                fullWidth
                rows={5}
                {...register('description', {
                  required: 'A descrição é obrigatória',
                  minLength: {
                    value: 20,
                    message: 'A descrição deve ter pelo menos 20 caracteres'
                  }
                })}
              />
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              form="postForm"
              variant="primary"
              isLoading={isLoading}
              disabled={!beforePreview || !afterPreview}
            >
              Publicar Transformação
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Dicas para uma boa postagem:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Use fotos de boa qualidade e boa iluminação</li>
          <li>• Mantenha o mesmo ângulo nas fotos de antes e depois</li>
          <li>• Descreva os produtos De Sírius utilizados no procedimento</li>
          <li>• Mencione problemas específicos que foram tratados</li>
          <li>• Compartilhe técnicas utilizadas que podem ajudar outros profissionais</li>
        </ul>
      </div>
    </div>
  );
};

export default CreatePostPage;