import ButtonOne from "../../ButtonOne";

const HeroSection = () => {
  return (
    <section id="heroSection" className={`
      relative
      flex flex-col justify-center items-center
      text-gray-950 bg-[#070525] overflow-hidden
      h-[500px] max-w-full w-[1200px] 

      md:items-start

      lg:mt-[80px] lg:mb-5 lg:rounded-md
    `}>

      <video 
        src={`/videos/animation.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-cover absolute top-0 right-0`} 
      ></video>

      <div className={`
        absolute
        w-full h-full
        bg-[#00000080]
      `}></div>

      <div className={`
        flex flex-col items-center
        max-w-full w-[440px] lg:w-[50%]
      `}>
        <h1 className="relative text-center font-bold leading-snug text-[#e0e0e0] text-[26px] md:text-[34px] max-w-25">Elevate Your Business</h1>
        <p className="relative w-full max-w-35 text-center mb-5 text-[#aeb4d6] text-[16px]">All Your Tech Needs In One Place</p>
        <div className={`w-[200px] flex flex-col`}>
          <ButtonOne name={"CONTACT"} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;