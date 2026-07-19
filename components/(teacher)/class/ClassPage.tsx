//EE 2
"use client";

import { useState } from "react";
import TeacherButton from "@/components/ui/TeacherButton";
import CreateTeacherClassModal from "./CreateTeacherClassModal";
import EmptyClass from "./EmptyClass";
import ClassTable from "./ClassTable";
import DeleteClassModal from "./DeleteClassModal";
import {
    useCreateTeacherClass,
    useGetTeacherClass,
} from "@/hooks/useTeacherClass";

export default function ClassPage() {
    const {
        classes,
        refresh,
        deleteClassId,
        setDeleteClassId,
        confirmDelete,
    } = useGetTeacherClass();

    const [openCreateModal, setOpenCreateModal] =
        useState(false);

    const {
        loading,
        handleCreateClass,
    } = useCreateTeacherClass();

    return (
        <div className="p-8 bg-white rounded-xl">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Classes
                    </h1>
                    <p className="text-gray-500">
                        Manage your classes
                    </p>
                </div>

                <TeacherButton
                    label="+ Create Class"
                    variant="green"
                    onClick={() =>
                        setOpenCreateModal(true)
                    }
                />

            </div>

            {classes.length === 0 ? (
                <EmptyClass
                    onCreate={() =>
                        setOpenCreateModal(true)
                    }
                />
            ) : (
                <ClassTable
                    classes={classes}
                    onDelete={setDeleteClassId}
                />
            )}

            <CreateTeacherClassModal
                open={openCreateModal}
                loading={loading}
                onClose={() =>
                    setOpenCreateModal(false)
                }
                onSubmit={async (data) => {
                    await handleCreateClass(data);
                    refresh();
                }}
            />

            <DeleteClassModal
                open={!!deleteClassId}
                onClose={() => setDeleteClassId(null)}
                onDelete={confirmDelete}
            />

        </div>
    );
}