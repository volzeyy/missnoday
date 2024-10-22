import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Palette from "@/constants/Palette";
import useColorsStore from "@/stores/useColorsStore";
import useTheme from "@/hooks/useTheme";

const ColorPalette = (props: {activeType: string | null}) => {
  const { activeType } = props;

  const { text } = useTheme();
  const { colors, setColors } = useColorsStore();

  const updateColor = async (newColor: string) => {
    if (!colors) {
      return;
    }

    if (activeType == "skin") {
        setColors({ ...colors, skin: newColor });
    }

    if (activeType == "hair") {
      setColors({ ...colors, hair: newColor });
    }

    if (activeType == "shirt") {
      setColors({ ...colors, shirt: newColor });
    }

    if (activeType == "pants") {
      setColors({ ...colors, pants: newColor });
    }

    if (activeType == "shoes") {
      setColors({ ...colors, shoes: newColor });
    }

    if (activeType == "hat") {
      setColors({ ...colors, hat: newColor });
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 5, paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {Palette.map((color) => {
          if (colors && color === colors[activeType == "face" || activeType == "all" ? "skin" : activeType as keyof typeof colors]) {
            return (
              <TouchableOpacity
                key={color}
                onPress={() => {
                  updateColor(color);
                }}
              >
                <View
                  style={[
                    styles.color,
                    { backgroundColor: color, width: 40, height: 40, borderWidth: 2, borderColor: text, marginHorizontal: 10, },
                  ]}
                ></View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={color}
              onPress={() => {
                updateColor(color);
              }}
            >
              <View style={[styles.color, { backgroundColor: color }]}></View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ColorPalette;

const styles = StyleSheet.create({
  color: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});
