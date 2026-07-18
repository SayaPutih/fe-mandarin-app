"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllUsers,
  deleteUser,
} from "@/services/auth.service";

import type {
  User,
} from "@/types/admin";

export function useUsers() {
  const [loading, setLoading] =
    useState(true);

  const [users, setUsers] =
    useState<User[]>([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<User | null>(
    null
  );

  const [
    openEditModal,
    setOpenEditModal,
  ] = useState(false);

  const [
    openTeacherModal,
    setOpenTeacherModal,
  ] = useState(false);

  const [
    deleteUserId,
    setDeleteUserId,
  ] = useState<
    string | null
  >(null);

  const fetchUsers =
    async () => {

      setLoading(true);

      try {
        const data =
          await getAllUsers(
            page
          );

        setUsers(data.users);

        setTotalPages(
          data.totalPages
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const filteredUsers =
    useMemo(() => {
      return users.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [users, search]);

  const confirmDelete =
    async () => {
      if (!deleteUserId)
        return;

      await deleteUser(
        deleteUserId
      );

      setDeleteUserId(
        null
      );

      fetchUsers();
    };

  return {
    loading,

    users,

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
  };
}