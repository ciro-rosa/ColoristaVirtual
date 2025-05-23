import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FlaskConical, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import { useDiagnosisStore } from '../../store/diagnosisStore';
import { HairDiagnosis } from '../../types';

interface QuestionnaireStep1 {
  chemicalProcesses: string[];
  heatTools: string[];
  washFrequency: string;
  productUsage: string;
}

interface QuestionnaireStep2 {
  breakage: string;
  elasticity: string;
  porosity: string;
  density: string;
  scalpCondition: string;
}

const chemicalProcessesOptions = [
  { value: 'coloração', label: 'Coloração' },
  { value: 'descoloração', label: 'Descoloração' },
  { value: 'relaxamento', label: 'Relaxamento' },
  { value: 'permanente', label: 'Permanente' },
  { value: 'nenhum', label: 'Nenhum' },
];

const heatToolsOptions = [
  { value: 'secador', label: 'Secador' },
  { value: 'chapinha', label: 'Chapinha' },
  { value: 'babyliss', label: 'Babyliss' },
  { value: 'nenhum', label: 'Nenhum' },
];

const DiagnosisPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyzeDamage, recommendProducts, currentDiagnosis, diagnoses, isLoading } = useDiagnosisStore();
  
  const [step, setStep] = useState(1);
  const [selectedChemical, setSelectedChemical] = useState<string[]>([]);
  const [selectedHeatTools, setSelectedHeatTools] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<HairDiagnosis | null>(null);
  
  // Form para Passo 1
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 }
  } = useForm<QuestionnaireStep1>({
    defaultValues: {
      washFrequency: 'normal',
      productUsage: 'regular'
    }
  });
  
  // Form para Passo 2
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 }
  } = useForm<QuestionnaireStep2>({
    defaultValues: {
      breakage: 'pouco',
      elasticity: 'média',
      porosity: 'média',
      density: 'média',
      scalpCondition: 'normal'
    }
  });
  
  const handleChemicalToggle = (value: string) => {
    if (value === 'nenhum') {
      setSelectedChemical(['nenhum']);
      return;
    }
    
    if (selectedChemical.includes('nenhum')) {
      setSelectedChemical([value]);
      return;
    }
    
    if (selectedChemical.includes(value)) {
      setSelectedChemical(selectedChemical.filter(item => item !== value));
    } else {
      setSelectedChemical([...selectedChemical, value]);
    }
  };
  
  const handleHeatToolsToggle = (value: string) => {
    if (value === 'nenhum') {
      setSelectedHeatTools(['nenhum']);
      return;
    }
    
    if (selectedHeatTools.includes('nenhum')) {
      setSelectedHeatTools([value]);
      return;
    }
    
    if (selectedHeatTools.includes(value)) {
      setSelectedHeatTools(selectedHeatTools.filter(item => item !== value));
    } else {
      setSelectedHeatTools([...selectedHeatTools, value]);
    }
  };
  
  const onSubmitStep1 = (data: QuestionnaireStep1) => {
    data.chemicalProcesses = selectedChemical;
    data.heatTools = selectedHeatTools;
    setStep(2);
  };
  
  const onSubmitStep2 = async (data: QuestionnaireStep2) => {
    try {
      const answers = {
        chemicalProcesses: selectedChemical,
        heatTools: selectedHeatTools,
        ...data
      };
      
      const result = await analyzeDamage(answers);
      setDiagnosis(result);
      setStep(3);
    } catch (error) {
      // Erro já tratado no store
    }
  };
  
  const restartDiagnosis = () => {
    setStep(1);
    setSelectedChemical([]);
    setSelectedHeatTools([]);
    setDiagnosis(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Diagnóstico Capilar
        </h1>
        <p className="text-gray-600">
          Análise completa da condição do cabelo com recomendações personalizadas.
        </p>
      </div>
      
      {isLoading && <Loading text="Analisando dados..." fullPage />}
      
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <div className={`w-12 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
          <div className={`w-12 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            3
          </div>
        </div>
      </div>
      
      <motion.div
        key={`step-${step}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico e Rotina</CardTitle>
              <CardDescription>
                Conte-nos sobre o histórico de tratamentos e rotina de cuidados do cabelo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="step1Form" onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Quais processos químicos o cabelo já passou? (Selecione todos aplicáveis)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {chemicalProcessesOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={selectedChemical.includes(option.value) ? 'primary' : 'outline'}
                        onClick={() => handleChemicalToggle(option.value)}
                        className="justify-start"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  {selectedChemical.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">
                      Selecione pelo menos uma opção
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Quais ferramentas de calor são utilizadas? (Selecione todas aplicáveis)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {heatToolsOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={selectedHeatTools.includes(option.value) ? 'primary' : 'outline'}
                        onClick={() => handleHeatToolsToggle(option.value)}
                        className="justify-start"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  {selectedHeatTools.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">
                      Selecione pelo menos uma opção
                    </p>
                  )}
                </div>
                
                <div>
                  <Select
                    label="Frequência de lavagem"
                    options={[
                      { value: 'diária', label: 'Diária' },
                      { value: 'alternada', label: 'Dias alternados' },
                      { value: 'bissemanal', label: '2x por semana' },
                      { value: 'semanal', label: '1x por semana' },
                    ]}
                    {...registerStep1('washFrequency')}
                  />
                </div>
                
                <div>
                  <Select
                    label="Uso de produtos de tratamento"
                    options={[
                      { value: 'intensivo', label: 'Tratamento intensivo frequente' },
                      { value: 'regular', label: 'Tratamento regular' },
                      { value: 'ocasional', label: 'Tratamento ocasional' },
                      { value: 'nenhum', label: 'Não usa tratamentos' },
                    ]}
                    {...registerStep1('productUsage')}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                form="step1Form"
                variant="primary"
                rightIcon={<ArrowRight size={16} />}
                disabled={selectedChemical.length === 0 || selectedHeatTools.length === 0}
              >
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Condição Atual</CardTitle>
              <CardDescription>
                Avalie a condição atual do cabelo para um diagnóstico mais preciso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="step2Form" onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
                <div>
                  <Select
                    label="Quebra/danos visíveis"
                    options={[
                      { value: 'muito', label: 'Muita quebra e pontas duplas' },
                      { value: 'pouco', label: 'Alguma quebra ou pontas duplas' },
                      { value: 'nenhum', label: 'Cabelo íntegro sem quebras aparentes' },
                    ]}
                    {...registerStep2('breakage')}
                  />
                </div>
                
                <div>
                  <Select
                    label="Elasticidade do cabelo"
                    options={[
                      { value: 'alta', label: 'Alta - Estica e volta sem quebrar' },
                      { value: 'média', label: 'Média - Estica um pouco e volta' },
                      { value: 'baixa', label: 'Baixa - Quebra facilmente ao esticar' },
                    ]}
                    {...registerStep2('elasticity')}
                  />
                </div>
                
                <div>
                  <Select
                    label="Porosidade"
                    options={[
                      { value: 'baixa', label: 'Baixa - Demora para molhar e secar' },
                      { value: 'média', label: 'Média - Molha e seca em tempo normal' },
                      { value: 'alta', label: 'Alta - Molha rápido e seca rápido' },
                    ]}
                    {...registerStep2('porosity')}
                  />
                </div>
                
                <div>
                  <Select
                    label="Densidade do cabelo"
                    options={[
                      { value: 'fina', label: 'Fina - Fios finos' },
                      { value: 'média', label: 'Média - Fios de espessura média' },
                      { value: 'grossa', label: 'Grossa - Fios grossos' },
                    ]}
                    {...registerStep2('density')}
                  />
                </div>
                
                <div>
                  <Select
                    label="Condição do couro cabeludo"
                    options={[
                      { value: 'oleoso', label: 'Oleoso' },
                      { value: 'normal', label: 'Normal' },
                      { value: 'seco', label: 'Seco' },
                      { value: 'sensível', label: 'Sensível/Irritado' },
                    ]}
                    {...registerStep2('scalpCondition')}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                form="step2Form"
                variant="primary"
                rightIcon={<ArrowRight size={16} />}
              >
                Analisar
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 3 && diagnosis && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado do Diagnóstico</CardTitle>
              <CardDescription>
                Análise completa da condição capilar e recomendações de tratamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-blue-900">
                    Resumo do Diagnóstico
                  </h3>
                  <Badge 
                    variant={diagnosis.damageLevel > 7 ? 'danger' : diagnosis.damageLevel > 4 ? 'warning' : 'success'}
                    className="text-sm px-3 py-1"
                  >
                    Nível de Dano: {diagnosis.damageLevel}/10
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Porosidade</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: diagnosis.porosity === 'baixa' ? '33%' : diagnosis.porosity === 'média' ? '66%' : '100%' 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{diagnosis.porosity}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Elasticidade</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: diagnosis.elasticity === 'baixa' ? '33%' : diagnosis.elasticity === 'média' ? '66%' : '100%' 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{diagnosis.elasticity}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Densidade</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: diagnosis.density === 'fina' ? '33%' : diagnosis.density === 'média' ? '66%' : '100%' 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{diagnosis.density}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Problemas Identificados</h4>
                  <ul className="space-y-1">
                    {diagnosis.issues.map((issue, index) => (
                      <li key={index} className="flex items-center">
                        <AlertTriangle size={16} className="text-amber-500 mr-2" />
                        <span className="text-gray-700">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Recomendações de Tratamento</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {diagnosis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={restartDiagnosis}
              >
                Iniciar Novo Diagnóstico
              </Button>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/perfil')}
                >
                  Salvar no Perfil
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => window.print()}
                >
                  Imprimir Resultados
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default DiagnosisPage;