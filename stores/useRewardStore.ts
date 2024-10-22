import { create } from 'zustand';

interface RewardState {
    reward: string | null;
    setReward: (reward: string) => void;
    clearReward: () => void;
}

const useRewardStore = create<RewardState>((set) => ({
    reward: null,
    setReward: (reward: string) => set({ reward }),
    clearReward: () => set({
        reward: null,
    }),
}));

export default useRewardStore;