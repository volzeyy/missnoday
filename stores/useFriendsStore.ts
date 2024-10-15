import { create } from 'zustand';
import FriendsProps from '../types/FriendsProps';

interface FriendsState {
    friends: FriendsProps | null;
    setFriends: (friends: FriendsProps) => void;
    clearFriends: () => void;
}

// Create the Zustand store
const useFriendsStore = create<FriendsState>((set) => ({
    friends: null,
    setFriends: (friends) => set({ friends }),
    clearFriends: () => set({
        friends: null,
    }),
}));

export default useFriendsStore;