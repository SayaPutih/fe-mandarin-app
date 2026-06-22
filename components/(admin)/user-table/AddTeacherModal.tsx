"use client";

import { useState } from "react";
import { createTeacher } from "@/services/auth.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTeacherModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSubmit = async () => {
    await createTeacher(
      name,
      email,
      password
    );

    setName("");
    setEmail("");
    setPassword("");

    onSuccess();
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          border
          border-zinc-700
          bg-black
          p-6
          shadow-2xl
        "
      >
        <h2 className="text-2xl font-bold text-white">
          Add Teacher
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Create a new teacher account
        </p>

        <div className="mt-6 space-y-4">

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="John Doe"
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="teacher@gmail.com"
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
              "
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              rounded-lg
              bg-gray-500
              px-4
              py-2
              text-white
              hover:bg-black
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              rounded-lg
              bg-gray-500
              px-4
              py-2
              text-white
              hover:bg-black
            "
          >
            Create Teacher
          </button>

        </div>
      </div>
    </div>
  );
}