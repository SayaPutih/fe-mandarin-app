"use client";

import { useParams } from "next/navigation";

import Header from "./Header";
import AssignmentTable from "./AssignmentTable";
import AssignmentTableSkeleton from "./AssignmentTableSkeleton";
import EmptyAssignment from "./EmptyAssignment";

import { useAssignments } from "@/hooks/useStudentClass";

export default function ClassDetailPage() {

    const params = useParams();

    const classId = params.id as string;

    const {
        loading,
        assignments,
        total,
    } = useAssignments(classId);

    return (

        <main className="mx-auto max-w-7xl p-6">

            <Header
                totalAssignments={total}
            />

            {
                loading
                ? (
                    <AssignmentTableSkeleton />
                )
                : assignments.length === 0
                    ? (
                        <EmptyAssignment />
                    )
                    : (
                        <AssignmentTable
                            classId={classId}
                            assignments={assignments}
                        />
                    )
            }

        </main>

    );

}