import COSMETICS from '@/constants/Cosmetics';
import useFetchSource from '@/hooks/useFetchSource';
import { useGLTF } from '@react-three/drei/native';
import { forwardRef } from 'react';

const Cosmetic = forwardRef((props: { cosmetic_id: string | null, type: string }, ref: React.Ref<any>) => {
    const { cosmetic_id, type } = props;

    const source = useFetchSource(cosmetic_id);

    const gltf = useGLTF(source || COSMETICS[type].default || "");

    if (!cosmetic_id) {
        return null;
    }
    
    return <primitive {...props} object={gltf.scene} ref={ref} />
})

export default Cosmetic;