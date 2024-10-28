import Friends from '@/components/Friends';
import Scene from '@/components/Scene';
import useTheme from '@/hooks/useTheme';
import useCharacterStore from '@/stores/useCharacterStore';
import useHabitsStore from '@/stores/useHabitsStore';
import useUserStore from '@/stores/useUserStore';
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Vector3 } from 'three';
import HabitGroup from "@/components/HabitGroup/HabitGroup";
import useColorsStore from '@/stores/useColorsStore';
import { Suspense, useState } from 'react';
import User from '@/components/User/User';
import HabitAction from '@/components/HabitAction';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const { background } = useTheme()

  const { user, setUser } = useUserStore();
  const { character } = useCharacterStore();
  const { colors } = useColorsStore();
  const { habits } = useHabitsStore();

  const pendingHabits = habits?.filter(
    (habit) => !habit.is_done_today && !habit.is_expired
  );
  const completedHabits = habits?.filter(
    (habit) => habit.is_done_today && !habit.is_expired
  );

  return (
    <View style={[styles.container, {backgroundColor: background, paddingTop: insets.top}]}>
      <View style={{ flex: 1, width: "100%"}}>
        <View style={[styles.avatarContainer, loading ? {opacity: 0.5} : null]}>
          <User 
            user={user}
            isRow
          />
        </View>
        <Suspense>
          <Scene 
            cameraPos={new Vector3(0, 3.5, 8)}
            colors={colors}
            character={character}
          />
        </Suspense>
      </View>
      {(pendingHabits && pendingHabits.length > 0) || 
       (completedHabits && completedHabits.length > 0) ? (
        <View style={styles.scrollViewContainer}>
            <ScrollView 
              contentContainerStyle={styles.habitsContainer} 
              showsHorizontalScrollIndicator={false}
              horizontal 
            >
              {pendingHabits && pendingHabits.length > 0 && (
                <HabitGroup
                  label="Pending"
                  habitGroup={pendingHabits}
                  direction="row"
                />
              )}
              {completedHabits && completedHabits.length > 0 && (
                <HabitGroup
                  label={pendingHabits?.length == 0 ? "Done for today!" : "Completed"}
                  habitGroup={completedHabits}
                  direction="row"
                />
              )}
            </ScrollView>
          </View>
      ) : (
        <View style={styles.callToActionContainer}>
          <HabitAction />
        </View>
      )}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    left: 10,
    bottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  scrollViewContainer: {
    width: "100%",
    zIndex: 100,
  },
  habitsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  groupContainer: {
    display: "flex",
    gap: 10,
  },
  groupHeader: {
    fontSize: 16,
  },
  avatarContainer: {
    width: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    zIndex: 10,
    padding: 10,
    paddingTop: 20,
    justifyContent: "center"
  },
  callToActionContainer: {
    paddingBottom: 20,
  }
})