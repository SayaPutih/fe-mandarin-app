import { api } from "@/lib/axios";
import { CreateTeacherClassRequest } from "@/types/class";

export const createTeacherClass = async (
    data : CreateTeacherClassRequest
)=>{
    const res = await api.post("/teacher/class/create",data)
    return res;
}

export const getTeacherClass = async(
    page : number,
    limit : number,
)=>{
    const res = await api.get(`/teacher/class/get?page=${page}&limit=${limit}`)
    console.log(" -- teacherClass Service -- ")
    console.log(res)
    return res;
}