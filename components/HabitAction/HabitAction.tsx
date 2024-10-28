import { StyleSheet, Text, View } from "react-native";
import Tip from "../Tip";
import { TouchableOpacity } from "react-native";
import useTheme from "@/hooks/useTheme";
import { router } from "expo-router";

const HabitAction = () =>  {
  const { text, background } = useTheme();

  const handleNavigateToCreateHabit = () => {
    router.navigate("/(habit)/");
  };

  return (
    <View style={{ gap: 20, justifyContent: "center", alignItems: "center" }}>
      <Tip title="No habits 🧐" tip="Start by creating a habit to focus on!" />
      <TouchableOpacity
        style={{ padding: 10, borderRadius: 10, backgroundColor: text }}
        onPress={handleNavigateToCreateHabit}
      >
        <Text style={{ color: background, textAlign: "center" }}>
          Create a habit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HabitAction;

const styles = StyleSheet.create({});
