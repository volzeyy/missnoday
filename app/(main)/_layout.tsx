import useFetchCharacter from '@/hooks/useFetchCharacter';
import useFetchColors from '@/hooks/useFetchColors';
import useFetchHabits from '@/hooks/useFetchHabits';
import useFetchUser from '@/hooks/useFetchUser';
import useTheme from '@/hooks/useTheme'
import useCharacterStore from '@/stores/useCharacterStore';
import useColorsStore from '@/stores/useColorsStore';
import useHabitsStore from '@/stores/useHabitsStore';
import useSessionStore from '@/stores/useSessionStore';
import useUserStore from '@/stores/useUserStore';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native'

const Layout = () => {
    const { background } = useTheme();

    const { session } = useSessionStore();
    const { setUser } = useUserStore();
    const { setCharacter } = useCharacterStore();
    const { setHabits } = useHabitsStore();
    const { colors, setColors } = useColorsStore();

    const userData = useFetchUser(session?.user.id)
    const habitsData = useFetchHabits(session?.user.id)
    const characterData = useFetchCharacter(session?.user.id)
    const colorsData = useFetchColors(session?.user.id)

    useEffect(() => {
        if (!userData) {
            return;
        }

        setUser(userData);
    }, [userData])

    useEffect(() => {
        if (!characterData) {
            return;
        }

        setCharacter(characterData);
    }, [characterData])

    useEffect(() => {
        if (!habitsData) {
            return;
        }

        setHabits(habitsData);
    }, [habitsData])

    useEffect(() => {
        if (!colorsData) {
            return;
        }

        setColors(colorsData);
    }, [colorsData])

    return (
        <Stack
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: background },
            contentStyle: { backgroundColor: background },
            headerLeft: () => (
              <TouchableOpacity style={{ paddingRight: 10}} onPress={() => {router.dismiss()}}>
                <Ionicons size={28} color={"black"} name="arrow-back" />
              </TouchableOpacity>
            ),
          }}
        >
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
                options={{
                    title: "Contents",
                    headerShown: true,
                }}
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