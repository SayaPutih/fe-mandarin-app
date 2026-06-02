"use client"

import {useEffect,useState} from "react";
import SidebarItem from "./SidebarItem";
import { DASHBOARD_ROUTES } from "./Sidebar.route";
import { PanelLeftClose,PanelRightClose  } from 'lucide-react';

const Sidebar =()=>{

    const[isOpen,setIsOpen] = useState(true);

    const closeNavBar =()=>{
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    return(
        <aside className={`
            bg-white shadow-black rounded-3xl 
            flex items-center
        `}>
            <button
                onClick={closeNavBar}
                className={` 
                    h-full flex 
                    items-center justify-center p-1 
                     transition-all duration-300
                    ${isOpen ? "rounded-l-3xl bg-black/90" : "rounded-3xl "}
            `}>
            
                {isOpen ? (<PanelLeftClose strokeWidth={1.5} size={30} color="white"/>) : (<PanelRightClose strokeWidth={1.5} size={30}/>)}
            </button>

            
            <div
                className={`
                    self-start
                    overflow-hidden
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
                    <h1 className="font-bold text-2xl p-2">
                        Mandarin LMS
                    </h1>

                    <nav
                        className="flex flex-col p-0 gap-2"
                    >
                        {DASHBOARD_ROUTES.map((a)=>
                            <SidebarItem key={a.label} label={a.label} href={a.href}/>
                        )}
                    </nav>
                </div>
            </div>
            
        </aside>
    )
}

export default Sidebar;