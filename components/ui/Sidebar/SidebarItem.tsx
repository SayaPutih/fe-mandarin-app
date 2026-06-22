"use client"

import {useEffect,useState} from "react";
import Link from "next/link";

interface Props {
    label : string;
    href : string;
    onClick? : ()=>void;
}

const SidebarItem =(
    {
        label,
        href,
        onClick,
    } : Props
)=>{
    return(
        <Link
            onClick={onClick}
            href={href}
            className="font-semibold rounded-lg px-2 py-3 hover:text-black hover:bg-zinc-100"
        >
            {label}
        </Link>
    )
}

export default SidebarItem;