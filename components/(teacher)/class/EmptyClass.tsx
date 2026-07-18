interface EmptyClassProps {
    onCreate: () => void;
}

export default function EmptyClass({
    onCreate,
}: EmptyClassProps) {
    return (
        <div className="rounded-xl border border-dashed py-16 text-center">
            <h3 className="text-xl font-semibold">
                No classes yet
            </h3>

            <p className="mt-2 text-gray-500">
                Create your first class to start teaching.
            </p>

            <button
                onClick={onCreate}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
                Create Class
            </button>
        </div>
    );
}