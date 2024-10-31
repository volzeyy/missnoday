import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import useTheme from '@/hooks/useTheme';

const Streak = (props: any) => {
  const { days } = props;

  const { text} = useTheme();
  
  return (
    <View style={[styles.streakContainer]}>
        <Ionicons 
          name="flame" 
          size={18} 
          style={[
            {color: text},
          ]} 
        />
        <Text 
          style={[
            styles.text,
            {color: text},
          ]}
        >{days}</Text>
    </View>
  )
}

export default Streak

const styles = StyleSheet.create({
    streakContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
    },
})