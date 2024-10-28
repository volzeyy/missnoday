import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import { router } from "expo-router";
import useFetchFriends from "@/hooks/useFetchFriends";
import useFetchUser from "@/hooks/useFetchUser";
import User from "../User/User";
import { useEffect } from "react";
import useFriendsStore from "@/stores/useFriendsStore";
import UserProps from "@/types/UserProps";
import Tip from "../Tip";

const Friends = (props: { user_id?: string, user?: Partial<UserProps> }) => {
  const { user_id } = props;

  const friendsData = useFetchFriends(user_id);

  const { friends, setFriends } = useFriendsStore();

  useEffect(() => {
    if (!friendsData) {
      return;
    }

    setFriends(friendsData);
  }, [friendsData])

  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView 
        contentContainerStyle={[styles.container]}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <View style={styles.friendsListContainer}>
          {friends &&
            friends.friends_list &&
            friends.friends_list.map((friend, index) => (
              <User
                key={index}
                user_id={friend}
              />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 10,
  },

  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    minWidth: "100%",
  },
  friendsButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  friendsListContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  floatingCircle: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 20,
    bottom: -5,
    right: 0,
  },
});
