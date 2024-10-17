import defaultHat from "@/assets/models/defaultHat.glb";
import defaultHair from "@/assets/models/defaultHair.glb";
import defaultShirt from "@/assets/models/defaultShirt.glb";
import defaultPants from "@/assets/models/defaultPants.glb";
import defaultShoes from "@/assets/models/defaultShoes.glb";
import defaultFace from "@/assets/textures/face_default.png";

const COSMETICS: { [key: string]: { name: string, icon?: string, default?: string, type: string} } = {
    all: {
        name: 'All',
        icon: "shimmer",
        type: "all",
    },
    shirt: {
        name: 'Shirt',
        icon: "tshirt-crew",
        type: "shirt",
        default: defaultShirt,
    },
    pants: {
        name: 'Pants',
        icon: "hanger",
        type: "pants",
        default: defaultPants,
    },
    hair: {
        name: 'Hair',
        icon: "hair-dryer",
        type: "hair",
        default: defaultHair,
    },
    face: {
        name: "Face",
        icon: "emoticon",
        type: "face",
        default: defaultFace,
    },
    hat: {
        name: 'Hat',
        icon: "hat-fedora",
        type: "hat",
        default: defaultHat,
    },
    shoes: {
        name: 'Shoes',
        icon: "shoe-formal",
        type: "shoes",
        default: defaultShoes,
    },
};

export default COSMETICS;