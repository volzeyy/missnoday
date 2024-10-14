import { Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import useTheme from '@/hooks/useTheme';

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { background } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: background },
        contentStyle: { backgroundColor: background },
        headerTitle: ({children}) => (
          <Text style={styles.title}>{children}</Text>
        ),
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(main)" 
        options={{ 
          contentStyle: {padding: 0},
        }}
      />
      <Stack.Screen name="(register)" options={{
        title: "Create an Account",
      }}/>
      <Stack.Screen name="(login)" options={{
        title: "Log In",
      }}/>
      <Stack.Screen name="(habit)" />
      <Stack.Screen name="onboard" options={{ 
        presentation: 'modal',
      }} />
      <Stack.Screen name="habits" options={{ 
        presentation: "modal", 
        headerShown: true, 
        title: "Select a Habit" 
      }} />
      <Stack.Screen name="privacypolicy" options={{ presentation: 'modal' }} />
      <Stack.Screen name="termsofservice" options={{ presentation: 'modal' }} />
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