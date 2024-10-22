import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Ionicons,
} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

const Type = ({
  title,
  icon,
  type,
  activeType,
  setActiveType,
}: any) => {
  const { background, text } = useTheme();

  if (activeType == type) {
    return (
      <View style={[styles.type, { backgroundColor: text }]}>
        <Text style={[{ color: background, fontWeight: "800" }]}>{title}</Text>
        {icon ?
          <Ionicons name={icon} style={[{ color: background }]} size={18} />
        : null}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.type, { backgroundColor: background, borderWidth: 2, borderColor: text }]}
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
    width: "auto",
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
