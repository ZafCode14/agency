'use client';
import { useState } from "react";
import Service from "./service";

const ServicesSection = () => {
  const [services, setServices] = useState([true, false, false, false, false, false])

  return (
    <section className={`
      sticky top-0
      flex items-start
      bg-[#ffffffea] text-gray-50
      px-3 w-[1200px] max-w-full pt-24
      rounded-t-[30px] h-[100dvh]
      overflow-hidden backdrop-blur-md
    `}>
      <div className={`w-full flex flex-col items-center justify-center right-0`}>
        <h2 className="font-bold text-[24px] md:text-[34px] mb-5 text-gray-900">What can we do for you ?</h2>
        <div className="w-full my-2 flex flex-wrap justify-center max-w-70">
          <Service
          title="UI/UX Design"
          description="Create intuitive and visually appealing user interfaces and user experiences to engage visitors and enhance usability"
          icon="/icons/services/ux-ui.svg"
          services={services}
          setServices={setServices}
          index={0}
          />
          <Service
          title="Responsive Web Design"
          description="Design websites that seamlessly adapt to various screen sizes and devices, ensuring optimal user experience"
          services={services}
          setServices={setServices}
          icon="/icons/services/responsive.svg"
          index={1}
          />
          <Service
          title="Custom Web Development"
          description="Develop unique and tailored web solutions that meet your specific requirements and business goals"
          icon="/icons/services/custom.svg"
          services={services}
          setServices={setServices}
          index={2}
          />
          <Service
          title="SEO Services"
          description="Optimize websites for search engines to improve visibility, increase organic traffic, and enhance online presence"
          icon="/icons/services/seo.svg"
          services={services}
          setServices={setServices}
          index={3}
          />
          <Service
          title="CMS Services"
          description="Implement user-friendly content management systems to easily manage and update website content"
          icon="/icons/services/cms.svg"
          services={services}
          setServices={setServices}
          index={4}
          />
          <Service
          title="Maintenance and Support"
          description="Provide ongoing support, updates, and maintenance to ensure websites remain functional and up-to-date"
          icon="/icons/services/maintenance.svg"
          services={services}
          setServices={setServices}
          index={5}
          />
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;