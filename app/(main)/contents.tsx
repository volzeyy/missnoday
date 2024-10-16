import { ScrollView, StyleSheet, View } from 'react-native'
import CosmeticChance from '@/components/CosmeticChance';
import useTheme from '@/hooks/useTheme';
import useFetchAllCosmetics from '@/hooks/useFetchAllCosmetics';

const Contents = () => {
  const allCosmetics = useFetchAllCosmetics();

  const chance: number | null = allCosmetics && parseFloat((100 / Object.values(allCosmetics).length).toFixed(2));

  const { background } = useTheme()
    
  return (
    <View
        style={[styles.container, {backgroundColor: background}]}
    >
        <ScrollView
            contentContainerStyle={styles.contentContainer}
        >
            {allCosmetics && allCosmetics.map(cosmetic => (
                <CosmeticChance
                    key={cosmetic.id}
                    name={cosmetic.name}
                    type={cosmetic.type}
                    chance={chance}
                />
            ))}
        </ScrollView>
    </View>
  )
}

export default Contents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    contentContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})