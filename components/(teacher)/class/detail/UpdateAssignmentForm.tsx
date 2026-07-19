"use client";

import TeacherButton from "@/components/ui/TeacherButton";
import {
  FormField,
  AreaField,
} from "@/components/ui/form/FormField";

interface Props {
  title: string;
  setTitle: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  dueDate: Date | null;
  setDueDate: (value: Date | null) => void;

  hanzi: string;
  setHanzi: (value: string) => void;

  pinyin: string;
  setPinyin: (value: string) => void;

  meaning: string;
  setMeaning: (value: string) => void;

  hskLevel?: number;
  setHskLevel: (value?: number) => void;

  onSearch: () => void;
}

export default function UpdateAssignmentForm({
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
    <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5">

      <FormField
        label="Assignment Title"
        value={title}
        placeholder="Enter assignment title..."
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <AreaField
        label="Assignment Description"
        rows={4}
        value={description}
        placeholder="Enter assignment description..."
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="resize-none"
      />

      <FormField
        label="Due Date"
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
      />

      <div className="grid gap-4 md:grid-cols-2">

        <FormField
          label="Hanzi"
          value={hanzi}
          placeholder="例如: 老师"
          onChange={(e) =>
            setHanzi(e.target.value)
          }
        />

        <FormField
          label="Pinyin"
          value={pinyin}
          placeholder="laoshi"
          onChange={(e) =>
            setPinyin(e.target.value)
          }
        />

        <FormField
          label="Meaning"
          value={meaning}
          placeholder="teacher"
          onChange={(e) =>
            setMeaning(e.target.value)
          }
        />

        <div>

          <label className="mb-2 block text-xs sm:text-sm sm:font-medium">
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
            className="
              w-full
              rounded-xl
              border
              border-zinc-200
              bg-zinc-50
              px-4
              py-3
              outline-none
              transition
              focus:border-black
              focus:bg-white
            "
          >

            <option value="">
              All Levels
            </option>

            {[1,2,3,4,5,6,7,8,9].map(
              (level) => (
                <option
                  key={level}
                  value={level}
                >
                  HSK {level}
                </option>
              )
            )}

          </select>

        </div>

      </div>

      <div className="flex justify-end">

        <TeacherButton
          label="Search Vocabulary"
          variant="blue"
          onClick={onSearch}
        />

      </div>

    </div>
  );
}