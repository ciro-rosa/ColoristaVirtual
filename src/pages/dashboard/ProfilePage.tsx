import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Award, Image, History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import ImageUpload from '../../components/ui/ImageUpload';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { useGalleryStore } from '../../store/galleryStore';
import { useDiagnosisStore } from '../../store/diagnosisStore';
import { formatDate } from '../../lib/utils';

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { updateUser, isLoading } = useUserStore();
  const { getUserPosts } = useGalleryStore();
  const { getUserDiagnoses } = useDiagnosisStore();
  
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.photoUrl || null);
  
  const userPosts = user ? getUserPosts(user.id) : [];
  const userDiagnoses = user ? getUserDiagnoses(user.id) : [];
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });
  
  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    try {
      await updateUser(user.id, {
        ...data,
        photoUrl: previewUrl || undefined,
      });
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Perfil Profissional
        </h1>
        <p className="text-gray-600">
          Gerencie seus dados, acompanhe seu progresso e conquistas.
        </p>
      </div>
      
      <Tabs defaultValue="perfil">
        <TabsList className="mb-6">
          <TabsTrigger value="perfil">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="medalhas">
            <Award className="h-4 w-4 mr-2" />
            Medalhas
          </TabsTrigger>
          <TabsTrigger value="atividades">
            <History className="h-4 w-4 mr-2" />
            Atividades
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Nome completo"
                    leftIcon={<User size={18} />}
                    error={errors.name?.message}
                    fullWidth
                    {...register('name', {
                      required: 'Nome é obrigatório',
                    })}
                  />
                  
                  <Input
                    label="E-mail"
                    type="email"
                    leftIcon={<Mail size={18} />}
                    error={errors.email?.message}
                    fullWidth
                    disabled
                    {...register('email')}
                  />
                  
                  <Input
                    label="Telefone"
                    leftIcon={<Phone size={18} />}
                    error={errors.phone?.message}
                    fullWidth
                    {...register('phone', {
                      required: 'Telefone é obrigatório',
                    })}
                  />
                  
                  <ImageUpload
                    label="Foto de perfil"
                    preview={previewUrl}
                    onChange={setProfileImage}
                    onPreviewChange={setPreviewUrl}
                  />
                  
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                  >
                    Salvar alterações
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar 
                    src={user?.photoUrl} 
                    name={user?.name}
                    size="xl"
                    className="mb-3"
                  />
                  <h3 className="text-lg font-semibold">{user?.name}</h3>
                  <p className="text-sm text-gray-500">Membro desde {user && formatDate(user.createdAt)}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Pontos</span>
                      <span className="text-lg font-bold text-blue-700">{user?.points || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ 
                          width: `${Math.min(100, ((user?.points || 0) / 1500) * 100)}%` 
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {user?.points || 0}/1500 para próximo nível
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Medalhas</span>
                      <span className="text-lg font-bold text-blue-700">{user?.badges.length || 0}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Transformações</span>
                      <span className="text-lg font-bold text-blue-700">{userPosts.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="medalhas">
          <Card>
            <CardHeader>
              <CardTitle>Suas Medalhas</CardTitle>
            </CardHeader>
            <CardContent>
              {user?.badges && user.badges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.badges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="border border-blue-200 rounded-lg p-4 flex items-start">
                        <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                          <Award size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">{badge.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                          <Badge variant="outline">
                            Conquistada em {formatDate(badge.earnedAt)}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award size={48} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    Nenhuma medalha ainda
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Use as ferramentas do De Sírius para ganhar medalhas.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/colorista'}
                  >
                    Ir para Colorista Virtual
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="atividades">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="h-5 w-5 mr-2 text-blue-700" />
                  Transformações Compartilhadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userPosts.length > 0 ? (
                  <div className="space-y-4">
                    {userPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex space-x-4 p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-24 h-24 relative">
                          <img 
                            src={post.afterImageUrl} 
                            alt="Transformação" 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-gray-700 text-sm mb-1 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{formatDate(post.createdAt)}</span>
                              <span>•</span>
                              <span>{post.likes} curtidas</span>
                              <span>•</span>
                              <span>{post.comments.length} comentários</span>
                            </div>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-blue-600 p-0 h-auto"
                              onClick={() => window.location.href = `/galeria/${post.id}`}
                            >
                              Ver detalhe
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">
                      Você ainda não compartilhou nenhuma transformação.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => window.location.href = '/galeria/nova'}
                    >
                      Compartilhar transformação
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FlaskConical className="h-5 w-5 mr-2 text-blue-700" />
                  Diagnósticos Realizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userDiagnoses.length > 0 ? (
                  <div className="space-y-4">
                    {userDiagnoses.map((diagnosis, index) => (
                      <motion.div
                        key={diagnosis.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">
                            Diagnóstico #{diagnosis.id}
                          </h4>
                          <Badge variant={diagnosis.damageLevel > 5 ? 'danger' : 'success'}>
                            Nível de dano: {diagnosis.damageLevel}/10
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                          <div>
                            <span className="text-gray-500">Porosidade:</span> {diagnosis.porosity}
                          </div>
                          <div>
                            <span className="text-gray-500">Elasticidade:</span> {diagnosis.elasticity}
                          </div>
                          <div>
                            <span className="text-gray-500">Densidade:</span> {diagnosis.density}
                          </div>
                          <div>
                            <span className="text-gray-500">Data:</span> {formatDate(diagnosis.createdAt)}
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500 mb-1">Problemas identificados:</p>
                          <ul className="list-disc list-inside mb-2">
                            {diagnosis.issues.map((issue, i) => (
                              <li key={i} className="text-gray-700">{issue}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">
                      Você ainda não realizou nenhum diagnóstico.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => window.location.href = '/diagnostico'}
                    >
                      Realizar diagnóstico
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;