import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InputField from '@/components/InputField';
import ReceivedRequest from '@/components/ReceivedRequest';
import SendRequest from '@/components/SendRequest';
import SentRequest from '@/components/SentRequest';
import useFetchMatchingUsers from '@/hooks/useFetchMatchingUsers';
import useFetchRandomUsers from '@/hooks/useFetchRandomUsers';
import useTheme from '@/hooks/useTheme';
import useFetchFriends from '@/hooks/useFetchFriends';
import useUserStore from '@/stores/useUserStore';

const Friends = () => {
  const { user } = useUserStore();
  const friends = useFetchFriends(user?.id ?? "");

  const [username, setUsername] = useState('');
  
  const matchingUsers = useFetchMatchingUsers(username);
  const randomUsers = useFetchRandomUsers();

  const { background, text} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
        <View style={[styles.sendRequest, {backgroundColor: background}]}>
            <InputField value={username} placeholder="Search by @username" onChangeText={setUsername} />
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {matchingUsers &&
              <View style={styles.matchingUsersContainer}>
                <Text style={[styles.title, {color: text}]}>Found {matchingUsers.length} {matchingUsers.length == 1 ? "user" : "users"}</Text>
                {matchingUsers.map((friend: any, index: number) => {
                  return <SendRequest user_id={friend.id} key={index} />
                })}
              </View>
            }
            {friends && friends.received_requests && friends.received_requests.length !== 0 &&
              <View style={styles.received_requests}>
                  <Text style={[styles.title, {color: text}]}>You have {friends.received_requests.length} friend {friends.received_requests.length == 1 ? "request" : "requests"}</Text>
                  {friends.received_requests.map((friend_id: string, index: number) => {
                      return <ReceivedRequest key={index} user_id={friend_id} />
                  })}
              </View>
            }
            {randomUsers && randomUsers.length > 0 &&
                <View style={styles.matchingUsersContainer}>
                  <Text style={[styles.title, {color: text}]}>Recommended friends</Text>
                  {randomUsers
                  .filter((friend: any) => friends && !((friends.sent_requests || []).includes(friend.id)))
                  .map((friend: any, index: number) => {
                    return <SendRequest user_id={friend.id} key={index} />
                  })}
                </View>
            }
            {friends && friends.sent_requests &&
              <View style={styles.sent_requests}>
                  <Text style={[styles.title, {color: text}]}>Sent requests</Text>
                  {friends.sent_requests.map((friend: any, index: number) => {
                      return <SentRequest user_id={friend} key={index} />
                  })}
              </View>
            }
          </ScrollView>
        </View>
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
    },
    matchingUsersContainer: {
        width: "100%",
        gap: 10,
    },
    sent_requests: {
        height: "auto",
        display: "flex",
        gap: 10,
    },
    scrollViewContainer: {
      flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    scrollView: {
      minWidth: "100%",
      padding: 10,
      gap: 20,
    },
    received_requests: {
        width: "100%",
        gap: 10,
    },
    sendRequest: {
      width: "100%",
      paddingTop: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
    }
})