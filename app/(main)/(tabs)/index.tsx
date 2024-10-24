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
import { Suspense } from 'react';

const Home = () => {
  const insets = useSafeAreaInsets();
  const { background } = useTheme()

  const { user } = useUserStore();
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
      <Friends 
        user={user || undefined}
      />
      <View style={{ flex: 1, width: "100%"}}>
        <Suspense>
          <Scene 
            cameraPos={new Vector3(0, 2.7, 6.5)}
            colors={colors}
            character={character}
          />
        </Suspense>
      </View>
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
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  },
  groupContainer: {
    display: "flex",
    gap: 10,
  },
  groupHeader: {
    fontSize: 16,
  },
})