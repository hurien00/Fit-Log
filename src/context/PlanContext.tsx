'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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
  removeFromTodayPlan: (id: string | number, showToast?: boolean) => void;
  removeFromSavedPlan: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedPlan, setSavedPlan] = useState<Workout[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedToday = localStorage.getItem('fitlog_today_plan');
    const savedSaved = localStorage.getItem('fitlog_saved_plan');
    if (savedToday) setTodayPlan(JSON.parse(savedToday));
    if (savedSaved) setSavedPlan(JSON.parse(savedSaved));
  }, []);

  // Add to Today's Plan
  const addToTodayPlan = (workout: Workout) => {
    const isAlreadyAdded = todayPlan.some((item) => String(item.id) === String(workout.id));
    if (isAlreadyAdded) {
      toast.error(`${workout.name} is already in Today's Plan!`, {
        icon: '⚠️',
        style: {
          border: '1px solid #f59e0b',
          color: '#f59e0b',
          background: '#111318',
        },
      });
      return;
    }

    if (todayPlan.length >= 5) {
      toast.error("Today's Plan is full! (Maximum 5 limit reached)", {
        icon: '🚫',
        style: {
          border: '1px solid #ef4444',
          color: '#ef4444',
          background: '#111318',
        },
      });
      return;
    }

    const updated = [...todayPlan, workout];
    setTodayPlan(updated);
    localStorage.setItem('fitlog_today_plan', JSON.stringify(updated));

    toast.success(`${workout.name} added to Today's Plan!`, {
      icon: '⚡',
      style: {
        border: '1px solid #ccff00',
        color: '#ccff00',
        background: '#111318',
      },
    });
  };

  // Add to Saved Plan
  const addToSavedPlan = (workout: Workout) => {
    const isAlreadySaved = savedPlan.some((item) => String(item.id) === String(workout.id));
    if (isAlreadySaved) {
      toast.error(`${workout.name} is already saved!`, {
        icon: '🔖',
        style: {
          border: '1px solid #f59e0b',
          color: '#f59e0b',
          background: '#111318',
        },
      });
      return;
    }

    const updated = [...savedPlan, workout];
    setSavedPlan(updated);
    localStorage.setItem('fitlog_saved_plan', JSON.stringify(updated));

    toast.success(`${workout.name} saved for later!`, {
      icon: '💾',
      style: {
        border: '1px solid #3b82f6',
        color: '#3b82f6',
        background: '#111318',
      },
    });
  };

  // Remove Handlers
  const removeFromTodayPlan = (id: string | number, showToast = true) => {
    const itemToRemove = todayPlan.find((item) => String(item.id) === String(id));

    setTodayPlan((prev) => {
      const updated = prev.filter((item) => String(item.id) !== String(id));
      localStorage.setItem('fitlog_today_plan', JSON.stringify(updated));
      return updated;
    });

    if (itemToRemove && showToast) {
      toast(`${itemToRemove.name} removed from Today's Plan`, {
        icon: '🗑️',
        style: {
          border: '1px solid #27272a',
          color: '#ffffff',
          background: '#111318',
        },
      });
    }
  };

  const removeFromSavedPlan = (id: string | number) => {
    const itemToRemove = savedPlan.find((item) => String(item.id) === String(id));

    setSavedPlan((prev) => {
      const updated = prev.filter((item) => String(item.id) !== String(id));
      localStorage.setItem('fitlog_saved_plan', JSON.stringify(updated));
      return updated;
    });

    if (itemToRemove) {
      toast(`${itemToRemove.name} removed from Saved List`, {
        icon: '🗑️',
        style: {
          border: '1px solid #27272a',
          color: '#ffffff',
          background: '#111318',
        },
      });
    }
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