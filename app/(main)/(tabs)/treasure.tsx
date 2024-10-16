import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import useUserStore from '@/stores/useUserStore'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Button from '@/components/Button'
import { supabase } from '@/config/supabase'
import { router } from 'expo-router'
import useTheme from '@/hooks/useTheme'

const Treasure = () => {
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useUserStore(state => state)

  const { text, background, primary, secondary, accent } = useTheme()

  const handlePurchaseTreasureChest = async () => {
    try {
      if (!user) {
        return;
      }
  
      setLoading(true);

      const { error: purchaseError } = await supabase.rpc('purchase_treasure_chest', { current_user_id: user.id  });

      if (purchaseError) {
        throw purchaseError.message
      }

      setUser({...user, coins: user.coins && user.coins - 500})
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  const handlePurchaseStreakFreeze = async () => {
    try {
      if (!user) {
        return;
      }

      setLoading(true);

      const { error: purchaseError } = await supabase.rpc('purchase_streak_freeze_refill', { user_id: user.id });
    
      if (purchaseError) {
        throw purchaseError.message
      }

      setUser({...user, coins: user.coins && user.coins - 1000, streak_freeze: 4})
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  const handleNavigateToContents = () => {
    router.navigate("/(main)/contents")
  }

  return (
    <View style={[styles.scrollViewContainer, {backgroundColor: background}]}>
      <ScrollView contentContainerStyle={[styles.container]}>
          <View style={[styles.section, {backgroundColor: "rgb(225, 224, 227)"}]}>
            <Text style={[styles.title, {color: text}]}>Refill your streak freezes to protect your streak!</Text>
            <View style={styles.streakFreezeContainer}>
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze >= 1 ? {color: primary} : {color: text, opacity: 0.3}]} />
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze >= 2 ? {color: primary} : {color: text, opacity: 0.3}]} />
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze >= 3 ? {color: primary} : {color: text, opacity: 0.3}]} />
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze == 4 ? {color: primary} : {color: text, opacity: 0.3}]} />
            </View>
            <Button title="REFILL 🟡 1000" isDisabled={loading} onPress={handlePurchaseStreakFreeze} />
            <Text style={{ color: text }}>Streak freezes will refill every month.</Text>
          </View>
          <View style={[styles.section, {backgroundColor: "rgb(225, 224, 227)"}]}>
            <Text style={[styles.title, {color: text}]}>Obtain cosmetics from the Treasure Chest!</Text>
            <View style={styles.treasureContainer}>
              <MaterialCommunityIcons name="treasure-chest" size={200} color={primary} />
            </View>
            <View style={styles.actions}>
              <Button title="OPEN 🟡 500" isDisabled={loading} onPress={handlePurchaseTreasureChest} />
              <Button title="SEE CONTENTS" isDisabled={loading} onPress={handleNavigateToContents} color={text} backgroundColor={"rgba(0, 0, 0, 0.3)"} />
            </View>
          </View>
      </ScrollView>
    </View>
  )
}

export default Treasure

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  container: {
    display: "flex",
    alignItems: "center",
    minHeight: "100%",
    padding: 10,
    paddingBottom: 20,
    paddingTop: 0,
    gap: 20,
  },
  treasureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  treasureInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: "center",
  },
  actions: {
    display: "flex",
    width: "100%",
    gap: 10,
  },
  section: {
    display: "flex",
    width: "100%",
    padding: 20,
    gap: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  streakFreezeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
})