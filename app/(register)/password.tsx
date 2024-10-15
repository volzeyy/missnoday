import InputField from '@/components/InputField'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/components/Button'
import useCreateAccountStore from '@/stores/useCreateAccountStore'
import { supabase } from '@/config/supabase'

const Page = () => {
  const { auth, setAuth } = useCreateAccountStore()

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (password == "") {
      setConfirmPassword("");
    }
  }, [password])

  const validateInput = async () => {
    try {
      setLoading(true)

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (password.trim().length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }

      const {
        error,
      } = await supabase.auth.signUp({
        email: auth?.email ?? '',
        password: password,
        options: {
          data: {
            username: auth?.username,
            full_name: auth?.fullName,
            email: auth?.email,
          },
        },
      })

      if (error) {
        throw error
      }

      setAuth({ ...auth, password: password })

      handleNavigateToVerify()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToVerify = () => {
    router.navigate("/(register)/verify")
  }
  
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom }]}>
      <View style={styles.inputContainer}>
        <InputField 
          placeholder="Password" 
          value={password} 
          type='password'
          onChangeText={setPassword} 
        />
        {password ?
          <InputField 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            type='password'
            onChangeText={setConfirmPassword} 
          />
        : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Continue" 
          onPress={validateInput}
          isDisabled={!password || !confirmPassword || loading}
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