'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';
import { usePlan } from '@/context/PlanContext'; 

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount, savedCount }: NavbarProps) {
  const pathname = usePathname();
  
  const { todayPlan, savedPlan } = usePlan();

  const activePlanCount = planCount ?? todayPlan.length;
  const activeSavedCount = savedCount ?? savedPlan.length;

  // Workouts link-er href '/' (Homepage) kora hoyeche
  const navLinks = [
    { name: 'Workouts', href: '/' },
    { name: 'My Plan', href: '/my-plan' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a] backdrop-blur-md text-white border-b border-zinc-800/60 px-3 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand Name */}
          <Link href="/" prefetch={false} className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
              <Image 
                src={logo} 
                alt="FITLOG Logo" 
                width={28} 
                height={28} 
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <span className="font-extrabold tracking-wider text-base sm:text-xl text-white font-sans uppercase">
              FITLOG
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-0.5 sm:gap-1 bg-[#121212] p-1 sm:p-1.5 rounded-full border border-zinc-800/50">
            {navLinks.map((link) => {
              // Exact Homepage check and sub-route check
              const isActive =
                link.href === '/'
                  ? pathname === '/' || pathname.startsWith('/library')
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={false}
                  className={`px-3 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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

          {/* Status Badges (Counters) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Plan Badge */}
            <Link 
              href="/my-plan" 
              prefetch={false}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-300 hover:opacity-90 transition-opacity"
            >
              <span className="hidden xs:inline sm:inline">Plan</span>
              <span className="bg-[#ccff00] text-black font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs shadow-sm">
                {activePlanCount}
              </span>
            </Link>

            {/* Saved Badge */}
            <Link 
              href="/my-plan" 
              prefetch={false}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-300 hover:opacity-90 transition-opacity"
            >
              <span className="hidden xs:inline sm:inline">Saved</span>
              <span className="border border-zinc-600 text-zinc-300 font-medium w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs">
                {activeSavedCount}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}