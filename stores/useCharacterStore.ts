import { create } from 'zustand';
import CharacterProps from '@/types/CharacterProps';

interface CharacterState {
    character: CharacterProps | null;
    setCharacter: (character: CharacterProps) => void;
    clearCharacter: () => void;
}

const useCharacterStore = create<CharacterState>((set) => ({
    character: null,
    setCharacter: (character: CharacterProps) => set({ character }),
    clearCharacter: () => set({
        character: null,
    }),
}));

export default useCharacterStore;