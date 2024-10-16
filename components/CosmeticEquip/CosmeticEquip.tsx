import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import useFetchCosmetic from "@/hooks/useFetchCosmetic";
import { supabase } from "@/config/supabase";
import useCharacterStore from "@/stores/useCharacterStore";
import CharacterProps from "@/types/CharacterProps";
import isCosmeticEquipped from "@/helpers/isCosmeticEquipped";
import useUserStore from "@/stores/useUserStore";

const { width } = Dimensions.get("window");

const CosmeticEquip = ({ cosmetic_id, index }: any) => {
  const [loading, setLoading] = useState(false);

  const { primary, secondary, text, background } = useTheme();
  const cosmeticData = useFetchCosmetic(cosmetic_id);
  
  const { setCharacter } = useCharacterStore();
  const { user } = useUserStore();

  const isEquipped = isCosmeticEquipped(cosmetic_id);

  const handleEquipCosmetic = async () => {
    try {
      if (!user) {
        return;
      }

      if (!cosmetic_id) {
        return;
      }

      const { data, error: equipError } = await supabase.rpc("update_cosmetic", {
        current_user_id: user.id,
        current_cosmetic_id: cosmetic_id,
      });

      if (equipError) {
        throw equipError.message;
      }

      if (data) {
        setCharacter(data as CharacterProps);
      }
    } catch (error) {
      if (error) {
        alert(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        index % 2 == 0 ? { paddingLeft: 10, paddingRight: 5 } : {},
        index % 2 == 1 ? { paddingRight: 10, paddingLeft: 5 } : {},
      ]}
    >
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: background },
          isEquipped ? { backgroundColor: primary } : {},
        ]}
        onPress={handleEquipCosmetic}
        disabled={loading}
      >
        <Text style={[
          styles.text, 
          { color: text },
          isEquipped ? { color: background } : null,
        ]}>{cosmeticData?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CosmeticEquip;

const styles = StyleSheet.create({
  wrapper: {
    width: width / 2,
    paddingBottom: 10,
  },
  container: {
    padding: 10,
    aspectRatio: 1,
    borderRadius: 15,
    gap: 5,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
  },
});
