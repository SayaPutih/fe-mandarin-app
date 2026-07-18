"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getAllStudents } from "@/services/teacher/teacher.service";

import type {
  Student,
} from "@/types/teacher";

export function useStudents() {
  const [students, setStudents] =
    useState<Student[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const fetchStudents =
    async () => {
      try {
        const data =
          await getAllStudents();

        if (data) {
          console.log("--Student--");
          console.log(data);
          setStudents(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents =
    useMemo(() => {
      return students.filter(
        (student) =>
          `${student.name ?? ""} ${
            student.email ?? ""
          }`
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
    fetchStudents,
  };
}