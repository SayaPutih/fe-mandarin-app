"use client";
import {useState,useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { login } from "@/services/auth.service";
import {ErrorModal} from "@/components/ui/Modals";
import { redirectByRole } from "@/util/auth";

export default function LoginForm(){

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async(
        e : React.FormEvent
    ) =>{
        e.preventDefault();



        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Format email tidak valid");
            return;
        }

        if (password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }


        try{
            console.log(`${email} = ${password}`)
            const res = await login({
                email,
                password
            })

            localStorage.setItem("token",res.token);

            redirectByRole(router);
        }catch(err : any){
            setError(err.message);
        }
    }

    return(
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl absolute">
            <h1 className="text-3xl font-bold">Mandarin </h1>
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
                <p className="mt-2 flex items-center justify-between text-slate-500">
                    <span>No Account?</span>

                    <Link
                        href="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>

            {error && (
                <ErrorModal
                    msg={error}
                    onClick={() => {
                        setError("");
                        //setIsError(false);
                    }}
                />
            )}

        </div>
    )
}