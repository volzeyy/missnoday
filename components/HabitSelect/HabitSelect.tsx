import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useCreateHabitStore from "@/stores/useCreateHabitStore";
import { router } from "expo-router";
import useTheme from "@/hooks/useTheme";

const { width } = Dimensions.get("window");

const HabitSelect = ({
  name,
  icon,
  type,
  activeHabit,
  setActiveHabit,
  index,
}: any) => {
  const { habit, setHabit } = useCreateHabitStore();

  const { text, background } = useTheme();

  const handleHabitSelect = () => {
    setActiveHabit(name);
    setHabit({ ...habit, name: name, type: type });
    router.navigate("/(habit)/goal");
  };

  if (name == activeHabit) {
    return (
      <View
        style={[
          styles.wrapper,
          index % 2 == 0 ? { paddingLeft: 10, paddingRight: 5 } : {},
          index % 2 == 1 ? { paddingRight: 10, paddingLeft: 5 } : {},
        ]}
      >
        <TouchableOpacity
          style={[
            styles.container,
            { backgroundColor: text, borderColor: text, borderWidth: 2 },
          ]}
          onPress={() => {
            setActiveHabit("");
          }}
        >
          <Text style={[styles.text, { color: background }]}>{name}</Text>
          <MaterialCommunityIcons
            name={icon}
            style={[{ color: background }]}
            size={28}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        index % 2 == 0 ? { paddingLeft: 10, paddingRight: 5 } : {},
        index % 2 == 1 ? { paddingRight: 10, paddingLeft: 5 } : {},
      ]}
    >
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: "transparent", borderColor: text, borderWidth: 2 },
        ]}
        onPress={handleHabitSelect}
      >
        <Text style={[styles.text, { color: text }]}>{name}</Text>
        <MaterialCommunityIcons name={icon} size={28} color={text} />
      </TouchableOpacity>
    </View>
  );
};

export default HabitSelect;

const styles = StyleSheet.create({
  wrapper: {
    width: width / 2,
    paddingBottom: 10,
  },
  container: {
    padding: 10,
    aspectRatio: 1,
    borderRadius: 15,
    gap: 5,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
  },
});
