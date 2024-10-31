import { useColorScheme } from "react-native";
import { lightTheme } from "@/constants/Theme";
import ThemeProps from "@/types/ThemeProps";

const useTheme = (): ThemeProps => {
  const colorScheme = useColorScheme();

  const text 
    = colorScheme === "dark" ? lightTheme.text : lightTheme.text;
  
  const background 
    = colorScheme === "dark" ? lightTheme.background : lightTheme.background;

  return { text, background };
};

// For now, only light theme will be supported

export default useTheme;
