"use client";

import { useEffect, useState } from "react";

import {
  createTeacherClass,
  getTeacherClass,
  deleteClass,
} from "@/services/teacher/teacherClass.service";

import {
  CreateTeacherClassRequest,
  TeacherClass,
} from "@/types/class";

export function useCreateTeacherClass() {
  const [loading, setLoading] = useState(false);

  const handleCreateClass = async (
    data: CreateTeacherClassRequest
  ) => {
    try {
      setLoading(true);

      await createTeacherClass(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleCreateClass,
  };
}

export function useGetTeacherClass(
  initialPage = 1,
  initialLimit = 10
) {
  const [loading, setLoading] = useState(true);

  const [classes, setClasses] = useState<TeacherClass[]>([]);

  const [page, setPage] = useState(initialPage);

  const [limit] = useState(initialLimit);

  const [totalPages, setTotalPages] = useState(1);

  const [deleteClassId, setDeleteClassId] = useState<string | null>(null);

  const fetchData = async (
    currentPage = page
  ) => {
    try {
      setLoading(true);

      const res = await getTeacherClass(
        currentPage,
        limit
      );

      setClasses(res.data.result.classes);

      setTotalPages(
        res.data.result.pagination.totalPages
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const confirmDelete = async () => {
    if (!deleteClassId) return;

    try {
      setLoading(true);

      await deleteClass(deleteClassId);

      if (classes.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchData();
      }

      setDeleteClassId(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    classes,

    page,

    totalPages,

    setPage,

    refresh: fetchData,

    deleteClassId,

    setDeleteClassId,

    confirmDelete,
  };
}