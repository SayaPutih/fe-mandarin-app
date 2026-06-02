interface Props{
    label : string;
    onClick : ()=>void
}

export const ButtonNext =({
    label,
    onClick 
} : Props )=>{
    return(

        <button 
            onClick={onClick}
            className={`
                px-5 p-2 shadow-md rounded-md
                bg-green-500 shadow-green-900    
            `}
        >
            {label}
        </button>

    )
}