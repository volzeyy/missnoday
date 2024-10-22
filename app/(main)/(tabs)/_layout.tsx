import { StyleSheet, View, Text } from "react-native";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import useUserStore from "@/stores/useUserStore";

const Layout = () => {
  const { text, background } = useTheme();

  const { user } = useUserStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: text,
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.3)",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: background,
        },
        tabBarStyle: {
          backgroundColor: background,
          shadowColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: "Your Habits",
          tabBarLabel: "Habits",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="script-text"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="treasure"
        options={{
          title: "Treasure",
          headerShown: true,
          headerRightContainerStyle: {
            paddingRight: 10,
          },
          headerRight: () => (
            <View style={[styles.coinsContainer]}>
              <Text style={styles.coins}>🟡</Text>
              <Text style={[styles.coins, { color: "white" }]}>
                {user?.coins}
              </Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="treasure-chest"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  coinsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },
  coins: {
    fontSize: 18,
    fontWeight: "800",
  },
});
