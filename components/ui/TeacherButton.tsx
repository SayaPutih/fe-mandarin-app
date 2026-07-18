//EE
import Link from "next/link";
import {ReactNode} from "react";

interface TeacherButtonProps{
    label : string;
    href? : string;
    onClick? : ()=>void;
    variant?: "blue" | "yellow" | "red" | "green" | "gray";
    icon? : ReactNode;
    disabled? : boolean;
    style? : string;
}

const variants = {
    blue : "bg-blue-600 hover:bg-blue-700",
    yellow : "bg-yellow-500 hover:bg-yellow-700",
    red : "bg-red-600 hover:bg-red-700",
    green : "bg-green-600 hover:bg-green-700",
    gray : "bg-gray-600 hover:bg-gray-700",
}

export default function TeacherButton({
    label,
    href,
    onClick,
    variant = "blue",
    icon,
    disabled,
    style,
} : TeacherButtonProps){
    const className=`
        inline-flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-1.5
        text-sm
        font-medium
        text-white
        transition
        ${style}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

  if (href) {
    return (
      <Link
        href={href}
        className={className}
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {icon}
      {label}
    </button>
  );
}