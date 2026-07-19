//EE
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  icon?: ReactNode;
  value: string | number;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-black/50
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="sm:text-xs text-sm font-medium text-zinc-500">
            {title}
          </p>

          <h2 className="mt-3  text-xl sm:text-2xl font-bold tracking-tight text-black">
            {value}
          </h2>
        </div>

        {icon && (
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-zinc-100
              text-black
              transition-colors
              group-hover:bg-black
              group-hover:text-white
            "
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}