"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllVocabulary,
  createVocabulary,
} from "@/services/teacher/teacher.service";

import type {
  Vocabulary,
  VocabularyForm,
  VocabularyPagination,
} from "@/types/teacher";

export function useVocabulary() {
  const [loading, setLoading] =
    useState(true);

  const [words, setWords] =
    useState<Vocabulary[]>([]);

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState<VocabularyPagination | null>(
      null
    );

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [form, setForm] =
    useState<VocabularyForm>({
      simplified: "",
      pinyin: "",
      hskLevel: 1,
      pos: "",
      radical: "",
      lexicalDifficulty: "",
      meanings: [""],
    });

  const fetchWords =
    async () => {
      try {
        const data =
          await getAllVocabulary(
            page,
            10
          );

        if (data) {
          setWords(data.data);

          setPagination(
            data.pagination
          );
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchWords();
  }, [page]);

  const filteredWords =
    useMemo(() => {
      return words.filter(
        (word) =>
          word.simplified
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          word.pinyin
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [words, search]);

  const handleCreate =
    async () => {
      try {
        await createVocabulary({
          ...form,
          lexicalDifficulty:
            form.lexicalDifficulty ===
            ""
              ? null
              : Number(
                  form.lexicalDifficulty
                ),
        });

        setShowModal(false);

        setForm({
          simplified: "",
          pinyin: "",
          hskLevel: 1,
          pos: "",
          radical: "",
          lexicalDifficulty: "",
          meanings: [""],
        });

        fetchWords();
      } catch (err) {
        console.log(err);
      }
    };

  return {
    loading,
    words,
    filteredWords,
    pagination,
    page,
    setPage,
    search,
    setSearch,
    showModal,
    setShowModal,
    form,
    setForm,
    handleCreate,
  };
}