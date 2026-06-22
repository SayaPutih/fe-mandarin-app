import { LucideIcon } from "lucide-react";

interface Props{
    title : string;
    label : string;
    value : number;
    Icon : LucideIcon;
    desc : string;
}

const MemoryModel =({
    title,
    label,
    value,
    Icon,
    desc,
} : Props)=>{
    return (
        <div
          className="
            mt-4
            rounded-2xl
            border
            p-5
          "
        >
          <div className="flex items-center gap-2">
            <Icon size={22} />

            <h2 className="text-xl font-bold">
              {title}
            </h2>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {label}
            </p>

            <h1 className="text-4xl font-bold mt-1">
              {value}
            </h1>

            <p className="text-sm text-gray-400">
              days
            </p>
          </div>

          <div className="mt-4">
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 bg-black rounded-full"
                style={{
                  width: `${Math.min(
                    value ?? 0,
                    100
                  )}%`,
                }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {desc}
            </p>
          </div>
        </div>
    )
}

export default MemoryModel;