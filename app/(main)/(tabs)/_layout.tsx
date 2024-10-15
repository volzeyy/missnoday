import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useTheme from '@/hooks/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Layout = () => {
  const { primary, background } = useTheme()

  const insets = useSafeAreaInsets();

  return (
    <Tabs
        safeAreaInsets={{ top: insets.top }}
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: primary,
            tabBarStyle: {
                backgroundColor: background
            }
        }}
    >
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />
            }}
        />
        <Tabs.Screen
            name="habits"
            options={{
                title: 'Habits',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="script-text" color={color} />
            }}
        />
        <Tabs.Screen 
            name="treasure"
            options={{
                title: 'Treasure',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="treasure-chest" color={color} />
            }}
        />
    </Tabs>
  )
}

export default Layout

const styles = StyleSheet.create({})