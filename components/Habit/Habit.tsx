import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import useTheme from "../../hooks/useTheme";

const Habit = (props: any) => {
  const { 
    habit_id, 
    name, 
    goal,
    duration,
    typeName, 
    isDoneToday, 
    createdAt, 
    onPress 
  } = props;

  const { text, background, primary, secondary } = useTheme();

  const calculateRemainingDays = (date: string, duration: number) => {
    const createdDate: Date = new Date(date);
    const currentDate: Date = new Date();
    const elapsedDays = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(duration - elapsedDays, 0);
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress && onPress} 
    >
      <View style={styles.container}> 
        <View style={[styles.contentContainer, {backgroundColor: primary}, isDoneToday ? {opacity: 0.5, backgroundColor: "black"} : null]}>
          <View style={styles.headerContainer}>
            <View style={[styles.infoContainer]}>
              <View> 
                <Text style={[styles.name, { color: background }]}>{name}</Text>
              </View>
              <View
                style={[
                  styles.duration,
                  { backgroundColor: secondary },
                  isDoneToday ? { backgroundColor: "rgba(0, 0, 0, 0.3)"} : null,
                ]}
              >
                <Text style={[{color: text, fontSize: 12}, isDoneToday ? {color: "white"} : null]}>
                  {`${calculateRemainingDays(createdAt, duration)} days left`}
                </Text>
              </View>
            </View>
            <Text style={[styles.secondary, { color: secondary }, isDoneToday ? {color: background} : null]}>{typeName}</Text>
          </View>
          <Text style={[styles.goal, { color: background }]}>{goal}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};



export default Habit;

const styles = StyleSheet.create({
  container: {
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secondary: {
    fontSize: 12,
  },
  duration: {
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  headerContainer: {
    display: "flex",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  goal: {
    fontSize: 24,
    paddingLeft: 10,
    paddingBottom: 10,
    borderRadius: 5,
    fontStyle: "italic",
    fontWeight: "600",
  },
  contentContainer: {
    padding: 10,
    paddingVertical: 20,
    gap: 10,
    borderRadius: 20,
  },
});
