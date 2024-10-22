import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Button from '../Button';
import Avatar from '../Avatar';
import useSessionStore from '@/stores/useSessionStore';
import useFriendsStore from '@/stores/useFriendsStore';
import useFetchUser from '@/hooks/useFetchUser';
import { supabase } from '@/config/supabase';
import useTheme from '@/hooks/useTheme';

const ReceivedRequest = ({ user_id }: { user_id: string }) => {
  const user = useFetchUser(user_id);
  const { session } = useSessionStore();
  const { friends, setFriends } = useFriendsStore();

  const { text, background } = useTheme()

  const acceptFriendRequest = async () => {
    try {
      if (!user_id || !friends?.received_requests) return;

      const { error } = await supabase.rpc('accept_friend_request', { sender: user_id, receiver: session?.user.id });

      if (error) throw error;

      setFriends({
        ...friends,
        friends_list: friends.friends_list ? [...friends.friends_list, user_id] : [user_id],
        received_requests: friends.received_requests.filter((request: string) => request !== user_id),
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error in handleSendFriendRequest: ${error.message}`);
      }
    }
  };

  const denyFriendRequest = async () => {
    try {
      if (!user_id || !friends?.received_requests) return;

      const { error } = await supabase.rpc('deny_friend_request', { sender: user_id, receiver: session?.user.id });

      if (error) throw error;

      setFriends({
        ...friends,
        received_requests: friends.received_requests.filter((request: string) => request !== user_id),
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error in handleSendFriendRequest: ${error.message}`);
      }
    }
  };

  const handleNavigateToUserProfile = () => {
    router.navigate(`/(main)/user/${user_id}`);
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[styles.container, {backgroundColor: "transparent"}]}>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={handleNavigateToUserProfile}>
          <Avatar src={user.avatar_url} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={[styles.name, {color: text}]}>{user.full_name}</Text>
          <Text style={[styles.username, {color: text, opacity: 0.7}]}>@{user.username}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Button title="Accept" onPress={acceptFriendRequest} color={background} backgroundColor={text} />
        <Button title="Deny" onPress={denyFriendRequest} backgroundColor={"transparent"} color={text} isBorder />
      </View>
    </View>
  );
};

export default ReceivedRequest;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    gap: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: "800"
  },
  username: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: "100%"
  },
});
