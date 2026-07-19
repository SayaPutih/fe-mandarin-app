"use client";

import { useEffect, useState } from "react";

import UpdateAssignmentForm from "./UpdateAssignmentForm";
import SelectedWords from "./SelectedWords";
import WordTable from "./WordTable";

import {
  useWords,
  useUpdateAssignment,
  useUpdateAssignmentDetail,
} from "@/hooks/useTeacherAssignmentClass";

import type {
  MandarinWord,
} from "@/types/teacher";

import { NoticeModal } from "@/components/(teacher)/class/detail/DetailModal";
import TeacherButton from "@/components/ui/TeacherButton";

interface Props {
  assignmentId: string;
  onBack: () => void;
  onRefresh: () => void;
}

export default function UpdateAssignmentSection({
  assignmentId,
  onBack,
  onRefresh,
}: Props) {

  const {
      loading: assignmentLoading,
      assignment,
  } = useUpdateAssignmentDetail(
      assignmentId
  );

  const {
    loading: wordsLoading,
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
    loading: updateLoading,
    handleUpdateAssignment,
  } = useUpdateAssignment();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [
    selectedWords,
    setSelectedWords,
  ] = useState<MandarinWord[]>([]);

  useEffect(() => {

    if (!assignment) return;

    setTitle(
      assignment.title ?? ""
    );

    setDescription(
      assignment.description ?? ""
    );

    setDueDate(
      assignment.dueDate
        ? new Date(
            assignment.dueDate
          )
        : null
    );

    setSelectedWords(
        assignment.assignmentCards?.map(
            (card: any) => card.word
        ) ?? []
    );

  }, [assignment]);

  const handleAddWord = (
    word: MandarinWord
  ) => {

    if (
      selectedWords.some(
        (w) => w.id === word.id
      )
    ) {
      return;
    }

    setSelectedWords((prev) => [
      word,
      ...prev,
    ]);

  };

  const handleRemoveWord = (
    id: string
  ) => {

    setSelectedWords((prev) =>
      prev.filter(
        (word) =>
          word.id !== id
      )
    );

  };

  const handleSubmit = async () => {

    if (!title.trim()) {

      setModalMessage(
        "Assignment title is required."
      );

      setModalOpen(true);
      await onRefresh();
      onBack();
      return;

    }

    if (
      selectedWords.length === 0
    ) {

      setModalMessage(
        "Please select at least one word."
      );

      setModalOpen(true);

      return;

    }

    const result =
      await handleUpdateAssignment(
        assignment.id,
        {
          title,

          description:
            description || undefined,

          dueDate:
            dueDate
              ? dueDate.toISOString()
              : undefined,

          wordIds:
            selectedWords.map(
              (word) => word.id
            ),
        }
      );

    if (!result) {

      setModalMessage(
        "Failed to update assignment."
      );

      setModalOpen(true);

      return;

    }

    setModalMessage(
      "Assignment updated successfully."
    );

    setModalOpen(true);

    onRefresh();

    onBack();

  };

  const handleHskLevelChange = (
    value?: number
  ) => {

    setPage(1);

    setHskLevel(value);

  };

  const handleHanziChange = (
    value: string
  ) => {

    setPage(1);

    setHanzi(value);

  };

  const handlePinyinChange = (
    value: string
  ) => {

    setPage(1);

    setPinyin(value);

  };

  const handleMeaningChange = (
    value: string
  ) => {

    setPage(1);

    setMeaning(value);

  };

  const orderedWords = [

    ...selectedWords,

    ...words.filter(
      (word) =>
        !selectedWords.some(
          (selected) =>
            selected.id === word.id
        )
    ),

  ];

  return (

    <div className="space-y-6 bg-white p-4 rounded-xl">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-semibold">
          Update Assignment
        </h2>

        <TeacherButton
            variant="gray"
            label="Back"
            href="../"
        />
      </div>

      <UpdateAssignmentForm
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
        loading={wordsLoading}
        words={orderedWords}
        selectedWords={selectedWords}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onAdd={handleAddWord}
        onRemove={handleRemoveWord}
      />

      <div className="flex flex-col items-center justify-between space-y-2 rounded-xl border border-zinc-200 bg-white p-5 sm:flex-row sm:space-y-0">

        <div>

          <p className="font-medium">
            {selectedWords.length} Words Selected
          </p>

          <p className="text-sm text-gray-500">
            These words will be included in this assignment.
          </p>

        </div>

        <div className="flex w-full justify-end gap-3">

          <TeacherButton
            label="Cancel"
            onClick={onBack}
            variant="red"
            style="py-3"
          />

          <TeacherButton
            label={
              updateLoading
                ? "Updating..."
                : "Update Assignment"
            }
            disabled={
              updateLoading
            }
            onClick={
              handleSubmit
            }
            variant="yellow"
            style="disabled:opacity-50 py-3"
          />

        </div>

      </div>

      {modalOpen && (

        <NoticeModal
          message={modalMessage}
          onClose={() =>
            setModalOpen(false)
          }
        />

      )}

    </div>

  );

}