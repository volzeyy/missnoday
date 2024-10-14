import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const Layout = () => {
    const { background, text } = useTheme()

    return (
      <Stack
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
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
            title: "Create an Account",
          }}
        />
        <Stack.Screen 
          name="email" 
          options={{
            title: "Enter your Email",
          }}
        />
        <Stack.Screen 
          name="password"
          options={{
            title: "Create a Password",
          }}
        />
        <Stack.Screen 
          name="verify"
          options={{
            title: "Token sent to your email!",
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