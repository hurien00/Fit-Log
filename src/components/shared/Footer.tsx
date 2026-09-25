'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png'; 

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-zinc-400 border-t border-zinc-800/60 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Brand Logo Icon + FITLOG */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
            <Image 
              src={logo} 
              alt="FITLOG Logo" 
              width={28} 
              height={28} 
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-extrabold tracking-wider text-lg sm:text-xl text-white uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright line */}
        <div className="text-center sm:text-right text-xs sm:text-sm text-zinc-500">
          <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </div>

      </div>
    </footer>
  );
}