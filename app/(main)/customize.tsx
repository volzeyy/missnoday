import CosmeticEquip from '@/components/CosmeticEquip/CosmeticEquip';
import Scene from '@/components/Scene'
import Tip from '@/components/Tip';
import useFetchUnlocks from '@/hooks/useFetchUnlocks';
import useCharacterStore from '@/stores/useCharacterStore';
import useUserStore from '@/stores/useUserStore';
import { ScrollView, StyleSheet, View } from 'react-native'
import { Vector3 } from 'three';

const Customize = () => {
  const { user } = useUserStore();
  const { character } = useCharacterStore();

  const unlocksData = useFetchUnlocks(user?.id);

  return (
    <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <Scene 
          character={character}
          cameraPos={new Vector3(0, 2.75, 7)}
        />
      </View>
      <View style={styles.contentContainer}>
        {unlocksData ?
            <ScrollView contentContainerStyle={styles.cosmeticsContainer}>
              {unlocksData.map((unlock) => {
                return (
                  <CosmeticEquip
                    key={unlock.cosmetic_id}
                    user_id={unlock.user_id}
                    cosmetic_id={unlock.cosmetic_id}
                    index={unlocksData.indexOf(unlock)}
                  />
                )
              })}
            </ScrollView>
        : (
          <View style={styles.tipContainer}>
              <Tip 
                title="No cosmetics unlocked yet!"
                tip="You can unlock cosmetics by completing habits every day and purchasing the treasure chest."
              />
            </View>
        )}
      </View>
    </View>
  )
}

export default Customize

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.15)",
    backgroundColor: "rgb(225, 224, 227)",
    flex: 1,
    width: "100%",
  },
  tipContainer: {
    padding: 10,
    paddingTop: 0,
  },
  cosmeticsContainer: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})