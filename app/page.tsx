import HeroSection from "@/components/sections/hero/hero";
import ServicesSection from "@/components/sections/services/services";
import ProjectsSection from "@/components/sections/projects/projects";
import ContactSection from "@/components/sections/contact/contact";
import Project from "@/components/sections/projects/project";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";

export default function Home() {
  return (
    <main className="text-gray-950 flex flex-col items-center w-full">
      <HeroSection/>
      <div id="servicesSection"></div>
      <ServicesSection/>
      <ProjectsSection/>
      <div id="projectsSection" className="h-[100px]"></div>
      <Project 
        name="blackeels"
        description="Blackeels Productions is a team of passionate storytellers specializing in creating visually stunning films, commercials, and branded content. Their mission is to deliver high-quality, creative work that connects deeply with audiences, bringing compelling narratives to life with precision and artistry."
      />
      <Project 
        name="golverd"
        description="Golverd is Egypt's first virtual jewelry mall, curating a selection of renowned brands on one accessible online platform. Offering a diverse range of pieces, Golverd delivers a seamless shopping experience, enabling customers to explore and purchase stunning jewelry from the comfort of their homes."
      />
      <Project 
        name="waxio"
        description="Waxio is a contemporary jewelry brand emphasizing individuality and modern style. With a focus on unique designs that enhance personal expression, Waxio creates pieces that reflect both outer elegance and inner essence, inspiring confidence and creativity in every customer."
      />
      <Project 
        name="merlo"
        description="Merlo Group is a leader in providing innovative kitchen solutions, offering premium equipment, appliances, and accessories. Combining functionality with modern design, Merlo delivers high-quality products that enhance cooking experiences for both professional chefs and home enthusiasts."
      />
      <Project 
        name="felofarms"
        description="Felofarms is a pioneering exporter of premium fresh fruits, committed to quality and sustainability. They grow and curate diverse fruit selections, ensuring every piece delivers exceptional taste. Felofarms bridges orchards and tables with care and excellence, enriching global connections."
      />
      <Project 
        name="bravo"
        description="Bravo Link is a free scanner app designed for teams to organize and manage notes efficiently. Integrated with Bravo Smart Notebook, it offers document organization, calendar syncing, flashcard creation, and Gemini AI-powered productivity tools, merging physical and digital workflows."
      />
      <Project 
        name="nexus"
        description="Nexus is a premier EDM event brand with 4-5 years of experience in planning and execution. They coordinate seamless events by curating custom artist lineups and leveraging a global network to book top-tier talent, delivering unmatched audience experiences with professionalism and innovation."
      />
      <Project 
        name="zeus"
        description="Zeus Gym is a modern fitness center dedicated to health and wellness. Offering state-of-the-art equipment, expert trainers, and tailored programs, Zeus provides an inspiring workout environment. The brand emphasizes community, motivation, and helping members achieve their fitness goals."
      />
      <div className="h-[100px]"></div>
      <ContactSection/>
      <TestimonialsSection/>
    </main>
  );
}