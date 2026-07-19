"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAssignments,
  getWords,
  createAssignment,
  updateAssignment,
  getAssignmentDetail,
  getAssignmentCards,
  getAssignmentStudents,
  removeStudent,
  removeAssignment,
  getUpdateAssignment
} from "@/services/teacher/teacherAssignment.service";

import type {
  Assignment,
  MandarinWord,
} from "@/types/teacher";

export function useUpdateAssignmentDetail(
  assignmentId?: string
) {

  const [
    assignment,
    setAssignment,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const fetchAssignment =
    async () => {

      if (!assignmentId) return;

      try {

        setLoading(true);

        const result =
          await getUpdateAssignment(
            assignmentId
          );
          console.log("Assignmen class Detail")
          console.log(result);
        setAssignment(result);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchAssignment();
  }, [assignmentId]);

  return {

    loading,

    assignment,

    refresh: fetchAssignment,

  };

}


export function useAssignments(
  classId: string
) {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await getAssignments(classId);
        if (data) {
          setAssignments(data);
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (classId) {
      fetchAssignments();
    }
  }, [classId]);

  return {
    loading,
    assignments,
    refresh: fetchAssignments,
  };
}


export function useWords() {

  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<MandarinWord[]>([]);
  const [hanzi, setHanzi] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [meaning, setMeaning] = useState("");
  const [hskLevel, setHskLevel] = useState<number>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchWords =
    async () => {
      try {
        setLoading(true);
        const data =
          await getWords({
            hanzi,
            pinyin,
            meaning,
            hskLevel,
            page,
            limit,
          });
        if (data) {
          setWords(data.words);
          setTotalPages(data.totalPages);
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchWords();
  }, [
    hanzi,
    pinyin,
    meaning,
    hskLevel,
    page,
  ]);

  return {
    loading,
    words,
    hanzi,
    setHanzi,
    pinyin,
    setPinyin,
    meaning,
    setMeaning,
    hskLevel,
    setHskLevel,
    page,
    setPage,
    totalPages,
    refresh: fetchWords,
  };

}

export function useCreateAssignment() {

  const [loading, setLoading] = useState(false);

  const handleCreateAssignment =
    async (
      classId: string,
      data: {
        title: string;
        description?: string;
        dueDate?: string;
        wordIds: string[];
      }
    ) => {
      try {
        setLoading(true);
        return await createAssignment(
          classId,
          data
        );
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,
    handleCreateAssignment,
  };

}

export function useUpdateAssignment() {

  const [loading, setLoading] =
    useState(false);

  const handleUpdateAssignment =
    async (
      assignmentId: string,
      data: {
        title: string;
        description?: string;
        dueDate?: string;
        wordIds: string[];
      }
    ) => {

      try {

        setLoading(true);

        return await updateAssignment(
          assignmentId,
          data
        );

      } finally {

        setLoading(false);

      }

    };

  return {

    loading,

    handleUpdateAssignment,

  };

}

export function useAssignmentDetail(
  assignmentId?: string
) {

  const [assignment,setAssignment] = useState<any>(null);

  const [loading,
    setLoading,
  ] = useState(true);

  const fetchAssignment =
    async () => {

      if (!assignmentId) {
        return;
      }

      try {

        setLoading(true);

        const result =
          await getAssignmentDetail(
            assignmentId
          );

        setAssignment(result);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchAssignment();
  }, [assignmentId]);

  return {

    loading,

    assignment,

    refresh:
      fetchAssignment,

  };

}

export function useAssignmentCards(
  assignmentId: string
) {

  const [loading, setLoading] =
    useState(true);

  const [cards, setCards] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const limit = 10;

  const fetchCards =
    async () => {

      if (!assignmentId) {
        return;
      }

      try {

        setLoading(true);

        const result =
          await getAssignmentCards(
            assignmentId,
            {
              page,
              limit,
            }
          );

        if (result) {

          setCards(
            result.cards
          );

          setTotalPages(
            result.totalPages
          );

        }

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchCards();

  }, [
    assignmentId,
    page,
  ]);

  return {

    loading,

    cards,

    page,

    setPage,

    totalPages,

    refresh:
      fetchCards,

  };

}

export function useAssignmentStudents(
  assignmentId: string
) {

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchStudents =
    async () => {

      if (!assignmentId) {
        return;
      }

      try {

        setLoading(true);

        const result =
          await getAssignmentStudents(
            assignmentId,
            {
              page,
              limit,
            }
          );

        if (result) {

          setStudents(
            result.students
          );

          setTotalPages(
            result.totalPages
          );

        }

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchStudents();

  }, [
    assignmentId,
    page,
  ]);

  return {
    loading,
    students,
    page,
    setPage,
    totalPages,
    refresh:
    fetchStudents,
  };

}

export function useRemoveStudent() {

  const [loading, setLoading] =useState(false);

  const handleRemoveStudent =
    async (
      classId: string,
      studentId: string,
    ) => {

      try {
        setLoading(true);
        return await removeStudent(
          classId,
          studentId
        );
      } finally {
        setLoading(false);
      }

    };

  return {
    loading,
    handleRemoveStudent,
  };

}

export function useRemoveAssignment(){
  const [loading,setLoading] = useState(false);
  const handleRemoveAssignment = async (id:string)=>{
    try{
      console.log("Hook")
      setLoading(true);
      return await removeAssignment(id);
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }
  }

  return {loading,handleRemoveAssignment}
}