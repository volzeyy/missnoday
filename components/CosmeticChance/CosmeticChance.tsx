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
  const { text, background, primary, secondary } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[styles.vanity, { backgroundColor: primary}]}
      >
        <Text style={[styles.status, { color: background }]}>{type}</Text>
        <Text style={[styles.name, { color: background }]}>{name}</Text>
        <Text style={[{ color: secondary }]}>{chance}%</Text>
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
  status: {
    fontWeight: "800",
    fontSize: 22,
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
  },
});
