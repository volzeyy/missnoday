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

const Friends = (props: { user_id?: string, user?: UserProps }) => {
  const { user_id, user } = props;

  const friendsData = useFetchFriends(user_id);
  const userData = useFetchUser(user_id);

  const { friends, setFriends } = useFriendsStore();

  useEffect(() => {
    if (!friendsData) {
      return;
    }

    setFriends(friendsData);
  }, [friendsData])

  const { primary, background } = useTheme();

  const handleNavigateToFriends = () => {
    router.navigate("/(main)/friends");
  };


  const handleNavigateToCustomize = () => {
    router.navigate("/(main)/customize")
  }

  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView 
        contentContainerStyle={[styles.container]}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <TouchableOpacity onPress={handleNavigateToCustomize}>
          <User
            key={user ? user.id : userData ? userData.id : undefined}
            user={user ? user : userData ? userData : undefined}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToFriends}
          style={[styles.friendsButtonContainer, { backgroundColor: primary }]}
        >
          <Ionicons name="people" size={24} color={background} />
          {friends &&
          friends.received_requests &&
          friends.received_requests.length ? (
            <View style={styles.floatingCircle} />
          ) : null}
        </TouchableOpacity>
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
