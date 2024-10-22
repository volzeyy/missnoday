import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";

const { width } = Dimensions.get("window");

const CosmeticChance = ({
  name,
  type,
  chance,
}: {
  name: string;
  type: string;
  chance: number | null;
}) => {
  const { text, background } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[styles.vanity, { backgroundColor: text}]}
      >
        <Text style={[styles.name, { color: background }]}>{name}</Text>
        <Text style={[styles.type, { color: background, opacity: 0.7 }]}>{type}</Text>
        <Text style={[{ color: background, fontWeight: "800" }]}>{chance}%</Text>
      </View>
    </View>
  );
};

export default CosmeticChance;

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    padding: 10,
  },
  vanity: {
    aspectRatio: 1,
    borderRadius: 5,
    padding: 10,
    gap: 10,
  },
  type: {
    fontWeight: "800",
    fontSize: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
  },
});
