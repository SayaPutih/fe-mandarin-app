"use client";

import { useEffect, useState } from "react";

import {
  getStudentsByClass,
  addStudentToClass,
  removeStudentFromClass,
} from "@/services/teacher/teacherClassStudent.service";

export function useGetStudentsByClass(
  classId: string
) {

  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {

    try {
      setLoading(true);
      const res = await getStudentsByClass(classId);
        console.log("FULL RESPONSE", res.data);
        console.log("RESULT", res.data); 
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    if (!classId) return;
    fetchStudents();
  }, [classId]);

  return {
    loading,
    students,
    refresh: fetchStudents,
  };
}

export function useAddStudentToClass() {
  const [loading, setLoading] = useState(false);

  const handleAddStudent = async (
    classId: string,
    studentIds: string[]
  ) => {
    try {
      setLoading(true);

      await addStudentToClass(
        classId,
        studentIds
      );

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleAddStudent,
  };
}

import {
  useMemo,
} from "react";

import {
  getAvailableStudents,
} from "@/services/teacher/teacherClassStudent.service";

import type {
  Student,
} from "@/types/teacher";

interface Props {
  classId: string;
}

export function useAvailableStudents({
  classId,
}: Props) {

  const [loading, setLoading] =
    useState(true);

  const [students, setStudents] =
    useState<Student[]>([]);

  const [search, setSearch] =
    useState("");

  const fetchStudents = async () => {

    try {

      setLoading(true);

      const res =
        await getAvailableStudents(
          classId
        );

      setStudents(
        res.data.result
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (!classId) return;

    fetchStudents();

  }, [classId]);

  const filteredStudents =
    useMemo(() => {

      return students.filter(
        (student) =>
          `${student.name ?? ""} ${student.email ?? ""}`
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [students, search]);

  return {
    loading,
    students,
    filteredStudents,
    search,
    setSearch,
    refresh: fetchStudents,
  };

}

export function useRemoveStudentFromClass() {

  const [loading, setLoading] = useState(false);

  const handleRemoveStudent = async (
    classId: string,
    studentId: string
  ) => {

    try {

      setLoading(true);

      await removeStudentFromClass(
        classId,
        studentId
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return {

    loading,
    handleRemoveStudent,
  };

}