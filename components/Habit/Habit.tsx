import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import useUserStore from "@/stores/useUserStore";
import calculateDaysRemaining from "@/helpers/calculateDaysRemaining";
import { FontAwesome } from "@expo/vector-icons";
import useHabitsStore from "@/stores/useHabitsStore";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotiView } from "moti";
import confetti from "@/assets/lottie/confetti2.json";
import { supabase } from "@/config/supabase";
import useStatisticsStore from "@/stores/useStatisticsStore";

const Habit = (props: any) => {
  const {
    user_id,
    habit_id,
    name,
    goal,
    duration,
    typeName,
    isExpired,
    isDoneToday,
    createdAt,
  } = props;

  const [completed, setCompleted] = useState(false);

  const { text, background } = useTheme();
  const { user, setUser } = useUserStore();
  const { habits, setHabits } = useHabitsStore();
  const { statistics, setStatistics } = useStatisticsStore();

  const animation = useRef<LottieView>(null);

  const handleCompleteHabit = async () => {
    try {
      if (isDoneToday || isExpired) {
        return;
      }

      if (user_id && !user) {
        return;
      }

      if (!user_id && !user.id) {
        setCompleted(true);
        return;
      }

      if (user && user_id !== user.id) {
        return;
      }

      if (!user || !user.id) {
        return;
      }

      const { error } = await supabase.rpc("complete_habit", {
        current_user_id: user.id,
        current_habit_id: habit_id,
      });

      if (error) {
        throw error.message;
      }

      setCompleted(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdateState = () => {
    const allHabitsDoneToday = habits.every((habit) => habit.is_done_today === false);
    if (allHabitsDoneToday) {
      setStatistics({
      ...statistics,
        highest_streak: (statistics.highest_streak || 0) + 1,
        habits_done: (statistics.habits_done || 0) + 1,
      });
    } else {
      setStatistics({
        ...statistics,
        habits_done: (statistics.habits_done || 0) + 1,
      })  
    }

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habit_id ? { ...habit, is_done_today: true } : habit
      )
    );

    setUser({...user, coins: (user.coins ?? 0) + 100});
  };

  useEffect(() => {
    animation.current?.play();
  }, [completed]);

  return (
    <View style={{ overflow: "visible" }}>
      <TouchableOpacity onPress={handleCompleteHabit}>
        <AnimatePresence>
          <MotiView
            from={{ opacity: 0 }}
            animate={{
              opacity: completed ? 0 : 1,
              rotateY: completed ? "360deg" : "0deg",
              scale: completed ? 0.8 : 1,
            }}
            transition={{ type: "timing", duration: 600 }}
            style={[
              styles.container,
              { backgroundColor: "black" },
              isDoneToday || isExpired
                ? { backgroundColor: "transparent", borderWidth: 2 }
                : {},
            ]}
          >
            <View style={[styles.statusContainer]}>
              <View
                style={[
                  styles.status,
                  isDoneToday || isExpired
                    ? { backgroundColor: "transparent", borderColor: text }
                    : { borderColor: background },
                ]}
              >
                {isDoneToday || isExpired ? (
                  <FontAwesome
                    name={isExpired ? "times" : "check"}
                    size={24}
                    color={text}
                  />
                ) : null}
              </View>
            </View>
            <View style={[styles.contentContainer]}>
              <View style={styles.goalContainer}>
                <Text
                  style={[
                    styles.goal,
                    { color: background },
                    isDoneToday
                      ? {
                          textDecorationLine: "line-through",
                          fontWeight: "400",
                          color: text,
                        }
                      : {},
                    isExpired
                      ? { textDecorationLine: "none", color: text }
                      : {},
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
                          ? {
                              textDecorationLine: "line-through",
                              fontWeight: "400",
                              color: text,
                            }
                          : {},
                        isExpired
                          ? { textDecorationLine: "none", color: text }
                          : {},
                      ]}
                    >
                      {name}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.duration,
                      isDoneToday || isExpired
                        ? { backgroundColor: text }
                        : { backgroundColor: background },
                    ]}
                  >
                    <Text
                      style={[
                        { color: text, fontSize: 10 },
                        isDoneToday || isExpired ? { color: background } : null,
                      ]}
                    >
                      {isExpired
                        ? `${duration} days`
                        : `${calculateDaysRemaining(
                            createdAt,
                            duration
                          )} days left`}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.secondary,
                    { color: background, opacity: 0.75 },
                    isDoneToday
                      ? {
                          textDecorationLine: "line-through",
                          color: text,
                          fontWeight: "400",
                        }
                      : null,
                    isExpired
                      ? { textDecorationLine: "none", color: text }
                      : {},
                  ]}
                >
                  {typeName}
                </Text>
              </View>
            </View>
          </MotiView>
        </AnimatePresence>
      </TouchableOpacity>
      {completed ? (
        <LottieView
          autoPlay={false}
          loop={false}
          ref={animation}
          onAnimationFinish={handleUpdateState}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            transform: "scale(3)",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={confetti}
        />
      ) : null}
    </View>
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 100,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  secondary: {
    fontSize: 12,
    fontWeight: "600",
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
    fontWeight: "800",
  },
});
