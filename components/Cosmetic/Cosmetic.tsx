import COSMETICS from '@/constants/Cosmetics';
import useFetchSource from '@/hooks/useFetchSource';
import { useGLTF } from '@react-three/drei/native';
import { forwardRef, useEffect } from 'react';
import { Color, Mesh, MeshBasicMaterial, Object3D } from 'three';

const originalColors = new Map();

const Cosmetic = forwardRef((props: {
  cosmetic_id: string | undefined,
  color: string | undefined,
  type: string
}, ref: React.Ref<any>) => {
  const { cosmetic_id, color, type } = props;
  const source = useFetchSource(cosmetic_id);
  const gltf = useGLTF(source || COSMETICS[type].default || "");

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.traverse((child: Object3D) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          const material = mesh.material as MeshBasicMaterial;

          if (!originalColors.has(mesh.name)) {
            originalColors.set(mesh.name, material.color.clone());
          }
          
          // Reset to original color if no color is provided
          if (material && !color) {
            material.color.copy(originalColors.get(mesh.name));
            material.needsUpdate = true;
          }

          // Apply color to the mesh material
          if (material && color) {
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
});

export default Cosmetic;