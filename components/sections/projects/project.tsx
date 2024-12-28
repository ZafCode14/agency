"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  name: string;
  description: string
}

const Project = ({ name, description }: Props) => {
  const [count, setCount] = useState(0);

  const handleNext = () => {
    setCount(prev => prev === 3 ? prev = 0 : prev + 1)
  }

  const handlePrev = () => {
    setCount(prev => prev === 0 ? prev = 3 : prev - 1)
  }

  return (
    <div
      className={`
        sticky top-[170px]
        flex flex-col
        w-[1100px] max-w-[90%] mb-48 rounded-lg overflow-hidden
      `}
    >
      {/** Project Header */}
      <header
        className={`
          relative
          w-full h-[70px] bg-[black]
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

      <div className={`flex-1 bg-[#3d5864b7] text-white w-full flex flex-col lg:flex-row backdrop-blur-md`} style={{
          WebkitBackdropFilter: 'blur(20px)', 
          backdropFilter: 'blur(20px)'
        }}>
        {/** Project Images */}
        <div
          className={`
            relative
            flex overflow-hidden items-center
            bg-[black] lg:w-[80%]
          `}
        >
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Image
                key={index}
                src={`/images/${name}/${index + 1}.png`}
                alt="project Image"
                width={2000}
                height={1000}
                style={{
                  transform: `translateX(-${count * 100}%)`,
                }}
                className={`
                  object-contain 
                  transition-transform duration-300
                  flex-shrink-0 w-full
                `}
              />
            ))}
            <div onClick={handleNext} className={`
              absolute right-5
              flex justify-center items-center
              bg-[#ffffff91] hover:bg-[#ffffffec] text-[black]
              rounded-full w-[30px] h-[30px]
              font-bold cursor-pointer
            `}>&gt;</div>
            <div onClick={handlePrev} className={`
              absolute left-5
              flex justify-center items-center
              bg-[#ffffff91] hover:bg-[#ffffffec] text-[black]
              rounded-full w-[30px] h-[30px]
              font-bold cursor-pointer
            `}>&lt;</div>
        </div>

        {/** Project Description */}
        <p
          className={`p-5 text-center leading-[16px] flex items-center lg:w-[20%]`}
        >{description}</p>
      </div>
    </div>
  );
};

export default Project;