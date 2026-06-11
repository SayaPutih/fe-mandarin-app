interface TextAreaProps{
    value : string;
    onChange : (e: React.ChangeEvent<HTMLInputElement>)=>void;
    placeholder? : string;
}

export const TextArea =({
    value,
    onChange,
    placeholder 
} : TextAreaProps ) =>{
    return (
        <input 
            value={value}
            type = "text"
            onChange={onChange}
            placeholder={placeholder}
            className="w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            resize-none
            outline-none
            transition
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500"
        />
    )
}