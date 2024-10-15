import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import useTheme from '../../hooks/useTheme';

const Info = (props: any) => {
  const { text } = props;

  const { text: textTheme } = useTheme();

  return (
    <View style={styles.container}>
        <Ionicons name="information-circle" size={16} color={textTheme} />
        <Text style={[styles.tip, {color: textTheme}]}>{text}</Text>
    </View>
  )
}

export default Info

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
        gap: 5,
    },
    tip: {
        fontSize: 12,
    }
})