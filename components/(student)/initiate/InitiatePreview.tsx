"use client";

import { useEffect, useState } from "react";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { InitiatePreviewModal } from "@/components/ui//Modals";

interface Props {
    onClick : ()=>void;
}

export default function InitiatePreview({
    onClick 
} : Props ) {
    
    return (
        <section
            className="
                flex flex-col flex-1
                items-center justify-start
                font-sans
                bg-white
                h-full
                relative
                py-4
                space-y-4
                w-full
                rounded-3xl
            "
        >
            <InitiatePreviewModal onFinish={onClick} />
            
        </section>
    );
}