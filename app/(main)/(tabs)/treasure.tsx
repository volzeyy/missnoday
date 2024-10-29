import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import useUserStore from '@/stores/useUserStore'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Button from '@/components/Button'
import { supabase } from '@/config/supabase'
import { router } from 'expo-router'
import useTheme from '@/hooks/useTheme'
import useRewardStore from '@/stores/useRewardStore'
import useUnlocksStore from '@/stores/useUnlocksStore'

const Treasure = () => {
  const [loading, setLoading] = useState(false)

  const { reward, setReward } = useRewardStore();
  const { user, setUser } = useUserStore(state => state)
  const { setUnlocks, unlocks } = useUnlocksStore();

  const { text, background } = useTheme()

  useEffect(() => {
    if (!reward) {
      return;
    }

    router.navigate("/(main)/treasurechest")
  }, [reward])

  const handlePurchaseTreasureChest = async () => {
    try {
      if (!user) {
        return;
      }

      if (user && !user.id) {
        if (user.coins != undefined && (user.coins === 0 || user.coins < 500)) {
          alert("Not enough coins!")
          return;
        } else {
          setLoading(true);

          const unlockedCosmeticIds = unlocks.map(unlock => unlock.cosmetic_id);
          const { data, error } = await supabase.rpc('get_filtered_cosmetics', { exclude_ids: unlockedCosmeticIds });

          if (error) {
            throw error.message
          }

          setUser({...user, coins: user.coins && user.coins - 500})
          setUnlocks(prev => [...(prev ?? []), { id: (Math.random() * 10000).toString(), cosmetic_id: data }]);
          setReward(data);
        }

        return;
      }
  
      setLoading(true);

      const { data, error: purchaseError } = await supabase.rpc('purchase_treasure_chest', { current_user_id: user.id  });

      if (purchaseError) {
        throw purchaseError.message
      }

      setUser({...user, coins: user.coins && user.coins - 500})
      setReward(data)
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

      if (user && !user.id) {
        if (user.coins != undefined && (user.coins === 0 || user.coins < 1000)) {
          alert("Not enough coins!")
          return;
        } 
          
        setUser({...user, coins: user.coins && user.coins - 1000, streak_freeze: 4})
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
      <ScrollView 
        contentContainerStyle={[styles.container]} 
        showsVerticalScrollIndicator={false}
      >
          <View style={[styles.section, {borderWidth: 4}]}>
            <Text style={[styles.title, {color: text}]}>Refill your streak freezes to protect your streak!</Text>
            <View style={styles.streakFreezeContainer}>
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze >= 1 ? {color: text} : {color: text, opacity: 0.3}]} />
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze >= 2 ? {color: text} : {color: text, opacity: 0.3}]} />
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze >= 3 ? {color: text} : {color: text, opacity: 0.3}]} />
              <Ionicons name='flame' size={52} style={[user && user.streak_freeze && user.streak_freeze == 4 ? {color: text} : {color: text, opacity: 0.3}]} />
            </View>
            <Button title="REFILL 🟡 1000" isDisabled={loading} onPress={handlePurchaseStreakFreeze} />
            <Text style={{ color: text }}>Streak freezes will refill every month.</Text>
          </View>
          <View style={[styles.section, {borderWidth: 4}]}>
            <Text style={[styles.title, {color: text}]}>Obtain cosmetics from the Treasure Chest!</Text>
            <View style={styles.treasureContainer}>
              <MaterialCommunityIcons name="treasure-chest" size={200} color={text} />
            </View>
            <View style={styles.actions}>
              <Button title="OPEN 🟡 500" isDisabled={loading} onPress={handlePurchaseTreasureChest} />
              <Button title="SEE CONTENTS" isDisabled={loading} onPress={handleNavigateToContents} color={text} backgroundColor='transparent' isBorder />
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