"use client";

import { useEffect, useState,useCallback } from "react";

import { getClasses } from "@/services/student/class.service";

import { StudentClass } from "@/types/student";

export function useGetClasses() {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<StudentClass[]>([]);

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const res = await getClasses();

      if (res) {
        setClasses(res);
      }
    } catch (err) {
      console.log("-- useGetClasses --");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return {
    loading,
    classes,
    refresh: fetchClasses,
  };
}


import { getAssignmentsByClass,getAssignmentCards } from "@/services/student/class.service";

import { AssignmentPagination } from "@/types/student";

export function useAssignments(
  classId: string,
  page = 1,
  limit = 10,
) {

  const [loading, setLoading] = useState(true);

  const [data, setData] =
    useState<AssignmentPagination | null>(null);

  const fetchAssignments =
    useCallback(async () => {

      try {

        setLoading(true);

        const result =
          await getAssignmentsByClass(
            classId,
            page,
            limit,
          );

          console.log(result)

        setData(result);

      } finally {

        setLoading(false);

      }

    }, [classId, page, limit]);

  useEffect(() => {

    if (classId) {
      fetchAssignments();
    }

  }, [fetchAssignments, classId]);

  return {

    loading,

    assignments:
      data?.assignments ?? [],

    total:
      data?.total ?? 0,

    page:
      data?.page ?? 1,

    totalPages:
      data?.totalPages ?? 1,

    refresh:
      fetchAssignments,

  };

}

export function useAssignmentCards(
  assignmentId: string,
) {

  const [loading, setLoading] =
    useState(true);

  const [cards, setCards] =
    useState<any[]>([]);

  const fetchCards =
    useCallback(async () => {

      try {

        setLoading(true);

        const result =
          await getAssignmentCards(
            assignmentId,
          );

          console.log("AssignmentPage")
          console.log(result);
        setCards(result);

      } finally {

        setLoading(false);

      }

    }, [assignmentId]);

  useEffect(() => {

    if (assignmentId) {
      fetchCards();
    }

  }, [fetchCards, assignmentId]);

  return {

    loading,

    cards,

    refresh:
      fetchCards,

  };

}