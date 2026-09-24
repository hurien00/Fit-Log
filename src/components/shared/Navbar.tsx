'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png'; 

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();

  
  const navLinks = [
    { name: 'Workouts', href: '/workouts' }, 
    { name: 'My Plan', href: '/my-plan' },
  ];

  return (
    <header className="w-full bg-[#0a0a0a] text-white border-b border-zinc-800/60 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/*  Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image 
              src={logo} 
              alt="FITLOG Logo" 
              width={28} 
              height={28} 
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold tracking-wider text-xl text-white font-sans uppercase">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 bg-[#121212] p-1.5 rounded-full border border-zinc-800/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/workouts' && pathname === '/');
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1e2a00] text-[#ccff00] border border-[#ccff00]/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/*  Status Badges (Counters) */}
        <div className="flex items-center gap-4">
          {/* Plan Badge -> /my-plan */}
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 text-sm text-zinc-300 hover:opacity-90 transition-opacity"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge -> /my-plan */}
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 text-sm text-zinc-300 hover:opacity-90 transition-opacity"
          >
            <span>Saved</span>
            <span className="border border-zinc-600 text-zinc-300 font-medium w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}