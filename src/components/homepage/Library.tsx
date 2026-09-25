'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// API Response structure Interface
interface Workout {
  id: string | number;
  name: string;
  muscleGroups?: string[]; 
  category?: string[] | string;
  equipment: string[] | string;
  duration: string | number;
  caloriesBurned?: string | number; 
  calories?: string | number;
  rating: string | number;
  image?: string;
}
export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (!res.ok) {
          throw new Error('An error while Data fetching ');
        }
        const data = await res.json();
        // API response array or wrapper object handelling
        const list = Array.isArray(data) ? data : data.workouts || data.data || [];
        setWorkouts(list);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Heading */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#111318] border border-zinc-800/80 rounded-2xl h-80 animate-pulse p-4">
              <div className="bg-zinc-800/60 rounded-xl h-44 w-full mb-4"></div>
              <div className="bg-zinc-800/60 h-4 w-20 rounded mb-2"></div>
              <div className="bg-zinc-800/60 h-6 w-40 rounded mb-2"></div>
              <div className="bg-zinc-800/60 h-4 w-28 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="text-center py-12 text-red-400 bg-red-950/20 border border-red-900/50 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Workouts Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
      {!loading && !error && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {workouts.map((workout) => {
      // 1. Muscle Groups / Categories Array Handling 
      const rawCategories = workout.muscleGroups || workout.category || [];
      const categories = Array.isArray(rawCategories)
        ? rawCategories
        : typeof rawCategories === 'string'
        ? rawCategories.split(',').map((c) => c.trim())
        : [];

      // 2. Equipment Array/String Handling
      const equipmentText = Array.isArray(workout.equipment)
        ? workout.equipment.join(', ')
        : workout.equipment || 'N/A';

      // 3. Calories Handling (caloriesBurned or calories)
      const calories = workout.caloriesBurned || workout.calories || 0;

      // 4. Image URL
      const imageUrl = workout.image || '/placeholder.png';

      return (
        <Link
          key={workout.id}
          href={`/workout/${workout.id}`}
          className="group bg-[#111318] hover:bg-[#161920] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
        >
          <div>
            {/* Card Image */}
            <div className="relative w-full h-48 sm:h-52 bg-zinc-900/80 overflow-hidden">
              <Image
                src={imageUrl}
                alt={workout.name}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3">
              {/* Category / Muscle Group Tag Pills */}
              <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="bg-[#ccff00] text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Workout Name */}
              <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#a7ac95] transition-colors leading-snug">
                {workout.name}
              </h3>

              {/* Equipment Line */}
              <p className="text-zinc-400 text-xs font-normal truncate">
                {equipmentText}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="px-5 pb-5 pt-3 border-t border-zinc-800/40 flex items-center gap-4 text-zinc-400 text-xs font-medium">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{workout.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              <span>{calories} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-50" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{workout.rating}</span>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
)}
    </section>
  );
}