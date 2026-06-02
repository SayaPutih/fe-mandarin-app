import { api } from "@/lib/axios";

import {
    LoginRequest,
    RegisterRequest
} from "@/types/auth.type";

export const login = async(
    payload : LoginRequest
)=>{
    const response = await api.post("auth/login",payload);
    return response.data;
}