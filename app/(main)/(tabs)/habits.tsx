import { ScrollView, StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import useHabitsStore from "@/stores/useHabitsStore";
import Habit from "@/components/Habit";
import HABITS from "@/constants/Habits";
import RoundButton from "@/components/RoundButton";
import useTheme from "@/hooks/useTheme";
import Statistics from "@/components/Statistics";
import useUserStore from "@/stores/useUserStore";
import HabitGroup from "@/components/HabitGroup/HabitGroup";

const Habits = () => {
  const { user } = useUserStore();
  const { habits } = useHabitsStore();

  const { background } = useTheme();

  const pendingHabits = habits?.filter(
    (habit) => !habit.is_done_today && !habit.is_expired
  );
  const completedHabits = habits?.filter(
    (habit) => habit.is_done_today && !habit.is_expired
  );
  const expiredHabits = habits?.filter((habit) => habit.is_expired);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Statistics user_id={user?.id} />
        {pendingHabits && pendingHabits.length > 0 && (
          <HabitGroup
            label="Pending"
            habitGroup={pendingHabits}
          />
        )}
        {completedHabits && completedHabits.length > 0 && (
          <HabitGroup 
            label={pendingHabits?.length == 0 ? "Done for today!" : "Completed"}
            habitGroup={completedHabits}
          />
        )}
        {expiredHabits && expiredHabits.length > 0 && (
          <HabitGroup 
            label="Expired"
            habitGroup={expiredHabits}
          />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <RoundButton
          onPress={() => {
            router.navigate("/(habit)");
          }}
          icon="add"
        />
      </View>
    </View>
  );
};

export default Habits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  scrollViewContainer: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 20,
    padding: 10,
    paddingTop: 0,
    minHeight: "100%",
  },
  tipContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: 20,
    flex: 1,
  },
  tipHeaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10,
    paddingLeft: 10,
  },
});
