"use client"

import {useEffect,useState} from "react";
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { NavigationBar } from "@/components/ui/Navigation/NavigationBar";
import { getToken } from "@/util/auth";
import Footer from "@/components/footer/footer";
import { getUser } from "@/util/auth";

export default function DashboardLayout({
    children
} : {
    children : React.ReactNode
}){

    const[isOpen,setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const router = useRouter();

    useEffect(()=>{
        const token = getToken();
        if(!token){
            console.log("Token Expired")
            
            router.replace("login")
        }
    },[router]);

    
    useEffect(() => {

        const user = getUser();

        if (!user) {
            router.replace("/auth/login");
            return;
        }

        const allowedRoles = ["TEACHER", "ADMIN"];

        if (!allowedRoles.includes(user.role)) {
            router.replace("/home");
        }
        
    }, [router]);

    const closeNavBar =()=>{
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    useEffect(() => {
        
        const checkScreen = () => {

            const mobile = window.innerWidth < 768;

            setIsMobile(mobile);

            if (mobile) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }

        };

        checkScreen();

        window.addEventListener(
            "resize",
            checkScreen
        );

        return () =>
            window.removeEventListener(
            "resize",
            checkScreen
        );

    }, []);


    return (
    <>
        {isMobile && isOpen && (
                <div
                    onClick={closeNavBar}
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        z-40
                    "
                />
        )}


        <main className="h-screen flex flex-col bg-gray-200 overflow-hidden">

            <div
                className={`
                    h-15
                    shrink-0
                    border-gray-300
                    bg-white
                    transition-all
                    duration-300
                    ${isMobile && isOpen ? "opacity-50 blur-[2px]" : ""}
                `}
            >
                <NavigationBar
                    isMobile={isMobile}
                    onMenuClick={closeNavBar}
                />
            </div>

            <div className="flex flex-1 flex-row overflow-hidden">

                <Sidebar
                    isMobile={isMobile}
                    isOpen={isOpen}
                    onMenuClick={closeNavBar}
                    closeNavBar={closeNavBar}
                />

                <section className="flex-1 overflow-y-auto flex-col flex">
                    <div className="p-6">
                        {children}
                    </div>

                   
                    
                </section>

                 
            </div>
        </main>
    </>
);
}
