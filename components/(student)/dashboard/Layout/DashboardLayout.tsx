"use client"

import {useEffect,useState} from "react";
import { getNotification } from "@/services/notification/notification.service";
import {NewUserNotificationModal,ReviewNotificationModal} from "@/components/ui/NotificationModal";
import { Notification } from "@/types/notification.type";
import { useRouter } from "next/navigation";
import { NavigationBar } from "@/components/ui/Navigation/NavigationBar";
import { getToken } from "@/util/auth";
import Footer from "@/components/footer/footer";

export default function DashboardLayout({
    children
} : {
    children : React.ReactNode
}){

    const[isOpen,setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const[hasNotification,setHasNotification] = useState(true);
    const[notificationContent,setNotificationContent] = useState<Notification | null>(null);
    const[reviewNotification,setReviewNotification] = useState(false);
    //const[loginExpired,setLoginExpired] = useState(false);
    
    const router = useRouter();
    //const router = useRouter();

    useEffect(()=>{
        const token = getToken();
        if(!token){
            console.log("Token Expired")
            
            router.replace("login")
        }
    },[router]);

    const closeNavBar =()=>{
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    const closeReview = () => {

        setReviewNotification(false);

        router.push("/review");
    };

    const fetchNotification = async ()=>{
        const res = await getNotification();
        console.log("Notification");
        console.log(res);
        setNotificationContent(res.data);
        setHasNotification(res.data.isNotif);

        if(res.data.type === 0){
            setReviewNotification(true);
        }

    }

    useEffect(()=>{
        fetchNotification();
    },[]);

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
        {hasNotification && notificationContent && (
            <>
                {notificationContent?.type === 1 ? (
                    <NewUserNotificationModal
                        label={notificationContent?.title ?? ""}
                        message={notificationContent?.message ?? ""}
                        btnLabel={notificationContent?.label ?? ""}
                        onClick={() => router.push("/initiate")}
                    />
                ) : (
                    reviewNotification && (
                        <ReviewNotificationModal
                            label={notificationContent?.title ?? ""}
                            message={notificationContent?.message ?? ""}
                            btnLabel={notificationContent?.label ?? ""}
                            onClick={() => closeReview()}
                        />
                    )
                )}
            </>
        )}

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


        <main className="min-h-screen bg-gray-200">

            <header
                className="
                    sticky
                    top-0
                    z-50
                    bg-white
                    p-4
                "
            >
                <NavigationBar
                    isMobile={isMobile}
                    onMenuClick={closeNavBar}
                />
            </header>

            <section className="overflow-y-auto">
                <div className="p-6 sm:mx-20 min-h-[calc(90vh-64px)]">
                    {children}
                </div>

                <Footer />
            </section>

        </main>
    </>
);
}