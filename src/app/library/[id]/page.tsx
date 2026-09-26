'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

interface WorkoutDetail {
  id: string | number;
  name: string;
  description: string;
  muscleGroups?: string[];
  category?: string[] | string;
  equipment: string[] | string;
  difficulty: string;
  sets: number | string;
  reps: string;
  duration: number | string;
  caloriesBurned?: number | string;
  calories?: number | string;
  rating: number | string;
  instructions: string[];
  image?: string;
}

export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;

  const { addToTodayPlan, addToSavedPlan } = usePlan();

  const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`);
        if (!res.ok) {
          throw new Error('Workout details load korte somossa hoyeche');
        }
        const data = await res.json();
        // Single Object ba Wrapped Data handle
        const item = data.workout || data.data || data;
        setWorkout(item);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (workoutId) {
      fetchWorkoutDetail();
    }
  }, [workoutId]);

  // Handlers (Toast control completely handled inside PlanContext)
  const handleAddToPlan = () => {
    if (!workout) return;
    addToTodayPlan(workout);
  };

  const handleSaveForLater = () => {
    if (!workout) return;
    addToSavedPlan(workout);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin"></div>
        <p className="text-zinc-400 font-medium text-xs tracking-wider uppercase animate-pulse">
          Loading details...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 text-center bg-[#111318] border border-zinc-800 rounded-2xl">
        <p className="text-red-400 mb-4">{error || 'Workout not found!'}</p>
        <Link
          href="/"
          className="inline-block bg-[#ccff00] text-black font-bold px-5 py-2.5 rounded-lg text-xs uppercase"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  // Categories Handling
  const rawCategories = workout.muscleGroups || workout.category || [];
  const categories = Array.isArray(rawCategories)
    ? rawCategories
    : typeof rawCategories === 'string'
    ? rawCategories.split(',').map((c) => c.trim())
    : [];

  // Equipment Handling
  const equipmentText = Array.isArray(workout.equipment)
    ? workout.equipment.join(', ')
    : workout.equipment || 'N/A';

  // Calories Handling
  const calories = workout.caloriesBurned || workout.calories || 'N/A';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Two-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side — Visual/Media Image */}
        <div className="lg:col-span-5 w-full">
          <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800/80 bg-[#111318] shadow-2xl">
            <Image
              src={workout.image || '/placeholder.png'}
              alt={workout.name}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side — Workout Information & Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Title & Subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">
              {workout.name}
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Key Specs Table / Panel */}
          <div className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 divide-y divide-zinc-800/60 text-xs sm:text-sm">
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">EQUIPMENT</span>
              <span className="text-zinc-200 font-medium">{equipmentText}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">DIFFICULTY</span>
              <span className="text-zinc-200 font-medium">{workout.difficulty || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">SETS</span>
              <span className="text-zinc-200 font-medium">{workout.sets}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">REPS</span>
              <span className="text-zinc-200 font-medium">{workout.reps}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">DURATION</span>
              <span className="text-zinc-200 font-medium">{workout.duration} min</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">CALORIES</span>
              <span className="text-zinc-200 font-medium">{calories} kcal</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">RATING</span>
              <span className="text-zinc-200 font-medium">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-zinc-300 text-xs sm:text-sm leading-relaxed">
              {workout.instructions && workout.instructions.length > 0 ? (
                workout.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="text-zinc-500 font-semibold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))
              ) : (
                <p className="text-zinc-500 text-xs">No instructions provided.</p>
              )}
            </ol>
          </div>

          {/* Call-to-action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {/* Primary Button */}
            <button
              onClick={handleAddToPlan}
              className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-md active:scale-95 cursor-pointer uppercase"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Add to today's plan</span>
            </button>

            {/* Secondary Button */}
            <button
              onClick={handleSaveForLater}
              className="inline-flex items-center gap-2 bg-[#111318] hover:bg-[#181b22] border border-zinc-700/80 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer uppercase"
            >
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}