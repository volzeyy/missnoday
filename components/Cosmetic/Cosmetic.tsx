import COSMETICS from '@/constants/Cosmetics';
import useFetchSource from '@/hooks/useFetchSource';
import { useGLTF } from '@react-three/drei/native';
import { forwardRef, useEffect } from 'react';
import { Color, Mesh, MeshBasicMaterial, Object3D } from 'three';

const Cosmetic = forwardRef((props: { 
    cosmetic_id: string | null, 
    color: string | null,
    type: string 
}, ref: React.Ref<any>) => {
    const { cosmetic_id, color, type } = props;

    const source = useFetchSource(cosmetic_id);

    const gltf = useGLTF(source || COSMETICS[type].default || "");

    useEffect(() => {
        if (gltf && gltf.scene && color) {
          gltf.scene.traverse((child: Object3D) => {
            if ((child as Mesh).isMesh) {
              const mesh = child as Mesh;
              const material = mesh.material as MeshBasicMaterial;
    
              // Apply color to the mesh material
              if (material) {
                material.color = new Color(color);
                material.needsUpdate = true;
              }
            }
          });
        }
      }, [gltf.scene, color]);

    if (!cosmetic_id) {
        return null;
    }
    
    return <primitive {...props} object={gltf.scene} ref={ref} />
})

export default Cosmetic;