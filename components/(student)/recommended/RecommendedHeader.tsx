"use client";

import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecommendedHeader() {
    const router = useRouter();

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles
                        size={18}
                        className="text-zinc-700"
                    />

                    <h2 className="text-2xl font-bold">
                        Recommended Words
                    </h2>
                </div>

                <button
                    onClick={() =>
                        router.push("/student/home")
                    }
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-100"
                >
                    ← Back
                </button>
            </div>

            <p className="mt-1 text-sm text-zinc-500">
                Vocabulary that may need your attention.
            </p>

            <div className="mt-4 h-px w-full bg-zinc-200" />
        </div>
    );
}