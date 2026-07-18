"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getVocabularyById,
  updateVocabulary,
  deleteVocabulary,
} from "@/services/teacher/teacher.service";

import type {
  VocabularyDetail,
  EditVocabularyForm,
} from "@/types/teacher";

export function useVocabularyDetail(
  id: string,
  onDelete: () => void
) {
  const [loading, setLoading] =
    useState(true);

  const [word, setWord] =
    useState<VocabularyDetail | null>(
      null
    );

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [
    editForm,
    setEditForm,
  ] =
    useState<EditVocabularyForm>({
      simplified: "",
      pinyin: "",
      hskLevel: 1,
      pos: "",
      radical: "",
      lexicalDifficulty: "",
      meanings: [""],
    });

  const fetchWord =
    async () => {
      try {
        const data =
          await getVocabularyById(id);

        if (!data) return;

        setWord(data);

        setEditForm({
          simplified:
            data.simplified ||
            "",

          pinyin:
            data.pinyin || "",

          hskLevel:
            data.hskLevel || 1,

          pos:
            data.pos || "",

          radical:
            data.radical || "",

          lexicalDifficulty:
            data.lexicalDifficulty?.toString() ||
            "",

          meanings:
            data.meanings?.map(
              (
                m: any
              ) => m.meaning
            ) || [""],
        });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (id) {
      fetchWord();
    }
  }, [id]);

  const handleUpdate =
    async () => {
      await updateVocabulary(
        id,
        {
          ...editForm,

          lexicalDifficulty:
            editForm.lexicalDifficulty ===
            ""
              ? null
              : Number(
                  editForm.lexicalDifficulty
                ),

          meanings:
            editForm.meanings.filter(
              (m) =>
                m.trim() !== ""
            ),
        }
      );

      setShowEditModal(
        false
      );

      fetchWord();
    };

  const handleDelete =
    async () => {
      await deleteVocabulary(
        id
      );

      onDelete();
    };

  return {
    loading,

    word,

    editForm,

    setEditForm,

    showEditModal,

    setShowEditModal,

    showDeleteModal,

    setShowDeleteModal,

    handleUpdate,

    handleDelete,
  };
}