"use client";

//import { cookies } from "next/headers";
import {useRouter} from "next/navigation";
import { useState,useEffect } from "react";

export default function Home() {

  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;


  const [token, setToken] = useState("");
  
    useEffect(() => {
      const storedToken = window.localStorage.getItem("token");
  
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);

    
  const router = useRouter();
  const checkAuth =()=>{
    
    router.push("/(dashboard)/home")
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white  sm:items-start">
        <div className="font-bold text-2xl underline">Hello World</div>
        <div className="font-bold text-xs underline break-all">{token ?? "Nothing"}</div>
        <button className="underline text-lg font-bold self-end" onClick={checkAuth} >Check Auth</button>
      </main>
    </div>
  );
}
