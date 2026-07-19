//EE 2
interface InputProps 
    extends React.InputHTMLAttributes<HTMLInputElement>{}

export default function Input({
    className="",
    ...props
} : InputProps){
    return(
        <input
            {...props}
            className={`
                w-full
                rounded-xl
                border
                border-zinc-200
                bg-zinc-50
                px-4
                py-3
                outline-none
                transition
                focus:border-black
                focus:bg-white
                ${className}
            `}
        />
    )
}