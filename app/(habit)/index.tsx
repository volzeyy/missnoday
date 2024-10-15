import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import habits from "@/constants/Habits";
import HabitType from "@/components/HabitType";
import HabitSelect from "@/components/HabitSelect";

const Page = () => {
  const [activeType, setActiveType] = useState<string>("all");
  const [activeHabit, setActiveHabit] = useState<string>("");
  
  // Combine all habits from all categories for the "all" selection
  const allHabits = Object.keys(habits).flatMap((type) =>
    habits[type].habits.map((habit: any) => ({ ...habit, habitType: type })) // Add habitType manually
  );

  return (
    <View style={[styles.container]}>
      <View>
          <View style={styles.scrollViewVanityTypesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.vanityTypesContainer}
            >
              {/* Add "All" option manually */}
              <HabitType
                type="all"
                icon="star" // Icon for "all"
                key="all"
                title="All"
                setActiveType={setActiveType}
                activeType={activeType}
              />
              {Object.keys(habits).map((type) => (
                <HabitType
                  type={type}
                  icon={habits[type].icon}
                  key={type}
                  title={habits[type].name}
                  setActiveType={setActiveType}
                  activeType={activeType}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.habitsContainer}>
          {/* If "all" is selected, show all habits and pass the actual habit type */}
          {(activeType === "all"
            ? allHabits
            : habits[activeType].habits.map((habit: any) => ({ ...habit, habitType: activeType })))
            .map((habit: any, index: any) => (
              <HabitSelect
                key={habit.name}
                name={habit.name}
                icon={habit.icon}
                // Pass habitType if "all" is selected, otherwise activeType
                type={habit.habitType || activeType} 
                activeHabit={activeHabit}
                setActiveHabit={setActiveHabit}
                index={index}
              />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  scrollViewContainer: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 8
  },
  scrollViewVanityTypesContainer: {
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 0,
    gap: 10,
  },
  vanityTypesContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingBottom: 4,
    paddingTop: 1,
    gap: 10,
    paddingLeft: 10,
  },
  habitsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});
