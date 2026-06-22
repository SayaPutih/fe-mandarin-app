import { ButtonPrimary } from "@/components/ui/Buttons";

const NoReviewModal =()=>{
    return(
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6 h-8/12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Nothing to be Reviewed!
            </h1>
        
            <p className="text-gray-500 mb-6 max-w-md">
                Great job! You don't have any flashcards that need review right now.
                Come back later to continue strengthening your memory.
            </p>
        
            <ButtonPrimary
                label="Back To Home"
                onClick={()=>(window.location.href="/home")}
            />
        </div>
    )
}

export default NoReviewModal;

