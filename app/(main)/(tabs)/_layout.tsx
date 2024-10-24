import { StyleSheet, View, Text } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
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
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.7)",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "800",
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={28} name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: "Your Habits",
          tabBarLabel: "Habits",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "sparkles" : "sparkles-outline"}
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
