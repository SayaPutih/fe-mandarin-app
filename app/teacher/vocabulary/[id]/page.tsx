"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import {
  getVocabularyById,
} from "@/services/teacher/teacher.service";
import {
  updateVocabulary,
  deleteVocabulary,
} from "@/services/teacher/teacher.service";

export default function VocabularyDetailPage() {
const router = useRouter();

const params = useParams();
const id = params.id as string;

const [word, setWord] = useState<any>(null);

const [showEditModal, setShowEditModal] =
  useState(false);

const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [editForm, setEditForm] = useState({
  simplified: "",
  pinyin: "",
  hskLevel: 1,
  pos: "",
  radical: "",
  lexicalDifficulty: "",
});

const fetchWord = async () => {
  const data = await getVocabularyById(id);

  if (data) {
    setWord(data);

    setEditForm({
          simplified: data.simplified || "",
          pinyin: data.pinyin || "",
          hskLevel: data.hskLevel || 1,
          pos: data.pos || "",
          radical: data.radical || "",
          lexicalDifficulty:
            data.lexicalDifficulty?.toString() ||
            "",
        });
      }
    };

    const handleUpdate = async () => {
      try {
        await updateVocabulary(id, {
          ...editForm,
          lexicalDifficulty:
            editForm.lexicalDifficulty === ""
              ? null
              : Number(
                  editForm.lexicalDifficulty
                ),
        });

        setShowEditModal(false);

        fetchWord();
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async () => {
      try {
        await deleteVocabulary(id);

        router.push(
          "/teacher/vocabulary"
        );
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      if (id) {
        fetchWord();
      }
    }, [id]);

    if (!word) {
      return (
        <div className="p-6">
          Loading...
        </div>
      );
    }

return (
  <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 p-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="rounded-xl border bg-white px-5 py-3 shadow-sm transition hover:bg-zinc-100"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setShowEditModal(true)
              }
              className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 text-orange-600"
            >
              Edit Vocabulary
            </button>

            <button
              onClick={() =>
                setShowDeleteModal(true)
              }
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        {/* HERO */}

        <div className="mb-8 rounded-3xl border bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {word.simplified}
              </h1>

              <p className="mt-3 text-2xl text-zinc-500">
                {word.pinyin}
              </p>
            </div>

            <span className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
              HSK {word.hskLevel}
            </span>
          </div>
        </div>

        {/* QUICK STATS */}

        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">
              HSK Level
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {word.hskLevel}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">
              Radical
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {word.radical || "-"}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">
              Difficulty
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {word.lexicalDifficulty
                ? Number(
                    word.lexicalDifficulty
                  ).toFixed(2)
                : "-"}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">
              Meanings
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {word.meanings?.length || 0}
            </h2>
          </div>
        </div>

        {/* MEANINGS */}

        <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            Meanings
          </h2>

          <div className="grid gap-4">
            {word.meanings?.map(
              (
                meaning: any,
                index: number
              ) => (
                <div
                  key={meaning.id}
                  className="flex items-center gap-4 rounded-xl border p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <div className="text-lg">
                    {meaning.meaning}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* INFO */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            Vocabulary Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500">
                Simplified Chinese
              </p>

              <p className="mt-1 text-xl font-semibold">
                {word.simplified}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Pinyin
              </p>

              <p className="mt-1 text-xl font-semibold">
                {word.pinyin}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Part of Speech
              </p>

              <p className="mt-1 text-xl font-semibold">
                {word.pos || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Radical
              </p>

              <p className="mt-1 text-xl font-semibold">
                {word.radical || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Difficulty
              </p>

              <p className="mt-1 text-xl font-semibold">
                {word.lexicalDifficulty ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Created At
              </p>

              <p className="mt-1 text-xl font-semibold">
                {new Date(
                  word.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}

      {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-3xl rounded-3xl border bg-white p-8 shadow-2xl">

              {/* HEADER */}

              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">
                    Edit Vocabulary
                  </h2>

                  <p className="mt-1 text-zinc-500">
                    Update vocabulary information and learning metadata.
                  </p>
                </div>

                <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                  HSK {editForm.hskLevel}
                </div>
              </div>

              {/* FORM */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    Hanzi
                  </label>

                  <input
                    value={editForm.simplified}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        simplified: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border bg-zinc-50 p-3 transition focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    Pinyin
                  </label>

                  <input
                    value={editForm.pinyin}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        pinyin: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border bg-zinc-50 p-3 transition focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    HSK Level
                  </label>

                  <input
                    type="number"
                    value={editForm.hskLevel}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        hskLevel: Number(
                          e.target.value
                        ),
                      })
                    }
                    className="w-full rounded-xl border bg-zinc-50 p-3 transition focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    Radical
                  </label>

                  <input
                    value={editForm.radical}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        radical: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border bg-zinc-50 p-3 transition focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    Part of Speech
                  </label>

                  <input
                    value={editForm.pos}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        pos: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border bg-zinc-50 p-3 transition focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    Difficulty Score
                  </label>

                  <input
                    value={
                      editForm.lexicalDifficulty
                    }
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        lexicalDifficulty:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-xl border bg-zinc-50 p-3 transition focus:border-black focus:outline-none"
                  />
                </div>

              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex justify-end gap-3 border-t pt-6">

                <button
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  className="rounded-xl border px-6 py-3 font-medium transition hover:bg-zinc-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-zinc-800"
                >
                  Save Changes
                </button>

              </div>

            </div>
          </div>
      )}

      {/* DELETE MODAL */}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-2xl">
            
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-3xl text-red-600">
                  🗑️
                </span>
              </div>
            </div>

            <h2 className="text-center text-2xl font-bold text-zinc-900">
              Delete Vocabulary
            </h2>

            <p className="mt-3 text-center text-zinc-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm text-zinc-500">
                Vocabulary
              </p>

              <p className="mt-1 text-3xl font-bold">
                {word.simplified}
              </p>

              <p className="text-zinc-500">
                {word.pinyin}
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="flex-1 rounded-xl border bg-white py-3 font-medium transition hover:bg-zinc-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}