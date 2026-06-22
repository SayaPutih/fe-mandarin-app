"use client";

import { LogOut, User, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { isTeacher } from "@/util/auth";
import { useState,useEffect } from "react";
import Image from "next/image";
import LogoWhite from "@/data/img/Logo-White.png";
import LogoBlack from "@/data/img/Logo-Black.png";

interface NavigationBarProps {
    isMobile: boolean;
    onMenuClick: () => void;
}

export const NavigationBar = ({
    isMobile,
    onMenuClick,
}: NavigationBarProps) => {

    const router = useRouter();

    const [isRoleTeacher ,setIsRoleTeacher] = useState(false);

    const getRole =()=>{
        const res = isTeacher()
        console.log(res);
        setIsRoleTeacher(res);
    }

    useEffect(()=>{
        getRole();
    },[])
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/login");
    };

    return (
        <nav className="h-full px-2 md:px-3 flex items-center justify-between bg-white">

            {/* Left */}
            <div className="flex items-center gap-3">

                {isMobile && isRoleTeacher && (
                    <button
                        onClick={onMenuClick}
                        className="
                            p-2
                            rounded-lg
                            xborder
                            hover:bg-gray-100
                            transition
                        "
                    >
                        <Menu size={20} />
                    </button>
                )}

                {!isMobile && (
                    <Image
                        src={LogoBlack}
                        alt="Logo Black"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                )}
            </div>
            
            <div className="flex items-center gap-3">

                <button
                    onClick={handleLogout}
                    className="
                        flex items-center gap-2
                        border rounded-lg
                        px-4 py-2
                        hover:bg-gray-100
                        transition
                    "
                >
                    <LogOut size={18} />
                    {!isMobile && ""}
                </button>

            </div>

        </nav>
    );
};