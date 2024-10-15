export default interface ButtonProps {
    title: string,
    icon?: any,
    color?: string,
    backgroundColor?: string,
    isDisabled?: boolean,
    isBorder?: boolean,
    onPress: () => void
}