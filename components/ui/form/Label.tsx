//EE 2
interface LabelProps{
    children : React.ReactNode;
}

export default function Label({
    children,
} : LabelProps){
    return(
        <label className="mb-2 block text-sm font-medium text-zinc-700">
            {children}
        </label>
    )
}