import {api} from "@/lib/axios";

export const GetAnalyticsOverview = async () => {
  const res = await api.get("/analytic/overview");
  return res.data;
};

export const GetAnalyticsDifficulty = async () => {
  const res = await api.get("/analytic/difficulty");
  return res.data;
};

export const GetAnalyticsRecent = async () => {
  const res = await api.get("/analytic/recent");
  return res.data;
};

export const GetAnalyticsWordProgress = async () => {
  const res = await api.get("/analytic/word-progress");
  return res.data;
};