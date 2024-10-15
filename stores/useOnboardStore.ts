import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

interface OnboardState {
  used: boolean,
  setUsed: () => void,
}

const useOnboardStore = create<OnboardState>()(
  persist(
    (set) => ({
      used: false,
      setUsed: () => set({ 
        used: true,
      }),
    }),
    {
      name: 'onboard-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useOnboardStore;