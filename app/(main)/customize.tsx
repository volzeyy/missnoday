import CosmeticEquip from '@/components/CosmeticEquip/CosmeticEquip';
import Scene from '@/components/Scene';
import Tip from '@/components/Tip';
import useFetchUnlocks from '@/hooks/useFetchUnlocks';
import useCharacterStore from '@/stores/useCharacterStore';
import useUserStore from '@/stores/useUserStore';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Vector3 } from 'three';
import useColorsStore from '@/stores/useColorsStore';
import ColorPalette from "@/components/ColorPalette";
import { useEffect, useState } from 'react';
import COSMETICS from '@/constants/Cosmetics';
import Type from '@/components/Type';
import { supabase } from '@/config/supabase';
import useUnlocksStore from '@/stores/useUnlocksStore';

const Customize = () => {
  const [activeType, setActiveType] = useState<string | null>("all");
  const { user } = useUserStore();
  const { character } = useCharacterStore();
  const { colors } = useColorsStore();
  const { unlocks, setUnlocks } = useUnlocksStore();
  const unlocksData = useFetchUnlocks(user?.id);

  useEffect(() => {
    if (unlocksData && unlocksData.length > 0 && (!unlocks || unlocks.length === 0)) {
      unlocksData.forEach(async (unlock) => {
        const data = await fetchCosmetic(unlock.cosmetic_id);
        setUnlocks((prevUnlocks) => (prevUnlocks ? [...prevUnlocks, data] : [data]));
      });
    }
  }, [unlocksData]);

  const fetchCosmetic = async (cosmetic_id: string) => {
    try {
      const { data, error } = await supabase.from('cosmetics').select().eq('id', cosmetic_id).single();
      if (error) throw error.message;
      return data;
    } catch (error) {
      alert(error);
    }
  };

  const handleColorsUpdate = async () => {
    try {
      if (!user || !colors) return;

      const { error } = await supabase.from('colors').update({
        hat: colors?.hat,
        hair: colors?.hair,
        skin: colors?.skin,
        shirt: colors?.shirt,
        pants: colors?.pants,
        shoes: colors?.shoes,
        updated_at: new Date().toISOString()
      }).eq('user_id', user?.id);

      if (error) throw error.message;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleColorsUpdate();
  }, [colors]);

  const filteredUnlocks = (activeType === "all" ? unlocks : unlocks && unlocks.filter(unlock => unlock.type === activeType)) || [];

  return (
    <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <Scene
          character={character}
          colors={colors}
          cameraPos={new Vector3(0, 2.75, 7)}
        />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView horizontal contentContainerStyle={styles.typesContainer} showsHorizontalScrollIndicator={false}>
          {Object.values(COSMETICS).map((cosmeticType) => (
            <Type
              key={cosmeticType.name}
              title={cosmeticType.name}
              type={cosmeticType.type}
              setActiveType={setActiveType}
              activeType={activeType}
            />
          ))}
        </ScrollView>
        {activeType !== "all" && filteredUnlocks.length > 0 && (
          <ColorPalette activeType={activeType} />
        )}
        <View style={{ gap: 10 }}>
          {filteredUnlocks.length > 0 ? (
            <>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Unlocked cosmetics</Text>
              <ScrollView contentContainerStyle={styles.cosmeticsContainer} horizontal showsHorizontalScrollIndicator={false}>
                {filteredUnlocks.map((unlock) => (
                  <CosmeticEquip key={unlock.id} id={unlock.id} name={unlock.name} />
                ))}
              </ScrollView>
            </>
          ) : (
            <View style={styles.tipContainer}>
              <Tip
                title="No cosmetics unlocked yet!"
                tip="You can unlock cosmetics by completing habits every day and purchasing the treasure chest."
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Customize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.15)",
    height: "auto",
    width: "100%",
  },
  tipContainer: {
    padding: 10,
    paddingTop: 0,
  },
  cosmeticsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingRight: 10,
  },
  typesContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    paddingRight: 10,
  },
});