import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

interface SessionState {
  session: Session | null,
  setSession: (updatedSession: Session | null) => void,
}

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (updatedSession: Session | null) => set({ 
        session: updatedSession 
      }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSessionStore;