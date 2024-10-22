import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useRewardStore from "@/stores/useRewardStore";
import useFetchCosmetic from "@/hooks/useFetchCosmetic";
import { MotiView } from "moti";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import confetti from "@/assets/lottie/confetti.json";

const TreasureChest = () => {
  const { reward, clearReward } = useRewardStore();
  const cosmeticData = useFetchCosmetic(reward || undefined);

  const animation = useRef<LottieView>(null);

  const handleExit = () => {
    if (!cosmeticData) {
      return;
    }

    clearReward();
    router.back();
  };

  useEffect(() => {
    if (!cosmeticData) {
      return;
    }

    setTimeout(() => {
      animation.current?.play();
    }, 250);
  }, [cosmeticData])

  return (
    <TouchableOpacity onPress={handleExit} style={styles.container}>
      {cosmeticData && (
        <MotiView
          style={styles.cosmeticContainer}
          from={{ opacity: 0, scale: 0, rotate: "0deg" }}
          animate={{ opacity: 1, scale: 1.5, rotate: "360deg" }}
          transition={{ type: "timing", duration: 500 }}
        >
          <Text style={styles.name}>{cosmeticData.name}</Text>
          <Text style={styles.type}>{cosmeticData.type}</Text>
        </MotiView>
      )}
      {cosmeticData && (
        <LottieView
          autoPlay={false}
          loop={false}
          ref={animation}
          speed={1.2}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            transform: "scale(1.25)",
            zIndex: 100,
          }}
          source={confetti}
        />
      )}
    </TouchableOpacity>
  );
};

export default TreasureChest;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cosmeticContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
  },
  type: {
    fontSize: 18,
    opacity: 0.7,
  },
});