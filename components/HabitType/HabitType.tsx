import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import useTheme from '@/hooks/useTheme'

const HabitType = ({title, icon, type, activeType, setActiveType}: any) => {
  const outlineIcon = `${icon}-outline`

  const { background, primary, secondary } = useTheme();

  if (activeType == type) {
    return (
        <View style={[styles.type, {backgroundColor: primary}]}>
            <Text style={[{color: background, fontWeight: "800"}]}>{title}</Text>
            <Ionicons name={icon} style={[{color: background}]} size={18} />
        </View>
    )
  }

  return (
    <TouchableOpacity
        style={[styles.type, {backgroundColor: secondary}]}
        onPress={() => setActiveType(type)}
    >
        <Text>{title}</Text>
        <Ionicons name={outlineIcon as any} size={18} />
    </TouchableOpacity>
  )
}

export default HabitType

const styles = StyleSheet.create({
    type: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        gap: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})