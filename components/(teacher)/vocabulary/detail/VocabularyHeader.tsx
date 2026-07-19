//EE
"use client";

import TeacherButton from "@/components/ui/TeacherButton";
import { Trash,Pencil   } from 'lucide-react';

interface VocabularyHeaderProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function VocabularyHeader({
  onBack,
  onEdit,
  onDelete,
}: VocabularyHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <TeacherButton
        variant="gray"
        label="← Back"
        onClick={onBack}
        style="py-3"
      />

      <div className="flex gap-3">
        <TeacherButton
          variant="yellow"
          icon={<Pencil width={16} />}
          onClick={onEdit}
          style=""
        />

        <TeacherButton
          icon={<Trash width={16} />}
          variant="red"
          onClick={onDelete}
          style=""
        />
      </div>
    </div>
  );
}