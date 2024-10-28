import CosmeticEquip from '@/components/CosmeticEquip/CosmeticEquip';
import Scene from '@/components/Scene';
import Tip from '@/components/Tip';
import useCharacterStore from '@/stores/useCharacterStore';
import useUserStore from '@/stores/useUserStore';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Vector3 } from 'three';
import useColorsStore from '@/stores/useColorsStore';
import ColorPalette from "@/components/ColorPalette";
import { useEffect, useRef, useState } from 'react';
import COSMETICS from '@/constants/Cosmetics';
import COLORS from '@/constants/Colors';
import Type from '@/components/Type';
import { supabase } from '@/config/supabase';
import useUnlocksStore from '@/stores/useUnlocksStore';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '@/components/Avatar';
import CosmeticProps from '@/types/CosmeticProps';

const Customize = () => {
  const [loading, setLoading] = useState(false);
  const [cosmetics, setCosmetics] = useState<CosmeticProps[]>([]);
  const [activeType, setActiveType] = useState<string | null>("all");
  const [activeColorType, setActiveColorType] = useState<string | null>("skin");
  const [customization, setCustomization] = useState<"cosmetics" | "colors">("cosmetics");

  const scrollViewRef = useRef<ScrollView>(null);

  const { user, setUser } = useUserStore();
  const { colors } = useColorsStore();
  const { character } = useCharacterStore();
  const { unlocks } = useUnlocksStore();
  
  const { text, background } = useTheme();

  const unlockedCosmetics = (activeType === "all" ? cosmetics : cosmetics && cosmetics.filter(unlock => unlock.type === activeType)) || [];

  useEffect(() => {
    const fetchData = async () => {
      if (unlocks && unlocks.length > 0) {
        const cosmeticDataPromises = unlocks.map(async (unlock) => {
          return await fetchCosmetic(unlock.cosmetic_id ?? "");
        });
        
        const cosmeticData = await Promise.all(cosmeticDataPromises);
        setCosmetics(cosmeticData);
      }
    };

    fetchData();
  }, [unlocks, setCosmetics]);

  useEffect(() => {
    handleColorsUpdate();
  }, [colors]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [unlockedCosmetics])

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
      if (!user || !user.id || !colors) return;

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

  const handleSwitchToCosmetics = () => {
    if (customization === "cosmetics") return;

    setCustomization("cosmetics");
  }

  const handleSwitchToColors = () => {
    if (customization === "colors") return;

    setCustomization("colors");
  }

  const getRandomSeed = () => {
    return Math.random().toString(36).substring(2);
  }

  const getRandomAvatar = () => {
    const seed = getRandomSeed();
    const apiUrl = `https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=${seed}`;

    return apiUrl;
  }

  const handleUpdateAvatar = async () => {
    try {
      if (loading) {
        return;
      }

      if (!user || !user.id) {
        const avatar = getRandomAvatar();
        setUser({ ...user, avatar_url: avatar });
        return;
      }

      setLoading(true);

      const avatar = getRandomAvatar();
      const { error } = await supabase
        .from('users')
        .update({ avatar_url: avatar })
        .eq('id', user?.id);
      
      if (error) {
        throw error.message;
      }

      setUser({ ...user, avatar_url: avatar })
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <View style={[styles.avatarContainer, loading ? {opacity: 0.5} : null]}>
          <Avatar 
            src={user?.avatar_url} 
            onPress={handleUpdateAvatar}
          />
        </View>
        <Scene
          character={character}
          colors={colors}
          cameraPos={new Vector3(0, 2.75, 7)}
        />
      </View>
      <View style={[styles.contentContainer, {borderColor: text}]}>
        <View style={styles.customizationSelectContainer}>
          <TouchableOpacity 
            style={[styles.select, customization == "cosmetics" ? {backgroundColor: text} : null]}
            onPress={handleSwitchToCosmetics}
          >
            <Ionicons
              size={24}
              name={customization == "cosmetics" ? 'shirt' : 'shirt-outline'}
              color={customization == "cosmetics" ? background : text}
            />
            <Text style={[styles.customization, customization == "cosmetics" ? {color: background} : {color: text}]}>Cosmetics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.select, customization == "colors" ? {backgroundColor: text} : null]}
            onPress={handleSwitchToColors}
          >
            <Ionicons
              size={24}
              name={customization == "colors" ? 'color-palette' : 'color-palette-outline'}
              color={customization == "colors" ? background : text}
            />
            <Text style={[styles.customization, customization == "colors" ? {color: background} : {color: text}]}>Colors</Text>
          </TouchableOpacity>
        </View>
        {
          customization === "colors" ? (
            <View style={styles.customizationContainer}>
              <View style={styles.typesContainer}>
                <ScrollView horizontal contentContainerStyle={styles.typesScrollViewContainer} showsHorizontalScrollIndicator={false}>
                  {Object.values(COLORS).map((colorType) => (
                    <Type
                      key={colorType.name}
                      title={colorType.name}
                      type={colorType.type}
                      setActiveType={setActiveColorType}
                      activeType={activeColorType}
                    />
                  ))}
                </ScrollView>
              </View>
              <ColorPalette 
                activeType={activeColorType} 
              />
            </View>
          )
          : (
        <View style={styles.customizationContainer}>
          <View style={styles.typesContainer}>
            <ScrollView horizontal contentContainerStyle={styles.typesScrollViewContainer} showsHorizontalScrollIndicator={false}>
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
          </View>
          <View style={styles.cosmeticsContainer}>
            {cosmetics && unlockedCosmetics && unlockedCosmetics.length > 0 ? (
              <ScrollView 
                contentContainerStyle={styles.cosmetics} 
                showsHorizontalScrollIndicator={false}
                snapToStart={true}
                ref={scrollViewRef}
                horizontal 
              >
                {unlockedCosmetics.map((cosmetic) => (
                  <CosmeticEquip 
                    key={cosmetic.id} 
                    id={cosmetic.id} 
                    name={cosmetic.name} 
                    type={cosmetic.type}
                  />
                ))}
              </ScrollView>
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
          )
        }
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
    paddingBottom: 10,
    gap: 20,
    borderTopWidth: 2,
    height: "auto",
    width: "100%",
  },
  tipContainer: {
    padding: 10,
  },
  cosmeticsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  cosmetics: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10
  },
  typesScrollViewContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  customizationSelectContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 10,
    gap: 10,
  },
  select: {
    flexGrow: 1,
    borderWidth: 2,
    padding: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    gap: 5,
    width: 1, // This is a hack to make the buttons equal width LOL, found out about it on accident
  },
  typesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  customization: {
    fontSize: 16,
    fontWeight: "600",
  },
  customizationContainer: {
    gap: 10,
  },
  avatarContainer: {
    position: "absolute",
    top: 0,
    left: 10,
    display: "flex",
    flexDirection: "row",
    zIndex: 10,
  },
});