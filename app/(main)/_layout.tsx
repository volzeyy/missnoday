import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const Layout = () => {
    const { background, text } = useTheme();

    return (
        <Stack
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: background },
            contentStyle: { backgroundColor: background },
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
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="friends"
                options={{
                    title: "Add Friends",
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="user" 
            />
            <Stack.Screen 
                name="treasurechest" 
            />
            <Stack.Screen 
                name="contents" 
            />
            <Stack.Screen 
                name="settings" 
            />
            <Stack.Screen 
                name="customize" 
                options={{
                    title: "Customize",
                    headerShown: true,
                }}
            />
        </Stack>
      )
}

export default Layout