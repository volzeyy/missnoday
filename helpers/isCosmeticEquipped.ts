import useCharacterStore from "@/stores/useCharacterStore";

const isCosmeticEquipped = (cosmetic_id: string | undefined) => {
    const { character } = useCharacterStore();

    if (!character) {
        return false;
    }

    return Object.values(character).includes(cosmetic_id ?? null);
};

export default isCosmeticEquipped;