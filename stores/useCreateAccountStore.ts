import CreateAccountProps from '@/types/CreateAccountProps';
import { create } from 'zustand'

interface CreateAccountState {
  auth: Partial<CreateAccountProps> | null,
  setAuth: (newAuth: Partial<CreateAccountProps>) => void;
  clearAuth: () => void;
}

const useCreateAccountStore = create<CreateAccountState>()(
    (set) => ({
      auth: null,
      setAuth: (newAuth: Partial<CreateAccountProps>) => {
        set({ auth: newAuth });
      },
      clearAuth: () => {
        set({ auth: null });
      }
    }),
);

export default useCreateAccountStore;