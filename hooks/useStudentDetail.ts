"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getStudentById,
  getStudentRetention,
  getStudentMasteredWords,
  getStudentForgottenWords,
  getStudentReviewSchedule,
} from "@/services/teacher/teacher.service";

import type {
  StudentDetail,
  StudentRetention,
  StudentMemoryWord,
} from "@/types/teacher";

export function useStudentDetail(
  id: string
) {
  const [loading, setLoading] =
    useState(true);

  const [student, setStudent] =
    useState<StudentDetail | null>(
      null
    );

  const [retention, setRetention] =
    useState<StudentRetention | null>(
      null
    );

  const [
    masteredWords,
    setMasteredWords,
  ] = useState<
    StudentMemoryWord[]
  >([]);

  const [
    forgottenWords,
    setForgottenWords,
  ] = useState<
    StudentMemoryWord[]
  >([]);

  const [
    reviewSchedule,
    setReviewSchedule,
  ] = useState<
    StudentMemoryWord[]
  >([]);

  const fetchData =
    async () => {
      try {
        const [
          studentData,
          retentionData,
          masteredData,
          forgottenData,
          reviewData,
        ] = await Promise.all([
          getStudentById(id),
          getStudentRetention(id),
          getStudentMasteredWords(
            id
          ),
          getStudentForgottenWords(
            id
          ),
          getStudentReviewSchedule(
            id
          ),
        ]);

        setStudent(studentData);

        setRetention(
          retentionData
        );

        setMasteredWords(
          masteredData || []
        );

        setForgottenWords(
          forgottenData || []
        );

        setReviewSchedule(
          reviewData || []
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    loading,

    student,

    retention,

    masteredWords,

    forgottenWords,

    reviewSchedule,
  };
}