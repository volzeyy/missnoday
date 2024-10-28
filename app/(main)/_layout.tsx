import useFetchCharacter from '@/hooks/useFetchCharacter';
import useFetchColors from '@/hooks/useFetchColors';
import useFetchFriends from '@/hooks/useFetchFriends';
import useFetchHabits from '@/hooks/useFetchHabits';
import useFetchUnlocks from '@/hooks/useFetchUnlocks';
import useFetchUser from '@/hooks/useFetchUser';
import useTheme from '@/hooks/useTheme'
import useCharacterStore from '@/stores/useCharacterStore';
import useColorsStore from '@/stores/useColorsStore';
import useFriendsStore from '@/stores/useFriendsStore';
import useHabitsStore from '@/stores/useHabitsStore';
import useSessionStore from '@/stores/useSessionStore';
import useUnlocksStore from '@/stores/useUnlocksStore';
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
    const { habits, setHabits } = useHabitsStore();
    const { setColors } = useColorsStore();
    const { setUnlocks } = useUnlocksStore();
    const { setFriends } = useFriendsStore();

    const userData = useFetchUser(session?.user.id)
    const habitsData = useFetchHabits(session?.user.id)
    const characterData = useFetchCharacter(session?.user.id)
    const colorsData = useFetchColors(session?.user.id)
    const friendsData = useFetchFriends(session?.user.id)
    const unlocksData = useFetchUnlocks(session?.user.id)

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
        if (!habitsData || habits.length > 0) {
            return;
        }

        setHabits(prev => [...prev, ...habitsData]);
    }, [habitsData])

    useEffect(() => {
        if (!friendsData) {
            return;
        }

        setFriends(friendsData);
    }, [friendsData])

    useEffect(() => {
        if (!colorsData) {
            return;
        }

        setColors(colorsData);
    }, [colorsData])

    useEffect(() => {
        if (!unlocksData) {
            return;
        }

        setUnlocks(() => unlocksData);
    }, [unlocksData])

    return (
        <Stack
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: background },
            contentStyle: { backgroundColor: background },
            headerTitleStyle: {
                fontSize: 24,
                fontWeight: "600"
            },
            headerLeft: () => (
              <TouchableOpacity style={{ paddingRight: 10}} onPress={() => {router.dismiss()}}>
                <Ionicons size={28} color={"black"} name="arrow-back" />
              </TouchableOpacity>
            ),
          }}
        >
            <Stack.Screen
                name="user" 
            />
            <Stack.Screen 
                name="treasurechest" 
                options={{
                    animation: "fade",
                    animationDuration: 100,
                }}
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
                    animation: "slide_from_bottom",
                    title: "Customize",
                    headerShown: true,
                }}
            />
        </Stack>
      )
}

export default Layout