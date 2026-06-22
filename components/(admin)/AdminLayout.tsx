"use client";

import { getUser } from "@/util/auth";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children
} : {
    children : React.ReactNode
}){
    const router = useRouter();

    useEffect(() => {

        const user = getUser();

        if (!user) {
            router.replace("/login");
            return;
        }

        if (
            user.role !== "ADMIN"
        ) {
            router.replace("/(dasboard)/home");
        }

    }, [router]);


    return(
        <section>
            Admin Layout 
            {children}
        </section>
    )
}