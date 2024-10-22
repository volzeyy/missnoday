import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/constants/Theme";
import ThemeProps from "@/types/ThemeProps";

const useTheme = (): ThemeProps => {
  const colorScheme = useColorScheme();

  const text 
    = colorScheme === "dark" ? darkTheme.text : lightTheme.text;
  
  const background 
    = colorScheme === "dark" ? darkTheme.background : lightTheme.background;

  const primary =
    colorScheme === "dark" ? darkTheme.primary : lightTheme.primary;

  const secondary =
    colorScheme === "dark" ? darkTheme.secondary : lightTheme.secondary;

  const accent =
    colorScheme === "dark" ? darkTheme.accent : lightTheme.accent;

  return { text, background, primary, secondary, accent };
};

export default useTheme;
