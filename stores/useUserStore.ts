import { create } from 'zustand';
import UserProps from '@/types/UserProps';

interface UserState {
    user: Partial<UserProps>;
    setUser: (user: Partial<UserProps>) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    user: {
        full_name: "Guest",
        username: "guest",
        coins: 1500,
        streak: 0,
        streak_freeze: 2,
        avatar_url: "https://api.dicebear.com/9.x/pixel-art-neutral/png?mouth=happy09&eyes=variant09",
    },
    setUser: (user: Partial<UserProps>) => set({ user }),
    clearUser: () => set({
        user: {
            full_name: "Guest",
            username: "guest",
            coins: 1500,
            streak: 0,
            streak_freeze: 2,
            avatar_url: "https://api.dicebear.com/9.x/pixel-art-neutral/png?mouth=happy09&eyes=variant09",
        },
    }),
}));

export default useUserStore;