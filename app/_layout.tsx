import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { router, Stack, useFocusEffect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import useTheme from '@/hooks/useTheme';
import useSessionStore from '@/stores/useSessionStore';
import { supabase } from '@/config/supabase';
import * as NavigationBar from 'expo-navigation-bar';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { background, text } = useTheme();

  const { session, setSession } = useSessionStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setSession(newSession);
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
  }, []);

  useEffect(() => {
    const updateNavigationBar = async () => {
      await NavigationBar.setBackgroundColorAsync(background);
      await NavigationBar.setButtonStyleAsync('dark');
    };

    updateNavigationBar();
  }, [])

  useFocusEffect(() => {
    if (!session || !session.user.id) {
      return;
    }

    router.replace("/(main)/(tabs)/");
    SplashScreen.hideAsync();
  });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: background },
        contentStyle: { backgroundColor: background },
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
      />
      <Stack.Screen 
        name="(main)" 
        options={{ 
          contentStyle: {padding: 0},
        }}
      />
      <Stack.Screen 
        name="(register)" 
        options={{
          title: "Create an Account",
        }}
      />
      <Stack.Screen 
        name="(login)" 
        options={{
          title: "Log In",
        }}
      />
      <Stack.Screen 
        name="(habit)" 
      />
      <Stack.Screen 
        name="privacypolicy" 
        options={{ 
          headerShown: true,
          presentation: 'modal',
          title: "Privacy Policy",
          headerLeft: () => (
            <TouchableOpacity style={{ paddingRight: 10}} onPress={() => {router.dismiss()}}>
              <Ionicons size={28} color={text} name="arrow-back" />
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen 
        name="termsofservice" 
        options={{ 
          presentation: 'modal' 
        }} 
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    fontWeight: "600",
    fontSize: 24,
  }
})