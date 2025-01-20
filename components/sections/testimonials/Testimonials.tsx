"use client";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: 'Working with this team was a fantastic experience. They helped us increase our website traffic by over 300% within three months!',
      name: 'Sarah Thompson',
      position: 'Head of Digital Marketing, GreenTech Solutions',
    },
    {
      text: 'Their dedication to understanding our needs and delivering a customized solution was truly impressive. Our project wouldn’t have been the same without them.',
      name: 'Ahmed El-Mahdy',
      position: 'Project Manager, Oasis Ventures',
    },
    {
      text: 'From start to finish, the communication and execution were top-notch. They went above and beyond to meet our deadlines.',
      name: 'Emily Carter',
      position: 'Operations Manager, Horizon Retail',
    },
    {
      text: 'Thanks to their expertise, our platform is now faster, more secure, and incredibly user-friendly. Highly recommend!',
      name: 'Carlos Rivera',
      position: 'CTO, Urban Innovations',
    },
    {
      text: 'Their creative approach and attention to detail helped us stand out in a competitive market. It was an absolute pleasure working with them.',
      name: 'Anna Petrova',
      position: 'Brand Strategist, Nova Enterprises',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex transition-transform duration-1000 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="w-full flex-shrink-0 p-5"
          style={{
            borderRadius: '8px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <p className="text-xl italic">{testimonial.text}</p>
          <p className="mt-4 font-bold text-[#2A6987]">{testimonial.name}</p>
          <p className="text-lg">{testimonial.position}</p>
        </div>
      ))}
    </div>
  );
}