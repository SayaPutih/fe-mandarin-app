"use client";

import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsLoading from "./AnalyticsLoading";
import HardestVocabularyTable from "./HardestVocabularyTable";
import HSKDistributionTable from "./HSKDistributionTable";
import RetentionAnalytics from "./RetentionAnalytics";

import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsPage() {
  const {
    loading,
    retention,
    hardestWords,
    hskDistribution,
  } = useAnalytics();

  if (loading) {
    return <AnalyticsLoading />;
  }

  return (
    <div className="space-y-6 sm:p-6">
      <AnalyticsHeader />

      <RetentionAnalytics
        retention={retention}
      />

      <HSKDistributionTable
        data={hskDistribution}
      />

      <HardestVocabularyTable
        words={hardestWords}
      />
    </div>
  );
}