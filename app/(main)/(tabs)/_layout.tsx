import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'

const Layout = () => {
  return (
    <Tabs
        screenOptions={{
            headerShown: false
        }}
    >
        <Tabs.Screen 
            name="index"
        />
        <Tabs.Screen
            name="habits"
        />
        <Tabs.Screen 
            name="treasure"
        />
    </Tabs>
  )
}

export default Layout

const styles = StyleSheet.create({})