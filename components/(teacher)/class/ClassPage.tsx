"use client";

import { useState } from "react";

import CreateTeacherClassModal from "./CreateTeacherClassModal";
import EmptyClass from "./EmptyClass";
import ClassTable from "./ClassTable";

import {
    useCreateTeacherClass,
    useGetTeacherClass,
} from "@/hooks/useTeacherClass";

export default function ClassPage() {
    const [openCreateModal, setOpenCreateModal] =
        useState(false);

    const {
        loading,
        handleCreateClass,
    } = useCreateTeacherClass();

    const {
        classes,
        refresh,
    } = useGetTeacherClass();

    return (
        <div className="p-8">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Classes
                    </h1>

                    <p className="text-gray-500">
                        Manage your classes
                    </p>
                </div>

                <button
                    onClick={() =>
                        setOpenCreateModal(true)
                    }
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                >
                    + Create Class
                </button>

            </div>

            {classes.length === 0 ? (
                <EmptyClass
                    onCreate={() =>
                        setOpenCreateModal(true)
                    }
                />
            ) : (
                <ClassTable classes={classes} />
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

        </div>
    );
}