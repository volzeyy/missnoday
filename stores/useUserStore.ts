import { create } from 'zustand';
import UserProps from '@/types/UserProps';

interface UserState {
    user: UserProps | null;
    setUser: (user: UserProps) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: UserProps) => set({ user }),
    clearUser: () => set({
        user: null,
    }),
}));

export default useUserStore;