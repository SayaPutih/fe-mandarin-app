import type {
  EditVocabularyForm,
} from "@/types/teacher";

interface MeaningsEditorProps {
  form: EditVocabularyForm;

  setForm: React.Dispatch<
    React.SetStateAction<EditVocabularyForm>
  >;
}

export default function MeaningsEditor({
  form,
  setForm,
}: MeaningsEditorProps) {
  return (
    <div className="md:col-span-2">

      <label className="mb-2 block text-sm font-medium text-zinc-600">
        Meanings
      </label>

      <div className="space-y-3">

        {form.meanings.map(
          (meaning, index) => (
            <div
              key={index}
              className="flex gap-2"
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
                className="flex-1 rounded-xl border bg-zinc-50 p-3 transition focus:border-black focus:outline-none"
              />

              <button
                type="button"
                onClick={() => {
                  const updated =
                    form.meanings.filter(
                      (_, i) =>
                        i !== index
                    );

                  setForm({
                    ...form,
                    meanings:
                      updated.length > 0
                        ? updated
                        : [""],
                  });
                }}
                className="rounded-xl border px-4 hover:bg-red-100"
              >
                ✕
              </button>

            </div>
          )
        )}

      </div>

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
        className="mt-3 rounded-xl border px-4 py-2 hover:bg-zinc-100"
      >
        + Add Meaning
      </button>

    </div>
  );
}