import { LucideIcon } from "lucide-react";

interface Props{
    label : string;
    value : string | number;
    Icon : LucideIcon;
    desc : string;
}

const DashboardHero =({
    label,
    value,
    Icon,
    desc,
} : Props)=>{
    return (
        <div
          className="
            bg-black
            text-white
            rounded-2xl
            p-5
            mb-4
          "
        >
          <p className="text-gray-300 text-base">
            {label}
          </p>

          <div className="flex items-center justify-between mt-3">
            <h1 className="text-5xl font-bold">
              {value}
            </h1>

            <Icon size={48} />
          </div>

          <p className="text-sm text-gray-400 mt-2">
            {desc}
          </p>
        </div>
    )
}

export default DashboardHero;