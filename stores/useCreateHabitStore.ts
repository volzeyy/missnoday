import { create } from 'zustand';
import CreateHabitProps from '@/types/CreateHabitProps';

interface CreateHabitState {
    habit: Partial<CreateHabitProps> | null;
    setHabit: (newHabit: Partial<CreateHabitProps>) => void;
    clearHabit: () => void;
}

const useCreateHabitStore = create<CreateHabitState>((set) => ({
    habit: null,
    setHabit: (newHabit: Partial<CreateHabitProps>) => set({ 
        habit: newHabit 
    }),
    clearHabit: () => set({
        habit: null
    }),
}));

export default useCreateHabitStore;