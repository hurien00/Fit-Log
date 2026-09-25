'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';
import toast from 'react-hot-toast';

export default function MyPlanPage() {
  const {
    todayPlan = [],
    savedPlan = [],
    removeFromTodayPlan,
    removeFromSavedPlan,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  const activeList = activeTab === 'today' ? todayPlan : savedPlan;

  // Metrics Calculation
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, item) => acc + (Number(item.duration) || 0),
    0
  );
  const totalCalories = todayPlan.reduce(
    (acc, item) =>
      acc + (Number(item.caloriesBurned) || Number(item.calories) || 0),
    0
  );

  // Sort Logic
  const sortedWorkouts = [...activeList].sort((a, b) => {
    if (sortBy === 'duration') {
      return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    }
    if (sortBy === 'calories') {
      const calA = Number(a.caloriesBurned) || Number(a.calories) || 0;
      const calB = Number(b.caloriesBurned) || Number(b.calories) || 0;
      return calB - calA;
    }
    if (sortBy === 'rating') {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0;
  });

  const handleRemove = (id: string | number, name: string) => {
    if (activeTab === 'today') {
      removeFromTodayPlan(id);
      toast.success(`${name} removed from Today's Plan`);
    } else {
      removeFromSavedPlan(id);
      toast.success(`${name} removed from Saved List`);
    }
  };

  const handleMarkAsDone = (id: string | number, name: string) => {
    if (activeTab === 'today') {
      removeFromTodayPlan(id);
      toast.success(`Completed ${name}!`, { icon: '🎉' });
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm mt-1.5 font-normal">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="bg-[#101216] border border-zinc-800/60 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/60 gap-6 md:gap-0">
        
        {/* Exercises */}
        <div className="flex flex-col justify-center md:pr-6">
          <span className="text-zinc-400 text-xs font-semibold tracking-wide">
            Exercises
          </span>
          <span className="text-4xl sm:text-5xl font-black text-[#ccff00] mt-2">
            {totalExercises}
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col justify-center pt-4 md:pt-0 md:px-10">
          <span className="text-zinc-400 text-xs font-semibold tracking-wide">
            Minutes
          </span>
          <span className="text-4xl sm:text-5xl font-black text-white mt-2">
            {totalMinutes}
          </span>
        </div>

        {/* Calories */}
        <div className="flex flex-col justify-center pt-4 md:pt-0 md:px-10">
          <span className="text-zinc-400 text-xs font-semibold tracking-wide">
            Calories
          </span>
          <span className="text-4xl sm:text-5xl font-black text-white mt-2">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex flex-row items-center justify-between gap-4 pt-2">
        
        {/* Tabs Container */}
        <div className="inline-flex items-center bg-[#101216] p-1 rounded-xl border border-zinc-800/60 text-xs font-medium">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
              activeTab === 'today'
                ? 'bg-[#1d212b] text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#1d212b] text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs font-medium">Sort By</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-[#101216] border border-zinc-800/80 text-white text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none cursor-pointer appearance-none pr-8 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.2em 1.2em',
            }}
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Main List / Empty State Container */}
      {sortedWorkouts.length === 0 ? (
        /* Empty State */
        <div className="w-full bg-[#0d0e12]/60 border border-dashed border-zinc-800/60 rounded-3xl py-24 px-4 flex flex-col items-center justify-center text-center space-y-3">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
            NOTHING HERE YET
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-3">
            <Link
              href="/"
              className="inline-flex items-center bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(204,255,0,0.25)] active:scale-95"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        /* Workout Cards List */
        <div className="space-y-3">
          {sortedWorkouts.map((workout) => {
            const equipmentText = Array.isArray(workout.equipment)
              ? workout.equipment[0]
              : workout.equipment || 'Equipment N/A';

            const cals =
              workout.caloriesBurned || workout.calories || 'N/A';

            return (
              <div
                key={workout.id}
                className="bg-[#101216] border border-zinc-800/60 hover:border-zinc-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-150"
              >
                {/* Image & Main Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800/80">
                    <Image
                      src={workout.image || '/placeholder.png'}
                      alt={workout.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
                      {workout.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-medium">
                      {equipmentText}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-3 pt-1 text-xs text-zinc-300 font-medium">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.431.67-.852 1.574-1.228 2.651C8.216 7.825 7.5 10.638 7.5 13.5a4.5 4.5 0 009 0c0-2.482-.676-4.63-1.63-6.526a12.637 12.637 0 00-2.475-4.421z" clipRule="evenodd" />
                        </svg>
                        {cals} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Actions (Exact Match with Image) */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                  <Link
                    href={`/library/${workout.id}`}
                    className="inline-flex items-center justify-center bg-[#13161c] hover:bg-[#1b1f28] text-white font-medium text-sm px-5 py-2.5 rounded-full border border-slate-700/60 transition-all duration-200 shrink-0"
                  >
                    View Details
                  </Link>

                  {activeTab === 'today' && (
                    <button
                      onClick={() => handleMarkAsDone(workout.id, workout.name)}
                      className="inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
                    >
                      <svg
                        className="w-4 h-4 stroke-[3]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mark as Done</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(workout.id, workout.name)}
                    className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors duration-150 cursor-pointer ml-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}