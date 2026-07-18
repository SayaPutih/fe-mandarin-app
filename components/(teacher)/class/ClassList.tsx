import { TeacherClass } from "@/types/class";
import ClassCard from "./ClassCard";

interface Props {
    classes: TeacherClass[];
}

export default function ClassList({
    classes,
}: Props) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {classes.map((item) => (
                <ClassCard
                    key={item.id}
                    data={item}
                />
            ))}
        </div>
    );
}