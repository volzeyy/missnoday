import { Suspense, useEffect, useRef } from "react";
import {
  MappedTextureType,
  useGLTF,
  useTexture,
} from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import { Group, Texture, Mesh, Object3D, MeshBasicMaterial, Color } from "three";

import characterModelPath from "@/assets/models/character.glb";
import COSMETICS from "@/constants/Cosmetics";
import Cosmetic from "../Cosmetic";
import useFetchSource from "@/hooks/useFetchSource";
import CharacterProps from "@/types/CharacterProps";
import ColorsProps from "@/types/ColorsProps";

const originalColors = new Map();

const Character = (props: {rotationY: number, character: Partial<CharacterProps> | null, colors?: Partial<ColorsProps>}) => {
  const { rotationY, character, colors } = props;

  const characterRef = useRef<Group>(null);
  const hatRef = useRef<Group>(null);
  const hairRef = useRef<Group>(null);
  const shirtRef = useRef<Group>(null);
  const pantsRef = useRef<Group>(null);
  const shoesRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const { scene: characterScene } = useGLTF(characterModelPath);

  const source = useFetchSource(character?.face ?? undefined)

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
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          const material = mesh.material as MeshBasicMaterial;
  
          // Store original colors
          if (!originalColors.has(mesh.name)) {
            originalColors.set(mesh.name, material.color.clone());
          }
  
          if (child.name === "body" || child.name === "head") {
            if (colors && colors.skin) {
              material.color = new Color(colors.skin);
            } else {
              // Reset to the original color
              material.color.copy(originalColors.get(mesh.name));
            }
  
            if (child.name === "head" && material.map) {
              material.map.image = (faceTexture as Texture).image;
              material.map.needsUpdate = true;
            }
  
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [characterScene, faceTexture, colors]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY || 0;
    }
  });

  return (
      <group ref={groupRef} {...props}>
        <primitive object={characterScene} ref={characterRef} />
        <Suspense>
          <Cosmetic 
            ref={hatRef} 
            cosmetic_id={character?.hat ?? undefined} 
            color={colors?.hat ?? undefined} 
            type="hat" 
          />
        </Suspense>
        <Suspense>
          <Cosmetic 
            ref={hairRef} 
            cosmetic_id={character?.hair ?? undefined} 
            color={colors?.hair ?? undefined}
            type="hair" 
          />
        </Suspense>
        <Suspense>
          <Cosmetic 
            ref={shirtRef} 
            cosmetic_id={character?.shirt ?? undefined} 
            color={colors?.shirt ?? undefined}
            type="shirt" 
          />
        </Suspense>
        <Suspense>
          <Cosmetic 
            ref={pantsRef} 
            cosmetic_id={character?.pants ?? undefined}
            color={colors?.pants ?? undefined}
            type="pants" 
          />
        </Suspense>
        <Suspense>
          <Cosmetic 
            ref={shoesRef} 
            cosmetic_id={character?.shoes ?? undefined} 
            color={colors?.shoes ?? undefined}
            type="shoes" 
          />
        </Suspense>
      </group>
  );
};

export default Character;
