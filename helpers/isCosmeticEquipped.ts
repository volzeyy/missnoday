import useCharacterStore from "@/stores/useCharacterStore";

const isCosmeticEquipped = (cosmetic_id: string) => {
    const { character } = useCharacterStore();

    if (!character) {
        return false;
    }

    return Object.values(character).includes(cosmetic_id);
};

export default isCosmeticEquipped;