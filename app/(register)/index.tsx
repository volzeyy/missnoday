import InputField from '@/components/InputField'
import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/components/Button'
import useTheme from '@/hooks/useTheme'
import { supabase } from '@/config/supabase'
import useCreateAccountStore from '@/stores/useCreateAccountStore'
import Tip from '@/components/Tip'
import Info from '@/components/Info'

const Page = () => {
  const { auth, setAuth } = useCreateAccountStore()
  
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const insets = useSafeAreaInsets()

  const { background, text } = useTheme();

  const validateInput = async () => {
    try {
      setLoading(true)

      if (username && username.length < 3 || username.length > 25) {
        throw new Error("Username must be 3 to 25 characters long");
      }
  
      if (username && !/^[a-z0-9_]{3,25}$/.test(username)) {
        throw new Error("Username can only contain lowercase letters, numbers, and underscores");
      }
  
      const { data, error } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single()
  
      if (!(error && error.code == "PGRST116" && !data)) { // if (!(no such username)) {}
        throw new Error("Username is already taken")
      }
  
      if (!name || name.length < 3) {
        throw new Error("Please enter a valid name that's over 3 characters long")
      }
  
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(name)) {
        throw new Error("Name should only contain letters and spaces")
      }
  
      if (name.length > 50) {
        throw new Error("Name should not exceed 50 characters")
      }
  
      if (name.trim().length === 0) {
        throw new Error("Name cannot be empty or just spaces")
      }

      setAuth({
        ...auth,
        fullName: name, 
        username: username 
      })

      handleNavigateToEmail();
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToEmail = () => {
    router.navigate("/(register)/email")
  }

  const handleTryOutApp = () => {
    router.replace("/(main)/")
  }

  
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom }]}>
      <View style={styles.inputContainer}>
        <InputField 
          placeholder="Name" 
          value={name} 
          onChangeText={setName} 
        />
        <InputField 
          placeholder="Username" 
          value={username} 
          onChangeText={setUsername} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? "Loading" : "Continue"}
          onPress={validateInput}
          isDisabled={!name || !username || loading}
        />
        <Text style={{ fontSize: 12, color: text}}>or you could</Text>
        <View style={styles.alternativeContainer}>
          <Button 
            title="Try the app"
            onPress={handleTryOutApp}
            color={text}
            backgroundColor={background}
            isBorder
          />
          <View style={styles.infoContainer}>
            <Info 
              text="Nothing will be saved unless you create an account. 
              Trying out the app is purely for demonstration purposes."
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
  },
  inputContainer: {
    gap: 20,
    width: "100%",
  },
  buttonContainer: {
    gap: 20,
    width: "100%",
    alignItems: 'center',
  },
  alternativeContainer: {
    width: "100%",
    alignItems: 'center',
    gap: 5,
  },
  infoContainer: {
    width: "100%",
    justifyContent: "flex-start",
    paddingRight: 20,
  }
})