"use client";

import { BookOpen } from "lucide-react";

export default function EmptyClass() {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center rounded-[28px] border border-gray-200 bg-white p-8 text-center">

      <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-2xl bg-gray-50">
        <BookOpen
          size={32}
          className="text-gray-700"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        No Classes Found
      </h2>

      <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
        You haven't joined any Mandarin classes yet.
        Once your teacher enrolls you, your classes will appear here and
        you'll be able to start learning.
      </p>

      <div className="mt-8 rounded-xl bg-gray-50 px-5 py-3">

        <p className="text-xs text-gray-500">
          Waiting for an invitation
        </p>

        <p className="mt-1 text-base font-semibold text-gray-900">
          📚 Ready to Learn
        </p>

      </div>

    </div>
  );
}