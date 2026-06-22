"use client";

import { getUserProfile } from "@/services/auth.service";
import { useState,useEffect } from "react";
import { UserProfileType } from "@/types/auth.type";

const ProfileComponent =()=>{

    const[userProfile,setUserProfile] = useState<UserProfileType>();

    const getUser = async ()=>{
        try{

            const res = await getUserProfile();
            console.log(res.data);
            setUserProfile(res.data);

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getUser();
    },[])

    return (
        <section className="w-80 shrink-0">

            <div
                className="
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    border-gray-100
                    shadow-sm
                    h-full
                "
            >

                <div
                    className="
                        h-24
                        bg-gradient-to-r
                        from-black
                        to-gray-900
                    "
                />

                <div className="px-6 pb-6">

                    <div className="flex justify-center -mt-12">

                        <div
                            className="
                                w-24
                                h-24
                                rounded-full
                                border-4
                                bg-black
                                flex
                                items-center
                                justify-center
                                text-3xl
                                font-bold
                                text-white
                                shadow-md
                            "
                        >
                            {userProfile?.name?.charAt(0)}
                        </div>

                    </div>

                    <div className="text-center mt-3">

                        <h2 className="font-bold text-xl">
                            {userProfile?.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {userProfile?.email}
                        </p>

                    </div>

                    <div className="mt-6 space-y-4">

                        <div className="flex flex-row items-center justify-between gap-2 ">
                            <p className="text-xs text-gray-400 uppercase">
                                Full Name
                            </p>

                            <p className="text-x font-xs text-gray-600">
                                {userProfile?.name}
                            </p>
                        </div>

                        <div className="flex flex-row items-center justify-between gap-2 ">
                            <p className="text-xs text-gray-400 uppercase">
                                Email
                            </p>

                            <p className="text-x font-xs text-gray-600 break-all">
                                {userProfile?.email}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ProfileComponent;