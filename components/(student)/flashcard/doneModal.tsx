import { ButtonPrimary } from "@/components/ui/Buttons";

interface Props{
    btnLabel : string;
    onClick : ()=>void;
}

const DoneModal =({
    btnLabel,
    onClick
} : Props)=>{
    return (
        <div
            className="
                flex flex-col
                items-center
                justify-center
                gap-4
            "
        >
            <h1 className="text-3xl font-bold">
                🎉 Review
                Complete
            </h1>

            <p className="text-gray-500">
                All scheduled
                reviews have
                been completed.
            </p>

            <ButtonPrimary label={btnLabel}  onClick={onClick} />
        </div>
    )
}

export default DoneModal;