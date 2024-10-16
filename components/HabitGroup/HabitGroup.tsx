import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HabitsProps from "@/types/HabitProps";
import Habit from "../Habit";
import HABITS from "@/constants/Habits";

const HabitGroup = (props: any) => {
  const { habitGroup, label, direction } = props;

  return (
    <View style={styles.groupContainer}>
      <Text style={styles.groupHeader}>
        {label}
      </Text>
      <View style={[styles.habitsContainer, direction == "row" ? {flexDirection: "row"} : null]}>
        {habitGroup.map((habit: HabitsProps) => (
          <Habit
            key={habit.id}
            habit_id={habit.id}
            name={habit.name}
            goal={habit.goal}
            duration={habit.duration}
            createdAt={habit.created_at}
            typeName={HABITS[habit.type].name}
            isDoneToday={habit.is_done_today}
          />
        ))}
      </View>
    </View>
  );
};

export default HabitGroup;

const styles = StyleSheet.create({
    groupContainer: {
        display: "flex",
        gap: 10,
    },
    groupHeader: {
        fontSize: 16,
    },
    habitsContainer: {
        display: "flex",
        width: "100%",
        gap: 20,
    },
});
