import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import TextArea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';
import ImageUpload from '../../components/ui/ImageUpload';
import { useAIToolsStore } from '../../store/aiToolsStore';
import { formatDate } from '../../lib/utils';

interface ColorFormulaFormValues {
  currentColor: string;
  desiredColor: string;
}

interface ToneConversionFormValues {
  currentTone: string;
  targetTone: string;
}

interface BackgroundToneFormValues {
  description: string;
}

interface ToneCorrectionFormValues {
  unwantedReflections: string[];
}

interface NeutralizationFormValues {
  targetTone: string;
}

const ColoristPage: React.FC = () => {
  const {
    generateColorFormula,
    convertTone,
    analyzeBackgroundTone,
    correctUnwantedTones,
    getNeutralizationGuide,
    colorFormulas,
    toneConversions,
    backgroundToneAnalyses,
    toneCorrections,
    neutralizationGuides,
    isLoading,
    error
  } = useAIToolsStore();
  
  // Form para Consulta de Fórmula de Coloração
  const {
    register: registerColorFormula,
    handleSubmit: handleSubmitColorFormula,
    formState: { errors: colorFormulaErrors }
  } = useForm<ColorFormulaFormValues>();
  
  // Form para Conversor de Tom
  const {
    register: registerToneConversion,
    handleSubmit: handleSubmitToneConversion,
    formState: { errors: toneConversionErrors }
  } = useForm<ToneConversionFormValues>();
  
  // Form para Análise de Tom de Fundo
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);
  const [photo, setPhoto] = React.useState<File | null>(null);
  
  const {
    register: registerBackgroundTone,
    handleSubmit: handleSubmitBackgroundTone,
    formState: { errors: backgroundToneErrors }
  } = useForm<BackgroundToneFormValues>();
  
  // Form para Correção de Tons Indesejados
  const unwantedReflectionOptions = [
    { value: 'Amarelo', label: 'Amarelo' },
    { value: 'Laranja', label: 'Laranja' },
    { value: 'Vermelho', label: 'Vermelho' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Violeta', label: 'Violeta' },
  ];
  
  const [selectedReflections, setSelectedReflections] = React.useState<string[]>([]);
  
  const handleReflectionChange = (value: string) => {
    if (selectedReflections.includes(value)) {
      setSelectedReflections(selectedReflections.filter(r => r !== value));
    } else {
      setSelectedReflections([...selectedReflections, value]);
    }
  };
  
  // Form para Guia de Neutralização
  const {
    register: registerNeutralization,
    handleSubmit: handleSubmitNeutralization,
    formState: { errors: neutralizationErrors }
  } = useForm<NeutralizationFormValues>();
  
  const onColorFormulaSubmit = async (data: ColorFormulaFormValues) => {
    try {
      await generateColorFormula(data.currentColor, data.desiredColor);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  const onToneConversionSubmit = async (data: ToneConversionFormValues) => {
    try {
      await convertTone(data.currentTone, data.targetTone);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  const onBackgroundToneSubmit = async (data: BackgroundToneFormValues) => {
    try {
      await analyzeBackgroundTone(photoUrl || undefined, data.description);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  const onToneCorrectionSubmit = async () => {
    try {
      if (selectedReflections.length === 0) {
        return; // Evitar envio sem seleções
      }
      
      await correctUnwantedTones(selectedReflections);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  const onNeutralizationSubmit = async (data: NeutralizationFormValues) => {
    try {
      await getNeutralizationGuide(data.targetTone);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Colorista Virtual
        </h1>
        <p className="text-gray-600">
          Ferramentas inteligentes para coloração profissional. Escolha a ferramenta que melhor atende sua necessidade.
        </p>
      </div>
      
      {isLoading && <Loading text="Processando solicitação..." fullPage />}
      
      <Tabs defaultValue="formula" className="space-y-6">
        <TabsList className="w-full flex flex-wrap">
          <TabsTrigger value="formula">Fórmula de Coloração</TabsTrigger>
          <TabsTrigger value="converter">Conversor de Tom</TabsTrigger>
          <TabsTrigger value="analyzer">Analisador de Tom</TabsTrigger>
          <TabsTrigger value="correction">Correção de Tons</TabsTrigger>
          <TabsTrigger value="neutralization">Guia de Neutralização</TabsTrigger>
        </TabsList>
        
        {/* Consultante de Fórmula de Coloração */}
        <TabsContent value="formula">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Consulta de Fórmula</CardTitle>
                  <CardDescription>
                    Informe a cor atual e desejada para receber a fórmula exata.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitColorFormula(onColorFormulaSubmit)} className="space-y-4">
                    <Input
                      label="Cor Atual"
                      placeholder="Ex: 7.0, Loiro Médio, Castanho Escuro"
                      error={colorFormulaErrors.currentColor?.message}
                      fullWidth
                      {...registerColorFormula('currentColor', {
                        required: 'Informe a cor atual',
                      })}
                    />
                    
                    <Input
                      label="Cor Desejada"
                      placeholder="Ex: 9.1, Loiro Muito Claro Cinza, Ruivo Intenso"
                      error={colorFormulaErrors.desiredColor?.message}
                      fullWidth
                      {...registerColorFormula('desiredColor', {
                        required: 'Informe a cor desejada',
                      })}
                    />
                    
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isLoading}
                      fullWidth
                    >
                      Gerar Fórmula
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Fórmulas Recomendadas</CardTitle>
                  <CardDescription>
                    Suas fórmulas personalizadas baseadas em IA.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {colorFormulas.length > 0 ? (
                    <div className="space-y-4">
                      {colorFormulas.slice().reverse().map((formula, index) => (
                        <motion.div
                          key={formula.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 border border-blue-100 rounded-lg bg-blue-50"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-blue-800">
                                {formula.currentColor} → {formula.desiredColor}
                              </h4>
                              <p className="text-xs text-gray-500">{formatDate(formula.createdAt)}</p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Fórmula:</h5>
                            <p className="text-sm bg-white p-2 rounded border border-blue-100">{formula.formula}</p>
                          </div>
                          
                          <div className="mb-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Proporções:</h5>
                            <p className="text-sm bg-white p-2 rounded border border-blue-100">{formula.proportions}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Observações:</h5>
                            <p className="text-sm bg-white p-2 rounded border border-blue-100">{formula.additionalNotes}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Palette size={48} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Nenhuma fórmula gerada ainda
                      </h3>
                      <p className="text-gray-500">
                        Preencha o formulário ao lado para gerar sua primeira fórmula de coloração.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Conversor de Tom */}
        <TabsContent value="converter">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Conversor de Tom</CardTitle>
                  <CardDescription>
                    Descubra o caminho completo para converter um tom em outro.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitToneConversion(onToneConversionSubmit)} className="space-y-4">
                    <Input
                      label="Tom Atual"
                      placeholder="Ex: 7.0, 5.3, 8.1"
                      error={toneConversionErrors.currentTone?.message}
                      fullWidth
                      {...registerToneConversion('currentTone', {
                        required: 'Informe o tom atual',
                      })}
                    />
                    
                    <Input
                      label="Tom Desejado"
                      placeholder="Ex: 9.1, 6.66, 7.34"
                      error={toneConversionErrors.targetTone?.message}
                      fullWidth
                      {...registerToneConversion('targetTone', {
                        required: 'Informe o tom desejado',
                      })}
                    />
                    
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isLoading}
                      fullWidth
                    >
                      Converter Tom
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Processos de Conversão</CardTitle>
                  <CardDescription>
                    Etapas detalhadas para conversão de tom.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {toneConversions.length > 0 ? (
                    <div className="space-y-4">
                      {toneConversions.slice().reverse().map((conversion, index) => (
                        <motion.div
                          key={conversion.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 border border-blue-100 rounded-lg bg-blue-50"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-blue-800">
                                Conversão: {conversion.currentTone} → {conversion.targetTone}
                              </h4>
                              <p className="text-xs text-gray-500">{formatDate(conversion.createdAt)}</p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Etapas do Processo:</h5>
                            <ul className="text-sm bg-white p-3 rounded border border-blue-100 space-y-1">
                              {conversion.steps.map((step, i) => (
                                <li key={i} className="flex items-start">
                                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2">
                                    {i + 1}
                                  </div>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Produtos Recomendados:</h5>
                            <ul className="text-sm bg-white p-3 rounded border border-blue-100 space-y-1">
                              {conversion.products.map((product, i) => (
                                <li key={i}>{product}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Palette size={48} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Nenhuma conversão de tom ainda
                      </h3>
                      <p className="text-gray-500">
                        Preencha o formulário ao lado para gerar seu primeiro processo de conversão de tom.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Analisador de Tom de Fundo */}
        <TabsContent value="analyzer">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Analisador de Tom</CardTitle>
                  <CardDescription>
                    Identifique o tom atual do cabelo através de foto ou descrição.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitBackgroundTone(onBackgroundToneSubmit)} className="space-y-4">
                    <ImageUpload
                      label="Foto do cabelo (opcional)"
                      preview={photoUrl}
                      onChange={setPhoto}
                      onPreviewChange={setPhotoUrl}
                    />
                    
                    <TextArea
                      label="Descrição do cabelo"
                      placeholder="Descreva o cabelo em detalhes, mencionando cor, reflexos, histórico de processos químicos, etc."
                      error={backgroundToneErrors.description?.message}
                      fullWidth
                      rows={5}
                      {...registerBackgroundTone('description', {
                        required: 'Informe uma descrição do cabelo',
                        minLength: {
                          value: 20,
                          message: 'A descrição deve ter pelo menos 20 caracteres'
                        }
                      })}
                    />
                    
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isLoading}
                      fullWidth
                    >
                      Analisar Tom
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Análises de Tom</CardTitle>
                  <CardDescription>
                    Resultados da análise de tom de fundo.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {backgroundToneAnalyses.length > 0 ? (
                    <div className="space-y-4">
                      {backgroundToneAnalyses.slice().reverse().map((analysis, index) => (
                        <motion.div
                          key={analysis.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 border border-blue-100 rounded-lg bg-blue-50"
                        >
                          <div className="flex flex-col sm:flex-row gap-4 mb-3">
                            {analysis.photoUrl && (
                              <div className="sm:w-1/3">
                                <img 
                                  src={analysis.photoUrl} 
                                  alt="Cabelo analisado" 
                                  className="w-full h-40 object-cover rounded-md"
                                />
                              </div>
                            )}
                            <div className={analysis.photoUrl ? 'sm:w-2/3' : 'w-full'}>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-blue-800">
                                  Análise de Tom
                                </h4>
                                <p className="text-xs text-gray-500">{formatDate(analysis.createdAt)}</p>
                              </div>
                              
                              <div className="mb-3">
                                <h5 className="text-sm font-medium text-gray-700 mb-1">Descrição:</h5>
                                <p className="text-sm bg-white p-2 rounded border border-blue-100">
                                  {analysis.description}
                                </p>
                              </div>
                              
                              <div className="mb-3">
                                <h5 className="text-sm font-medium text-gray-700 mb-1">Tom Identificado:</h5>
                                <p className="text-sm bg-white p-2 rounded border border-blue-100">
                                  <span className="font-medium text-blue-700">{analysis.identifiedTone}</span>
                                </p>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-1">Recomendações:</h5>
                                <ul className="text-sm bg-white p-2 rounded border border-blue-100 space-y-1">
                                  {analysis.recommendations.map((rec, i) => (
                                    <li key={i}>• {rec}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Palette size={48} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Nenhuma análise de tom ainda
                      </h3>
                      <p className="text-gray-500">
                        Envie uma foto ou descrição detalhada do cabelo para analisar.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Correção de Tons Indesejados */}
        <TabsContent value="correction">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Correção de Tons</CardTitle>
                  <CardDescription>
                    Selecione os reflexos indesejados para obter soluções de correção.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Reflexos Indesejados
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {unwantedReflectionOptions.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={selectedReflections.includes(option.value) ? 'primary' : 'outline'}
                            onClick={() => handleReflectionChange(option.value)}
                            className="justify-start"
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                      {selectedReflections.length === 0 && (
                        <p className="text-xs text-red-500 mt-1">
                          Selecione pelo menos um reflexo indesejado
                        </p>
                      )}
                    </div>
                    
                    <Button
                      type="button"
                      variant="primary"
                      isLoading={isLoading}
                      onClick={onToneCorrectionSubmit}
                      disabled={selectedReflections.length === 0}
                      fullWidth
                    >
                      Obter Correções
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Soluções de Correção</CardTitle>
                  <CardDescription>
                    Métodos para neutralizar reflexos indesejados.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {toneCorrections.length > 0 ? (
                    <div className="space-y-4">
                      {toneCorrections.slice().reverse().map((correction, index) => (
                        <motion.div
                          key={correction.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 border border-blue-100 rounded-lg bg-blue-50"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-blue-800">
                                Correção de Reflexos
                              </h4>
                              <p className="text-xs text-gray-500">{formatDate(correction.createdAt)}</p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Reflexos Indesejados:</h5>
                            <div className="flex flex-wrap gap-2">
                              {correction.unwantedReflections.map((reflection, i) => (
                                <Badge key={i} variant="primary">{reflection}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Soluções:</h5>
                            <ul className="text-sm bg-white p-3 rounded border border-blue-100 space-y-1">
                              {correction.solutions.map((solution, i) => (
                                <li key={i} className="flex items-start">
                                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2">
                                    {i + 1}
                                  </div>
                                  <span>{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Palette size={48} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Nenhuma correção de tom ainda
                      </h3>
                      <p className="text-gray-500">
                        Selecione os reflexos indesejados para receber soluções de correção.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Guia de Neutralização */}
        <TabsContent value="neutralization">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Guia de Neutralização</CardTitle>
                  <CardDescription>
                    Obtenha dicas para neutralizar tons e alcançar o resultado desejado.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitNeutralization(onNeutralizationSubmit)} className="space-y-4">
                    <Input
                      label="Tom Desejado"
                      placeholder="Ex: Loiro Platinado, Ruivo Cobre, Castanho Frio"
                      error={neutralizationErrors.targetTone?.message}
                      fullWidth
                      {...registerNeutralization('targetTone', {
                        required: 'Informe o tom desejado',
                      })}
                    />
                    
                    <div className="bg-blue-50 p-3 rounded-md mb-2">
                      <h5 className="font-medium text-blue-800 text-sm mb-2">
                        Roda de Cores - Princípios de Neutralização
                      </h5>
                      <p className="text-xs text-gray-700 mb-2">
                        Cores complementares se neutralizam:
                      </p>
                      <ul className="text-xs space-y-1 text-gray-600">
                        <li>• Violeta neutraliza Amarelo</li>
                        <li>• Azul neutraliza Laranja</li>
                        <li>• Verde neutraliza Vermelho</li>
                        <li>• Vermelho neutraliza Verde</li>
                      </ul>
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isLoading}
                      fullWidth
                    >
                      Obter Guia
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Guias de Neutralização</CardTitle>
                  <CardDescription>
                    Recomendações personalizadas para neutralização de tons.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {neutralizationGuides.length > 0 ? (
                    <div className="space-y-4">
                      {neutralizationGuides.slice().reverse().map((guide, index) => (
                        <motion.div
                          key={guide.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 border border-blue-100 rounded-lg bg-blue-50"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-blue-800">
                                Guia para: {guide.targetTone}
                              </h4>
                              <p className="text-xs text-gray-500">{formatDate(guide.createdAt)}</p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Dicas de Neutralização:</h5>
                            <ul className="text-sm bg-white p-3 rounded border border-blue-100 space-y-1">
                              {guide.neutralizationTips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Produtos Recomendados:</h5>
                            <ul className="text-sm bg-white p-3 rounded border border-blue-100 space-y-1">
                              {guide.recommendedProducts.map((product, i) => (
                                <li key={i}>• {product}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Palette size={48} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Nenhum guia de neutralização ainda
                      </h3>
                      <p className="text-gray-500">
                        Especifique o tom desejado para receber um guia personalizado.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColoristPage;