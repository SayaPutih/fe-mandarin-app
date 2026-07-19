import { TeacherClass } from "@/types/class";

interface Props {
    data: TeacherClass;
}

export default function ClassCard({
    data,
}: Props) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">
                {data.name}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                {data.description}
            </p>

            <div className="mt-5 flex justify-between text-sm text-gray-500">
                <span>ID : {data.id}</span>

                <button className="font-medium text-blue-600">
                    View
                </button>
            </div>
        </div>
    );
}