"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  name: string;
  description: string;
}

const Project = ({ name, description }: Props) => {
  const [count, setCount] = useState(0);

  const handleNext = () => {
    setCount((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCount((prev) => (prev === 0 ? 3 : prev - 1));
  };

  return (
    <div
      className={`
        sticky top-[170px]
        flex flex-col
        w-[900px] max-w-[90%] mb-32 rounded-lg overflow-hidden
      `}
    >
      {/** Project Header */}
      <header
        className={`
          relative
          w-full h-[70px] bg-[#2A6987]
          flex items-center justify-center
        `}
      >
        <Image
          src={`/images/${name}/logo.svg`}
          alt="project logo"
          width={0}
          height={0}
          className={`h-[40px] w-[40px] absolute left-5`}
        />
        <h6 className={`text-[white] uppercase font-bold`}>{name}</h6>
      </header>

      <div
        className={`
          flex-1 bg-[#0A1B24] text-white w-full flex flex-col backdrop-blur-md`}
        style={{
          WebkitBackdropFilter: "blur(20px)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/** Project Images */}
        <div
          className={`
            relative
            flex overflow-hidden items-center
            bg-[#1B2A3A]
          `}
        >
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Image
                key={index}
                src={`/images/${name}/${index + 1}.png`}
                alt="project Image"
                loading="lazy"
                width={2000}
                height={1000}
                style={{
                  transform: `translateX(-${count * 100}%)`,
                }}
                className={`
                  object-contain 
                  transition-transform duration-300
                  flex-shrink-1 w-full
                `}
              />
            ))}
            <div
              onClick={handleNext}
              className={`
                absolute right-5
                flex justify-center items-center
                bg-[#00A0A6] hover:bg-[#00C4C9] text-[white]
                rounded-full w-[30px] h-[30px]
                font-bold cursor-pointer
              `}
            >
              &gt;
            </div>
            <div
              onClick={handlePrev}
              className={`
                absolute left-5
                flex justify-center items-center
                bg-[#00A0A6] hover:bg-[#00C4C9] text-[white]
                rounded-full w-[30px] h-[30px]
                font-bold cursor-pointer
              `}
            >
              &lt;
            </div>
        </div>

        {/** Project Description */}
        <p
          className={`p-5 text-center leading-[16px] flex items-center text-[#E0F2F1]`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Project;