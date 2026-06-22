"use client";

import { useEffect, useState } from "react";

import { Statistic } from "@/types/statistic.type";
import { getStats } from "@/services/statistic/statistic.service";


import CategorySection from "../category/CategorySection";

export default function HomeSection() {

  const loadData = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section
      className="
          flex flex-col flex-1
          bg-white
          rounded-3xl
          p-6
          border
          border-gray-100
          shadow-sm
          min-h-[calc(100vh-200px)]
      "
  >
      <div className="mb-6">

          <h1 className="text-2xl font-bold">
              Welcome to Mandarin LMS
          </h1>

          <p className="text-gray-500 mt-1">
              Choose a category to start learning Mandarin vocabulary.
          </p>

      </div>

      <CategorySection />
  </section>
  );
}

 