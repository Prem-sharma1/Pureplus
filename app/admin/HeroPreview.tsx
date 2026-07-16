import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Assuming heroSlides data is fetched similarly to front-end
// For admin preview, we can reuse the same endpoint '/api/hero-slides'

export default function HeroPreview() {
  const [slides, setSlides] = React.useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/hero-slides');
        const data = await res.json();
        if (data.success && data.slides) {
          setSlides(data.slides);
        }
      } catch (e) {
        console.error('Failed to load hero slides for admin preview', e);
      }
    };
    fetchSlides();
  }, []);

  React.useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden" id="admin-hero-preview">
      <AnimatePresence mode="wait">
        {slides.map((slide, idx) =>
          idx === currentSlide && (
            <motion.div
              key={slide.id || idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slide.bgColor || 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]'} flex items-center pt-28 pb-16 px-6 overflow-hidden`}
            >
              {/* Floating elements */}
              {slide.elements && slide.elements.map((el: string, i: number) => (
                <div key={i} className="absolute">{el}</div>
              ))}
              <div className="max-width-1200 mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="flex flex-col text-left justify-center">
                  <span className="font-['Pacifico'] text-2xl text-[#0F3D2E]/60 mb-1 block tracking-wide">Admin Preview</span>
                  <span className="text-[#0F3D2E]/75 font-semibold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4">
                    {slide.category}
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F3D2E] mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-[#0F3D2E]/80 text-sm md:text-base mb-8 max-w-lg leading-relaxed font-normal font-sans">
                    {slide.tagline}
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F3D2E] text-white rounded-full font-bold text-sm tracking-wider uppercase hover:bg-[#5A8B73] hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-[#0F3D2E]/10 group">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="flex justify-center items-center relative">
                  <img src={slide.image} alt={slide.subtitle} className={`max-w-full max-h-full object-contain filter drop-shadow-[0_25px_50px_rgba(15,61,46,0.22)] select-none z-10 hover:scale-[1.02] transition-transform duration-500 rounded-2xl ${slide.imageScale || ''}`} />
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#0F3D2E] shadow-premium-sm transition-all duration-300 hover:scale-110 z-30 hidden md:flex" aria-label="Previous Slide">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#0F3D2E] shadow-premium-sm transition-all duration-300 hover:scale-110 z-30 hidden md:flex" aria-label="Next Slide">
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
