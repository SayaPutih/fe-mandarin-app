interface ReviewedWordsStatsProps {
  total: number;
}

export default function ReviewedWordsStats({
  total,
}: ReviewedWordsStatsProps) {
  return (
    <div className="mb-4 rounded-lg border bg-white p-3 shadow-sm">
      <p className="text-xs text-zinc-500">
        Total Reviewed Words
      </p>

      <h2 className="mt-1 text-2xl font-bold">
        {total}
      </h2>
    </div>
  );
}