import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

const RoundButton = ({onPress, icon}: any) => {
  const { primary, background } = useTheme();

  return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <View
              style={[styles.button, {backgroundColor: primary}]}
            >
              <Ionicons size={24} name={icon} color={background} />
            </View>
        </View>
      </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 100,
    color: "black",
  },
});
