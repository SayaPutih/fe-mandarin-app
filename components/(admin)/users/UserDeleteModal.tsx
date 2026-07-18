interface DeleteUserModalProps {
  open: boolean;

  onClose: () => void;

  onDelete: () => void;
}

export default function DeleteUserModal({
  open,
  onClose,
  onDelete,
}: DeleteUserModalProps) {
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
            onClick={onClose}
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
            onClick={onDelete}
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
  );
}