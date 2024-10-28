import { create } from 'zustand';
import CharacterProps from '@/types/CharacterProps';

interface CharacterState {
    character: Partial<CharacterProps>;
    setCharacter: (character: Partial<CharacterProps>) => void;
    clearCharacter: () => void;
}

const useCharacterStore = create<CharacterState>((set) => ({
    character: {
        face: null,
        hair: null,
        hat: null,
        shirt: null,
        pants: null,
        shoes: null,
    },
    setCharacter: (character: Partial<CharacterProps>) => set({ character }),
    clearCharacter: () => set({
        character: {
            id: undefined,
            user_id: undefined,
            face: null,
            hair: null,
            hat: null,
            shirt: null,
            pants: null,
            shoes: null,
        },
    }),
}));

export default useCharacterStore;