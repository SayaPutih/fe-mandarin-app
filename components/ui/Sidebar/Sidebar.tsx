"use client"

import {useEffect,useState} from "react";
import {useRouter } from "next/navigation";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import LogoWhite from "@/data/img/Logo-White.png";
import LogoBlack from "@/data/img/Logo-Black.png";

import {
    NO_ROUTES,
    TEACHER_ROUTES,
    ADMIN_ROUTES,
} from "./Sidebar.route";
import { getUser } from "@/util/auth";

import { 
    Menu,
    X,
    PanelLeftClose,
    PanelRightClose,
} from "lucide-react";

interface Props{
    isMobile: boolean;
    isOpen : boolean;
    onMenuClick: () => void;
    closeNavBar : ()=>void;
}

const Sidebar =({
    isMobile,
    isOpen,
    onMenuClick,
    closeNavBar,
} : Props)=>{

    const router = useRouter ();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const routes =
    user?.role === "ADMIN"
        ? ADMIN_ROUTES
        : user?.role === "TEACHER"
        ? TEACHER_ROUTES : NO_ROUTES;

    return (
    <>
        {isMobile ? (
            <>
                <aside
                    className={`
                        fixed
                        top-0
                        left-0
                        h-screen
                        w-4/5


                        z-50

                        xrounded-r-xl

                        transition-transform
                        duration-300

                        bg-neutral-950
                      text-white

                        ${
                            isOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                    `}
                >
                    <div className="p-4 flex flex-col justify-between h-full">

                        
                        <nav className="flex flex-col gap-2 self-start">
                             <Image
                                src={LogoWhite}
                                alt="Logo White"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                

                            {routes.map((a) => (
                                <SidebarItem
                                    onClick={closeNavBar}
                                    key={a.label}
                                    label={a.label}
                                    href={a.href}
                                />
                            ))}

                        </nav>

                        <SidebarItem  onClick={handleLogout} label={"Logout"} href={"/login"}/>   
                    </div>

                    
                </aside>
            </>
        ) : (
             <aside
            className={`
                xrounded-3xl
                flex
                items-center
                transition-all
                duration-900

                bg-neutral-950
                text-white

                ${
                isMobile
                    ? `
                        fixed
                        top-2
                        right-2
                        bottom-2
                        z-50
                    `
                    : ""
                }
            `}
            >
            <button
                onClick={closeNavBar}
                className={` 
                    h-full flex 
                    items-center justify-center p-1 
                     transition-all duration-300
                    ${isOpen ? "xrounded-l-3xl bg-black/90" : "xrounded-3xl "}
            `}>
            
                {isOpen ? (<PanelLeftClose strokeWidth={1.5} size={30} color="white"/>) : (<PanelRightClose strokeWidth={1.5} size={30}/>)}
            </button>

            
            <div
                className={`
                    self-start
                    overflow-hidden h-full flex justify-between flex-col
                    transition-all duration-300 
                    ${isOpen ? "max-w-72" : "max-w-0"}
                `}
            >
                <div
                    className={`
                        w-72 p-4 
                        transition-all duration-300 
                        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"} 
                `}>
                    {/* <h1 className="font-bold text-2xl p-2">
                        Mandarin LMS
                    </h1> */}

                    <nav
                        className="flex flex-col p-0 gap-2"
                    >
                        {routes.map((a)=>
                            <SidebarItem  key={a.label} label={a.label} href={a.href}/>
                        )}
                    </nav>

                    
                </div>

                {/* <SidebarItem  onClick={handleLogout} label={"Logout"} href={"/login"}/> */}
            </div>
            
        </aside>
        )}
    </>
);
}

export default Sidebar;