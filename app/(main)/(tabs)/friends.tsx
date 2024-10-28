import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReceivedRequest from "@/components/ReceivedRequest";
import SendRequest from "@/components/SendRequest";
import SentRequest from "@/components/SentRequest";
import useFetchMatchingUsers from "@/hooks/useFetchMatchingUsers";
import useFetchRandomUsers from "@/hooks/useFetchRandomUsers";
import useTheme from "@/hooks/useTheme";
import useFriendsStore from "@/stores/useFriendsStore";
import Tip from "@/components/Tip";
import Friends from "@/components/Friends";
import useUserStore from "@/stores/useUserStore";
import InputField from "@/components/InputField";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FriendsPage = () => {
  const { friends } = useFriendsStore();
  const { user } = useUserStore();

  const [username, setUsername] = useState("");

  const insets = useSafeAreaInsets();

  const matchingUsers = useFetchMatchingUsers(username);
  const randomUsers = useFetchRandomUsers();
  const filteredRandomUsers =
    randomUsers &&
    friends &&
    friends.friends_list &&
    friends.sent_requests &&
    friends.received_requests
      ? randomUsers.filter(
          (friend: any) =>
            !(friends.sent_requests || []).includes(friend.id) &&
            !(friends.friends_list || []).includes(friend.id) &&
            !(friends.received_requests || []).includes(friend.id)
        )
      : randomUsers;

  const { background, text } = useTheme();

  return (
    <View style={[styles.scrollViewContainer, { paddingTop: insets.top, backgroundColor: background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: background },
        ]}
      >

        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: text }]}>Your Friends</Text>
            <View style={[styles.sendRequest, { backgroundColor: background }]}>
            <InputField
                value={username}
                placeholder="Search by @username"
                onChangeText={setUsername}
                />
            </View>
            {friends && friends.friends_list && friends.friends_list.length > 0 && (
            <View
                style={[
                styles.sendRequest,
                { backgroundColor: background, paddingTop: 20 },
                ]}
            >
                <Friends user={user} />
            </View>
            )}
        </View>
        {!friends ||
        !friends.friends_list ||
        friends.friends_list?.length == 0 ? (
          <Tip
            title="You have no friends 🫣"
            tip="Add friends by searching for them using their @username or by adding random users."
          />
        ) : null}
        <View style={styles.userGroups}>
          {matchingUsers && (
            <View style={styles.usersGroupContainer}>
              <Text style={[styles.usersGroupTitle, { color: text }]}>
                Found {matchingUsers.length}{" "}
                {matchingUsers.length == 1 ? "user" : "users"}
              </Text>
              <View style={styles.usersContainer}>
                {matchingUsers.map((friend: any, index: number) => {
                  return <SendRequest user_id={friend.id} key={index} />;
                })}
              </View>
            </View>
          )}
          {friends &&
            friends.received_requests &&
            friends.received_requests.length !== 0 && (
              <View style={styles.usersGroupContainer}>
                <Text style={[styles.usersGroupTitle, { color: text }]}>
                  You have {friends.received_requests.length} friend{" "}
                  {friends.received_requests.length == 1
                    ? "request"
                    : "requests"}
                </Text>
                <View style={styles.usersContainer}>
                  {friends.received_requests.map(
                    (friend_id: string, index: number) => {
                      return (
                        <ReceivedRequest key={index} user_id={friend_id} />
                      );
                    }
                  )}
                </View>
              </View>
            )}
          {filteredRandomUsers && filteredRandomUsers.length > 0 ? (
            <View style={styles.usersGroupContainer}>
              <Text style={[styles.usersGroupTitle, { color: text }]}>
                Random users
              </Text>
              <View style={styles.usersContainer}>
                {filteredRandomUsers.map((friend: any, index: number) => {
                  return <SendRequest user_id={friend.id} key={index} />;
                })}
              </View>
            </View>
          ) : (
            <Tip
              title="No random users found"
              tip="Either you befriended everyone or there are just no more users."
            />
          )}
          {friends &&
            friends.sent_requests &&
            friends.sent_requests.length > 0 && (
              <View style={styles.usersGroupContainer}>
                <Text style={[styles.usersGroupTitle, { color: text }]}>
                  Sent requests
                </Text>
                <View style={styles.usersContainer}>
                  {friends.sent_requests.map((friend: any, index: number) => {
                    return <SentRequest user_id={friend} key={index} />;
                  })}
                </View>
              </View>
            )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendsPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    gap: 40,
    paddingBottom: 20,
  },
  scrollViewContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 10,
    gap: 10,
  },
  usersGroupContainer: {
    width: "100%",
    gap: 10,
  },
  sent_requests: {
    height: "auto",
    display: "flex",
    gap: 10,
  },
  userGroups: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 40,
  },
  received_requests: {
    width: "100%",
    gap: 10,
  },
  sendRequest: {
    width: "100%",
    paddingTop: 0,
  },
  usersGroupTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  usersContainer: {
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
});
