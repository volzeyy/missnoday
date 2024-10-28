import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/config/supabase';
import Avatar from '../Avatar';
import Button from '../Button';
import useSessionStore from '@/stores/useSessionStore';
import useFriendsStore from '@/stores/useFriendsStore';
import useFetchUser from '@/hooks/useFetchUser';
import useTheme from '@/hooks/useTheme';
import Streak from '../Streak';
import User from '../User/User';

const SendRequest = ({ user_id }: { user_id: string }) => {
  const user = useFetchUser(user_id);
  const { session } = useSessionStore((state) => state);
  const { friends, setFriends } = useFriendsStore((state) => state);

  const { text, background } = useTheme();

  const handleSendFriendRequest = async () => {
    try {
      if (!user_id || !friends) {
        return;
      }

      const { error } = await supabase.rpc('send_friend_request', { sender: session?.user.id, receiver: user_id });

      if (error) {
        throw error.message;
      }

      setFriends({
        ...friends,
        sent_requests: friends.sent_requests ? [...friends.sent_requests, user_id] : [user_id]
      });
    } catch (error) {
        alert(`Error in handleSendFriendRequest: ${error}`);
    }
  };

  const handleNavigateToUserProfile = () => {
    router.navigate(`/(main)/user/${user_id}`);
  };

  if (!user) {
    return <Text style={{ color: text }}>Loading...</Text>;
  }

  return (
    <View style={[styles.container, {backgroundColor: background, borderColor: text}]}>
      <User user_id={user_id} isRow />
      <View style={styles.actions}>
        <Button title="Send request" onPress={handleSendFriendRequest} color={background} backgroundColor={text} />
      </View>
    </View>
  );
};

export default SendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 2,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
  },
  name: {
    fontSize: 20,
    fontWeight: "800"
  },
  username: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'column',
    gap: 10,
    display: 'flex',
    width: "100%",
  },
  nameStreakContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  }
});
