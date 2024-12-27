"use client"
import { useState } from "react";

function ButtonOne({ name }: {name: string}) {
    const [hoverButton, setHoverButton] = useState(true);

    const handleHoverButton = () => {
        setHoverButton(!hoverButton);
    }
  return (
    <button className={`
        relative 
        text-[#ffffff] 
        bg-gradient-2
        font-bold rounded-md 
        py-3 text-[16px]
    `} onMouseEnter={handleHoverButton} onMouseLeave={handleHoverButton}>
        <div className={`
            absolute top-0 w-full h-full
            rounded-md
            bg-gradient-1
            ${hoverButton ? "opacity-0" : "opacity-1"}
            transition-opacity duration-300
        `}></div>
        <p className={`relative`}>{name}</p>
    </button>
  );
}

export default ButtonOne;