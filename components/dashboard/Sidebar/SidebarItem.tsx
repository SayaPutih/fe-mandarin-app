"use client"

import {useEffect,useState} from "react";
import Link from "next/link";

interface Props {
    label : string;
    href : string;
}

const SidebarItem =(
    {
        label,
        href 
    } : Props
)=>{
    return(
        <Link
            href={href}
            className="font-semibold rounded-lg px-2 py-3 hover:bg-zinc-100"
        >
            {label}
        </Link>
    )
}

export default SidebarItem;