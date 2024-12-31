"use client";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: 'This service has been a game changer for us. Highly recommend!',
      name: 'John Doe',
      position: 'CEO of Company XYZ',
      color: '#1F405E', // Dark teal
    },
    {
      text: 'A truly professional team that delivers results beyond expectations.',
      name: 'Jane Smith',
      position: 'Marketing Director at Brand ABC',
      color: '#0D0E15', // Very dark grayish-black
    },
    {
      text: 'Amazing experience! The team was efficient and responsive every step of the way.',
      name: 'Michael Brown',
      position: 'Lead Developer at Tech Solutions',
      color: '#4A164C', // Deep plum
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change testimonial every 3 seconds

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
          className="testimonial-item w-full flex-shrink-0 p-8"
          style={{
            backgroundColor: testimonial.color,
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <p className="text-xl italic">{testimonial.text}</p>
          <p className="mt-4 font-bold">{testimonial.name}</p>
          <p className="text-lg">{testimonial.position}</p>
        </div>
      ))}
    </div>
  );
}