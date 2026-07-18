//EE
interface Props{
    label : string;
    onClick : ()=>void
}

export const ButtonPrimary = ({
    label,
    onClick 
} : Props)=>{
    return(

        <button
            onClick={() => onClick()}
            className="
              bg-black
              text-white
              rounded-xl
              p-3
              font-medium
              hover:opacity-90
            "
          >
            {label}
          </button>

    )
}

export const ButtonSecondary = ({
    label,
    onClick 
} : Props)=>{
    return(

        <button
            onClick={() => onClick()}
            className="
              border
              rounded-xl
              p-3
              font-medium
              hover:bg-gray-50
            "
          >
            {label}
          </button>

    )
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


export const ButtonSubmit =({
    label,
    onClick 
} : Props )=>{
    return(

        <button 
            onClick={onClick}
            className={`
                px-5 p-2 shadow-md rounded-md text-yellow-100 font-bold
                bg-yellow-500 shadow-yellow-900    
            `}
        >
            {label}
        </button>

    )
}