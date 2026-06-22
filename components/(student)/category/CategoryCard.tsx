import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  href: string;
  icon: LucideIcon;
}

const CategoryCard = ({
  label,
  href,
  icon: Icon,
}: Props) => {
  return (
    <Link
      href={href}
      className="
        group
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-zinc-900
        hover:bg-zinc-900
        hover:shadow-lg
      "
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            border
            border-zinc-200
            bg-zinc-100
            transition-all
            group-hover:border-white/20
            group-hover:bg-white/10
          "
        >
          <Icon
            size={26}
            className="
              text-zinc-900
              transition-all
              group-hover:text-white
            "
          />
        </div>

        <div className="text-center">
          <h3
            className="
              font-semibold
              text-zinc-900
              transition-all
              group-hover:text-white
            "
          >
            {label}
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-zinc-500
              transition-all
              group-hover:text-zinc-300
            "
          >
            Open Module
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;