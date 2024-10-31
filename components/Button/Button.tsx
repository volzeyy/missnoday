import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import ButtonProps from "@/types/ButtonProps"
import { Ionicons } from '@expo/vector-icons';
import useTheme from '@/hooks/useTheme';

const Button = (props: ButtonProps) => {
    const { 
        title, 
        backgroundColor, 
        color,
        icon, 
        isDisabled,
        isBorder,
        onPress 
    } = props;

    const { text, background } = useTheme()

    return (
        <TouchableOpacity onPress={onPress} disabled={isDisabled} 
            style={[
                isDisabled ? {
                    ...styles.button, ...{backgroundColor: "rgba(0, 0, 0, 0.25)"},
                } : {
                    ...styles.button, backgroundColor: backgroundColor || text,
                },
                isBorder ? {...styles.buttonBorder, borderColor: text} : null
            ]}
        >
                {icon ?
                    <Ionicons name={icon} size={18} color={color || text} />
                : null}
                <Text style={
                    isDisabled ? {
                        ...styles.buttonText, ...{color: text, opacity: 0.5}
                    } : {
                        ...styles.buttonText, color: color || background
                    }
                }>{ title }</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        height: 65,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 20,
        width: "100%",
    },
    buttonText: {
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 14,
    },
    buttonBorder: {
        borderWidth: 2,
        borderBottomWidth: 4,
    }
})