"use client";

import MeaningsEditor from "./MeaningsEditor";

import type {
  EditVocabularyForm,
} from "@/types/teacher";

interface EditVocabularyModalProps {
  open: boolean;

  form: EditVocabularyForm;

  setForm: React.Dispatch<
    React.SetStateAction<EditVocabularyForm>
  >;

  onClose: () => void;

  onSave: () => void;
}

export default function EditVocabularyModal({
  open,
  form,
  setForm,
  onClose,
  onSave,
}: EditVocabularyModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">

        <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">

          <div className="mb-8 flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                Edit Vocabulary
              </h2>

              <p className="mt-1 text-zinc-500">
                Update vocabulary information.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border px-4 py-2 hover:bg-zinc-100"
            >
              ✕
            </button>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Hanzi
              </label>

              <input
                value={form.simplified}
                onChange={(e)=>
                  setForm({
                    ...form,
                    simplified:e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Pinyin
              </label>

              <input
                value={form.pinyin}
                onChange={(e)=>
                  setForm({
                    ...form,
                    pinyin:e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                HSK Level
              </label>

              <input
                type="number"
                value={form.hskLevel}
                onChange={(e)=>
                  setForm({
                    ...form,
                    hskLevel:Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Radical
              </label>

              <input
                value={form.radical}
                onChange={(e)=>
                  setForm({
                    ...form,
                    radical:e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Part of Speech
              </label>

              <input
                value={form.pos}
                onChange={(e)=>
                  setForm({
                    ...form,
                    pos:e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Difficulty
              </label>

              <input
                value={form.lexicalDifficulty}
                onChange={(e)=>
                  setForm({
                    ...form,
                    lexicalDifficulty:e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 p-3"
              />
            </div>

            <MeaningsEditor
              form={form}
              setForm={setForm}
            />

          </div>

          <div className="mt-8 flex justify-end gap-3 border-t pt-6">

            <button
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              className="rounded-xl bg-black px-5 py-3 text-white"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}