import { ScrollView, StyleSheet, View, SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { router } from "expo-router";
import Button from "@/components/Button";
import useCreateHabitStore from "@/stores/useCreateHabitStore";
import habits from "@/constants/Habits";
import useTheme from "@/hooks/useTheme";

const Goal = () => {
  const { habit, setHabit } = useCreateHabitStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [goal, setGoal] = useState<string>("");

  const { background, text } = useTheme();

  const handleNavigateDuration = async () => {
    try {
      setLoading(true);

      setHabit({ ...habit, goal: goal });
      router.navigate("/(habit)/duration");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <InputField
            value={goal}
            onChangeText={setGoal}
            placeholder="e.g. Read at least 1 page a day"
          />
          <View style={styles.habitContainer}>
            <Text style={[styles.label, { color: text }]}>{habit?.name}</Text>
            <Text style={[styles.secondary, { color: text, opacity: 0.7 }]}>
              {habits[habit?.type || ""].name}
            </Text>
          </View>
          <Button
            isDisabled={!goal || loading}
            title="Continue"
            onPress={handleNavigateDuration}
            backgroundColor={text}
            color={background}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding: 10,
    paddingTop: 0,
  },
  contentContainer: {
    gap: 10,
  },
  habitContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  secondary: {
    fontSize: 14,
    fontWeight: "500",
  },
});
