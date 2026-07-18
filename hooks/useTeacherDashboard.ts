"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getTeacherDashboard,
  getRetentionAnalytics,
  getHardestVocabulary,
  getHSKDistribution,
} from "@/services/teacher/teacher.service";

import type {
  TeacherDashboard,
  RetentionAnalytics,
  HardestVocabulary,
  HSKDistribution,
} from "@/types/teacher";

export function useTeacherDashboard() {

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<TeacherDashboard | null>(null);
  const [retention, setRetention] = useState<RetentionAnalytics | null>(null);
  const [hardestWords,setHardestWords,] = useState<HardestVocabulary[]>([]);
  const [hskDistribution,setHskDistribution,] = useState<HSKDistribution[]>([]);

  const fetchData = async () => {
      try {
        const [
          dashboardData,
          retentionData,
          hardestVocabularyData,
          hskDistributionData,
        ] = await Promise.all([
          getTeacherDashboard(),
          getRetentionAnalytics(),
          getHardestVocabulary(),
          getHSKDistribution(),
        ]);

        setDashboard(dashboardData);
        setRetention(retentionData);
        setHardestWords(hardestVocabularyData);
        setHskDistribution(hskDistributionData);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    dashboard,
    retention,
    hardestWords,
    hskDistribution,
    fetchData,
  };
}