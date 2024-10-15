import useTheme from "@/hooks/useTheme"
import { Ionicons } from "@expo/vector-icons"
import { router, Stack } from "expo-router"
import { Text, TouchableOpacity, StyleSheet } from "react-native"

const Layout = () => {
  const { background, text } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        contentStyle: {backgroundColor: background },
        headerStyle: { backgroundColor: background },
        headerLeft: () => (
          <TouchableOpacity style={{ paddingRight: 10}} onPress={() => {router.dismiss()}}>
            <Ionicons size={28} color={text} name="arrow-back" />
          </TouchableOpacity>
        ),
      }}
    >
        <Stack.Screen 
          name="index"
          options={{
            title: "Choose a Habit",
          }}
        />
        <Stack.Screen 
          name="goal"
          options={{
            title: "Set a Goal",
          }}
        />
        <Stack.Screen 
          name="duration"
          options={{
            title: "Pick a Duration",
          }}
        />
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({
  title: {
      width: "100%",
      fontWeight: "600",
      fontSize: 24,
  }
})