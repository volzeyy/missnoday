import Character from "../Character";
import { Fragment, Suspense, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber/native";
import {
  Float,
  PerspectiveCamera,
} from "@react-three/drei/native";
import { PanResponder, View } from "react-native";
import { useFocusEffect } from "expo-router";
import useFetchCharacter from "@/hooks/useFetchCharacter";

const Scene = (props: any) => {
  const { 
    user_id, 
    cameraPos, 
  } = props;

  const character = useFetchCharacter(user_id);

  const [rotationY, setRotationY] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const lastX = useRef(0);

  useFocusEffect(
    useCallback(() => {
      setMounted(true);

      return () => {
        setMounted(false);
      };
    }, [])
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        lastX.current = gestureState.x0;
      },
      onPanResponderMove: (evt, gestureState) => {
        const dx = gestureState.moveX - lastX.current;
        lastX.current = gestureState.moveX;

        setRotationY((prevRotationY) => prevRotationY + dx * 0.01); // Adjust sensitivity as needed
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Handle release if needed
      },
    })
  ).current;

  if (!mounted) {
    return;
  }

  return (
    <Fragment>
      <Canvas>
        <Float 
          speed={5}
        />
        {/* Global lighting */}
        <ambientLight intensity={1.3} />

        {/* Spotlight */}
        <spotLight
          position={[0, 2, 6]}
          angle={0.5} // Narrower light cone for a focused spotlight
          penumbra={1} // Softer edge for light
          intensity={10} // Intensity lowered for realism
        />

        {/* Directional light for added realism */}
        <directionalLight position={[-3, 6, 3]} intensity={2} />
        <Suspense fallback={null}>
          <Character character={character} rotationY={rotationY} />
        </Suspense>
        <PerspectiveCamera
          makeDefault
          position={cameraPos || [0, 2, 10]}
          rotation={[0, 0, 0]}
          receiveShadow
        />
      </Canvas>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        {...panResponder.panHandlers}
      />
    </Fragment>
  );
};

export default Scene;

// forest     +++
// park       +++
// dawn       +++ (bad with no background)
// sunset     ++ (best for no background)
// apartment  ++
// city       - (just bad)
// studio     - (also just bad)
// warehouse  +
// lobby      + (too bright)
// night      + (too dark)
