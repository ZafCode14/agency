import useWindowWidth from "@/hooks/width";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  icon: string;
  services: boolean[];
  setServices: React.Dispatch<React.SetStateAction<boolean[]>>;
  index: number;
}

const Service: React.FC<Props> = ({ title, description, icon, services, setServices, index }) => {
  const w = useWindowWidth();
  
  const handleService = () => {
    setServices(services.map((service, i) => i === index));
  };

  return (
    <div
      onClick={() => handleService()}
      className={`
        overflow-hidden
        flex flex-col items-center
        rounded-xl
        bg-gradient-5
        m-1 w-full md:w-22 px-2 py-2
      `}
      style={{
        height: services[index] ? "140px" : w > 767 ? "140px" : "50px",
        transition: ".5s ease"
      }}
    >
      <div className="flex items-center w-full">
        <Image
          src={icon}
          alt="Icon"
          width={100}
          height={100}
          className="w-2 h-2 mr-2"
          style={{ filter: "brightness(0) saturate(100%) invert(39%) sepia(99%) saturate(742%) hue-rotate(303deg) brightness(108%) contrast(105%)" }} // Applying the #ED1FD6 color filter
        />
        <h3 className="text-lg flex-1">{title}</h3>
        {w <= 767 && (
          <p className={`${services[index] && "rotate-[45deg]"} text-3xl mr-2 text-[#6A2EFF]`}>+</p>
        )}
      </div>
      <p className="mt-3 w-[350px] max-w-[95%]">{description}</p>
    </div>
  );
};

export default Service;