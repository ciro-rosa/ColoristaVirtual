import { create } from 'zustand';
import { ColorFormula, ToneConversion, BackgroundToneAnalysis, ToneCorrection, NeutralizationGuide } from '../types';
import { mockFormulas, mockToneConversions, mockToneAnalyses, mockToneCorrections, mockNeutralizationGuides } from '../lib/mock-data';
import { simulateAIProcessing } from '../lib/utils';

interface AIToolsState {
  isLoading: boolean;
  error: string | null;
  
  // Color Formula Consultant
  generateColorFormula: (currentColor: string, desiredColor: string) => Promise<ColorFormula>;
  colorFormulas: ColorFormula[];
  
  // Tone Converter
  convertTone: (currentTone: string, targetTone: string) => Promise<ToneConversion>;
  toneConversions: ToneConversion[];
  
  // Background Tone Analyzer
  analyzeBackgroundTone: (photoUrl: string | undefined, description: string) => Promise<BackgroundToneAnalysis>;
  backgroundToneAnalyses: BackgroundToneAnalysis[];
  
  // Unwanted Tone Corrector
  correctUnwantedTones: (unwantedReflections: string[]) => Promise<ToneCorrection>;
  toneCorrections: ToneCorrection[];
  
  // Neutralization Guide
  getNeutralizationGuide: (targetTone: string) => Promise<NeutralizationGuide>;
  neutralizationGuides: NeutralizationGuide[];
}

export const useAIToolsStore = create<AIToolsState>((set, get) => ({
  isLoading: false,
  error: null,
  
  colorFormulas: [...mockFormulas],
  toneConversions: [...mockToneConversions],
  backgroundToneAnalyses: [...mockToneAnalyses],
  toneCorrections: [...mockToneCorrections],
  neutralizationGuides: [...mockNeutralizationGuides],
  
  generateColorFormula: async (currentColor: string, desiredColor: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulação de API call para OpenAI via N8N
      const newFormula: ColorFormula = {
        id: `${get().colorFormulas.length + 1}`,
        userId: '1', // Usuário logado
        currentColor,
        desiredColor,
        formula: `Ox ${currentColor < desiredColor ? '30' : '20'} vol + De Sírius ${desiredColor}`,
        proportions: `60ml oxidante + ${desiredColor.includes('intenso') ? '50g' : '40g'} coloração ${desiredColor}`,
        additionalNotes: 'Aplicar uniformemente e deixar agir por 35-40 minutos. Verificar a cor a cada 10 minutos.',
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<ColorFormula>(newFormula);
      
      set(state => ({ 
        colorFormulas: [...state.colorFormulas, result],
        isLoading: false 
      }));
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao gerar fórmula de cor', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  convertTone: async (currentTone: string, targetTone: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulação de API call para OpenAI via N8N
      const newConversion: ToneConversion = {
        id: `${get().toneConversions.length + 1}`,
        userId: '1', // Usuário logado
        currentTone,
        targetTone,
        steps: [
          `Passo 1: ${parseInt(currentTone) < parseInt(targetTone) ? 'Descoloração' : 'Aplicação de base'} com Ox ${parseInt(currentTone) < parseInt(targetTone) ? '20' : '10'} vol`,
          `Passo 2: Aplicação de ${targetTone} com Ox 10 vol`,
          `Passo 3: ${targetTone.includes('.1') ? 'Matização com 0.1 para neutralizar amarelo' : 'Hidratação profunda para fixar a cor'}`,
        ],
        products: [
          `${parseInt(currentTone) < parseInt(targetTone) ? 'Pó descolorante' : 'Coloração base'} De Sírius`,
          `Oxidante ${parseInt(currentTone) < parseInt(targetTone) ? '20' : '10'} vol De Sírius`,
          `Coloração ${targetTone} De Sírius`,
          'Oxidante 10 vol De Sírius',
          `${targetTone.includes('.1') ? 'Intensificador 0.1' : 'Máscara de hidratação'} De Sírius`,
        ],
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<ToneConversion>(newConversion);
      
      set(state => ({ 
        toneConversions: [...state.toneConversions, result],
        isLoading: false 
      }));
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao converter tom', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  analyzeBackgroundTone: async (photoUrl: string | undefined, description: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulação de API call para OpenAI via N8N
      const newAnalysis: BackgroundToneAnalysis = {
        id: `${get().backgroundToneAnalyses.length + 1}`,
        userId: '1', // Usuário logado
        photoUrl,
        description,
        identifiedTone: description.toLowerCase().includes('loiro') ? '8.0 (Loiro Claro)' : '5.0 (Castanho Claro)',
        recommendations: [
          description.toLowerCase().includes('amarelado') ? 'Para neutralizar o tom amarelado, utilize um matizador com pigmento violeta' : 'Recomendamos a linha Hydra De Sírius para manutenção',
          description.toLowerCase().includes('mechas') ? 'Para manter as mechas, considere retoque a cada 40 dias' : 'Para mudar de cor, considere uma avaliação presencial',
          'Hidratação semanal com produtos da linha De Sírius',
        ],
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<BackgroundToneAnalysis>(newAnalysis);
      
      set(state => ({ 
        backgroundToneAnalyses: [...state.backgroundToneAnalyses, result],
        isLoading: false 
      }));
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao analisar tom de fundo', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  correctUnwantedTones: async (unwantedReflections: string[]) => {
    set({ isLoading: true, error: null });
    try {
      // Simulação de API call para OpenAI via N8N
      const newCorrection: ToneCorrection = {
        id: `${get().toneCorrections.length + 1}`,
        userId: '1', // Usuário logado
        unwantedReflections,
        solutions: unwantedReflections.map(reflection => {
          switch (reflection.toLowerCase()) {
            case 'amarelo':
              return 'Utilizar matizador com pigmento violeta De Sírius';
            case 'laranja':
              return 'Aplicar coloração com reflexo azul (x.8) para neutralizar';
            case 'vermelho':
              return 'Utilizar coloração com reflexo verde (x.7) para neutralizar';
            case 'verde':
              return 'Aplicar coloração com reflexo vermelho (x.6) para neutralizar';
            default:
              return `Consultar um profissional para avaliar o reflexo ${reflection}`;
          }
        }),
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<ToneCorrection>(newCorrection);
      
      set(state => ({ 
        toneCorrections: [...state.toneCorrections, result],
        isLoading: false 
      }));
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao corrigir tons indesejados', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getNeutralizationGuide: async (targetTone: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulação de API call para OpenAI via N8N
      const newGuide: NeutralizationGuide = {
        id: `${get().neutralizationGuides.length + 1}`,
        userId: '1', // Usuário logado
        targetTone,
        neutralizationTips: [
          'Amarelo se neutraliza com violeta (x.2)',
          'Dourado se neutraliza com cinza/azul (x.1)',
          'Alaranjado se neutraliza com azul (x.8)',
          'Vermelho se neutraliza com verde (x.7)',
        ],
        recommendedProducts: [
          targetTone.toLowerCase().includes('loiro') || targetTone.toLowerCase().includes('platinado') 
            ? 'Shampoo Matizador Violeta De Sírius' 
            : 'Shampoo Anti-Resíduos De Sírius',
          targetTone.toLowerCase().includes('loiro') || targetTone.toLowerCase().includes('platinado')
            ? 'Máscara Matizadora Platinum De Sírius'
            : 'Máscara Hidratante De Sírius',
          'Leave-in Protetor Térmico De Sírius',
          targetTone.toLowerCase().includes('frio')
            ? 'Intensificador 0.1 (Cinza) De Sírius'
            : 'Intensificador 0.3 (Dourado) De Sírius',
        ],
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<NeutralizationGuide>(newGuide);
      
      set(state => ({ 
        neutralizationGuides: [...state.neutralizationGuides, result],
        isLoading: false 
      }));
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao obter guia de neutralização', 
        isLoading: false 
      });
      throw error;
    }
  },
}));