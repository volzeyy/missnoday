import { StyleSheet, Text, View } from 'react-native';
import Button from '../Button';
import useSessionStore from '@/stores/useSessionStore';
import useFriendsStore from '@/stores/useFriendsStore';
import { supabase } from '@/config/supabase';
import useTheme from '@/hooks/useTheme';
import User from '../User/User';

const ReceivedRequest = ({ user_id }: { user_id: string }) => {
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

  if (!user_id) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[styles.container, {backgroundColor: "transparent"}]}>
      <User user_id={user_id} isRow />
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
