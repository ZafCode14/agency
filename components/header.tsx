import Image from "next/image";

function Header() {
  return (
    <header className={`
      fixed top-0 z-10
      flex justify-center 
      w-full h-[70px]
      text-black bg-[#ffffff]
      transition-colors duration-300
      px-3
    `}>
      <div className="flex justify-center items-center w-[1200px] max-w-full relative">
        <a href="#heroSection" className="flex items-center">
          <Image 
            src={"/logo2.svg"} 
            alt={"Logo"} 
            width={"36"} 
            height={"36"} 
            className="w-2.5 h-2.5 absolute left-4" 
            priority
          />
        </a>
        <div className="flex">
          <a href="#servicesSection" className="mx-3">Services</a>
          <a href="#projectsSection" className="mx-3">Projects</a>
          <a href="#contactSection" className="mx-3">Contact</a>
        </div>
      </div>
    </header>
  );
}

export default Header;