import { create } from 'zustand';

import HabitProps from '@/types/HabitProps';

interface HabitsState {
    habits: Partial<HabitProps>[] | [];
    setHabits: (updater: (habits: Partial<HabitProps>[]) => Partial<HabitProps>[]) => void;
    clearHabits: () => void;
}

const useHabitsStore = create<HabitsState>((set) => ({
    habits: [],
    setHabits: (updater) =>
        set((state) => ({
          habits: updater(state.habits),
        })),
    clearHabits: () => set({
        habits: [],
    }),
}));

export default useHabitsStore;
