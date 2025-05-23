import { User, Badge, Post, Comment, HairDiagnosis, ColorFormula, ToneConversion, BackgroundToneAnalysis, ToneCorrection, NeutralizationGuide } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juliana Silva',
    email: 'juliana.silva@example.com',
    phone: '(11) 98765-4321',
    photoUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    points: 1250,
    badges: [
      {
        id: '1',
        name: 'Colorista Mestre',
        description: 'Completou 50 consultas de coloração',
        icon: 'award',
        earnedAt: new Date('2023-09-15'),
      },
      {
        id: '2',
        name: 'Especialista em Diagnóstico',
        description: 'Realizou 20 diagnósticos capilares',
        icon: 'badge-check',
        earnedAt: new Date('2023-10-22'),
      },
    ],
    createdAt: new Date('2023-08-01'),
  },
  {
    id: '2',
    name: 'Rafael Costa',
    email: 'rafael.costa@example.com',
    phone: '(21) 99876-5432',
    photoUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    points: 980,
    badges: [
      {
        id: '3',
        name: 'Transformador Visual',
        description: 'Publicou 10 transformações na galeria',
        icon: 'image',
        earnedAt: new Date('2023-11-05'),
      },
    ],
    createdAt: new Date('2023-09-10'),
  },
  {
    id: '3',
    name: 'Carla Mendes',
    email: 'carla.mendes@example.com',
    phone: '(31) 98765-9876',
    photoUrl: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    points: 1540,
    badges: [
      {
        id: '1',
        name: 'Colorista Mestre',
        description: 'Completou 50 consultas de coloração',
        icon: 'award',
        earnedAt: new Date('2023-10-12'),
      },
      {
        id: '4',
        name: 'Engajamento Social',
        description: 'Comentou em 30 publicações',
        icon: 'message-circle',
        earnedAt: new Date('2023-12-01'),
      },
    ],
    createdAt: new Date('2023-07-15'),
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Juliana Silva',
    userPhotoUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    beforeImageUrl: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImageUrl: 'https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Transformação incrível usando produtos De Sírius! De um loiro danificado para um platinado saudável.',
    likes: 42,
    comments: [
      {
        id: '1',
        userId: '2',
        userName: 'Rafael Costa',
        userPhotoUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'Ficou incrível! Qual linha de produtos você usou?',
        createdAt: new Date('2023-12-12'),
      },
      {
        id: '2',
        userId: '3',
        userName: 'Carla Mendes',
        userPhotoUrl: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'Amei o resultado! Parabéns pelo trabalho.',
        createdAt: new Date('2023-12-13'),
      },
    ],
    createdAt: new Date('2023-12-10'),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Rafael Costa',
    userPhotoUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    beforeImageUrl: 'https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImageUrl: 'https://images.pexels.com/photos/2014867/pexels-photo-2014867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Correção de cor usando a fórmula sugerida pelo Colorista Virtual. De um ruivo opaco para um ruivo vibrante!',
    likes: 35,
    comments: [
      {
        id: '3',
        userId: '1',
        userName: 'Juliana Silva',
        userPhotoUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'Que transformação! A ferramenta de IA acertou em cheio.',
        createdAt: new Date('2023-12-20'),
      },
    ],
    createdAt: new Date('2023-12-18'),
  },
];

export const mockDiagnoses: HairDiagnosis[] = [
  {
    id: '1',
    userId: '1',
    damageLevel: 7,
    porosity: 'alta',
    elasticity: 'baixa',
    density: 'média',
    issues: ['Pontas duplas', 'Ressecamento', 'Danos por calor'],
    recommendations: [
      'Linha de Reconstrução Profunda De Sírius',
      'Tratamento semanal com máscara nutritiva',
      'Reduzir uso de ferramentas térmicas',
      'Aplicar leave-in diariamente',
    ],
    createdAt: new Date('2023-11-15'),
  },
  {
    id: '2',
    userId: '2',
    damageLevel: 4,
    porosity: 'média',
    elasticity: 'média',
    density: 'grossa',
    issues: ['Frizz', 'Oleosidade na raiz'],
    recommendations: [
      'Linha Balance De Sírius',
      'Xampu equilibrante 2x por semana',
      'Óleo finalizador para pontas',
      'Tratamento anti-frizz quinzenal',
    ],
    createdAt: new Date('2023-12-05'),
  },
];

export const mockFormulas: ColorFormula[] = [
  {
    id: '1',
    userId: '1',
    currentColor: '7.3 (Loiro Médio Dourado)',
    desiredColor: '9.1 (Loiro Muito Claro Acinzentado)',
    formula: 'Ox 30 vol + De Sírius 9.1 + De Sírius 0.1',
    proportions: '60ml oxidante + 40g coloração 9.1 + 10g intensificador 0.1',
    additionalNotes: 'Aplicar primeiro nas pontas, deixar agir por 10 minutos, depois aplicar na raiz. Tempo total: 40 minutos.',
    createdAt: new Date('2023-10-20'),
  },
  {
    id: '2',
    userId: '3',
    currentColor: '5.0 (Castanho Claro)',
    desiredColor: '6.66 (Loiro Escuro Vermelho Intenso)',
    formula: 'Ox 20 vol + De Sírius 6.66 + De Sírius 0.6',
    proportions: '60ml oxidante + 50g coloração 6.66 + 5g intensificador 0.6',
    additionalNotes: 'Aplicar uniformemente e deixar agir por 35 minutos. Recomendado usar shampoo específico para cabelos tingidos após o procedimento.',
    createdAt: new Date('2023-11-10'),
  },
];

export const mockToneConversions: ToneConversion[] = [
  {
    id: '1',
    userId: '1',
    currentTone: '7.0',
    targetTone: '9.1',
    steps: [
      'Passo 1: Descoloração com Ox 20 vol até atingir base 8',
      'Passo 2: Aplicação de 9.1 com Ox 10 vol',
      'Passo 3: Matização com 0.1 para neutralizar amarelo',
    ],
    products: [
      'Pó descolorante De Sírius',
      'Oxidante 20 vol De Sírius',
      'Coloração 9.1 De Sírius',
      'Oxidante 10 vol De Sírius',
      'Intensificador 0.1 De Sírius',
    ],
    createdAt: new Date('2023-09-25'),
  },
];

export const mockToneAnalyses: BackgroundToneAnalysis[] = [
  {
    id: '1',
    userId: '2',
    photoUrl: 'https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Cabelo com mechas loiras, parece ter um tom amarelado em algumas áreas',
    identifiedTone: '8.3 (Loiro Claro Dourado)',
    recommendations: [
      'Para neutralizar o tom dourado, utilize um matizador com pigmento violeta',
      'Recomendamos a linha Platinum De Sírius para manutenção',
      'Para escurecer, considere um tom 7.1 (Loiro Médio Acinzentado)',
    ],
    createdAt: new Date('2023-12-01'),
  },
];

export const mockToneCorrections: ToneCorrection[] = [
  {
    id: '1',
    userId: '3',
    unwantedReflections: ['Amarelo', 'Dourado'],
    solutions: [
      'Utilizar matizador com pigmento violeta De Sírius',
      'Aplicar coloração com reflexo cinza (x.1) em proporção 1:2 com base natural',
      'Shampoo matizador 2x por semana para manutenção',
      'Máscara tonalizante violeta para reforçar efeito anti-amarelamento',
    ],
    createdAt: new Date('2023-11-15'),
  },
];

export const mockNeutralizationGuides: NeutralizationGuide[] = [
  {
    id: '1',
    userId: '1',
    targetTone: 'Platinado Frio',
    neutralizationTips: [
      'Amarelo se neutraliza com violeta (x.2)',
      'Dourado se neutraliza com cinza/azul (x.1)',
      'Alaranjado se neutraliza com azul (x.8)',
      'Vermelho se neutraliza com verde (x.7)',
    ],
    recommendedProducts: [
      'Shampoo Matizador Violeta De Sírius',
      'Máscara Matizadora Platinum De Sírius',
      'Leave-in Protetor Térmico De Sírius',
      'Intensificador 0.1 (Cinza) De Sírius',
    ],
    createdAt: new Date('2023-10-05'),
  },
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Colorista Mestre',
    description: 'Completou 50 consultas de coloração',
    icon: 'award',
    earnedAt: new Date('2023-09-15'),
  },
  {
    id: '2',
    name: 'Especialista em Diagnóstico',
    description: 'Realizou 20 diagnósticos capilares',
    icon: 'badge-check',
    earnedAt: new Date('2023-10-22'),
  },
  {
    id: '3',
    name: 'Transformador Visual',
    description: 'Publicou 10 transformações na galeria',
    icon: 'image',
    earnedAt: new Date('2023-11-05'),
  },
  {
    id: '4',
    name: 'Engajamento Social',
    description: 'Comentou em 30 publicações',
    icon: 'message-circle',
    earnedAt: new Date('2023-12-01'),
  },
  {
    id: '5',
    name: 'Pioneiro',
    description: 'Entre os primeiros 100 usuários da plataforma',
    icon: 'flag',
    earnedAt: new Date('2023-07-30'),
  },
];