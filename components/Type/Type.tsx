import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

const Type = ({
  title,
  icon,
  type,
  activeType,
  setActiveType,
}: any) => {
  const { background, primary } = useTheme();

  if (activeType == type) {
    return (
      <View style={[styles.type, { backgroundColor: primary }]}>
        <Text style={[{ color: background, fontWeight: "800" }]}>{title}</Text>
        {icon ?
          <Ionicons name={icon} style={[{ color: background }]} size={18} />
        : null}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.type, { backgroundColor: "rgb(225, 224, 227)" }]}
      onPress={() => setActiveType(type)}
    >
      <Text>{title}</Text>
      {icon ?
        <Ionicons name={icon} size={18} />
      : null}
    </TouchableOpacity>
  );
};

export default Type;

const styles = StyleSheet.create({
  type: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
