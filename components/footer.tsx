import Image from "next/image";

function Footer() {
  return (
    <footer className={`
      relative z-10
      flex justify-center
      w-full h-[30vh]
      text-white bg-[#0D0E15]
    `}
      style={{
        WebkitTransform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div className={`
        flex flex-col items-center justify-around h-full
        w-[1200px] max-w-full p-5
      `}>
        <div className={`flex justify-center border-b border-[white] w-full pb-5`}>
          <Image 
            src={"/logo2.svg"} 
            alt={"Logo"} 
            width={"36"} 
            height={"36"} 
            className="w-2.5 h-2.5" 
          />
          <h5 className="ml-3">etavelle</h5>
        </div>
        <div>
          <a>Services</a>
          <a className="mx-5">Projects</a>
          <a>Contact</a>
        </div>
        <div className="flex w-full">
          <a href="https://www.linkedin.com/in/misha-zafarani" target="_blank" rel="noopener noreferrer">
            <Image 
              src={"/icons/linkedin.svg"} 
              alt={"Logo"} 
              width={0} 
              height={0} 
              className="w-2 h-2" 
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;