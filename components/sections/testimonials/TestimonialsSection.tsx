import Testimonials from './Testimonials';

export default function TestimonialsSection() {
  return (
    <section className="relative w-[1200px] max-w-full h-screen" style={{
      background: 'linear-gradient(to bottom, #0D0E15, #1F405E)',
    }}>
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-80 flex items-center justify-center text-white">
        <div className="text-center p-8 w-full">
          <h2 className="text-[32px] font-semibold mb-6">What Our Clients Say</h2>
          <div className="relative w-full overflow-hidden">
            <Testimonials/>
          </div>
        </div>
      </div>
    </section>
  );
}