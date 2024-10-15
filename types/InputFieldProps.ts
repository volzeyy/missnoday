export default interface InputFieldProps {
    isLoading?: boolean,
    tip?: string | null,
    value: string, 
    placeholder: string,
    type?: string,
    onChangeText: (prev: string) => void, 
}