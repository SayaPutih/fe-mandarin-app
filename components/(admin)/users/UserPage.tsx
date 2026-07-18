"use client";

import AddTeacherModal from "../user-table/AddTeacherModal";
import EditUserModal from "../user-table/EditUserModal";

import DeleteUserModal from "./UserDeleteModal";
import EmptyUser from "./EmptyUsers";
import UserHeader from "./UserHeader";
import UserPagination from "./UserPagination";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";

import { useUsers } from "@/hooks/useUsers";

export default function UserPage() {
  const {
    loading,
    filteredUsers,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    selectedUser,
    setSelectedUser,
    openEditModal,
    setOpenEditModal,
    openTeacherModal,
    setOpenTeacherModal,
    deleteUserId,
    setDeleteUserId,
    fetchUsers,
    confirmDelete,
  } = useUsers();

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
        onClose={() =>
          setOpenEditModal(false)
        }
        user={selectedUser}
        onSuccess={fetchUsers}
      />

      <div className="space-y-6">
        <UserHeader
          onAddTeacher={() =>
            setOpenTeacherModal(true)
          }
        />

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <UserSearch
            search={search}
            setSearch={setSearch}
          />

          <UserTable
            users={filteredUsers}
            loading={loading}
            onEdit={(user) => {
              setSelectedUser(user);
              setOpenEditModal(true);
            }}
            onDelete={(id) =>
              setDeleteUserId(id)
            }
          />

          {!loading &&
            filteredUsers.length === 0 && (
              <EmptyUser />
            )}

          <UserPagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>

      <DeleteUserModal
        open={!!deleteUserId}
        onClose={() =>
          setDeleteUserId(null)
        }
        onDelete={confirmDelete}
      />
    </>
  );
}