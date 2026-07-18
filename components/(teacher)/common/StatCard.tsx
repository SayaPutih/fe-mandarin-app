interface StatCardProps {
  title: string;

  value: string | number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-xs text-zinc-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}