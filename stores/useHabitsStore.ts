import { create } from 'zustand';

import HabitProps from '@/types/HabitProps';

interface HabitsState {
    habits: HabitProps[] | null;
    setHabits: (habits: HabitProps[]) => void;
    clearHabits: () => void;
}

const useHabitsStore = create<HabitsState>((set) => ({
    habits: null,
    setHabits: (habits) => set({ habits }),
    clearHabits: () => set({
        habits: null,
    }),
}));

export default useHabitsStore;