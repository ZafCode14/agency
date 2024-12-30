"use client"
import { useState } from "react";

export default function ButtonTwo({ name }: {name: string}) {
    const [hoverButton, setHoverButton] = useState(true);

    const handleHoverButton = () => {
        setHoverButton(!hoverButton);
    }
  return (
    <button className={`
        relative 
        text-[#ffffff] 
        bg-gradient-4
        font-bold rounded-md 
        py-3 text-[16px]
    `} onMouseEnter={handleHoverButton} onMouseLeave={handleHoverButton}>
        <div className={`
            absolute top-0 w-full h-full
            rounded-md
            bg-gradient-3
            ${hoverButton ? "opacity-0" : "opacity-1"}
            transition-opacity duration-300
        `}></div>
        <p className={`relative`}>{name}</p>
    </button>
  );
}