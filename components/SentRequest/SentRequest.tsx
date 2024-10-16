import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Avatar from '../Avatar';
import useFetchUser from '@/hooks/useFetchUser';
import useTheme from '@/hooks/useTheme';

const SentRequest = (props: { user_id: string }) => {
  const { user_id } = props;
  const user = useFetchUser(user_id);

  const { text, background, primary, secondary, accent } = useTheme();

  const handleNavigateToUserProfile = () => {
    router.navigate(`/(main)/user/${user_id}`);
  };

  return (
    <View style={[styles.container, {backgroundColor: primary, borderColor: text}]}>
      {user ? (
        <>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={handleNavigateToUserProfile}>
              <Avatar url={user.avatar_url} />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <Text style={[styles.name, {color: background}]}>{user.full_name}</Text>
              <Text style={[styles.username, {color: secondary}]}>@{user.username}</Text>
            </View>
          </View>
          <Text style={[styles.tip, {color: secondary}]}>User has yet to accept or deny your request!</Text>
        </>
      ) : (
        <Text style={{ color: secondary }}>Loading...</Text>
      )}
    </View>
  );
};

export default SentRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    borderRadius: 15,
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
    fontWeight: "800",
  },
  username: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  tip: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
});