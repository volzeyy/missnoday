import { StyleSheet, TextInput } from 'react-native'
import InputFieldProps from "@/types/InputFieldProps";
import useTheme from '@/hooks/useTheme';

const InputField = (props: InputFieldProps) => {
    const { value, onChangeText, placeholder, type, isLoading } = props;

    const { text, background } = useTheme();

    return (
        <TextInput 
            style={[
                {...styles.textInput},
                {backgroundColor: background, color: text, borderColor: text},
                isLoading ? {color: text, opacity: 0.7} : {},
            ]} 
            value={value} 
            onChangeText={onChangeText} 
            placeholder={placeholder} 
            placeholderTextColor={text}
            autoComplete={
                type == "password" ? "password" : 
                type == "email" ? "email" : 
                type == "name" ? "name" : 
                type == "username" ? "username" : 
                undefined
            }
            secureTextEntry={type == "password" ? true : undefined}
            keyboardType={type == "email" ? "email-address" : undefined}
            autoCapitalize="none"
        />
    )
}

export default InputField

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 65,
        color: "black",
        fontSize: 16,
    },
})