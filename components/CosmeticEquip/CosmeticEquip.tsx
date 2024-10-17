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
import CosmeticProps from "@/types/CosmeticProps";

const CosmeticEquip = ({ id, name }: Partial<CosmeticProps>) => {
  const [loading, setLoading] = useState(false);

  const { primary, text, background } = useTheme();
  
  const { setCharacter } = useCharacterStore();
  const { user } = useUserStore();

  const isEquipped = isCosmeticEquipped(id);

  const handleEquipCosmetic = async () => {
    try {
      if (!user) {
        return;
      }

      if (!id) {
        return;
      }

      const { data, error: equipError } = await supabase.rpc("update_cosmetic", {
        current_user_id: user.id,
        current_cosmetic_id: id,
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
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor:"rgb(225, 224, 227)", width: 125, height: 125},
          isEquipped ? { backgroundColor: primary } : {},
        ]}
        onPress={handleEquipCosmetic}
        disabled={loading}
      >
        <Text style={[
          styles.text, 
          { color: text },
          isEquipped ? { color: background } : null,
        ]}>{name}</Text>
      </TouchableOpacity>
  );
};

export default CosmeticEquip;

const styles = StyleSheet.create({
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
