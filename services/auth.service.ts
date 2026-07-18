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


export const register = async(
    payload : RegisterRequest
)=>{
    const response = await api.post("auth/register",payload);
    return response.data;
}

export const getUserProfile = async()=>{
    const response = await api.get("auth/Me");
    return response.data;
}


export const getAllUsers = async (
  page = 1,
  limit = 5
) => {
  const response = await api.get(
    `/admin/get-all?page=${page}&limit=${limit}`
  );

  return response.data;
};
export const getUserById = async (id: string) => {
  const response = await api.get(`/admin/get-user-by-id/${id}`);
  return response.data.user;
};

export const createTeacher = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/admin/create-teacher", {
    name,
    email,
    password,
  });

  return response.data.result;
};

export const updateUser = async (
  id: string,
  name: string,
  email: string,
  password?: string
) => {
  const response = await api.put(`/admin/update-user/${id}`, {
    name,
    email,
    password,
  });

  return response.data.result;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/admin/delete-user/${id}`);
  return response.data;
};


