import { StyleSheet, Text, View } from 'react-native'
import useTheme from '../../hooks/useTheme';

const Tip = (props: any) => {
  const { title, tip } = props;

  const { text } = useTheme();

  return (
    <View
        style={styles.container}
    >
        {title ?
            <Text style={[styles.title, {color: text}]}>{title}</Text>
        : null}
        {tip ?
            <Text style={[styles.tip, {color: text}]}>{tip}</Text>
        : null}
    </View>
  )
}

export default Tip

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      },
    title: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: "center",
    },
    tip: {
        fontSize: 16,
        textAlign: "center",
    }
})