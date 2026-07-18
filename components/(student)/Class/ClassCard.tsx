"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  User,
} from "lucide-react";

import { StudentClass } from "@/types/student";

interface Props {
  data: StudentClass;
}

export default function ClassCard({
  data,
}: Props) {
  return (
    <Link
      href={`/student/class/${data.id}`}
      className="
        group
        flex
        flex-col
        rounded-[28px]
        border
        border-gray-200
        bg-white
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Icon */}

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">

        <BookOpen
          size={22}
          className="text-gray-700"
        />

      </div>

      {/* Title */}

      <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
        {data.name}
      </h2>

      {/* Description */}

      <p className="mt-2 min-h-[40px] line-clamp-2 text-sm leading-6 text-gray-500">
        {data.description || "No description provided."}
      </p>

      {/* Info */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3">

          <User
            size={16}
            className="text-gray-400"
          />

          <div>

            <p className="text-[11px] uppercase tracking-wide text-gray-400">
              Teacher
            </p>

            <p className="text-sm font-medium">
              {data.teacher.name ?? "Unknown"}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={16}
            className="text-gray-400"
          />

          <div>

            <p className="text-[11px] uppercase tracking-wide text-gray-400">
              Created
            </p>

            <p className="text-sm">
              {new Date(data.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 border-t border-gray-100 pt-4">

        <div className="flex items-center justify-between">

          <span className="text-sm font-medium text-gray-800">
            Open Class
          </span>

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />

        </div>

      </div>

    </Link>
  );
}