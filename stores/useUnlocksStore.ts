
import { create } from 'zustand';
import CosmeticProps from '@/types/CosmeticProps';

interface UnlocksState {
  unlocks: CosmeticProps[] | null;
  setUnlocks: (updater: (unlocks: CosmeticProps[] | null) => CosmeticProps[]) => void;
  clearUnlocks: () => void;
}

const useUnlocksStore = create<UnlocksState>((set) => ({
  unlocks: null,
  setUnlocks: (updater) =>
    set((state) => ({
      unlocks: updater(state.unlocks),
    })),
  clearUnlocks: () =>
    set({
      unlocks: null,
    }),
}));

export default useUnlocksStore;