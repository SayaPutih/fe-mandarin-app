"use client";
import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import { login } from "@/services/auth.service";

export default function LoginForm(){

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async(
        e : React.FormEvent
    ) =>{
        e.preventDefault();

        console.log(`${email} = ${password}`)
        const res = await login({
            email,
            password
        })

        localStorage.setItem("token",res.token);

        // console.log(res.token)
        router.push("/");
    }

    return(
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="text-3xl font-bold">Mandarin  LMS</h1>
            <p className="mt-2 text-slate-500">
                Sign in to continue learning
            </p>

            <form 
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded-lg bg-gray-200 p-3"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="text"
                        className="w-full rounded-lg bg-gray-200 p-3"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full rounded-lg bg-black py-3 text-white"
                >
                    Login
                </button>
            </form>

        </div>
    )
}