import Scene from '@/components/Scene';
import useTheme from '@/hooks/useTheme';
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Vector3 } from 'three';
import HabitGroup from "@/components/HabitGroup/HabitGroup";
import { Suspense } from 'react';
import { useLocalSearchParams } from 'expo-router';
import useFetchHabits from '@/hooks/useFetchHabits';
import Statistics from '@/components/Statistics';
import User from '@/components/User/User';
import Tip from '@/components/Tip';

const Home = () => {
  const insets = useSafeAreaInsets();
  const { background } = useTheme()

  const { slug } = useLocalSearchParams();

  const userId = Array.isArray(slug) ? slug[0] : slug

  const habits = useFetchHabits(userId);

  const pendingHabits = habits?.filter(
    (habit) => !habit.is_done_today && !habit.is_expired
  );
  const completedHabits = habits?.filter(
    (habit) => habit.is_done_today && !habit.is_expired
  );

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <View style={[styles.userContainer, {backgroundColor: background}]}>
        <User 
          user_id={userId}
          isRow={true}
        />
      </View>
      <View style={{ flex: 1, width: "100%"}}>
        <Suspense>
          <Scene 
            cameraPos={new Vector3(0, 3, 7)}
            user_id={userId}
          />
        </Suspense>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Statistics user_id={userId} />
      </View>
      {habits && habits.length ?
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
      : 
        <View style={{ padding: 10, paddingBottom: 40}}>
          <Tip 
            title="No habits yet!"
            tip="User hasn't created any habits yet."
          />
        </View>
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
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
    paddingHorizontal: 10,
  },
  groupContainer: {
    display: "flex",
    gap: 10,
  },
  groupHeader: {
    fontSize: 16,
  },
  userContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "transparent",
    top: 10,
    zIndex: 10,
    paddingBottom: 10,
  }
})