import useUserStore from "@/stores/useUserStore";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Tip from "../Tip";
import CosmeticEquip from "../CosmeticEquip";
import UnlocksProps from "@/types/UnlocksProps";

const UnlockedCosmetics = (props: any) => {
  const { cosmetics } = props;

  return (
    <View style={{ gap: 10 }}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Unlocked cosmetics
        </Text>
      </View>
      <View>
        {cosmetics ? (
          <ScrollView
            contentContainerStyle={styles.cosmeticsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {cosmetics.map((cosmetic: UnlocksProps) => {
              return (
                <CosmeticEquip
                  key={cosmetic.cosmetic_id}
                  user_id={cosmetic.user_id}
                  cosmetic_id={cosmetic.cosmetic_id}
                />
              );
            })}
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
  );
};

export default UnlockedCosmetics;

const styles = StyleSheet.create({
  cosmeticsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingRight: 10,
  },
  tipContainer: {
    padding: 10,
    paddingTop: 0,
  },
});
