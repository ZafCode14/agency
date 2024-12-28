const ProjectsSection = () => {
  return (
    <section className={`
      sticky top-[70px]
      w-[1200px] max-w-full
    `}>
        <div className={`w-full flex flex-col items-center bg-[#2a6077ab] backdrop-blur-md rounded-t-[30px] h-screen absolute`} style={{
          WebkitBackdropFilter: 'blur(20px)', 
          backdropFilter: 'blur(20px)'
        }}>
          <h2 className="font-bold text-[24px] md:text-[34px] my-10 text-[white]">Discover our latest projects</h2>
        </div>
    </section>
  );
}

export default ProjectsSection;