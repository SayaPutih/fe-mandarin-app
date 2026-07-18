export interface TeacherDashboard {
  totalStudents: number;
  totalVocabulary: number;
  totalReviewsToday: number;
  averageRetention: number;
}

export interface RetentionAnalytics {
  _avg: {
    predictedRecall: number;
  };

  _min: {
    predictedRecall: number;
  };

  _max: {
    predictedRecall: number;
  };
}

export interface HardestVocabulary {
  id: string;

  correctReviews: number;

  totalReviews: number;

  word: {
    simplified: string;
    pinyin: string;
  };
}

export interface HSKDistribution {
  hskLevel: number;

  _count: number;
}

export interface Student {
  id: string;

  name: string;

  email: string;

  memoryStates: unknown[];

  attempts: unknown[];
}


export interface StudentDetail extends Student {}

export interface StudentRetention {
  _avg: {
    predictedRecall: number;
    predictedHalfLife: number;
  };
}

export interface StudentMemoryWord {
  id: string;

  predictedRecall: number;

  predictedHalfLife: number;

  nextReviewAt: string | null;

  word: {
    simplified: string;
    pinyin: string;
  };
}

export interface VocabularyMeaning {
  id?: string;

  meaning: string;
}

export interface Vocabulary {
  id: string;

  simplified: string;

  pinyin: string;

  hskLevel: number;

  radical: string | null;

  pos: string | null;

  lexicalDifficulty: number | null;

  createdAt: string;

  meanings: VocabularyMeaning[];
}

export interface VocabularyPagination {
  page: number;

  totalPages: number;

  totalItems: number;

  limit: number;
}

export interface VocabularyForm {
  simplified: string;

  pinyin: string;

  hskLevel: number;

  pos: string;

  radical: string;

  lexicalDifficulty: string;

  meanings: string[];
}

export interface VocabularyDetail
  extends Vocabulary {}

export interface EditVocabularyForm {
  simplified: string;

  pinyin: string;

  hskLevel: number;

  pos: string;

  radical: string;

  lexicalDifficulty: string;

  meanings: string[];
}

export interface MandarinMeaning {
  id: string;
  meaning: string;
}

export interface MandarinWord {
  id: string;
  simplified: string;
  pinyin: string;
  hskLevel: number;

  meanings: MandarinMeaning[];
}

export interface Assignment {
  id: string;

  title: string;

  description?: string;

  dueDate?: string;

  createdAt: string;

  assignmentCards: {
    id: string;

    wordId: string;
  }[];

  progresses: any[];
}