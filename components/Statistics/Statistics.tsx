import { StyleSheet, Text, View } from 'react-native'
import useFetchStatistics from '@/hooks/useFetchStatistics';
import useTheme from '@/hooks/useTheme';

const Statistics = (props: {user_id: string | undefined}) => {
  const { user_id } = props;

  const { secondary } = useTheme();

  const statisticsData = useFetchStatistics(user_id);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={[styles.columnContainer]}>
            <Text>Highest streak</Text>
            <Text>{statisticsData?.highest_streak}</Text>
        </View>
        <View style={[styles.columnContainer]}>
            <Text>Active Habits</Text>
            <Text>{statisticsData?.habits_focused_on}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.columnContainer]}>
            <Text>Habits done</Text>
            <Text>{statisticsData?.habits_done}</Text>
        </View>
        <View style={[styles.columnContainer]}>
            <Text>Habits not done</Text>
            <Text>{statisticsData?.habits_not_done}</Text>
        </View>
      </View>
    </View>
  )
}

export default Statistics

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        padding: 10,
        paddingVertical: 20,
        borderRadius: 20,
        flexGrow: 1,
        backgroundColor: "rgb(225, 224, 227)"
    }
})