"use client";

import { useEffect, useState } from "react";
import { updateUser } from "@/services/auth.service";

interface Props {
  open: boolean;
  onClose: () => void;
  user: any;
  onSuccess: () => void;
}

export default function EditUserModal({
  open,
  onClose,
  user,
  onSuccess,
}: Props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  useEffect(() => {

    if (!user) return;

    setName(user.name || "");
    setEmail(user.email || "");
    setPassword("");

  }, [user]);

  const handleSubmit = async () => {

    await updateUser(
      user.id,
      name,
      email,
      password
    );

    onSuccess();
    onClose();
  };

  if (!open || !user) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
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
          bg-zinc-900
          p-6
          shadow-2xl
        "
      >

        <h2 className="text-2xl font-bold text-white">
          Update User
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Update user information.
        </p>

        <div className="mt-6 space-y-4">

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-zinc-300
              "
            >
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
                outline-none
                focus:border-zinc-500
              "
            />
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-zinc-300
              "
            >
              Email
            </label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
                outline-none
                focus:border-zinc-500
              "
            />
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-zinc-300
              "
            >
              New Password
            </label>

            <input
              type="password"
              placeholder="Leave empty to keep current password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
                outline-none
                focus:border-zinc-500
              "
            />
          </div>

        </div>

        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >

          <button
            onClick={onClose}
            className="
              rounded-lg
              bg-zinc-700
              px-4
              py-2
              text-white
              hover:bg-zinc-600
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              rounded-lg
              bg-white
              px-4
              py-2
              text-black
              hover:bg-zinc-200
            "
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}