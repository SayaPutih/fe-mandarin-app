"use client";

import {useEffect,useState} from "react";
import { createTeacherClass,getTeacherClass  } from "@/services/teacher/teacherClass.service";
import { CreateTeacherClassRequest,TeacherClass } from "@/types/class";

export function useCreateTeacherClass(){
    const [loading,setLoading] = useState(false);
    const handleCreateClass = async(data : CreateTeacherClassRequest)=>{
        console.log(" -- useTeacherClass Hook -- ");
        try{

            setLoading(true);
             await createTeacherClass(data);

        }catch(err){
            console.log(" -- useTeacherClass Hook Error -- ");
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    return {
        loading,
        handleCreateClass
    }
}


export function useGetTeacherClass(
  initialPage = 1,
  initialLimit = 10
) {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (
    currentPage = page
  ) => {
    try {
      setLoading(true);

      const res = await getTeacherClass(
        currentPage,
        limit
      );

      setClasses(res.data.result.classes);
      setTotalPages(res.data.result.pagination.totalPages);

    } catch (err) {
      console.log("-- useGetTeacherClass --");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return {
    loading,
    classes,
    page,
    totalPages,
    setPage,
    refresh: fetchData,
  };
}