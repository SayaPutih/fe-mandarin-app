"use client";

import { useState } from "react";
import CreateAssignmentForm from "./CreateAssignmentForm";
import SelectedWords from "./SelectedWords";
import WordTable from "./WordTable";
import {useWords,useCreateAssignment} from "@/hooks/useTeacherAssignmentClass";
import type {MandarinWord,} from "@/types/teacher";
import {NoticeModal} from "@/components/(teacher)/class/detail/DetailModal";
import TeacherButton from "@/components/ui/TeacherButton";
import { LoadingSpinner } from "@/components/ui/Loading";

interface Props {
  classId: string;
  onBack: () => void;
}

export default function CreateAssignmentSection({
  classId,
  onBack,
}: Props) {

  const {
    loading,
    words,
    page,
    setPage,
    totalPages,
    hanzi,
    setHanzi,
    pinyin,
    setPinyin,
    meaning,
    setMeaning,
    hskLevel,
    setHskLevel,
    refresh,
  } = useWords();

  const {
    loading: createLoading,
    handleCreateAssignment,
  } = useCreateAssignment();

  const [title, setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [modalMessage , setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWords,setSelectedWords] = useState<MandarinWord[]>([]);

  const handleAddWord = (word: MandarinWord) => {
    if (selectedWords.some((w) => w.id === word.id)) {
      return;
    }
    setSelectedWords((prev) => [word,...prev,]);
  };


  const handleRemoveWord = (id: string) => {
    setSelectedWords((prev) =>prev.filter((word) =>word.id !== id));
  };

  const handleSubmit = async () => {

    if (!title.trim()) {
      setModalMessage("Assignment title is required.");
      setModalOpen(true)
      return;
    }

    if (selectedWords.length === 0) {
      setModalMessage("Please select at least one word.");
      setModalOpen(true)
      return;
    }

    const result = await handleCreateAssignment(classId,
        {
          title,
          description:description || undefined,
          dueDate:dueDate ? dueDate.toISOString(): undefined,
          wordIds:selectedWords.map((word) => word.id),
        }
      );

    if (!result) {
      setModalMessage("Failed to create assignment.");
      setModalOpen(true)
      return;
    }

    setModalMessage("Assignment created successfully.");
    setModalOpen(true)
    onBack();

  };

  const handleHskLevelChange = (value?: number) => {
    setPage(1);
    setHskLevel(value);
  };

  const handleHanziChange = (value: string) => {
    setPage(1);
    setHanzi(value);
  };

  const handlePinyinChange = (value: string) => {
    setPage(1);
    setPinyin(value);
  };

  const handleMeaningChange = (value: string) => {
    setPage(1);
    setMeaning(value);
  };

  const orderedWords = [
    ...selectedWords,
    ...words.filter(
      (word) =>!selectedWords.some((selected) =>
            selected.id === word.id
        )
    ),
  ];


  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-semibold">
          Create Assignment
        </h2>

      </div>

      <CreateAssignmentForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        hanzi={hanzi}
        setHanzi={handleHanziChange}
        pinyin={pinyin}
        setPinyin={handlePinyinChange}
        meaning={meaning}
        setMeaning={handleMeaningChange}
        hskLevel={hskLevel}
        setHskLevel={handleHskLevelChange}
        onSearch={refresh}
      />

      <SelectedWords
        words={selectedWords}
        onRemove={handleRemoveWord}
      />

      <WordTable
        loading={loading}
        words={orderedWords}
        selectedWords={selectedWords}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onAdd={handleAddWord}
        onRemove={handleRemoveWord}
      />

      <div className="flex items-center flex-col sm:flex-row sm:space-y-0 space-y-2  justify-between rounded-xl border border-zinc-200 bg-white p-5">
        <div>
          <p className="font-medium">
            {selectedWords.length} Words Selected
          </p>
          <p className="text-sm text-gray-500">
            These words will be included in this assignment.
          </p>
        </div>
        <div className="flex gap-3 items-end justify-end w-full">

          <TeacherButton
            label="Cancel"
            onClick={onBack}
            variant="red"
            style="py-3"
          />

          <TeacherButton
            label={createLoading ? "Creating..." : "Create Assignment"}
            disabled={createLoading}
            onClick={handleSubmit}
            variant="green"
            style="disabled:opacity-50 py-3"
          />

        </div>
      </div>
      
      {modalOpen && <NoticeModal message={modalMessage} onClose={()=>setModalOpen(false)} />}

    </div>

  );

}