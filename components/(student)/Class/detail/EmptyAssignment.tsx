"use client";

import { BookOpen } from "lucide-react";

export default function EmptyAssignment(){

    return(

        <div className="rounded-3xl border border-gray-200 bg-white py-20 text-center">

            <BookOpen
                size={42}
                className="mx-auto text-gray-400"
            />

            <h2 className="mt-6 text-2xl font-bold">
                No Assignments
            </h2>

            <p className="mt-2 text-gray-500">
                Your teacher hasn't created any assignments yet.
            </p>

        </div>

    )

}