import { create } from 'zustand';
import ColorsProps from '@/types/ColorsProps';

interface ColorsState {
    colors: Partial<ColorsProps>;
    setColors: (colors: ColorsProps) => void;
    clearColors: () => void;
}

const useColorsStore = create<ColorsState>((set) => ({
    colors: {
        hat: null,
        hair: null,
        shirt: null,
        pants: null,
        shoes: null,
        background: null,
    },
    setColors: (colors: ColorsProps) => set({ colors }),
    clearColors: () => set({
        colors: {
            hat: null,
            hair: null,
            shirt: null,
            pants: null,
            shoes: null,
            background: null,
        },
    }),
}));

export default useColorsStore;