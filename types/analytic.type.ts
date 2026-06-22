export type AnalyticsOverview = {
  learnedWords: number;
  totalReviews: number;
  averageHalfLife: number;
  averageRecall: number;
};

export type DifficultyDistribution = {
  easy: number;
  medium: number;
  hard: number;
};

export type WordProgress = {
  wordId: string;
  hanzi: string;
  pinyin: string;
  difficulty: number;
  halfLife: number;
  recall: number;
  reviewCount: number;
  nextReviewAt: string;
};

export type RecentActivity = {
  id: string;
  hanzi: string;
  isCorrect: boolean;
  answerTimeMs: number;
  createdAt: string;
};