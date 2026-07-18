interface UserHeaderProps {
  onAddTeacher: () => void;
}

export default function UserHeader({
  onAddTeacher,
}: UserHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-gray-800">
        Users
      </h1>

      <button
        onClick={onAddTeacher}
        className="
          rounded-lg
          bg-blue-600
          px-5
          py-2
          text-white
          transition
          hover:bg-blue-700
        "
      >
        Add Teacher
      </button>
    </div>
  );
}