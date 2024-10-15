import { supabase } from '@/config/supabase';
import COSMETICS from '@/constants/Cosmetics';
import useFetchCosmetic from '@/hooks/useFetchCosmetic';
import useFetchSource from '@/hooks/useFetchSource';
import CosmeticProps from '@/types/CosmeticProps';
import { useGLTF } from '@react-three/drei/native';
import { forwardRef, useEffect, useState } from 'react';

const Cosmetic = forwardRef((props: { cosmetic_id: string | null, type: string }, ref: React.Ref<any>) => {
    const { cosmetic_id, type } = props;

    const source = useFetchSource(cosmetic_id);

    const gltf = useGLTF(source || COSMETICS[type].default || "");
    
    return <primitive {...props} object={gltf.scene} ref={ref} />
})

export default Cosmetic;