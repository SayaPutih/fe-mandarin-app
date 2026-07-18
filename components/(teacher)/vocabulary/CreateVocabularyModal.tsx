"use client";

import type {
  VocabularyForm,
} from "@/types/teacher";

interface Props {
  open: boolean;

  onClose: () => void;

  onCreate: () => void;

  form: VocabularyForm;

  setForm: React.Dispatch<
    React.SetStateAction<VocabularyForm>
  >;
}

export default function CreateVocabularyModal({
  open,
  onClose,
  onCreate,
  form,
  setForm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">

          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Add New Vocabulary
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Create a new Mandarin vocabulary entry.
              </p>
            </div>

            <div className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold">
              NEW WORD
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

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
                className="w-full rounded-xl border bg-zinc-50 px-4 py-3"
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
                className="w-full rounded-xl border bg-zinc-50 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                HSK Level
              </label>

              <input
                type="number"
                min={1}
                max={9}
                value={form.hskLevel}
                onChange={(e)=>
                  setForm({
                    ...form,
                    hskLevel:Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 px-4 py-3"
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
                className="w-full rounded-xl border bg-zinc-50 px-4 py-3"
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
                className="w-full rounded-xl border bg-zinc-50 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Difficulty Score
              </label>

              <input
                value={form.lexicalDifficulty}
                onChange={(e)=>
                  setForm({
                    ...form,
                    lexicalDifficulty:e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-zinc-50 px-4 py-3"
              />
            </div>

          </div>

          <div className="mt-6">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="text-lg font-semibold">
                Meanings
              </h3>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    meanings:[
                      ...form.meanings,
                      "",
                    ],
                  })
                }
                className="rounded-xl border px-4 py-2"
              >
                + Add Meaning
              </button>

            </div>

            <div className="space-y-2">

              {form.meanings.map((meaning,index)=>(
                <div
                  key={index}
                  className="flex gap-2"
                >

                  <input
                    value={meaning}
                    onChange={(e)=>{

                      const updated=[
                        ...form.meanings,
                      ];

                      updated[index]=
                        e.target.value;

                      setForm({
                        ...form,
                        meanings:updated,
                      });

                    }}
                    className="flex-1 rounded-xl border bg-zinc-50 px-4 py-3"
                  />

                  {form.meanings.length>1 && (

                    <button
                      type="button"
                      onClick={()=>{

                        setForm({
                          ...form,
                          meanings:
                          form.meanings.filter(
                            (_,i)=>i!==index
                          ),
                        });

                      }}
                      className="w-12 rounded-xl border text-red-600"
                    >
                      ×
                    </button>

                  )}

                </div>
              ))}

            </div>

          </div>

          <div className="mt-6 flex justify-end gap-3 border-t pt-5">

            <button
              onClick={onClose}
              className="rounded-xl border px-5 py-2"
            >
              Cancel
            </button>

            <button
              onClick={onCreate}
              className="rounded-xl bg-black px-5 py-2 text-white"
            >
              Create Vocabulary
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}