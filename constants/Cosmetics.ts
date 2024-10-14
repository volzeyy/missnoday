import defaultHat from "@/assets/models/defaultHat.glb";
import defaultHair from "@/assets/models/defaultHair.glb";
import defaultShirt from "@/assets/models/defaultShirt.glb";
import defaultPants from "@/assets/models/defaultPants.glb";
import defaultShoes from "@/assets/models/defaultShoes.glb";
import defaultFace from "@/assets/textures/face_default.png";

const COSMETICS: { [key: string]: { name: string, icon?: string, default?: string} } = {
    all: {
        name: 'All',
        icon: "shimmer",
    },
    shirt: {
        name: 'Shirt',
        icon: "tshirt-crew",
        default: defaultShirt, 
    },
    pants: {
        name: 'Pants',
        icon: "hanger",
        default: defaultPants,
    },
    hair: {
        name: 'Hair',
        icon: "hair-dryer",
        default: defaultHair,
    },
    face: {
        name: "Face",
        icon: "emoticon",
        default: defaultFace,
    },
    hat: {
        name: 'Hat',
        icon: "hat-fedora",
        default: defaultHat,
    },
    shoes: {
        name: 'Shoes',
        icon: "shoe-formal",
        default: defaultShoes,
    },
    background: {
        icon: "image",
        name: 'Background',
    },
};

export default COSMETICS;