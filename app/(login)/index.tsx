import InputField from '@/components/InputField'
import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/components/Button'
import { supabase } from '@/config/supabase'
import useSessionStore from '@/stores/useSessionStore'

const Page = () => {
  const { setSession } = useSessionStore();

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const insets = useSafeAreaInsets()

  async function signInWithEmail() {
    try {
      setLoading(true)
  
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      if (error && error.message == "Email not confirmed") {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email,
        })
  
        if (error) {
          throw error.message;
        }
  
        router.navigate("/(register)/verify")
        return
      }
  
      if (error) {
        throw error.message
      }
  
      if (session) {
        setSession(session);
        handleNavigateToMain();
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToMain = () => {
    router.replace("/(main)/")
  }
  
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom }]}>
      <View style={styles.inputContainer}>
        <InputField 
          placeholder="Email" 
          value={email} 
          type='email'
          onChangeText={setEmail} 
        />
        <InputField 
          placeholder="Password" 
          value={password} 
          type='password'
          onChangeText={setPassword} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Log In" 
          onPress={signInWithEmail}
          isDisabled={!email || !password || loading}
        />
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
  }
})