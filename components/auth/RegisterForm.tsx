"use client";
import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import { register } from "@/services/auth.service";
import {ErrorModal} from "@/components/ui/Modals";
import Link from "next/link";

export default function RegisterForm(){

    const router = useRouter();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async(
        e : React.FormEvent
    ) =>{
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Semua field harus diisi");
            return;
        }

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
            const res = await register({
                name,
                email,
                password
            })

            // console.log(res.token)
            router.push("/login");
        }catch(err : any){
            setError(err.message);
        }
    }

    return(
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl absolute">
            <h1 className="text-3xl font-bold">Mandarin  LMS</h1>
            <p className="mt-2 text-slate-500">
                Sign in to continue learning
            </p>

            <form 
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded-lg bg-gray-200 p-3"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>

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
                    Register
                </button>
                <p className="mt-2 flex items-center justify-between text-slate-500">
                    <span>Have an Account?</span>
                
                    <Link
                        href="/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Login
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