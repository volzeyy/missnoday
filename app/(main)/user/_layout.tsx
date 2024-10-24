import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native';

const Layout = () => {
  const { background, text } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: background},
        headerTitleStyle: {
          color: text,
          fontSize: 24,
          fontWeight: "800"
        },
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity style={{ paddingRight: 10}} onPress={() => {router.dismiss()}}>
            <Ionicons size={28} color={"black"} name="arrow-back" />
          </TouchableOpacity>
        ),
        headerShadowVisible: false,
        contentStyle: {backgroundColor: background},
      }}
    >
        <Stack.Screen name="[slug]" />
    </Stack>
  )
}

export default Layout