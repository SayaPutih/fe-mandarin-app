export interface CreateTeacherClassRequest {
    name: string;
    description: string;
}

export interface Class {
    id: string;
    name: string;
    description: string;
    teacherId: string;
}

export interface TeacherClass {
  id: string;
  name: string;
  description: string;
  _count: {
    enrollments: number;
  };
  teacherId: string;
  createdAt: string;
}