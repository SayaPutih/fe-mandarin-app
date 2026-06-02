import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full items-center justify-center ">

      <div className="text-center space-y-2">

        <h1 className="text-5xl font-bold">
          404
        </h1>

        <p className="mt-4 text-zinc-500">
          Page not found
        </p>

        <Link href="/home" className="underline mt-4 text-zinc-500 text-xs ">Back to Home</Link>
      </div>

    </div>
  );
}