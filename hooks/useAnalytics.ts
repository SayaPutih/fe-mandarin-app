"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getRetentionAnalytics,
  getHardestVocabulary,
  getHSKDistribution,
} from "@/services/teacher/teacher.service";

export function useAnalytics() {
  const [loading, setLoading] = useState(true);
  const [retention, setRetention] = useState<any>(null);
  const [hardestWords, setHardestWords] = useState<any[]>([]);
  const [hskDistribution,setHskDistribution,] = useState<any[]>([]);

  const fetchData =
    async () => {
      try {
        const [retentionData,hardestVocabularyData,hskDistributionData,
        ] =
          await Promise.all([
            getRetentionAnalytics(),
            getHardestVocabulary(),
            getHSKDistribution(),
          ]);
        setRetention(retentionData);
        setHardestWords(hardestVocabularyData);
        setHskDistribution(hskDistributionData);

      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    retention,
    hardestWords,
    hskDistribution,
  };
}