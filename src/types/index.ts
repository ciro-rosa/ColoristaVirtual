export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  points: number;
  badges: Badge[];
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhotoUrl?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  description: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhotoUrl?: string;
  content: string;
  createdAt: Date;
}

export interface HairDiagnosis {
  id: string;
  userId: string;
  damageLevel: number;
  porosity: 'baixa' | 'média' | 'alta';
  elasticity: 'baixa' | 'média' | 'alta';
  density: 'fina' | 'média' | 'grossa';
  issues: string[];
  recommendations: string[];
  createdAt: Date;
}

export interface ColorFormula {
  id: string;
  userId: string;
  currentColor: string;
  desiredColor: string;
  formula: string;
  proportions: string;
  additionalNotes: string;
  createdAt: Date;
}

export type ToneConversion = {
  id: string;
  userId: string;
  currentTone: string;
  targetTone: string;
  steps: string[];
  products: string[];
  createdAt: Date;
}

export type BackgroundToneAnalysis = {
  id: string;
  userId: string;
  photoUrl?: string;
  description: string;
  identifiedTone: string;
  recommendations: string[];
  createdAt: Date;
}

export type ToneCorrection = {
  id: string;
  userId: string;
  unwantedReflections: string[];
  solutions: string[];
  createdAt: Date;
}

export type NeutralizationGuide = {
  id: string;
  userId: string;
  targetTone: string;
  neutralizationTips: string[];
  recommendedProducts: string[];
  createdAt: Date;
}