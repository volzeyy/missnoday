
import { create } from 'zustand';
import UnlocksProps from '@/types/UnlocksProps';

interface UnlocksState {
  unlocks: Partial<UnlocksProps>[];
  setUnlocks: (updater: (unlocks: Partial<UnlocksProps>[] | null) => Partial<UnlocksProps>[]) => void;
  clearUnlocks: () => void;
}

const useUnlocksStore = create<UnlocksState>((set) => ({
  unlocks: [],
  setUnlocks: (updater) =>
    set((state) => ({
      unlocks: updater(state.unlocks),
    })),
  clearUnlocks: () =>
    set({
      unlocks: [],
    }),
}));

export default useUnlocksStore;