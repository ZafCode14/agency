import Image from "next/image";

function Footer() {
  return (
    <footer className={`
      flex justify-center
      w-full h-[30vh]
      bg-[#050538] text-white
    `}>
      <div className={`w-[1200px] max-w-full p-5 relative`}>
        <Image 
          src={"/logo2.svg"} 
          alt={"Logo"} 
          width={"36"} 
          height={"36"} 
          className="w-2.5 h-2.5 absolute left-4" 
        />
      </div>
    </footer>
  );
}

export default Footer;