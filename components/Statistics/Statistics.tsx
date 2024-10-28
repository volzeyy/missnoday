import { StyleSheet, Text, View } from "react-native";
import useFetchStatistics from "@/hooks/useFetchStatistics";
import useStatisticsStore from "@/stores/useStatisticsStore";
import { useEffect } from "react";

const Statistics = (props: { user_id?: string }) => {
  const { user_id } = props;

  const { statistics, setStatistics } = useStatisticsStore();

  const statisticsData = useFetchStatistics(user_id);

  useEffect(() => {
    if (statisticsData) {
      setStatistics(statisticsData);
    }
  }, [statisticsData])

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={[styles.columnContainer]}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Highest streak</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>{statistics?.highest_streak}</Text>
          </View>
        </View>
        <View style={[styles.columnContainer]}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Active Habits</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>{statistics?.habits_focused_on}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.columnContainer]}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Habits done</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>{statistics?.habits_done}</Text>
          </View>
        </View>
        <View style={[styles.columnContainer]}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Habits not done</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>{statistics?.habits_not_done}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    gap: 10,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  columnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 20,
    padding: 10,
    paddingVertical: 15,
    gap: 5,
    flexGrow: 1,
    backgroundColor: "black"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    fontSize: 16,
    color: "white",
    fontWeight: "800",
  },
});
