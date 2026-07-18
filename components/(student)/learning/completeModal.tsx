import { ButtonPrimary } from "@/components/ui/Buttons";

const CompleteModal =()=>{
    return(
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Task Completed !
            </h1>
        
            <p className="text-gray-500 mb-6 max-w-md">
                Great job! 
            </p>
        
            <ButtonPrimary
                label="Back To Home"
                onClick={()=>(window.location.href="/student/home")}
            />
        </div>
    )
}

export default CompleteModal;

