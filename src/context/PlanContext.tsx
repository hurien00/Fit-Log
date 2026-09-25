'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Workout {
  id: string | number;
  name: string;
  description?: string;
  muscleGroups?: string[];
  category?: string[] | string;
  equipment?: string[] | string;
  difficulty?: string;
  sets?: number | string;
  reps?: string;
  duration?: number | string;
  caloriesBurned?: number | string;
  calories?: number | string;
  rating?: number | string;
  image?: string;
}

interface PlanContextType {
  todayPlan: Workout[];
  savedPlan: Workout[];
  addToTodayPlan: (workout: Workout) => void;
  addToSavedPlan: (workout: Workout) => void;
  removeFromTodayPlan: (id: string | number) => void;
  removeFromSavedPlan: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedPlan, setSavedPlan] = useState<Workout[]>([]);

  //Saved Data load from LocalStorage 
  useEffect(() => {
    const savedToday = localStorage.getItem('fitlog_today_plan');
    const savedSaved = localStorage.getItem('fitlog_saved_plan');
    if (savedToday) setTodayPlan(JSON.parse(savedToday));
    if (savedSaved) setSavedPlan(JSON.parse(savedSaved));
  }, []);

  //Add to Today's Plan
  const addToTodayPlan = (workout: Workout) => {
    setTodayPlan((prev) => {
      if (prev.some((item) => item.id === workout.id)) return prev;
      const updated = [...prev, workout];
      localStorage.setItem('fitlog_today_plan', JSON.stringify(updated));
      return updated;
    });
  };

  //Add to Saved Plan
  const addToSavedPlan = (workout: Workout) => {
    setSavedPlan((prev) => {
      if (prev.some((item) => item.id === workout.id)) return prev;
      const updated = [...prev, workout];
      localStorage.setItem('fitlog_saved_plan', JSON.stringify(updated));
      return updated;
    });
  };

  // Remove Handlers
  const removeFromTodayPlan = (id: string | number) => {
    setTodayPlan((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('fitlog_today_plan', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromSavedPlan = (id: string | number) => {
    setSavedPlan((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('fitlog_saved_plan', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        addToTodayPlan,
        addToSavedPlan,
        removeFromTodayPlan,
        removeFromSavedPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}