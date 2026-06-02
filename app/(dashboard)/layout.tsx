"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {redirect} from "next/navigation";
//import {cookies} from "next/headers";
import DashboardLayout from "@/components/dashboard/Layout/DashboardLayout";

export default function DashboardLoayout({
    children,
} : {
    children : React.ReactNode;
}){

    const router = useRouter();
    
    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(!token){
            router.replace("/login");
        }
    },[router])

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )

}