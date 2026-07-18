export interface ReviewedMeaning {
  id: string;
  meaning: string;
}

export interface ReviewedWord {
  id:string;
  correctReviews: number;
  totalReviews: number;
  word: {
    simplified: string;
    pinyin: string;
    hskLevel: number;
    meanings: ReviewedMeaning[];
  };
}

export interface ReviewedWordsPagination {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface Teacher {
  id: string;
  name: string | null;
  email: string;
}

export interface StudentClass {
  id: string;
  name: string;
  description: string | null;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
}

export interface AssignmentProgress {
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

  completedCards: number;

  completionPercentage: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  classId:string;
  createdAt: string;
  _count: {
    assignmentCards: number;
  };
  progress: AssignmentProgress | null;
}

export interface AssignmentPagination {
  assignments: Assignment[];
  total: number;
  page: number;
  totalPages: number;
}