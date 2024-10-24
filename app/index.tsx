import Button from '@/components/Button'
import Scene from '@/components/Scene'
import useTheme from '@/hooks/useTheme'
import { router } from 'expo-router'
import { Suspense } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Vector3 } from 'three'

const Page = () => {
  const { text, background } = useTheme();

  const handleNavigateToRegister = () => {
    router.navigate("/(register)");
  }

  const handleNavigateToLogIn = () => {
    router.navigate("/(login)");
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.sceneContainer}>
          <Suspense>
            <Scene
              cameraPos={ new Vector3(0, 3, 7) }
            />
          </Suspense>
        </View>
        <View style={styles.infoContainer}>
            <Text style={[styles.title, {color: text}]}>
              Miss no Day
            </Text>
            <Text style={[styles.description, {color: text}]}>
              The Habit App That Gives You a Character to Uphold!
            </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Get Started" 
          onPress={handleNavigateToRegister}
        />
        <Button 
          title="Already Have an Account" 
          onPress={handleNavigateToLogIn} 
          backgroundColor={background}
          color={text}
          isBorder
        />
      </View>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  sceneContainer: {
    flex: 1,
    width: "100%",
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  buttonContainer: {
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontWeight: '800',
    fontSize: 32,
  },
  description: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
})