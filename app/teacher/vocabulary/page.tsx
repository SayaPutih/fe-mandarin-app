"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getAllVocabulary,
  createVocabulary,
} from "@/services/teacher/teacher.service";


export default function VocabularyPage() {
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    const [showModal, setShowModal] =
    useState(false);

    const [form, setForm] = useState({
    simplified: "",
    pinyin: "",
    hskLevel: 1,
    pos: "",
    radical: "",
    lexicalDifficulty: "",
    meanings: [""],
    });

  const fetchWords = async () => {
  const data = await getAllVocabulary(
    page,
    10
  );

  if (data) {
    setWords(data.data);
    setPagination(data.pagination);
  }

  setLoading(false);
};

useEffect(() => {
  fetchWords();
}, [page]);

const handleCreate = async () => {
  try {
    await createVocabulary({
      ...form,
      lexicalDifficulty:
        form.lexicalDifficulty === ""
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

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 p-8 rounded-xl">
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        HSK Vocabulary
      </h1>

      <p className="mt-2 text-zinc-500">
        Explore and monitor Mandarin vocabulary used in the learning system.
      </p>

      <div className="mb-6 flex justify-end">
        <button
            onClick={() =>
            setShowModal(true)
            }
            className="rounded-xl bg-black px-5 py-3 text-white"
        >
            Add Vocabulary
        </button>
        </div>
    </div>

    <div className="mb-8 grid gap-5 md:grid-cols-3">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">
          Total Vocabulary
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {words.length}
        </h2>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">
          HSK Levels
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {
            new Set(
              words.map(
                (word) => word.hskLevel
              )
            ).size
          }
        </h2>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">
          Total Meanings
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {words.reduce(
            (acc, word) =>
              acc +
              (word.meanings?.length || 0),
            0
          )}
        </h2>
      </div>
    </div>

    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
<div className="overflow-x-auto rounded-xl  bg-white p-4">
  <div className="mb-5 flex items-center justify-between gap-4">

  <div className="relative w-3/4  border-black border rounded-md">
    <input
      type="text"
      placeholder="Search Hanzi or Pinyin..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-11 outline-none transition focus:border-black focus:bg-white"
    />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"
      />
    </svg>
  </div>

  <div className="rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-600">
    {words.length} Results
  </div>

</div>
  <table className="w-full table-fixed">
    <thead>
      <tr className="border-b">
        <th className="w-[15%] pb-4 text-left">
          Hanzi
        </th>

        <th className="w-[35%] pb-4 text-left">
          Pinyin
        </th>

        <th className="w-[15%] pb-4 text-left">
          HSK
        </th>

        <th className="w-[15%] pb-4 text-left">
          Meanings
        </th>

        <th className="w-[20%] pb-4 text-left">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      {words
      .filter(
        (word) =>
          word.simplified
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          word.pinyin
            ?.toLowerCase()
            .includes(search.toLowerCase())
      )
      .map((word) => (
        <tr
          key={word.id}
          className="border-b hover:bg-zinc-50"
        >
          <td className="truncate py-4 text-xl font-bold">
            {word.simplified}
          </td>

          <td className="truncate py-4">
            {word.pinyin}
          </td>

          <td className="py-4">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
              HSK {word.hskLevel}
            </span>
          </td>

          <td className="py-4">
            {word.meanings?.length || 0}
          </td>

          <td className="py-4">
            <Link
              href={`/teacher/vocabulary/${word.id}`}
              className="inline-block rounded-lg bg-black px-4 py-2 text-white transition hover:bg-zinc-800"
            >
              Detail
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        <div className="mt-6 flex items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {pagination?.page || 1} of{" "}
            {pagination?.totalPages || 1}
          </span>

          <button
            disabled={
              page >=
              (pagination?.totalPages || 1)
            }
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
{showModal && (

  <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">


    {/* HEADER */}

    <div className="mb-6 flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">
          Add New Vocabulary
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Create a new Mandarin vocabulary entry.
        </p>
      </div>

      <div className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-700">
        NEW WORD
      </div>
    </div>

    {/* FORM */}

    <div className="grid gap-4 md:grid-cols-2">

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Hanzi
        </label>

        <input
          value={form.simplified}
          onChange={(e) =>
            setForm({
              ...form,
              simplified: e.target.value,
            })
          }
          placeholder="你好"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Pinyin
        </label>

        <input
          value={form.pinyin}
          onChange={(e) =>
            setForm({
              ...form,
              pinyin: e.target.value,
            })
          }
          placeholder="nǐ hǎo"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          HSK Level
        </label>

        <input
          type="number"
          min={1}
          max={9}
          value={form.hskLevel}
          onChange={(e) =>
            setForm({
              ...form,
              hskLevel: Number(
                e.target.value
              ),
            })
          }
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Radical
        </label>

        <input
          value={form.radical}
          onChange={(e) =>
            setForm({
              ...form,
              radical: e.target.value,
            })
          }
          placeholder="亻"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Part of Speech
        </label>

        <input
          value={form.pos}
          onChange={(e) =>
            setForm({
              ...form,
              pos: e.target.value,
            })
          }
          placeholder="Noun"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Difficulty Score
        </label>

        <input
          value={form.lexicalDifficulty}
          onChange={(e) =>
            setForm({
              ...form,
              lexicalDifficulty:
                e.target.value,
            })
          }
          placeholder="0.45"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

    </div>

    {/* MEANINGS */}

    <div className="mt-6">

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          Meanings
        </h3>

        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              meanings: [
                ...form.meanings,
                "",
              ],
            })
          }
          className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100"
        >
          + Add Meaning
        </button>
      </div>

      <div className="space-y-2">

        {form.meanings.map(
          (
            meaning: string,
            index: number
          ) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >

              <input
                value={meaning}
                onChange={(e) => {
                  const updated = [
                    ...form.meanings,
                  ];

                  updated[index] =
                    e.target.value;

                  setForm({
                    ...form,
                    meanings:
                      updated,
                  });
                }}
                placeholder={`Meaning ${
                  index + 1
                }`}
                className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
              />

              {form.meanings.length >
                1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated =
                      form.meanings.filter(
                        (
                          _: any,
                          i: number
                        ) =>
                          i !== index
                      );

                    setForm({
                      ...form,
                      meanings:
                        updated,
                    });
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 text-lg font-bold text-red-600 transition hover:bg-red-50"
                >
                  ×
                </button>
              )}

            </div>
          )
        )}

      </div>
    </div>

    {/* ACTIONS */}

    <div className="mt-6 flex justify-end gap-3 border-t border-zinc-200 pt-5">

      <button
        onClick={() =>
          setShowModal(false)
        }
        className="rounded-xl border border-zinc-200 px-5 py-2.5 font-medium transition hover:bg-zinc-100"
      >
        Cancel
      </button>

      <button
        onClick={handleCreate}
        className="rounded-xl bg-black px-5 py-2.5 font-medium text-white transition hover:bg-zinc-800"
      >
        Create Vocabulary
      </button>

    </div>

  </div>
</div>
```

  </div>
)}

    
  </div>
);
}