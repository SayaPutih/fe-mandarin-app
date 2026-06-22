import { LucideIcon } from "lucide-react";

interface Props{
    label : string;
    value : string | number;
    Icon : LucideIcon
}

const DashboardStats =({
    label,
    value,
    Icon
} : Props)=>{
    return (
        <div className="rounded-2xl border p-3 items-start sm:flex-1 justify-arround flex-col flex">

            
            <Icon size={18} />

            <h1 className="text-xl sm:text-4xl font-bold mt-2 text-start">
              {value}
            </h1>

            <p className="text-sm text-gray-500">
                {label}
            </p>


        </div>
    )
}

export default DashboardStats;