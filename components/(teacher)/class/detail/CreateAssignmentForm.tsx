"use client";

interface Props {
  title: string;
  setTitle: (
    value: string
  ) => void;

  description: string;
  setDescription: (
    value: string
  ) => void;

  dueDate: Date | null;
  setDueDate: (
    value: Date | null
  ) => void;

  hanzi: string;
  setHanzi: (
    value: string
  ) => void;

  pinyin: string;
  setPinyin: (
    value: string
  ) => void;

  meaning: string;
  setMeaning: (
    value: string
  ) => void;

  hskLevel?: number;
  setHskLevel: (
    value?: number
  ) => void;

  onSearch: () => void;
}

export default function CreateAssignmentForm({
  title,
  setTitle,

  description,
  setDescription,

  dueDate,
  setDueDate,

  hanzi,
  setHanzi,

  pinyin,
  setPinyin,

  meaning,
  setMeaning,

  hskLevel,
  setHskLevel,

  onSearch,
}: Props) {

  return (

    <div className="space-y-5 rounded-xl border bg-white p-5">

      <div>

        <label className="mb-2 block text-sm font-medium">
          Assignment Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter assignment title..."
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Assignment Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Enter assignment description..."
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500 resize-none"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Due Date
        </label>

        <input
          type="datetime-local"
          value={
            dueDate
              ? new Date(
                  dueDate.getTime() -
                    dueDate.getTimezoneOffset() *
                      60000
                )
                  .toISOString()
                  .slice(0, 16)
              : ""
          }
          onChange={(e) =>
            setDueDate(
              e.target.value
                ? new Date(e.target.value)
                : null
            )
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />

      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Hanzi
          </label>

          <input
            value={hanzi}
            onChange={(e) =>
              setHanzi(e.target.value)
            }
            placeholder="例如: 老师"
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Pinyin
          </label>

          <input
            value={pinyin}
            onChange={(e) =>
              setPinyin(e.target.value)
            }
            placeholder="laoshi"
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Meaning
          </label>

          <input
            value={meaning}
            onChange={(e) =>
              setMeaning(e.target.value)
            }
            placeholder="teacher"
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            HSK Level
          </label>

          <select
            value={hskLevel ?? ""}
            onChange={(e) =>
              setHskLevel(
                e.target.value
                  ? Number(e.target.value)
                  : undefined
              )
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          >
            <option value="">
              All Levels
            </option>

            {[1, 2, 3, 4, 5, 6].map((level) => (
              <option
                key={level}
                value={level}
              >
                HSK {level}
              </option>
            ))}

          </select>

        </div>

      </div>

      <div className="flex justify-end">

        <button
          type="button"
          onClick={onSearch}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>

      </div>

    </div>

  );

}