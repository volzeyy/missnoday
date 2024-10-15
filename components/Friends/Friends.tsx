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
import Avatar from "../Avatar";
import useFetchUser from "@/hooks/useFetchUser";
import User from "../User/User";

const Friends = (props: { user_id: string | undefined }) => {
  const { user_id } = props;

  const friends = useFetchFriends(user_id);
  const user = useFetchUser(user_id);

  const { primary, background } = useTheme();

  const handleNavigateToFriends = () => {
    router.navigate("/(main)/friends");
  };

  const handleNavigateToFriendProfile = (friendId: string) => {
    router.navigate(`/(main)/user/${friendId}`);
  };

  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={[styles.container]} horizontal>
        <User
          key={user?.id}
          user={user ? user : undefined}
        />
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
              <Avatar
                key={index}
                user_id={friend}
                onPress={() => handleNavigateToFriendProfile(friend)}
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
