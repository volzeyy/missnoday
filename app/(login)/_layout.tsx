import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const Layout = () => {
  const { text, background } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: background, 
          padding: 10, 
        },
        headerStyle: { 
          backgroundColor: background 
        },
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
            title: "Log In"
          }} 
        />
    </Stack>
  )
}

export default Layout