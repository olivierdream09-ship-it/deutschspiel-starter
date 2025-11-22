// Types pour le système de jeu

export interface VocabularyItem {
  id: string;
  german_word: string;
  translation: string;
  article?: string;
  plural_form?: string;
  level: string;
  category: string;
  audio_url?: string;
  image_url?: string;
  example_sentence?: string;
  difficulty_score: number;
}

export interface MemoryCard {
  id: number;
  type: 'german' | 'translation';
  content: string;
  pairId: number;
  article?: string;
  audioUrl?: string;
}

export interface GameSession {
  id: string;
  gameType: string;
  difficulty: string;
  score: number;
  timeSpent: number;
  moves: number;
  completedAt: Date;
}

export interface UserProgress {
  level: string;
  totalXP: number;
  gamesPlayed: number;
  vocabularyMastered: number;
  currentStreak: number;
}

export interface GameConfig {
  type: string;
  difficulty: string;
  maxTime: number;
  maxScore: number;
  vocabulary: VocabularyItem[];
}

// Types pour le système adaptatif
export interface UserSkill {
  skillType: string;
  skillName: string;
  masteryLevel: number;
  questionsAnswered: number;
  correctAnswers: number;
  lastPracticed: Date;
}

export interface LearningRecommendation {
  type: 'vocabulary' | 'grammar' | 'listening';
  priority: 'high' | 'medium' | 'low';
  reason: string;
  suggestedGames: string[];
}
