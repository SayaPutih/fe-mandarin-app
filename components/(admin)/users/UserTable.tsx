"use client";

import UserTableLoading from "./UserTableLoading";

import type { User } from "@/types/admin";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">

        <thead>
          <tr className="border-b border-zinc-700 text-zinc-400">
            <th className="py-3 text-left">
              Name
            </th>

            <th className="py-3 text-left">
              Email
            </th>

            <th className="py-3 text-left">
              Role
            </th>

            <th className="py-3 text-left">
              Created At
            </th>

            <th className="py-3 text-right">
              Action
            </th>
          </tr>
        </thead>

        {loading ? (
          <UserTableLoading />
        ) : (
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-zinc-800"
              >
                <td className="py-4 text-white">
                  {user.name}
                </td>

                <td className="py-4 text-zinc-300">
                  {user.email}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      user.role === "ADMIN"
                        ? "bg-red-500/20 text-red-400"
                        : user.role === "TEACHER"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="py-4 text-zinc-400">
                  {user.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="py-4 text-right">
                  <button
                    onClick={() =>
                      onEdit(user)
                    }
                    className="
                      mr-2
                      rounded-lg
                      bg-amber-600
                      px-3
                      py-1
                      text-sm
                      text-white
                      hover:bg-amber-700
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(user.id)
                    }
                    className="
                      rounded-lg
                      bg-red-600
                      px-3
                      py-1
                      text-sm
                      text-white
                      hover:bg-red-700
                    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}

      </table>
    </div>
  );
}