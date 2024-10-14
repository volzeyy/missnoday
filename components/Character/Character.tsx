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

const Character = (props: any) => {
  const { rotationY, character } = props;

  const characterRef = useRef<Group>(null);
  const hatRef = useRef<Group>(null);
  const hairRef = useRef<Group>(null);
  const shirtRef = useRef<Group>(null);
  const pantsRef = useRef<Group>(null);
  const shoesRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const { scene: characterScene } = useGLTF(characterModelPath);

  const source = character ? useFetchSource(character.face) : null;

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
          <Cosmetic ref={hatRef} cosmetic_id={character && character.hat} type="hat" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={hairRef} cosmetic_id={character && character.hair} type="hair" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={shirtRef} cosmetic_id={character && character.shirt} type="shirt" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={pantsRef} cosmetic_id={character && character.pants} type="pants" />
        </Suspense>
        <Suspense>
          <Cosmetic ref={shoesRef} cosmetic_id={character && character.shoes} type="shoes" />
        </Suspense>
      </group>
    </Suspense>
  );
};

export default Character;
