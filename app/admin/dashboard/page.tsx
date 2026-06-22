"use client";

import { useEffect, useState } from "react";

import {
  getAllUsers,
  deleteUser,
} from "@/services/auth.service";
import EditUserModal from "@/components/(admin)/user-table/EditUserModal";
import AddTeacherModal from "@/components/(admin)/user-table/AddTeacherModal";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openEditModal, setOpenEditModal] =
    useState(false);
  const [openTeacherModal, setOpenTeacherModal] =
    useState(false);

  const [deleteUserId, setDeleteUserId] =
    useState<string | null>(null);

  const fetchUsers = async () => {
    const data = await getAllUsers(page);

    setUsers(data.users);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = async () => {

    if (!deleteUserId) return;

    await deleteUser(deleteUserId);

    setDeleteUserId(null);

    fetchUsers();
  };

  return (
    <>
      <AddTeacherModal
        open={openTeacherModal}
        onClose={() =>
          setOpenTeacherModal(false)
        }
        onSuccess={fetchUsers}
      />
      <EditUserModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        user={selectedUser}
        onSuccess={fetchUsers}
      />

      <div className="space-y-6">

        <div className="flex items-center justify-between ">
          <h1 className="text-4xl font-bold text-gray-800">
            Users
          </h1>

          <button
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            onClick={() =>
              setOpenTeacherModal(true)
            }
          >
            Add Teacher
          </button>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="mb-5">
            <input
              placeholder="Search user..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

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

              <tbody>
                {filteredUsers.map((user: any) => (
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
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenEditModal(true);
                        }}
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
                          setDeleteUserId(user.id)
                        }
                        className="
                          rounded
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

            </table>
            <div className="mt-6 flex justify-center gap-3">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
              className="
                rounded-lg
                bg-zinc-800
                px-4
                py-2
                text-white
                disabled:opacity-40
              "
            >
              Previous
            </button>

            <div className="flex items-center text-white">
              {page} / {totalPages}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage(page + 1)
              }
              className="
                rounded-lg
                bg-zinc-800
                px-4
                py-2
                text-white
                disabled:opacity-40
              "
            >
              Next
            </button>

          </div>
          </div>
        </div>
      </div>

      {
        deleteUserId && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/60
            "
          >

            <div
              className="
                w-full
                max-w-md
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                p-6
              "
            >

              <h2 className="text-xl font-bold text-white">
                Delete User
              </h2>

              <p className="mt-3 text-zinc-400">
                Are you sure you want to delete
                this user?
              </p>

              <div className="mt-6 flex justify-end gap-3">

                <button
                  onClick={() =>
                    setDeleteUserId(null)
                  }
                  className="
                    rounded-lg
                    bg-zinc-700
                    px-4
                    py-2
                    text-white
                  "
                >
                  No
                </button>

                <button
                  onClick={confirmDelete}
                  className="
                    rounded-lg
                    bg-red-600
                    px-4
                    py-2
                    text-white
                  "
                >
                  Yes
                </button>

              </div>

            </div>

          </div>
        )
      }


    </>
  );
}