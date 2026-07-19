//EE 2
"use client";

import react,{ useState,useEffect } from "react";
import { FormField,AreaField } from "@/components/ui/form/FormField";
import TeacherButton from "@/components/ui/TeacherButton";

interface CreateTeacherClassModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
  }) => void | Promise<void>;
  loading?: boolean;
}

export default function CreateTeacherClassModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}: CreateTeacherClassModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      name,
      description,
    });

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-2xl font-bold">
          Create Class
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
            <FormField
              label="Class Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HSK 1 Morning"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <AreaField
              label="Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              className="w-full resize-none rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />


          <div className="flex justify-end gap-3 pt-2">

            <TeacherButton
                variant="red"
                label="Cancel"
                onClick={onClose}
            />

            <TeacherButton
                variant="green"
                label={loading ? "Creating..." : "Create"}
                disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}