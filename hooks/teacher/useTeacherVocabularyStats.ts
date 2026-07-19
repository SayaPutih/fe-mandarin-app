import { getTeacherVocabularyStats } from "@/services/teacher/teacher.service";
import {useEffect,useState} from "react";

export function useVocabularyStats(){
    const [loading, setLoading] = useState(true);
    const [countHskTotal, setCountHskTotal] = useState(0);
    const [countMandarin, setCountMandarin] = useState(0);
    const [countMandarinMeaning, setCountMandarinMeaning] = useState(0);

    const fetchData = async()=>{
        try{

            setLoading(true);
            const result = await getTeacherVocabularyStats();
            console.log(result);

            if(!result) return;
            setCountHskTotal(result.data.countHskTotal);
            setCountMandarin(result.data.countMandarin);
            setCountMandarinMeaning(result.data.countMandarinMeaning)

        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return {
        loading,
        countHskTotal,
        countMandarin,
        countMandarinMeaning
    }
}