import { create } from 'zustand';
import ColorsProps from '@/types/ColorsProps';

interface ColorsState {
    colors: ColorsProps | null;
    setColors: (colors: ColorsProps) => void;
    clearColors: () => void;
}

const useColorsStore = create<ColorsState>((set) => ({
    colors: null,
    setColors: (colors: ColorsProps) => set({ colors }),
    clearColors: () => set({
        colors: null,
    }),
}));

export default useColorsStore;