//EE 2
interface FormFieldProps
extends React.InputHTMLAttributes<HTMLInputElement>{
    wrapperClassName?: string;
    label?:string;
}

export function FormField({
    label,
    wrapperClassName,
    className="",
    ...props
}:FormFieldProps){
    return(
        <div className={`${wrapperClassName}`}>
            {label && 
                <label className="mb-2 block text-xs sm:text-sm font-small sm:font-medium">
                    {label}
                </label>
            }

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
                    transition
                    focus:border-black
                    focus:bg-white
                    outline-none
                    ${className}
                `}
            />
        </div>
    )
}

interface AreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  wrapperClassName?: string;
}

export function AreaField({
  label,
  wrapperClassName = "",
  className = "",
  ...props
}: AreaFieldProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-small sm:text-sm sm:font-medium">
          {label}
        </label>
      )}

      <textarea
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
    </div>
  );
}

export function NumberField({
    label,
    className="",
    ...props
}:FormFieldProps){
    return(
        <div>
            {label && 
                <label className="mb-2 block text-sm font-medium">
                    {label}
                </label>
            }

            <input
                type="number"
                {...props}
                className={`
                    w-full
                    rounded-xl
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-4
                    py-3
                    transition
                    focus:border-black
                    focus:bg-white
                    outline-none
                    ${className}
                `}
            />
        </div>
    )
}
