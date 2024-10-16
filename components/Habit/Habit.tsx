import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import useUserStore from "@/stores/useUserStore";
import { supabase } from "@/config/supabase";
import calculateDaysRemaining from "@/helpers/calculateDaysRemaining";
import { FontAwesome } from "@expo/vector-icons";
const Habit = (props: any) => {
  const { habit_id, name, goal, duration, typeName, isExpired, isDoneToday, createdAt } =
    props;
  const { text, background, primary, secondary } = useTheme();
  const { user } = useUserStore();
  const handleCompleteHabit = async () => {
    try {
      if (!user || !habit_id) {
        return;
      }
      const { error } = await supabase.rpc("complete_habit", {
        current_user_id: user.id,
        current_habit_id: habit_id,
      });
      if (error) {
        throw error.message;
      }
      alert("habit completed!");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handleCompleteHabit}>
      <View
        style={[
          styles.container,
          { backgroundColor: primary },
          isDoneToday || isExpired ? { backgroundColor: "rgb(225, 224, 227)" } : {},
        ]}
      >
        <View style={styles.statusContainer}>
          <View style={styles.status}>
            <FontAwesome
              name={isExpired ? "times" : "check"}
              size={24}
              color={isDoneToday || isExpired ? text : primary}
            />
          </View>
        </View>
        <View style={[styles.contentContainer]}>
          <View style={styles.goalContainer}>
            <Text
              style={[
                styles.goal,
                { color: background },
                isDoneToday
                  ? { textDecorationLine: "line-through", color: text }
                  : {},
                isExpired ? { textDecorationLine: "none", color: text } : {}
              ]}
            >
              {goal}
            </Text>
          </View>
          <View style={styles.headerContainer}>
            <View style={[styles.infoContainer]}>
              <View>
                <Text
                  style={[
                    styles.name,
                    { color: background },
                    isDoneToday
                      ? { textDecorationLine: "line-through", color: text }
                      : {},
                    isExpired ? { textDecorationLine: "none", color: text } : {},
                  ]}
                >
                  {name}
                </Text>
              </View>
              <View
                style={[
                  styles.duration,
                  { backgroundColor: secondary },
                  isDoneToday || isExpired
                    ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                    : null,
                ]}
              >
                <Text style={[{ color: text, fontSize: 10 }]}>
                  {`${calculateDaysRemaining(createdAt, duration)} days left`}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.secondary,
                { color: secondary },
                isDoneToday
                  ? { textDecorationLine: "line-through", color: text }
                  : null,
                  isExpired ? { textDecorationLine: "none", color: text } : {}
              ]}
            >
              {typeName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Habit;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "auto",
    borderRadius: 20,
  },
  contentContainer: {
    paddingVertical: 15,
    paddingRight: 20,
    gap: 10,
  },
  statusContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  status: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 14,
  },
  secondary: {
    fontSize: 12,
  },
  duration: {
    padding: 4,
    paddingHorizontal: 7,
    borderRadius: 100,
  },
  headerContainer: {
    display: "flex",
    gap: 4,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  goalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  goal: {
    fontSize: 16,
    fontWeight: "600",
  },
});
