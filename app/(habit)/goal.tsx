import { ScrollView, StyleSheet, View, SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { router } from "expo-router";
import Button from "@/components/Button";
import useCreateHabitStore from "@/stores/useCreateHabitStore";
import habits from "@/constants/Habits";
import useTheme from "@/hooks/useTheme";
import openai from "@/config/openai";

const Goal = () => {
  const { habit, setHabit } = useCreateHabitStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [goal, setGoal] = useState<string>("");

  const { primary, background, text, accent } = useTheme();

  const handleNavigateDuration = async () => {
    try {
      setLoading(true);

      const isValid = await checkHabitGoal();

      if (!isValid) {
        throw new Error(
          "AI thinks the goal you entered is invalid. Try and give a straight forward goal."
        );
      }

      setHabit({ ...habit, goal: goal });
      router.navigate("/(habit)/duration");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  async function checkHabitGoal(): Promise<boolean> {
    if (!goal) {
      return false;
    }

    if (!goal.length || goal.length > 128) {
      return false;
    }

    const typeName = habits[habit?.type || ""].name;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Evaluate the following text input to determine if it is a valid habit goal. A valid habit goal must be clear, specific, and actionable.",
        },
        {
          role: "user",
          content: `Instruction: Return true or false; Input: Habit Name: ${habit?.name}, Habit Type: ${typeName}, User Goal: "${goal}"\nIs this a valid habit goal?; Output:`,
        },
      ],
      temperature: 0.0,
      max_tokens: 10,
      top_p: 1,
    });

    if (completion.choices[0].message.content == null) {
      throw new Error(
        "The habit goal validator returned no response. Please try again."
      );
    }

    const answer = completion.choices[0].message.content.trim().toLowerCase();

    if (answer == "true") {
      return true;
    } else {
      return false;
    }
  }

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
            backgroundColor={primary}
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
