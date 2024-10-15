import { Suspense, useEffect, useRef } from "react";
import {
  MappedTextureType,
  useGLTF,
  useTexture,
} from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import { Group, Texture, Mesh, Object3D, MeshBasicMaterial } from "three";

import characterModelPath from "@/assets/models/character.glb";
import COSMETICS from "@/constants/Cosmetics";
import Cosmetic from "../Cosmetic";
import useFetchSource from "@/hooks/useFetchSource";
import CosmeticProps from "@/types/CharacterProps";

const Character = (props: {rotationY: number, character: CosmeticProps | null}) => {
  const { rotationY, character } = props;

  const characterRef = useRef<Group>(null);
  const hatRef = useRef<Group>(null);
  const hairRef = useRef<Group>(null);
  const shirtRef = useRef<Group>(null);
  const pantsRef = useRef<Group>(null);
  const shoesRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const { scene: characterScene } = useGLTF(characterModelPath);

  const source = character && character.face_id ? useFetchSource(character.face_id) : null;

  const faceTexture = useTexture(
    source || COSMETICS.face.default,
    (texture: MappedTextureType<any>) => {
      if (Array.isArray(texture)) {
        texture.forEach((tex) => {
          tex.flipY = false; // Ensure the texture is not flipped incorrectly
          tex.needsUpdate = true;
        });
      } else {
        texture.flipY = false; // Ensure the texture is not flipped incorrectly
        texture.needsUpdate = true;
      }
    }
  );

  useEffect(() => {
    if (characterScene && faceTexture) {
      characterScene.traverse((child: Object3D) => {
        // Check if the child is a mesh and if the name matches "head"
        if ((child as Mesh).isMesh && child.name === "head") {
          const mesh = child as Mesh;
          const material = mesh.material as MeshBasicMaterial;
          if (material) {
            if (material.map == null) {
              return;
            }

            material.map.image = (faceTexture as Texture).image;
            material.map.needsUpdate = true;
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [characterScene, faceTexture]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY || 0;
    }
  });

  return (
    <Suspense>
      <group ref={groupRef} {...props}>
        <primitive object={characterScene} ref={characterRef} />
        <Suspense>
          <Cosmetic ref={hatRef} cosmetic_id={character && character.hat_id} type="hat" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={hairRef} cosmetic_id={character && character.hair_id} type="hair" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={shirtRef} cosmetic_id={character && character.shirt_id} type="shirt" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={pantsRef} cosmetic_id={character && character.pants_id} type="pants" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={shoesRef} cosmetic_id={character && character.shoes_id} type="shoes" />
        </Suspense>
      </group>
    </Suspense>
  );
};

export default Character;
