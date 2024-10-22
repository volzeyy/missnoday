import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import useTheme from '@/hooks/useTheme';

const Option = (props: any) => {
  const { option, value, extras, selected, setSelected } = props;

  const { background, text } = useTheme();

  const handleDeselect = () => {
    setSelected(null);
  }

  const handleSelect = () => {
    setSelected(value);
  }

  if (selected == value) {
    return (
        <TouchableOpacity 
            style={[styles.select, {backgroundColor: text}]} 
            key={value} 
            onPress={handleDeselect}
        >
            <Text style={[styles.text, {color: background}]}>{option}</Text>
            {extras && extras}
        </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity 
        style={[styles.select, {backgroundColor: "transparent"}]} 
        key={value} 
        onPress={handleSelect}
    >
        <Text style={[styles.text, {color: text}]}>{option}</Text>
        {extras && extras}
    </TouchableOpacity>
  )
}

export default Option

const styles = StyleSheet.create({
    select: {
        display: "flex",
        justifyContent: "center",
        padding: 10,
        height: 65,
        gap: 5,
        width: "100%",
        borderRadius: 15,
        borderWidth: 2,
      },
      text: {
        fontSize: 16,
        fontWeight: "600",
      }
})