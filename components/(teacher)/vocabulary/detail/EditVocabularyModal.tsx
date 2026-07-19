//EE 3
"use client";

import TeacherButton from "@/components/ui/TeacherButton";
import { FormField, NumberField } from "@/components/ui/form/FormField";
import type { EditVocabularyForm } from "@/types/teacher";
import { Trash } from "lucide-react";

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
        <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">

          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Edit Vocabulary
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Update an existing Mandarin vocabulary entry.
              </p>
            </div>

            <div className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold">
              EDIT
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <FormField
              label="Hanzi"
              value={form.simplified}
              onChange={(e) =>
                setForm({
                  ...form,
                  simplified: e.target.value,
                })
              }
            />

            <FormField
              label="Pinyin"
              value={form.pinyin}
              onChange={(e) =>
                setForm({
                  ...form,
                  pinyin: e.target.value,
                })
              }
            />

            <div className="grid grid-cols-4 flex-1 items-center justify-center w-full col-span-2 gap-2">

              <NumberField
                label="HSK Level"
                min={1}
                max={9}
                value={form.hskLevel}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hskLevel: Number(e.target.value),
                  })
                }
              />

              <FormField
                label="Radical"
                value={form.radical}
                onChange={(e) =>
                  setForm({
                    ...form,
                    radical: e.target.value,
                  })
                }
              />

              <FormField
                label="POS"
                value={form.pos}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pos: e.target.value,
                  })
                }
              />

              <FormField
                label="Difficulty"
                value={form.lexicalDifficulty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lexicalDifficulty: e.target.value,
                  })
                }
              />

            </div>

          </div>

          <div className="mt-6">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Meanings
              </h3>

              <TeacherButton
                variant="gray"
                onClick={() =>
                  setForm({
                    ...form,
                    meanings: [
                      ...form.meanings,
                      "",
                    ],
                  })
                }
                label="+ Add Meaning"
              />
            </div>

            <div className="space-y-2">

              {form.meanings.map((meaning, index) => (
                <div
                  key={index}
                  className="flex w-full gap-2"
                >

                  <FormField
                    value={meaning}
                    onChange={(e) => {

                      const updated = [
                        ...form.meanings,
                      ];

                      updated[index] = e.target.value;

                      setForm({
                        ...form,
                        meanings: updated,
                      });

                    }}
                    wrapperClassName="flex-1"
                    className="w-full flex-1"
                  />

                  {form.meanings.length > 1 && (
                    <TeacherButton
                      icon={<Trash size={18} />}
                      onClick={() => {
                        setForm({
                          ...form,
                          meanings:
                            form.meanings.filter(
                              (_, i) => i !== index
                            ),
                        });
                      }}
                      variant="red"
                    />
                  )}

                </div>
              ))}

            </div>

          </div>

          <div className="mt-6 flex justify-end gap-3 pt-5">

            <TeacherButton
              onClick={onClose}
              label="Cancel"
              variant="red"
            />

            <TeacherButton
              label="Save Changes"
              variant="green"
              onClick={onSave}
            />

          </div>

        </div>
      </div>
    </div>
  );
}