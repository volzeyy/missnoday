import { ScrollView, StyleSheet, View, SafeAreaView, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useCreateHabitStore from "@/stores/useCreateHabitStore";
import Option from "@/components/Option";
import DURATION from "@/constants/Duration";
import Info from "@/components/Info";
import useTheme from "@/hooks/useTheme";
import useUserStore from "@/stores/useUserStore";
import { supabase } from "@/config/supabase";
import { router } from "expo-router";
import useHabitsStore from "@/stores/useHabitsStore";
import useStatisticsStore from "@/stores/useStatisticsStore";
import useSessionStore from "@/stores/useSessionStore";

const Duration = () => {
  const [selected, setSelected] = useState<number | null>(null)
  
  const { session } = useSessionStore();
  const { habit, setHabit } = useCreateHabitStore()
  const { setHabits } = useHabitsStore();
  const { statistics, setStatistics } = useStatisticsStore();
  const { user } = useUserStore();

  const { background } = useTheme();

  useEffect(() => {
    if (selected) {
      setHabit({ ...habit, duration: selected });
      handleCreateHabit();
    }
  }, [selected])

  async function handleCreateHabit() {
    try {
      if (!habit || !selected) {
        return;
      }
  
      if (session && session.user.id) {
        const { data, error } = await supabase.from("habits").insert({
          user_id: user.id,
          name: habit.name,
          type: habit.type,
          duration: selected,
          goal: habit.goal,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
    
        if (error) {
          throw error.message;
        }

        setHabits((prev) => {
          return [
            ...prev,
            data
          ];
        })

        setStatistics({...statistics,
          habits_focused_on: (statistics.habits_focused_on ?? 0) + 1
        })

        router.navigate("/(main)/(tabs)/habits");
        return;
      }

      setHabits((prev) => {
        return [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            name: habit.name,
            type: habit.type,
            duration: selected,
            goal: habit.goal,
            created_at: new Date().toISOString(),
            is_done_today: false,
            is_expired: false,
          },
        ];
      });

      setStatistics({...statistics,
        habits_focused_on: (statistics.habits_focused_on ?? 0) + 1
      })

      router.navigate("/(main)/(tabs)/habits");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.optionsContainer}>
            {DURATION.map((d) => (
              <Option 
                option={d.title}
                value={d.days}
                selected={selected}
                setSelected={setSelected}
                key={d.days}
              />
            ))}
          </View>
          <View style={styles.infoContainer}>
            <Info text="You cannot edit or delete the habit. It will stay there until the amount of days you've selected have passed" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Duration;

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
  optionsContainer: {
    display: "flex",
    gap: 20,
  },
  extrasContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  infoContainer: {
    display: "flex",
    width: "100%",
    paddingRight: 20
  }
});
