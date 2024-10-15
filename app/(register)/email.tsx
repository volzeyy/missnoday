import InputField from '@/components/InputField'
import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/components/Button'
import useCreateAccountStore from '@/stores/useCreateAccountStore'

const Email = () => {
  const { auth, setAuth } = useCreateAccountStore()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const insets = useSafeAreaInsets()

  const validateInput = () => {
    try {
      setLoading(true);

      if (!email) {
        throw new Error("Please enter a valid email address")
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address")
      }
  
      setAuth({ ...auth, email: email })

      handleNavigateToPassword()
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  const handleNavigateToPassword = () => {
    router.navigate("/(register)/password")
  }
  
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom }]}>
      <View style={styles.inputContainer}>
        <InputField 
          placeholder="E-mail" 
          value={email} 
          type='email'
          onChangeText={setEmail} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Continue" 
          onPress={validateInput}
          isDisabled={!email || loading}
        />
      </View>
    </View>
  )
}

export default Email

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