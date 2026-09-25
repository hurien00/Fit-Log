'use client';

import Image from 'next/image';
import bannerImg from '@/assets/banner.png'; // src/assets/banner.png path

export default function Banner() {
  const scrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const libraryElement = document.getElementById('library');
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      <div className="w-full bg-[#111318] border border-zinc-800/80 rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden shadow-2xl">
        
        {/* Left Content Side */}
        <div className="flex-1 space-y-4 sm:space-y-6 text-left z-10">
          
          {/* Eyebrow Text */}
          <span className="inline-block text-[#ccff00] text-xs sm:text-sm font-semibold tracking-wider uppercase">
            WORKOUT LIBRARY
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase font-sans">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            LOG EVERY SET.
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <a
              href="#library"
              onClick={scrollToLibrary}
              className="inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-[#ccff00]/20 active:scale-[0.98] uppercase tracking-wide cursor-pointer"
            >
              <span>BROWSE WORKOUTS</span>
              {/* Down Arrow / Scroll Icon */}
             
            </a>
          </div>
        </div>

        {/* Right Banner Image Side */}
        <div className="flex-1 flex justify-center md:justify-end items-center w-full max-w-xs sm:max-w-sm md:max-w-md z-10">
          <div className="relative w-full aspect-square max-h-[280px] sm:max-h-[340px] md:max-h-[380px]">
            <Image
              src={bannerImg}
              alt="Gym Exercise Equipment Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}