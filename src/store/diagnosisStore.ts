import { create } from 'zustand';
import { HairDiagnosis } from '../types';
import { mockDiagnoses } from '../lib/mock-data';
import { simulateAIProcessing } from '../lib/utils';

interface DiagnosisState {
  diagnoses: HairDiagnosis[];
  currentDiagnosis: HairDiagnosis | null;
  isLoading: boolean;
  error: string | null;
  
  analyzeDamage: (answers: Record<string, string | string[]>) => Promise<HairDiagnosis>;
  recommendProducts: (diagnosisId: string) => Promise<string[]>;
  getDiagnosis: (id: string) => HairDiagnosis | undefined;
  getUserDiagnoses: (userId: string) => HairDiagnosis[];
}

export const useDiagnosisStore = create<DiagnosisState>((set, get) => ({
  diagnoses: [...mockDiagnoses],
  currentDiagnosis: null,
  isLoading: false,
  error: null,
  
  analyzeDamage: async (answers: Record<string, string | string[]>) => {
    set({ isLoading: true, error: null });
    try {
      // Extract key information from answers
      const chemicalProcesses = answers.chemicalProcesses as string[];
      const heatTools = answers.heatTools as string[];
      const breakage = answers.breakage as string;
      const elasticity = answers.elasticity as string;
      const porosity = answers.porosity as string;
      const density = answers.density as string;
      
      // Calculate damage level (1-10)
      let damageLevel = 1;
      if (chemicalProcesses?.includes('coloração')) damageLevel += 1;
      if (chemicalProcesses?.includes('descoloração')) damageLevel += 2;
      if (chemicalProcesses?.includes('relaxamento')) damageLevel += 2;
      if (chemicalProcesses?.includes('permanente')) damageLevel += 1;
      
      if (heatTools?.includes('secador')) damageLevel += 1;
      if (heatTools?.includes('chapinha')) damageLevel += 2;
      if (heatTools?.includes('babyliss')) damageLevel += 1;
      
      if (breakage === 'muito') damageLevel += 2;
      else if (breakage === 'pouco') damageLevel += 1;
      
      if (elasticity === 'baixa') damageLevel += 1;
      if (porosity === 'alta') damageLevel += 1;
      
      // Ensure damage level is between 1-10
      damageLevel = Math.min(10, Math.max(1, damageLevel));
      
      // Generate issues based on answers
      const issues: string[] = [];
      if (damageLevel > 5) issues.push('Danos químicos');
      if (heatTools?.length > 0) issues.push('Danos por calor');
      if (breakage === 'muito' || breakage === 'pouco') issues.push('Quebra');
      if (porosity === 'alta') issues.push('Porosidade alta');
      if (elasticity === 'baixa') issues.push('Elasticidade reduzida');
      
      // Generate recommendations based on damage level and issues
      const recommendations: string[] = [];
      if (damageLevel >= 7) {
        recommendations.push('Linha de Reconstrução Profunda De Sírius');
        recommendations.push('Tratamento intensivo semanal por 2 meses');
        recommendations.push('Evitar processos químicos por 60 dias');
      } else if (damageLevel >= 4) {
        recommendations.push('Linha de Nutrição De Sírius');
        recommendations.push('Tratamento quinzenal por 3 meses');
        recommendations.push('Reduzir uso de ferramentas térmicas');
      } else {
        recommendations.push('Linha de Manutenção De Sírius');
        recommendations.push('Tratamento mensal para prevenção');
      }
      
      // Add specific recommendations based on issues
      if (issues.includes('Porosidade alta')) {
        recommendations.push('Selante de cutículas De Sírius');
      }
      if (issues.includes('Elasticidade reduzida')) {
        recommendations.push('Ampolas de proteína De Sírius');
      }
      
      // Create new diagnosis
      const newDiagnosis: HairDiagnosis = {
        id: `${get().diagnoses.length + 1}`,
        userId: '1', // Usuário logado
        damageLevel,
        porosity: porosity as 'baixa' | 'média' | 'alta',
        elasticity: elasticity as 'baixa' | 'média' | 'alta', 
        density: density as 'fina' | 'média' | 'grossa',
        issues,
        recommendations,
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<HairDiagnosis>(newDiagnosis);
      
      set(state => ({ 
        diagnoses: [...state.diagnoses, result],
        currentDiagnosis: result,
        isLoading: false 
      }));
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao analisar danos', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  recommendProducts: async (diagnosisId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Find the diagnosis
      const diagnosis = get().diagnoses.find(d => d.id === diagnosisId);
      if (!diagnosis) {
        throw new Error('Diagnóstico não encontrado');
      }
      
      // Simulação de API call para OpenAI via N8N
      const recommendations = [...diagnosis.recommendations];
      
      // Add more specific product recommendations
      if (diagnosis.damageLevel >= 7) {
        recommendations.push('Shampoo Reconstrutor De Sírius');
        recommendations.push('Condicionador Reconstrutor De Sírius');
        recommendations.push('Máscara Reconstrutora De Sírius');
        recommendations.push('Ampolas de Reconstrução De Sírius (tratamento de choque)');
      } else if (diagnosis.damageLevel >= 4) {
        recommendations.push('Shampoo Nutritivo De Sírius');
        recommendations.push('Condicionador Nutritivo De Sírius');
        recommendations.push('Máscara Nutritiva De Sírius');
      } else {
        recommendations.push('Shampoo Manutenção De Sírius');
        recommendations.push('Condicionador Manutenção De Sírius');
        recommendations.push('Leave-in De Sírius');
      }
      
      // Add specific recommendations based on hair type
      if (diagnosis.porosity === 'alta') {
        recommendations.push('Sérum Selante De Sírius');
      }
      if (diagnosis.elasticity === 'baixa') {
        recommendations.push('Ampolas de Queratina De Sírius');
      }
      if (diagnosis.density === 'fina') {
        recommendations.push('Mousse Volumizador De Sírius');
      }
      
      const result = await simulateAIProcessing<string[]>(recommendations);
      
      set({ isLoading: false });
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao recomendar produtos', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getDiagnosis: (id: string) => {
    return get().diagnoses.find(d => d.id === id);
  },
  
  getUserDiagnoses: (userId: string) => {
    return get().diagnoses.filter(d => d.userId === userId);
  },
}));