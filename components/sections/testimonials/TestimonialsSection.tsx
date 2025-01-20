import Testimonials from './Testimonials';

export default function TestimonialsSection() {
  return (
    <section className="w-[1200px] max-w-full relative pb-20"
      style={{
        background: 'linear-gradient(to bottom, #0D0E15, #1F405E)',
        WebkitTransform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div className="w-full h-full bg-opacity-80 flex items-center justify-center text-white">
        <div className="text-center p-4 w-full">
          <h2 className="text-[32px] font-semibold mb-6">What Our Clients Say</h2>
          <div className="relative w-full overflow-hidden">
            <Testimonials/>
          </div>
        </div>
      </div>
    </section>
  );
}