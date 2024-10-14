import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="goal" />
        <Stack.Screen name="duration" />
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})