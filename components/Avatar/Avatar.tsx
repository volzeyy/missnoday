import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import useTheme from "@/hooks/useTheme";

const Avatar = (props: any) => {
  const { src, onPress } = props;

  const { text } = useTheme();

  if (onPress) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress && onPress}>
        <View
          style={[
            styles.imageContainer,
          ]}
        >
          <Image
            source={src ?? undefined}
            style={[
              styles.avatarImage,
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          { borderRadius: 100, borderColor: text },
        ]}
      >
        <View
          style={[
            styles.imageContainer,
          ]}
        >
          <Image
            source={{ uri: src }}
            style={[
              styles.avatarImage,

            ]}
          />
        </View>
      </View>
    );
  }
};

export default Avatar;

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
